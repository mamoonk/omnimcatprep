# MCAT Prep — Local-First Platform

Cross-platform MCAT preparation app built with **Tauri v2**, **React + TypeScript + Tailwind**, **RxDB** (Dexie/IndexedDB), optional **Supabase** sync, **FSRS** spaced repetition, **Guarantee Mode** compliance engine, and **Transformers.js** local AI tutoring.

## One-line install (all platforms)

From a fresh clone:

```bash
npm run setup
```

Or use the platform wrapper:

| Platform | Command |
|----------|---------|
| **Any** (Node 20+) | `npm run setup` |
| **macOS / Linux** | `./scripts/install.sh` |
| **Windows** | `.\scripts\install.ps1` |

Remote one-liner (after pushing to GitHub — replace `YOUR_ORG`):

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/mcatprep/main/scripts/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/YOUR_ORG/mcatprep/main/scripts/install.ps1 | iex
```

The installer runs `npm install`, creates `.env` from `.env.example`, initializes Android if `ANDROID_HOME` is set, runs typecheck + tests, then **starts the dev server and opens your browser** to http://localhost:1420.

Skip auto-launch with `npm run setup -- --no-dev` or `npm run setup -- --no-open`.

## Quick start

```bash
npm run dev          # Web dev server (port 1420)
npm run tauri dev    # Desktop app (Windows verified)
npm test             # Unit tests
npm run tauri build  # Production desktop build
```

## Optional Supabase sync

Copy `.env.example` to `.env` and set:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The app works fully offline without these variables.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — DB status, overdue guard |
| `/dashboard` | Performance analytics |
| `/exam` | Pearson VUE exam emulator (full-screen) |
| `/flashcards` | FSRS flashcard review |
| `/ai` | Local AI tutor + PDF → Cloze upload |
| `/help` | In-app user guide |

## Platform targets

- **Windows**: built and verified (`npm run tauri build`)
- **Android**: config initialized (`npm run tauri android init`)
- **macOS / iOS**: configured in `tauri.conf.json`; iOS build requires macOS/Xcode

## Architecture

```
src/
├── components/          # Shared UI
├── features/
│   ├── dashboard/       # Analytics charts
│   ├── exam-emulator/   # Pearson VUE clone
│   ├── flashcards/      # FSRS engine
│   └── compliance/      # Guarantee Mode
├── database/            # RxDB + Supabase sync
└── local-ai/            # WebGPU worker + PDF parsing
```
