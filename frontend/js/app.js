/* Renders a page from /api/pages/{slug}, drives the stage and audio. */
(function () {
  const slug = document.body.dataset.page;
  // Mode is set in js/config.js:
  //   "api"    : content and reflections come from the FastAPI backend (SUFI_API, empty = same origin)
  //   "static" : GitHub Pages build; content from data/*.json, reflections from SUFI_API if set, else this browser
  const MODE = window.SUFI_MODE || "api";
  const API = (window.SUFI_API || "").replace(/\/$/, "");
  const STATIC_CONTENT = MODE === "static";
  const LOCAL_REFLECTIONS = MODE === "static" && !API;
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const audio = new SufiAudio();
  const narrator = new Narrator(audio);
  let page, stage, heroStage, film, activeId = null;

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("show"), 3200);
  }

  function staticPath(path) {
    if (path === "/api/nav") return "data/nav.json";
    if (path === "/api/pages") return "data/pages.json";
    const m = path.match(/^\/api\/pages\/([\w-]+)$/);
    return m ? `data/pages/${m[1]}.json` : null;
  }

  async function get(path) {
    const sp = STATIC_CONTENT ? staticPath(path) : null;
    const r = await fetch(sp || API + path);
    if (!r.ok) throw new Error(`${r.status} ${path}`);
    return r.json();
  }

  /* ---------------- nav */
  async function renderNav() {
    const nav = await get("/api/nav");
    $("#navlinks").innerHTML = nav
      .map((n) => `<li><a class="navlink" href="${n.href}" ${n.slug === slug ? 'aria-current="page"' : ""}>${esc(n.label)}</a></li>`)
      .join("");
    return nav;
  }

  /* ---------------- hero */
  function renderHero() {
    $("#hero").innerHTML = `
      <canvas id="heroCanvas" aria-hidden="true"></canvas>
      <div class="hero-copy">
        ${page.title_ur ? `<p class="hero-ur" lang="ur">${esc(page.title_ur)}</p>` : ""}
        <h1 class="${page.title.length > 12 ? "long" : ""}">${esc(page.title)}</h1>
        <p class="sub">${esc(page.subtitle)}</p>
        ${page.film ? `<button class="btn" id="watch">Watch the film</button>` : ""}
        <button class="btn ghost" id="begin">Read the journey with sound</button>
        ${page.note ? `<p class="note">${esc(page.note)}</p>` : ""}
      </div>`;
    heroStage = new Stage($("#heroCanvas"), page.hero_scene, () => audio.level());
    $("#begin").onclick = async () => { await startAmbience(); $("#journey").scrollIntoView(); };
    if (page.film) $("#watch").onclick = () => { $("#film").scrollIntoView(); film.play(0); };
  }

  /* ---------------- chapters */
  function chapterHTML(ch, i) {
    const cards = ch.cards
      ? `<ul class="tiles">${ch.cards.map((c, k) => `<li><button class="tile" data-say="${esc(c.title + ". " + c.text)}" data-k="${k}"><strong>${esc(c.title)}</strong><span>${esc(c.text)}</span></button></li>`).join("")}</ul>`
      : "";
    const verses = (ch.verses || [])
      .map((v, k) => `
        <figure class="verse" data-v="${k}">
          <p class="ur" lang="ur">${esc(v.ur)}</p>
          <p class="roman">${esc(v.roman)}</p>
          <p class="en">${esc(v.en)}</p>
          ${v.credit ? `<p class="credit">${esc(v.credit)}</p>` : ""}
          <button class="small-btn recite" data-ch="${ch.id}" data-v="${k}">Recite</button>
        </figure>`)
      .join("");
    const breath = ch.interactive === "breath"
      ? `<button class="small-btn" id="pulseBtn" aria-pressed="false">Play dhikr pulse</button>` : "";
    return `
      <article class="chapter" id="ch-${ch.id}" data-scene="${ch.scene}" data-id="${ch.id}" aria-labelledby="h-${ch.id}">
        <div class="num">${i + 1} of ${page.chapters.length}</div>
        <h2 id="h-${ch.id}">${esc(ch.title)}</h2>
        <div class="listen">
          <button class="small-btn listenBtn" data-ch="${ch.id}">Listen to this chapter</button>
          ${breath}
        </div>
        ${ch.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        ${verses}
        ${cards}
        ${ch.genz ? `<aside class="genz"><b>For Gen Z</b>${esc(ch.genz)}</aside>` : ""}
      </article>`;
  }

  function renderJourney() {
    $("#chapters").innerHTML = page.chapters.map(chapterHTML).join("");
    $("#rail").innerHTML = page.chapters.map((c) => `<a href="#ch-${c.id}" aria-label="${esc(c.title)}" data-id="${c.id}"></a>`).join("");
    stage = new Stage($("#stageCanvas"), page.chapters[0].scene, () => audio.level());

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && activate(e.target.dataset.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document.querySelectorAll(".chapter").forEach((el) => io.observe(el));

    $("#chapters").addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (tile) {
        tile.parentElement.parentElement.querySelectorAll(".tile").forEach((t) => t.classList.remove("lit"));
        tile.classList.add("lit");
        audio.bell();
        if (narrator.supported) { narrator.cancel(); narrator.speak(tile.dataset.say); }
        return;
      }
      const lb = e.target.closest(".listenBtn");
      if (lb) return narrateChapter(lb.dataset.ch);
      const rb = e.target.closest(".recite");
      if (rb) return recite(rb.dataset.ch, +rb.dataset.v, rb.closest(".verse"));
      if (e.target.id === "pulseBtn") {
        const on = e.target.getAttribute("aria-pressed") !== "true";
        e.target.setAttribute("aria-pressed", on);
        e.target.textContent = on ? "Stop dhikr pulse" : "Play dhikr pulse";
        audio.setPulse(on);
        syncAmbienceBtn();
      }
    });
  }

  function activate(id) {
    if (id === activeId) return;
    activeId = id;
    const ch = page.chapters.find((c) => c.id === id);
    document.querySelectorAll(".chapter").forEach((el) => el.classList.toggle("active", el.dataset.id === id));
    document.querySelectorAll("#rail a").forEach((a) => a.classList.toggle("on", a.dataset.id === id));
    stage.set(ch.scene);
    $("#stageCaption").textContent = ch.title;
    audio.bell();
  }

  /* ---------------- narration */
  function requireSpeech() {
    if (narrator.supported) return true;
    toast("This browser has no speech engine. Try Chrome, Edge or Safari.");
    return false;
  }

  function narrateChapter(id) {
    if (!requireSpeech()) return;
    film && film.playing && film.pause();
    const ch = page.chapters.find((c) => c.id === id);
    const el = $(`#ch-${id}`);
    narrator.cancel();
    el.scrollIntoView({ block: "center" });
    narrator.speak(ch.narration || ch.body.join(" "), {
      onstart: () => el.classList.add("speaking"),
      onend: () => el.classList.remove("speaking"),
    });
  }

  function narrateAll() {
    if (!requireSpeech()) return;
    film && film.playing && film.pause();
    const items = page.chapters.map((c) => ({ id: c.id, text: c.narration || c.body.join(" ") }));
    items.unshift({ id: null, text: `${page.title}. ${page.subtitle}` });
    narrator.speakAll(items, {
      before: (it) => {
        if (!it.id) return;
        const el = $(`#ch-${it.id}`);
        el.scrollIntoView({ block: "center" });
        el.classList.add("speaking");
      },
      after: (it) => it.id && $(`#ch-${it.id}`).classList.remove("speaking"),
    });
  }

  function recite(chId, k, fig) {
    if (!requireSpeech()) return;
    const v = page.chapters.find((c) => c.id === chId).verses[k];
    narrator.cancel();
    const hasUrdu = !!narrator.urduVoice();
    const run = async () => {
      fig.classList.add("speaking");
      if (hasUrdu) await narrator.speak(v.ur, { lang: "ur" });
      else toast("No Urdu voice installed. Reading the meaning in English.");
      await narrator.speak(v.en);
      fig.classList.remove("speaking");
    };
    run();
  }

  /* ---------------- audio bar */
  async function startAmbience() {
    audio.setMode(page.ambience);
    await audio.start();
    syncAmbienceBtn();
  }

  function syncAmbienceBtn() {
    const b = $("#ambBtn");
    b.setAttribute("aria-pressed", audio.playing);
    b.textContent = audio.playing ? "Pause ambience" : "Play ambience";
  }

  function wireAudioBar() {
    audio.setMode(page.ambience);
    $("#ambBtn").onclick = async () => {
      if (audio.playing) {
        audio.stop();
        audio.pulseOn = false;
        const pb = $("#pulseBtn");
        if (pb) { pb.setAttribute("aria-pressed", "false"); pb.textContent = "Play dhikr pulse"; }
      }
      else await startAmbience();
      syncAmbienceBtn();
    };
    $("#narrateAll").onclick = narrateAll;
    $("#optToggle").onclick = (e) => {
      const bar = e.target.closest(".audiobar");
      const open = bar.classList.toggle("open");
      e.target.setAttribute("aria-expanded", open);
    };
    $("#stopAll").onclick = () => { narrator.cancel(); document.querySelectorAll(".speaking").forEach((e) => e.classList.remove("speaking")); };
    $("#vol").oninput = (e) => audio.setVolume(+e.target.value);
    $("#rate").oninput = (e) => { narrator.rate = +e.target.value; };

    const sel = $("#voice");
    const fill = () => {
      const vs = narrator.englishVoices();
      sel.innerHTML = vs.length
        ? vs.map((v, i) => `<option value="${i}">${esc(v.name)} (${esc(v.lang)})</option>`).join("")
        : `<option>Default voice</option>`;
      const pref = vs.findIndex((v) => /en-(IN|PK|GB)/i.test(v.lang));
      if (pref >= 0) { sel.value = pref; narrator.voice = vs[pref]; } else if (vs[0]) narrator.voice = vs[0];
    };
    narrator.onvoices = fill;
    fill();
    sel.onchange = () => { narrator.voice = narrator.englishVoices()[+sel.value] || null; };
    narrator.onstate = (s) => { $("#status").textContent = s === "speaking" ? "Narrating" : ""; };

    // little live meter
    const m = $("#meter"), mc = m.getContext("2d");
    (function draw() {
      requestAnimationFrame(draw);
      const lv = audio.level();
      mc.clearRect(0, 0, 60, 22);
      for (let i = 0; i < 6; i++) {
        const hgt = 3 + Math.abs(Math.sin(performance.now() / 300 + i)) * lv * 60;
        mc.fillStyle = i % 2 ? "#5cc8bd" : "#e3a72f";
        mc.fillRect(i * 10 + 2, 22 - Math.min(20, hgt), 6, Math.min(20, hgt));
      }
    })();
  }

  /* ---------------- reflections */
  const localKey = `sufi-reflections:${slug}`;
  function localRows() {
    try { return JSON.parse(localStorage.getItem(localKey) || "[]"); } catch { return []; }
  }

  async function loadWall() {
    try {
      const rows = LOCAL_REFLECTIONS ? localRows() : await get(`/api/reflections/${slug}`);
      $("#wall").innerHTML = rows.length
        ? rows.map((r) => `<li><div>${esc(r.text)}</div><div class="who">${esc(r.name)}, ${new Date(r.created_at).toLocaleDateString()}</div></li>`).join("")
        : `<li class="empty">No reflections yet. Be the first to write what this page meant to you.</li>`;
    } catch {
      $("#wall").innerHTML = `<li class="empty">Reflections could not load. Check that the backend is running.</li>`;
    }
  }

  function wireForm() {
    $("#reflectForm").onsubmit = async (e) => {
      e.preventDefault();
      const msg = $("#formMsg");
      const body = { name: $("#rName").value.trim() || "Anonymous seeker", text: $("#rText").value.trim() };
      if (body.text.length < 3) { msg.className = "form-msg err"; msg.textContent = "Write at least 3 characters."; return; }
      try {
        if (LOCAL_REFLECTIONS) {
          const rows = localRows();
          rows.unshift({ ...body, created_at: new Date().toISOString() });
          localStorage.setItem(localKey, JSON.stringify(rows.slice(0, 50)));
        } else {
          const r = await fetch(`${API}/api/reflections/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
          if (!r.ok) throw new Error();
        }
        msg.className = "form-msg";
        msg.textContent = LOCAL_REFLECTIONS ? "Saved in this browser. Connect the backend to share reflections with everyone." : "Reflection shared.";
        $("#rText").value = "";
        audio.bell();
        loadWall();
      } catch {
        msg.className = "form-msg err"; msg.textContent = "Could not share. Check that the backend is running.";
      }
    };
  }

  function renderNext(nav) {
    get("/api/pages").then((pages) => {
      $("#next").innerHTML = nav
        .filter((n) => n.slug !== slug)
        .map((n) => {
          const p = pages.find((x) => x.slug === n.slug);
          return `<a href="${n.href}"><strong>${esc(n.label)}</strong><span>${esc(p ? p.subtitle : "")}</span></a>`;
        })
        .join("");
    });
  }

  /* ---------------- boot */
  (async function boot() {
    try {
      const nav = await renderNav();
      page = await get(`/api/pages/${slug}`);
      document.title = `${page.title} | Sufi Journey`;
      $("#loading").remove();
      renderHero();
      if (page.film) {
        film = new Film($("#film"), page.film, { audio, narrator, ambience: page.ambience });
        film.onsound = syncAmbienceBtn;
      } else $("#film").remove();
      renderJourney();
      wireAudioBar();
      wireForm();
      loadWall();
      renderNext(nav);
    } catch (err) {
      $("#loading").textContent = "Content could not load. Start the backend with: uvicorn main:app --reload (inside the backend folder), then open http://localhost:8000";
      console.error(err);
    }
  })();
})();
