#!/usr/bin/env node
/**
 * MCAT Prep — cross-platform dev environment installer.
 * Usage: node scripts/install.mjs  |  npm run setup
 *
 * Flags:
 *   --no-dev   Skip starting the dev server after setup
 *   --no-open  Start dev server but do not open a browser
 */
import { spawn, spawnSync, execSync } from "node:child_process";
import { existsSync, copyFileSync } from "node:fs";
import http from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { platform, arch } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DEV_URL = "http://localhost:1420";

const args = process.argv.slice(2);
const skipDev = args.includes("--no-dev");
const skipOpen = args.includes("--no-open") || Boolean(process.env.CI);

const isWin = platform() === "win32";
const isMac = platform() === "darwin";
const isLinux = platform() === "linux";

function log(msg) {
  console.log(`\x1b[36m[setup]\x1b[0m ${msg}`);
}
function ok(msg) {
  console.log(`\x1b[32m  ✓\x1b[0m ${msg}`);
}
function warn(msg) {
  console.warn(`\x1b[33m  !\x1b[0m ${msg}`);
}
function fail(msg) {
  console.error(`\x1b[31m  ✗\x1b[0m ${msg}`);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: isWin,
    ...opts,
  });
  return result.status === 0;
}

function has(cmd) {
  try {
    execSync(isWin ? `where ${cmd}` : `command -v ${cmd}`, {
      stdio: "ignore",
      shell: true,
    });
    return true;
  } catch {
    return false;
  }
}

function nodeVersionOk() {
  const major = parseInt(process.version.slice(1).split(".")[0], 10);
  if (major < 20) {
    fail(`Node.js 20+ required (found ${process.version}). Install from https://nodejs.org`);
  }
  ok(`Node.js ${process.version}`);
}

function checkRust() {
  if (has("rustc") && has("cargo")) {
    const ver = execSync("rustc --version", { encoding: "utf8" }).trim();
    ok(ver);
    return true;
  }
  warn("Rust not found — required for Tauri desktop/mobile builds.");
  warn("Install: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh");
  if (isWin) warn("Windows: https://rustup.rs/ then install VS Build Tools (C++ workload)");
  return false;
}

function checkPlatformPrereqs() {
  log(`Platform: ${platform()} ${arch()}`);

  if (isWin) {
    if (!has("cl") && !has("link")) {
      warn("MSVC link.exe not in PATH — install Visual Studio Build Tools (Desktop C++).");
    } else {
      ok("MSVC toolchain detected");
    }
  }

  if (isMac) {
    if (has("xcode-select")) {
      try {
        execSync("xcode-select -p", { stdio: "ignore" });
        ok("Xcode Command Line Tools");
      } catch {
        warn("Run: xcode-select --install");
      }
    }
  }

  if (isLinux) {
    warn("Linux deps: sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libayatana-appindicator3-dev librsvg2-dev");
  }
}

function npmInstall() {
  log("Installing npm dependencies…");
  if (!run("npm", ["install"])) fail("npm install failed");
  ok("npm dependencies installed");
}

function setupEnv() {
  const envExample = join(ROOT, ".env.example");
  const envFile = join(ROOT, ".env");
  if (existsSync(envExample) && !existsSync(envFile)) {
    copyFileSync(envExample, envFile);
    ok("Created .env from .env.example (Supabase optional)");
  }
}

function initMobile() {
  const androidDir = join(ROOT, "src-tauri", "gen", "android");
  if (existsSync(androidDir)) {
    ok("Android project already initialized");
    return;
  }

  const androidHome =
    process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || "";
  if (androidHome && has("npm")) {
    log("Initializing Tauri Android project…");
    if (run("npm", ["run", "tauri", "android", "init"])) {
      ok("Android project initialized");
    } else {
      warn("Android init skipped (NDK/SDK issue — run: npm run tauri android init)");
    }
  } else {
    warn("ANDROID_HOME not set — skip Android init (optional)");
  }

  if (isMac && has("xcrun")) {
    log("iOS builds require: npm run tauri ios init (on macOS with Xcode)");
  }
}

function verify() {
  log("Running verification…");
  if (run("npm", ["run", "typecheck"])) ok("TypeScript");
  else warn("Typecheck failed");

  if (run("npm", ["test"])) ok("Tests passed");
  else warn("Tests failed");
}

function printNextSteps() {
  console.log(`
\x1b[1mDone!\x1b[0m Next steps:

  npm run dev          Web UI  → ${DEV_URL}
  npm run tauri dev    Desktop app
  npm test             Run unit tests

  Platform builds:
  npm run tauri build              Windows / macOS / Linux
  npm run tauri android build      Android (SDK + NDK)
  npm run tauri ios build          iOS (macOS + Xcode only)
`);
}

function waitForServer(url, maxAttempts = 90) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve();
        } else if (++attempts >= maxAttempts) {
          reject(new Error("Dev server did not become ready in time"));
        } else {
          setTimeout(check, 500);
        }
      });
      req.on("error", () => {
        if (++attempts >= maxAttempts) {
          reject(new Error("Dev server did not become ready in time"));
        } else {
          setTimeout(check, 500);
        }
      });
      req.setTimeout(2000, () => {
        req.destroy();
      });
    };
    check();
  });
}

function openBrowser(url) {
  if (skipOpen) return;

  try {
    if (isWin) {
      spawn("cmd", ["/c", "start", "", url], {
        detached: true,
        stdio: "ignore",
        shell: false,
      }).unref();
    } else if (isMac) {
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
    } else {
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
    }
    ok(`Opened browser → ${url}`);
  } catch {
    warn(`Could not open browser automatically. Visit ${url}`);
  }
}

async function isServerUp() {
  try {
    await waitForServer(DEV_URL, 4);
    return true;
  } catch {
    return false;
  }
}

async function launchWebUi() {
  if (skipDev) {
    printNextSteps();
    return;
  }

  if (await isServerUp()) {
    ok(`Web UI already running at ${DEV_URL}`);
    openBrowser(DEV_URL);
    return;
  }

  log(`Starting web UI at ${DEV_URL}…`);

  const dev = spawn("npm", ["run", "dev"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: isWin,
  });

  dev.on("error", (err) => {
    fail(`Failed to start dev server: ${err.message}`);
  });

  try {
    await waitForServer(DEV_URL);
    ok("Web UI is ready");
    openBrowser(DEV_URL);
    console.log(
      `\n\x1b[1mDev server running.\x1b[0m Press Ctrl+C to stop.\n`,
    );
  } catch (err) {
    dev.kill();
    warn(err instanceof Error ? err.message : String(err));
    printNextSteps();
    process.exit(1);
  }

  await new Promise((resolve) => {
    dev.on("exit", (code) => resolve(code ?? 0));
  });
}

async function main() {
  console.log("\x1b[1mMCAT Prep — Environment Setup\x1b[0m\n");
  nodeVersionOk();
  checkPlatformPrereqs();
  checkRust();
  npmInstall();
  setupEnv();
  initMobile();
  verify();
  await launchWebUi();
}

main().catch((err) => {
  fail(err.message);
});
