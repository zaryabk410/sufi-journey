# Sufi Journey

**Live site:**(https://zaryabk410.github.io/sufi-journey/)


Replace YOUR-USERNAME after deploying (the deploy script prints the real links).

Full stack web app that explains Sufism (tasawwuf) visually for Gen Z, plus three deep-dive pages:

- `/` Tasawwuf: ihsan, four layers, nafs, mirror of the heart, dhikr, stations, ishq, fana and baqa, silsila, myths
- `/ishq.html` Ishq: the love between Allah and the human (Quran, hadith qudsi, Majnun, Rumi's reed, signs of a lover, Mir, Ghalib, Iqbal, original ghazal)
- `/kainaat.html` Kainaat: the universe in Sufism (17:44, microcosm, Verse of Light, four worlds, wahdat al-wujud and al-shuhud, renewal, cosmic dance, hairat, original nazm)
- `/peer-e-kamil.html` Peer-e-Kamil by Umera Ahmed (themes and story, paraphrased)
- `/shikwa.html` Shikwa and Jawab-e-Shikwa by Allama Iqbal (verses in Urdu, Roman Urdu and English)
- `/maikada.html` Yeh hai maikada by Jigar Moradabadi (Sufi symbolism, paraphrased)

## Animated films
Every page opens with a short animated film (canvas animation + subtitles + narration + synthesised ambience):
- Tasawwuf: "Mushaira of the Heart", Mir Dard, Ghalib, Bulleh Shah, then an original ghazal (Aaina-e-Dil) and nazm (Allah Hu)
- Ishq: "The Thirty Birds", Attar's Conference of the Birds retold, 12 shots, ney melody ambience
- Kainaat: "The Dhikr of the Cosmos", 13 shots, cosmic pad ambience
- Peer-e-Kamil: "The Perfect Guide", 10 shots
- Shikwa: "The Complaint and the Answer", 11 shots
- Maikada: "A Night in the Maikada", 8 shots

Film scripts live in `backend/content.py` under each page's `film.shots`. Each shot: `scene`, `caption`, optional `narration`, `ur`, `roman`, `credit`, `dur` (minimum seconds). A shot advances when its narration ends.

## Stack
- Backend: FastAPI + SQLite (content API, reflections wall), serves the frontend
- Frontend: vanilla HTML/CSS/JS, Canvas 2D animations (54 scenes across `scene.js`, `story.js`, `story2.js`), film player in `film.js`
- Audio: pure JavaScript, no audio files
  - Web Audio API synthesises tanpura drone, daf, dholak, handclaps, harmonium, bells, dhikr heartbeat, with convolution reverb
  - Web Speech API narrates chapters, cards and verses; Urdu verses are recited in Urdu when an Urdu voice is installed

## Run
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Open http://localhost:8000

## API
| Method | Path | Purpose |
|---|---|---|
| GET | /api/nav | Navigation |
| GET | /api/pages | Page list |
| GET | /api/pages/{slug} | Page content (sufism, peer-e-kamil, shikwa, maikada) |
| GET | /api/reflections/{slug} | Reflections wall |
| POST | /api/reflections/{slug} | Add reflection `{name, text}` |

## Editing content
All text lives in `backend/content.py`. Each chapter picks a canvas scene by key:
`whirl, path, nafs, mirror, dhikr, moth, fana, chain, twopaths, lamp, void, ascend, descend, tavern`.

## Audio notes
- Browsers block sound until a click, so ambience starts from "Begin with sound" or "Play ambience".
- Urdu voice: Windows (Settings, Time and language, Speech, add Urdu), Android Google TTS, or Edge online voices. Without one, verses are read through their English meaning.

## Deploy to GitHub

One command (needs `git` and GitHub CLI `gh`, logged in with `gh auth login`):

```bash
./scripts/deploy.sh sufi-journey public          # Linux / macOS / Git Bash
.\scripts\deploy.ps1 -Repo sufi-journey           # Windows PowerShell
```

The script creates the repo, pushes `main`, sets GitHub Pages to build from Actions, runs the workflow and prints the live links.

### GitHub Actions (`.github/workflows/deploy.yml`)
1. **test**: installs FastAPI, checks JS syntax, boots the API, requests every page, posts a reflection, checks for em dashes.
2. **build**: `scripts/build_static.py` exports content to `dist/data/*.json` and writes `js/config.js` in static mode.
3. **deploy**: publishes `dist/` to GitHub Pages and writes the page links to the run summary.
4. **backend** (optional): triggers a Render deploy if the `RENDER_DEPLOY_HOOK` secret exists.

### Two deployment modes
- **Static (default):** GitHub Pages only. Films, audio, narration and all content work. Reflections are saved in each visitor's browser.
- **Full stack:** deploy the backend (Dockerfile + `render.yaml`, Render free tier works), then:
  ```bash
  gh variable set SUFI_API --body "https://sufi-journey-api.onrender.com"
  gh secret set RENDER_DEPLOY_HOOK --body "<hook URL from Render settings>"
  gh workflow run deploy.yml
  ```
  The Pages site then reads and writes shared reflections through the API (CORS is open).

Note: SQLite on a free Render instance resets on redeploy. Attach a disk or switch to Postgres for permanent reflections.

### Build the static site locally
```bash
python scripts/build_static.py --out dist
cd dist && python -m http.server 8080
```
