#!/usr/bin/env bash
# MCAT Prep one-liner (Unix / macOS / Linux):
#   curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/mcatprep/main/scripts/install.sh | bash
# From repo root:
#   ./scripts/install.sh
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/install.mjs
