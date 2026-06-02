# MCAT Prep one-liner (Windows PowerShell):
#   git clone https://github.com/mamoonk/omnimcatprep.git; cd omnimcatprep; .\scripts\install.ps1
# From repo root:
#   .\scripts\install.ps1
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
node scripts/install.mjs
