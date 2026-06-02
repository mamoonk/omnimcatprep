# MCAT Prep one-liner (Windows PowerShell):
#   irm https://raw.githubusercontent.com/YOUR_ORG/mcatprep/main/scripts/install.ps1 | iex
# From repo root:
#   .\scripts\install.ps1
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
node scripts/install.mjs
