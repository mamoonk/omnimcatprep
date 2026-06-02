#!/usr/bin/env bash
# MCAT Prep one-liner (Unix / macOS / Linux):
#   git clone https://github.com/mamoonk/omnimcatprep.git && cd omnimcatprep && ./scripts/install.sh
# From repo root:
#   ./scripts/install.sh
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/install.mjs
