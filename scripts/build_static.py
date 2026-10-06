"""Build a static copy of the site for GitHub Pages.

    python scripts/build_static.py [--out dist] [--api https://your-backend.onrender.com]

Copies frontend/ to the output folder, exports all content from
backend/content.py as JSON under data/, and writes js/config.js in static mode.
If --api (or env SUFI_API) is given, reflections go to that backend; otherwise
they are kept in each visitor's browser.
"""
import argparse
import json
import os
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "backend"))

from content import NAV, PAGES  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "dist"))
    ap.add_argument("--api", default=os.environ.get("SUFI_API", ""))
    args = ap.parse_args()

    out = Path(args.out)
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(ROOT / "frontend", out)

    data = out / "data"
    (data / "pages").mkdir(parents=True)
    dump = lambda path, obj: path.write_text(json.dumps(obj, ensure_ascii=False), encoding="utf-8")
    dump(data / "nav.json", NAV)
    dump(data / "pages.json", [{"slug": p["slug"], "title": p["title"], "subtitle": p["subtitle"]} for p in PAGES.values()])
    for slug, page in PAGES.items():
        dump(data / "pages" / f"{slug}.json", page)

    api = args.api.rstrip("/")
    (out / "js" / "config.js").write_text(
        f'window.SUFI_MODE = "static";\nwindow.SUFI_API = {json.dumps(api)};\n', encoding="utf-8"
    )
    (out / ".nojekyll").write_text("", encoding="utf-8")
    (out / "404.html").write_text(
        '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./index.html">'
        '<title>Sufi Journey</title><a href="./index.html">Sufi Journey</a>',
        encoding="utf-8",
    )

    missing = [n["href"] for n in NAV if not (out / n["href"]).exists()]
    if missing:
        sys.exit(f"Missing HTML pages for nav entries: {missing}")
    print(f"Built {len(PAGES)} pages into {out} (reflections: {'backend ' + api if api else 'browser only'})")


if __name__ == "__main__":
    main()
