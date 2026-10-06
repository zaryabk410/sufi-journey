#!/usr/bin/env bash
# Deploy Sufi Journey to GitHub and publish it on GitHub Pages.
#
# Usage:  ./scripts/deploy.sh [repo-name] [public|private]
# Needs:  git, GitHub CLI (gh) logged in with `gh auth login`
#
# Pages on a private repo needs a paid GitHub plan; public is the default.
set -euo pipefail

REPO="${1:-sufi-journey}"
VISIBILITY="${2:-public}"
BRANCH="main"

cd "$(dirname "$0")/.."

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1. $2"; exit 1; }; }
need git "Install from https://git-scm.com"
need gh  "Install from https://cli.github.com then run: gh auth login"
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }

OWNER="$(gh api user --jq .login)"
echo "Deploying as $OWNER to $OWNER/$REPO ($VISIBILITY)"

# 1. Local repo and first commit
if [ ! -d .git ]; then
  git init -q
  git checkout -q -b "$BRANCH"
fi
git add -A
git diff --cached --quiet || git commit -q -m "Deploy Sufi Journey"
git branch -M "$BRANCH"

# 2. Create the GitHub repo if needed, then push
if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin "$BRANCH"
else
  gh repo create "$OWNER/$REPO" "--$VISIBILITY" --source . --remote origin --push \
    --description "Sufism explained visually for Gen Z: animated films, Urdu poetry, Web Audio"
fi

# 3. Enable GitHub Pages with GitHub Actions as the source
if gh api "repos/$OWNER/$REPO/pages" >/dev/null 2>&1; then
  gh api -X PUT "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null
else
  gh api -X POST "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null
fi

# 4. Optional backend URL for shared reflections (repo variable read by the workflow)
if [ -n "${SUFI_API:-}" ]; then
  gh variable set SUFI_API --repo "$OWNER/$REPO" --body "$SUFI_API"
fi

# 5. Run the workflow and wait for it
sleep 3
gh workflow run deploy.yml --repo "$OWNER/$REPO" --ref "$BRANCH" >/dev/null 2>&1 || true
sleep 5
RUN_ID="$(gh run list --repo "$OWNER/$REPO" --workflow deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId' || true)"
[ -n "$RUN_ID" ] && gh run watch "$RUN_ID" --repo "$OWNER/$REPO" --exit-status || true

URL="https://$OWNER.github.io/$REPO/"
echo
echo "Live site: $URL"
for p in index ishq kainaat peer-e-kamil shikwa maikada; do echo "  ${URL}${p}.html"; done
echo "Repo:      https://github.com/$OWNER/$REPO"
