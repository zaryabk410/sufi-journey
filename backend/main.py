"""Sufi Journey backend: content API, reflections wall, static frontend."""
import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from content import NAV, PAGES

BASE = Path(__file__).resolve().parent
FRONTEND = BASE.parent / "frontend"
DB_PATH = BASE / "reflections.db"

app = FastAPI(title="Sufi Journey API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


with closing(db()) as c:
    c.execute(
        """CREATE TABLE IF NOT EXISTS reflections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page TEXT NOT NULL,
            name TEXT NOT NULL,
            text TEXT NOT NULL,
            created_at TEXT NOT NULL)"""
    )
    c.commit()


class ReflectionIn(BaseModel):
    name: str = Field("Anonymous seeker", max_length=40)
    text: str = Field(..., min_length=3, max_length=400)


@app.get("/api/nav")
def nav():
    return NAV


@app.get("/api/pages")
def pages():
    return [{"slug": p["slug"], "title": p["title"], "subtitle": p["subtitle"]} for p in PAGES.values()]


@app.get("/api/pages/{slug}")
def page(slug: str):
    if slug not in PAGES:
        raise HTTPException(404, f"No page named '{slug}'")
    return PAGES[slug]


@app.get("/api/reflections/{slug}")
def list_reflections(slug: str, limit: int = 30):
    if slug not in PAGES:
        raise HTTPException(404, f"No page named '{slug}'")
    with closing(db()) as c:
        rows = c.execute(
            "SELECT name, text, created_at FROM reflections WHERE page=? ORDER BY id DESC LIMIT ?",
            (slug, min(limit, 100)),
        ).fetchall()
    return [dict(r) for r in rows]


@app.post("/api/reflections/{slug}", status_code=201)
def add_reflection(slug: str, body: ReflectionIn):
    if slug not in PAGES:
        raise HTTPException(404, f"No page named '{slug}'")
    name = body.name.strip() or "Anonymous seeker"
    text = body.text.strip()
    if len(text) < 3:
        raise HTTPException(422, "Write at least 3 characters.")
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with closing(db()) as c:
        c.execute(
            "INSERT INTO reflections (page, name, text, created_at) VALUES (?,?,?,?)",
            (slug, name, text, now),
        )
        c.commit()
    return {"name": name, "text": text, "created_at": now}


# Frontend last so /api routes win
app.mount("/", StaticFiles(directory=FRONTEND, html=True), name="frontend")
