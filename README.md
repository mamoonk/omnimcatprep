# Omni MCAT Prep

A **local-first** MCAT preparation platform: practice exams, spaced-repetition flashcards, performance analytics, and AI tutoring — with full offline support and optional cloud sync.

Built with **Tauri v2**, **React + TypeScript + Tailwind**, **RxDB** (IndexedDB), **FSRS** scheduling, **Guarantee Mode** mistake compliance, and **multi-provider AI** (local WebGPU + online APIs).

**Repository:** [github.com/mamoonk/omnimcatprep](https://github.com/mamoonk/omnimcatprep)

---

## Features

| Feature | Description |
|---------|-------------|
| **Pearson VUE exam emulator** | Split passage/question layout, timers, flagging, cross-out, scratchpad |
| **Guarantee Mode** | Blocks progress on wrong answers until you log info gap, distractor trap, and preventive rule |
| **FSRS flashcards** | Spaced repetition with Again / Hard / Good / Easy; overdue guard blocks new exams past 200 overdue cards |
| **Analytics dashboard** | Accuracy by section, daily trends, error types, flashcard deck health — all computed on-device |
| **AI tutor** | Local Transformers.js (WebGPU) or online providers (OpenAI, Anthropic, Gemini, Groq, OpenRouter) |
| **PDF → Cloze** | Upload study PDFs to auto-generate flashcards |
| **Optional Supabase sync** | Replicate `question_logs` and `flashcards` when signed in and online |
| **Guided onboarding** | Step-by-step tour with opt-out and Settings toggle |

---

## Prerequisites

### Required (web development)

| Tool | Version | Notes |
|------|---------|--------|
| **Node.js** | 20+ | [nodejs.org](https://nodejs.org) |
| **npm** | 10+ | Bundled with Node |

### Required (desktop / mobile builds only)

| Tool | Notes |
|------|--------|
| **Rust** | [rustup.rs](https://rustup.rs) — `rustc` and `cargo` on PATH |
| **Platform toolchain** | See below |

**Windows (Tauri desktop)**

- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with **Desktop development with C++**
- WebView2 (usually pre-installed on Windows 10/11)

**macOS**

- Xcode Command Line Tools: `xcode-select --install`
- For iOS: full Xcode + `npm run tauri ios init`

**Linux**

```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
  libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

**Android (optional)**

- Android Studio / SDK, `ANDROID_HOME` set
- NDK installed; setup runs `npm run tauri android init` when SDK is detected

### Optional

- **Supabase project** — for cloud sync ([supabase.com](https://supabase.com))
- **WebGPU-capable browser** — Chrome/Edge recommended for local AI
- **API keys** — for online AI providers (stored locally in the browser)

---

## Installation

### Option A — One command (recommended)

Clone the repo, then run setup from the project root:

```bash
git clone https://github.com/mamoonk/omnimcatprep.git
cd omnimcatprep
npm run setup
```

Setup will:

1. Verify Node.js 20+
2. Check Rust / platform toolchains (warns if missing)
3. Run `npm install`
4. Copy `.env.example` → `.env` if needed
5. Initialize Android project if `ANDROID_HOME` is set
6. Run typecheck and tests
7. Start the dev server and open **http://localhost:1420**

**Setup flags**

```bash
npm run setup -- --no-dev    # Install only; do not start dev server
npm run setup -- --no-open     # Start dev server but do not open browser
```

**Platform wrappers**

```bash
# macOS / Linux
./scripts/install.sh

# Windows (PowerShell)
.\scripts\install.ps1
```

### Option B — Remote one-liner (no clone)

**macOS / Linux**

```bash
git clone https://github.com/mamoonk/omnimcatprep.git && cd omnimcatprep && npm run setup
```

**Windows (PowerShell)**

```powershell
git clone https://github.com/mamoonk/omnimcatprep.git; cd omnimcatprep; npm run setup
```

### Option C — Manual install

```bash
git clone https://github.com/mamoonk/omnimcatprep.git
cd omnimcatprep
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run typecheck
npm test
npm run dev
```

Open [http://localhost:1420](http://localhost:1420) in your browser.

---

## Configuration

### Environment variables

Copy `.env.example` to `.env`:

```env
# Optional — app works fully offline without these
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Supabase tables expected: `question_logs`, `flashcards` (matching RxDB schemas). Sync runs only when authenticated and online.

### AI providers

Configure under **AI Tutor** or **Settings**:

- **Local** — Hugging Face / Transformers.js models (e.g. `Xenova/Phi-3-mini-4k-instruct`); runs offline after first download
- **Online** — OpenAI, Anthropic, Google Gemini, Groq, OpenRouter; prompts for API key/token stored in localStorage only

---

## Running the app

### Web (development)

```bash
npm run dev
```

→ [http://localhost:1420](http://localhost:1420)

### Desktop (Tauri)

```bash
npm run tauri dev      # Development with hot reload
npm run tauri build    # Production installer (Windows verified)
```

### Mobile

```bash
npm run tauri android init    # First time only
npm run tauri android dev

# iOS (macOS + Xcode only)
npm run tauri ios init
npm run tauri ios dev
```

### Production web build

```bash
npm run build
npm run preview
```

---

## App routes

| Route | Description |
|-------|-------------|
| `/` | Home — DB status, overdue flashcard guard, quick actions |
| `/dashboard` | Performance analytics and flashcard deck stats |
| `/exam` | Full-screen Pearson VUE practice exam |
| `/flashcards` | FSRS review queue |
| `/ai` | AI tutor, provider/model selection, PDF → Cloze upload |
| `/help` | In-app user guide |
| `/settings` | Guided tour toggle, AI provider & model preferences |

---

## Development

```bash
npm run dev          # Vite dev server (port 1420)
npm run build        # TypeScript + production bundle
npm run typecheck    # tsc --noEmit
npm test             # Vitest (single run)
npm run test:watch   # Vitest watch mode
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier (src/**/*.{ts,tsx,css})
npm run tauri        # Tauri CLI passthrough
```

---

## Architecture

Local-first: all practice, analytics, and exam flows work offline via RxDB (Dexie/IndexedDB). Cloud is optional.

```
src/
├── components/              # Shared UI (AppShell, Button, Card, …)
├── features/
│   ├── dashboard/           # Analytics + charts
│   ├── exam-emulator/       # Pearson VUE UI + exam state
│   ├── flashcards/          # FSRS + Cloze rendering
│   ├── compliance/          # Guarantee Mode (XState)
│   ├── help/                # In-app guide
│   ├── onboarding/          # Guided tour
│   └── settings/            # User preferences
├── database/                # RxDB collections + Supabase replication
├── local-ai/                # WebGPU worker, online providers, PDF import
└── types/                   # Shared TypeScript types

src-tauri/                   # Tauri v2 shell (Windows, macOS, Linux, iOS, Android)
scripts/                     # install.mjs, install.sh, install.ps1
```

**RxDB collections**

- `question_logs` — exam attempt history, mistake analysis, compliance flags
- `flashcards` — FSRS fields, Cloze front/back, due dates

**Guarantee Mode**

Incorrect answers trigger a modal blockade when active. `infoGap`, `distractorTrap`, and `preventiveRule` must be filled before continuing; persisted to `question_logs.mistakeAnalysis`.

**FSRS**

Interval: `I(s, r) = s × ln(r) / ln(0.9)` with default retrievability `r = 0.9`. More than 200 overdue flashcards blocks new exam practice.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Node.js 20+ required` | Upgrade Node from [nodejs.org](https://nodejs.org) |
| `npm install` fails | Delete `node_modules` and `package-lock.json`, run `npm install` again |
| Tauri build fails on Windows | Install VS Build Tools (C++ workload); restart terminal |
| Tauri build fails on Linux | Install webkit2gtk and deps (see Prerequisites) |
| Local AI won't load | Use Chrome/Edge with WebGPU; pick a `Xenova/*` model; check console for download errors |
| Online AI errors | Verify API key in Settings; check network; some providers block browser CORS — use desktop app if needed |
| Port 1420 in use | Stop other Vite processes or change port in `vite.config.ts` / `tauri.conf.json` |
| Blank DB / stale data | Clear site data for localhost in browser DevTools → Application → IndexedDB |
| Android init skipped | Set `ANDROID_HOME`, install SDK + NDK, run `npm run tauri android init` |

---

## Platform support

| Platform | Dev | Production build |
|----------|-----|------------------|
| **Web** | ✅ `npm run dev` | ✅ `npm run build` |
| **Windows** | ✅ `npm run tauri dev` | ✅ Verified |
| **macOS** | ✅ Configured | Requires macOS + Xcode CLT |
| **Linux** | ✅ Configured | Requires webkit2gtk deps |
| **Android** | ⚙️ SDK required | `npm run tauri android build` |
| **iOS** | ⚙️ macOS + Xcode | `npm run tauri ios build` |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Run `npm run typecheck` and `npm test` before committing
4. Open a pull request against `master`

---

## License

This project is private unless a license file is added to the repository. Contact the repository owner for usage terms.

---

## Quick reference

```bash
# First time
git clone https://github.com/mamoonk/omnimcatprep.git
cd omnimcatprep
npm run setup

# Daily development
npm run dev              # Browser at http://localhost:1420
npm run tauri dev        # Desktop app

# Quality checks
npm test && npm run typecheck
```
