#!/usr/bin/env bash
# Deploy Sufi Journey to GitHub Pages using your existing SSH key. No gh CLI needed.
#
# Usage:  ./scripts/deploy_ssh.sh [repo-name]
set -euo pipefail

REPO="${1:-sufi-journey}"
BRANCH="main"
cd "$(dirname "$0")/.."

command -v git >/dev/null || { echo "Install git first: sudo apt install git"; exit 1; }

# 1. Find your GitHub username from the SSH greeting
GREETING="$(ssh -T -o StrictHostKeyChecking=accept-new git@github.com 2>&1 || true)"
USER_GH="$(echo "$GREETING" | sed -n 's/^Hi \([^!]*\)!.*/\1/p')"
if [ -z "$USER_GH" ]; then
  echo "SSH to GitHub failed:"; echo "$GREETING"
  echo "Check: ssh -T git@github.com"; exit 1
fi
REMOTE="git@github.com:$USER_GH/$REPO.git"
echo "GitHub user: $USER_GH"
echo "Repository:  $REMOTE"

# 2. Local repo and commit
if [ ! -d .git ]; then git init -q; fi
git checkout -q -B "$BRANCH"
git config user.name  >/dev/null || git config user.name  "$USER_GH"
git config user.email >/dev/null || git config user.email "$USER_GH@users.noreply.github.com"
git add -A
git diff --cached --quiet || git commit -q -m "Deploy Sufi Journey"

# 3. Make sure the repo exists on GitHub (creating a repo needs the website without gh)
until git ls-remote "$REMOTE" >/dev/null 2>&1; do
  echo
  echo "Repo not found. Create it (empty, no README) here:"
  echo "  https://github.com/new?name=$REPO&visibility=public"
  read -rp "Press Enter after creating it... "
done

# 4. Push
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi
git push -u origin "$BRANCH"

# 5. Enable Pages (one time, on the website)
echo
echo "One-time step: set Pages source to GitHub Actions"
echo "  https://github.com/$USER_GH/$REPO/settings/pages"
echo "  Build and deployment > Source > GitHub Actions"
read -rp "Press Enter after saving it... "

# 6. Trigger a fresh workflow run now that Pages is enabled
git commit -q --allow-empty -m "Trigger Pages deploy"
git push -q origin "$BRANCH"

URL="https://$USER_GH.github.io/$REPO/"
echo
echo "Deploy running: https://github.com/$USER_GH/$REPO/actions"
echo "Live in 1 to 2 minutes:"
for p in index ishq kainaat peer-e-kamil shikwa maikada; do echo "  ${URL}${p}.html"; done
