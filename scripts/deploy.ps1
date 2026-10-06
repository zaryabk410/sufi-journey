# Deploy Sufi Journey to GitHub Pages from Windows PowerShell.
# Usage:  .\scripts\deploy.ps1 [-Repo sufi-journey] [-Visibility public] [-Api https://backend.example.com]
# Needs:  git and GitHub CLI (gh), logged in with `gh auth login`
param(
  [string]$Repo = "sufi-journey",
  [ValidateSet("public", "private")][string]$Visibility = "public",
  [string]$Api = ""
)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

foreach ($tool in "git", "gh") {
  if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "Missing $tool. Install it first." }
}
gh auth status *> $null
if ($LASTEXITCODE -ne 0) { throw "Run: gh auth login" }

$Owner = gh api user --jq .login
Write-Host "Deploying as $Owner to $Owner/$Repo ($Visibility)"

if (-not (Test-Path .git)) { git init -q; git checkout -q -b main }
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -q -m "Deploy Sufi Journey" }
git branch -M main

gh repo view "$Owner/$Repo" *> $null
if ($LASTEXITCODE -eq 0) {
  git remote get-url origin *> $null
  if ($LASTEXITCODE -ne 0) { git remote add origin "https://github.com/$Owner/$Repo.git" }
  git push -u origin main
} else {
  gh repo create "$Owner/$Repo" "--$Visibility" --source . --remote origin --push --description "Sufism explained visually for Gen Z"
}

gh api "repos/$Owner/$Repo/pages" *> $null
if ($LASTEXITCODE -eq 0) { gh api -X PUT "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null } else { gh api -X POST "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null }

if ($Api) { gh variable set SUFI_API --repo "$Owner/$Repo" --body $Api }

Start-Sleep 3
gh workflow run deploy.yml --repo "$Owner/$Repo" --ref main *> $null
Start-Sleep 5
$RunId = gh run list --repo "$Owner/$Repo" --workflow deploy.yml --limit 1 --json databaseId --jq ".[0].databaseId"
if ($RunId) { gh run watch $RunId --repo "$Owner/$Repo" --exit-status }

$Url = "https://$Owner.github.io/$Repo/"
Write-Host "`nLive site: $Url"
foreach ($p in "index", "ishq", "kainaat", "peer-e-kamil", "shikwa", "maikada") { Write-Host "  $Url$p.html" }
Write-Host "Repo:      https://github.com/$Owner/$Repo"
