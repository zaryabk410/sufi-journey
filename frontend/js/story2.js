/* Scenes for the Ishq and Kainaat (universe) pages. Registers into window.SUFI_SCENES. */
(function () {
  const { C, TAU, rgba, rand, glow, star8 } = window.SUFI_DRAW;
  const S = window.SUFI_SCENES;
  const person = window.SUFI_PERSON;
  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));

  function sky(ctx, w, h, top, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function stars(ctx, w, h, t, n = 120, maxY = 1) {
    for (let i = 0; i < n; i++) {
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.6 + i * 1.3));
      ctx.fillStyle = rgba(i % 7 ? C.sand : C.tileSoft, 0.12 + tw * 0.5);
      ctx.fillRect(rand(i + 300) * w, rand(i + 700) * h * maxY, 1.5, 1.5);
    }
  }
  function bird(ctx, x, y, s, flap, color = C.sand) {
    const f = Math.sin(flap) * s * 0.6;
    ctx.strokeStyle = color; ctx.lineWidth = Math.max(1.2, s * 0.18); ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x - s, y - f); ctx.quadraticCurveTo(x - s * 0.4, y - s * 0.3, x, y); ctx.quadraticCurveTo(x + s * 0.4, y - s * 0.3, x + s, y - f); ctx.stroke();
  }
  function label(ctx, text, x, y, size, color = C.sand, align = "center") {
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = "middle";
    ctx.font = `${Math.round(size)}px Amiri, serif`; ctx.fillText(text, x, y);
  }

  /* ================================================ ISHQ */

  // Two lights: the servant walks, the Beloved runs
  S.approach = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#0e2233");
    stars(ctx, w, h, t, 70, 0.5);
    const s = Math.min(w, h), y = h * 0.6, cyc = 9, p = (t % cyc) / cyc;
    ctx.strokeStyle = rgba(C.sand, 0.15); ctx.lineWidth = 2; ctx.setLineDash([4, 10]);
    ctx.beginPath(); ctx.moveTo(w * 0.08, y); ctx.lineTo(w * 0.92, y); ctx.stroke(); ctx.setLineDash([]);
    const meet = 0.62;
    const a = Math.min(p / meet, 1);
    const xs = w * 0.1 + w * 0.12 * a;           // a few slow steps
    const xb = w * 0.9 - (w * 0.9 - w * 0.22) * ease(a); // He runs the rest of the way
    if (p < meet) {
      glow(ctx, xs, y, s * 0.06, C.tileSoft, 1);
      ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(xs, y, s * 0.012, 0, TAU); ctx.fill();
      glow(ctx, xb, y, s * 0.22, C.gold, 1);
      star8(ctx, xb, y, s * 0.03, t); ctx.fillStyle = C.gold; ctx.fill();
      for (let k = 1; k < 6; k++) glow(ctx, xb + k * s * 0.03, y, s * 0.05, C.gold, 0.25 / k * 3);
    } else {
      const q = (p - meet) / (1 - meet);
      glow(ctx, w * 0.22, y, s * (0.25 + q * 0.5), C.gold, 1 - q * 0.4);
      for (let k = 0; k < 24; k++) {
        const ang = (k / 24) * TAU, r = s * q * 0.4;
        ctx.fillStyle = rgba(C.gold, 1 - q); ctx.beginPath(); ctx.arc(w * 0.22 + Math.cos(ang) * r, y + Math.sin(ang) * r, 2.5, 0, TAU); ctx.fill();
      }
    }
    label(ctx, "a step", w * 0.1, y + s * 0.08, s * 0.035, rgba(C.tileSoft, 0.8));
    if (p < meet) label(ctx, "running", xb, y + s * 0.08, s * 0.035, rgba(C.gold, 0.9));
  };

  // Mercy falling like rain on dry earth that turns green
  S.mercyrain = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0e2233", "#1d3a4f");
    const s = Math.min(w, h), base = h * 0.78, p = ease(t / 9);
    glow(ctx, w / 2, 0, s * 0.6, C.gold, 0.6);
    for (let i = 0; i < 160; i++) {
      const x = rand(i) * w, y = ((rand(i + 1) * h) + t * (120 + rand(i + 2) * 120)) % base;
      ctx.fillStyle = rgba(i % 9 ? C.tileSoft : C.gold, 0.55); ctx.fillRect(x, y, 1.5, 7);
    }
    ctx.fillStyle = `rgb(${Math.round(90 - 60 * p)},${Math.round(60 + 60 * p)},${Math.round(40 + 30 * p)})`;
    ctx.fillRect(0, base, w, h - base);
    for (let i = 0; i < 50; i++) {
      const x = rand(i + 9) * w, gh = s * 0.06 * p * (0.4 + rand(i + 4));
      ctx.strokeStyle = rgba(C.tileSoft, 0.9); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, base); ctx.quadraticCurveTo(x + 4, base - gh / 2, x + Math.sin(t + i) * 4, base - gh); ctx.stroke();
      if (p > 0.6 && i % 4 === 0) { ctx.fillStyle = i % 8 ? C.gold : C.henna; ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 4, base - gh, 3, 0, TAU); ctx.fill(); }
    }
    // a mother holding a child, the hadith's image
    person(ctx, w * 0.75, base, s * 0.24, { pose: "stand", hat: "scarf", hatColor: C.henna, color: C.sand });
    ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(w * 0.75 + s * 0.04, base - s * 0.15, s * 0.025, 0, TAU); ctx.fill();
  };

  // Majnun at the walls of Layla's house; the love rises past the walls
  S.layla = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#1d3a4f");
    stars(ctx, w, h, t, 60, 0.45);
    const s = Math.min(w, h), base = h * 0.82;
    ctx.fillStyle = "#050d14"; ctx.fillRect(0, base, w, h - base);
    // the house with brick wall
    const hx = w * 0.42, hw = w * 0.36, top = base - s * 0.38;
    ctx.fillStyle = "#3a2a1e"; ctx.fillRect(hx, top, hw, base - top);
    ctx.strokeStyle = rgba(C.ink, 0.6); ctx.lineWidth = 1;
    for (let r = 0; r < 10; r++) for (let c = 0; c < 12; c++) {
      const bx = hx + c * (hw / 12) + (r % 2 ? hw / 24 : 0), by = top + r * ((base - top) / 10);
      if (bx < hx + hw - 4) ctx.strokeRect(bx, by, hw / 12, (base - top) / 10);
    }
    ctx.fillStyle = rgba(C.gold, 0.8); ctx.fillRect(hx + hw * 0.4, top + s * 0.08, hw * 0.15, s * 0.08);
    // Majnun moves along the wall, touching it
    const mx = hx - s * 0.06 + ((t * 0.04) % 1) * (hw * 0.4);
    person(ctx, Math.min(mx, hx + hw * 0.3), base, s * 0.22, { pose: "raise", color: C.sand });
    // the light rises away from the house to the sky
    const p = ease((t - 3) / 6);
    const ly = top - p * h * 0.55;
    glow(ctx, hx + hw * 0.47, ly, s * (0.08 + p * 0.25), C.gold, 0.5 + p * 0.5);
    if (p > 0.95) { star8(ctx, hx + hw * 0.47, ly, s * 0.04, t * 0.2); ctx.fillStyle = C.gold; ctx.fill(); }
  };

  // Rumi's reed flute, cut from the reed bed, singing of separation
  S.reed = function (ctx, w, h, t, env) {
    sky(ctx, w, h, "#0b1c2c", "#143049");
    const s = Math.min(w, h);
    // distant reed bed
    for (let i = 0; i < 40; i++) {
      const x = w * 0.04 + i * (w * 0.006), sway = Math.sin(t * 1.2 + i * 0.4) * 6;
      ctx.strokeStyle = rgba(C.tile, 0.6); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, h * 0.85); ctx.quadraticCurveTo(x + sway / 2, h * 0.65, x + sway, h * (0.45 + rand(i) * 0.1)); ctx.stroke();
    }
    ctx.fillStyle = "#081520"; ctx.fillRect(0, h * 0.85, w, h * 0.15);
    // the gap of separation
    ctx.strokeStyle = rgba(C.sand, 0.2); ctx.setLineDash([3, 9]);
    ctx.beginPath(); ctx.moveTo(w * 0.3, h * 0.55); ctx.lineTo(w * 0.42, h * 0.5); ctx.stroke(); ctx.setLineDash([]);
    // the ney
    const nx = w * 0.45, ny = h * 0.5, nl = w * 0.38;
    ctx.save(); ctx.translate(nx, ny); ctx.rotate(-0.12);
    ctx.fillStyle = "#c9a96b"; ctx.fillRect(0, -s * 0.014, nl, s * 0.028);
    ctx.fillStyle = "#8a6a3a"; for (let k = 0; k < 4; k++) ctx.fillRect(nl * (0.2 + k * 0.2), -s * 0.014, 3, s * 0.028);
    ctx.fillStyle = C.ink; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(nl * (0.45 + k * 0.08), -s * 0.004, s * 0.005, 0, TAU); ctx.fill(); }
    // song pouring out of the far end
    for (let k = 0; k < 6; k++) {
      const p = ((t * 0.35 + k / 6) % 1);
      ctx.strokeStyle = rgba(C.gold, (1 - p) * (0.5 + env.level)); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(nl, 0, s * (0.03 + p * 0.3), -0.7, 0.7); ctx.stroke();
    }
    ctx.restore();
  };

  // The birds gather because they want a king
  S.birds = function (ctx, w, h, t) {
    sky(ctx, w, h, "#2a4d63", "#e3a72f");
    const s = Math.min(w, h), base = h * 0.8;
    ctx.fillStyle = "#1c2a2f"; ctx.fillRect(0, base, w, h - base);
    const cx = w * 0.5, cy = base - s * 0.04;
    for (let i = 0; i < 60; i++) {
      const sx = rand(i) < 0.5 ? -40 : w + 40, sy = rand(i + 1) * h * 0.6;
      const tx = cx + (rand(i + 2) - 0.5) * w * 0.6, ty = cy - rand(i + 3) * s * 0.05;
      const p = ease(t / 6 - rand(i + 4) * 0.5);
      const x = sx + (tx - sx) * p, y = sy + (ty - sy) * p - Math.sin(p * Math.PI) * s * 0.15;
      bird(ctx, x, y, s * (p >= 1 ? 0.012 : 0.018), p >= 1 ? 0 : t * 12 + i, rgba(C.ink, 0.9));
    }
    // the hoopoe in the middle, crest raised
    hoopoe(ctx, cx, cy - s * 0.02, s * 0.07, t);
  };
  function hoopoe(ctx, x, y, s, t) {
    ctx.fillStyle = "#c9773e";
    ctx.beginPath(); ctx.ellipse(x, y, s * 0.8, s * 0.45, -0.1, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(x + s * 0.7, y - s * 0.4, s * 0.32, 0, TAU); ctx.fill();
    ctx.fillStyle = C.ink; for (let k = 0; k < 4; k++) ctx.fillRect(x - s * 0.5 + k * s * 0.25, y - s * 0.2, s * 0.1, s * 0.4);
    ctx.strokeStyle = C.ink; ctx.lineWidth = s * 0.08; ctx.beginPath(); ctx.moveTo(x + s * 0.95, y - s * 0.4); ctx.lineTo(x + s * 1.5, y - s * 0.25); ctx.stroke();
    const fan = 0.6 + Math.sin(t * 2) * 0.3;
    for (let k = 0; k < 6; k++) {
      const a = -Math.PI / 2 - fan + (k / 5) * fan * 1.4;
      ctx.strokeStyle = k % 2 ? C.gold : "#c9773e"; ctx.lineWidth = s * 0.1;
      ctx.beginPath(); ctx.moveTo(x + s * 0.6, y - s * 0.6); ctx.lineTo(x + s * 0.6 + Math.cos(a) * s * 0.7, y - s * 0.6 + Math.sin(a) * s * 0.7); ctx.stroke();
    }
    glow(ctx, x, y, s * 2, C.gold, 0.4);
  }

  // The hoopoe speaks of the Simurgh beyond Mount Qaf
  S.hoopoe = function (ctx, w, h, t) {
    sky(ctx, w, h, "#123047", "#e3a72f");
    const s = Math.min(w, h), base = h * 0.82;
    ctx.fillStyle = "#24343e"; ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.18); ctx.lineTo(w * 0.85, base); ctx.lineTo(w * 0.15, base); ctx.fill();
    glow(ctx, w * 0.5, h * 0.18, s * 0.3, C.gold, 0.8 + Math.sin(t) * 0.2);
    label(ctx, "Qaf", w * 0.5, h * 0.3, s * 0.04, rgba(C.sand, 0.7));
    ctx.fillStyle = "#1c2a2f"; ctx.fillRect(0, base, w, h - base);
    ctx.fillStyle = "#3a2a1e"; ctx.beginPath(); ctx.ellipse(w * 0.22, base, s * 0.16, s * 0.07, 0, Math.PI, TAU); ctx.fill();
    hoopoe(ctx, w * 0.2, base - s * 0.1, s * 0.09, t);
    for (let i = 0; i < 12; i++) bird(ctx, w * (0.4 + (i % 6) * 0.08), base - s * 0.015 - Math.floor(i / 6) * s * 0.03, s * 0.014, 0, C.ink);
  };

  // The seven valleys; the flock thins as it flies
  const VALLEYS = ["Talab, the Quest", "Ishq, Love", "Ma'rifat, Knowledge", "Istighna, Detachment", "Tawheed, Unity", "Hairat, Bewilderment", "Faqr and Fana, Passing Away"];
  S.valleys = function (ctx, w, h, t) {
    const v = Math.min(6, Math.floor(t / 2.4));
    const tones = [["#2a4d63", "#8fb5a8"], ["#3a1a12", "#b5482c"], ["#123047", "#5cc8bd"], ["#1d2a33", "#7a8a94"], ["#0e2233", "#e3a72f"], ["#071520", "#2a9d8f"], ["#000000", "#143049"]];
    sky(ctx, w, h, tones[v][0], tones[v][1]);
    const s = Math.min(w, h);
    for (let k = 0; k < 3; k++) {
      ctx.fillStyle = rgba(C.ink, 0.35 + k * 0.2); ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 10) ctx.lineTo(x, h * (0.6 + k * 0.1) + Math.sin((x + t * 60 * (k + 1)) * 0.006 + k) * s * 0.06);
      ctx.lineTo(w, h); ctx.fill();
    }
    const n = Math.max(30, Math.round(90 - t * 4));
    for (let i = 0; i < n; i++) {
      const row = Math.floor(Math.sqrt(i)), col = i - row * row;
      const x = w * 0.6 - row * s * 0.03 + Math.sin(t + i) * 3, y = h * 0.5 + (col - row) * s * 0.025 + Math.cos(t * 1.3 + i) * 3;
      bird(ctx, x, y, s * 0.012, t * 10 + i, rgba(C.sand, 0.9));
    }
    label(ctx, VALLEYS[v], w / 2, h * 0.12, s * 0.06, C.sand);
    label(ctx, `Valley ${v + 1} of 7`, w / 2, h * 0.19, s * 0.03, rgba(C.sand, 0.65));
  };

  // Fire: the valley of love, and Ibrahim's fire turning cool
  S.firevalley = function (ctx, w, h, t) {
    const cool = ease((t - 4) / 4);
    sky(ctx, w, h, "#1a0a06", cool > 0.5 ? "#2a4d63" : "#5e2c1a");
    const s = Math.min(w, h), base = h * 0.84;
    ctx.fillStyle = "#120806"; ctx.fillRect(0, base, w, h - base);
    for (let i = 0; i < 26; i++) {
      const x = (i + 0.5) * (w / 26), fh = s * (0.15 + rand(i) * 0.2) * (1 - cool * 0.7) * (0.85 + 0.15 * Math.sin(t * 8 + i));
      if (cool < 0.95) {
        glow(ctx, x, base - fh * 0.4, fh * 0.8, C.henna, 0.6 * (1 - cool));
        ctx.fillStyle = rgba(i % 3 ? C.henna : C.gold, 1 - cool);
        ctx.beginPath(); ctx.moveTo(x - s * 0.03, base); ctx.quadraticCurveTo(x - s * 0.03, base - fh * 0.5, x + Math.sin(t * 6 + i) * 8, base - fh); ctx.quadraticCurveTo(x + s * 0.03, base - fh * 0.5, x + s * 0.03, base); ctx.fill();
      }
      if (cool > 0) {
        ctx.strokeStyle = rgba(C.tileSoft, cool); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, base); ctx.quadraticCurveTo(x + 6, base - s * 0.05 * cool, x, base - s * 0.1 * cool); ctx.stroke();
        ctx.fillStyle = rgba(i % 2 ? C.gold : "#f4c6c0", cool); ctx.beginPath(); ctx.arc(x, base - s * 0.1 * cool, 4, 0, TAU); ctx.fill();
      }
    }
    const x = Math.min(w * 0.5, w * 0.12 + t * w * 0.08);
    person(ctx, x, base, s * 0.24, { pose: x < w * 0.5 ? "walk" : "stand", phase: t * 4, color: C.sand, hat: "turban" });
  };

  // The lake at the Simurgh's court: thirty birds see themselves
  S.lake = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0e2233", "#e3a72f");
    const s = Math.min(w, h), shore = h * 0.55, p = ease((t - 1) / 4);
    glow(ctx, w / 2, shore - s * 0.1, s * 0.5, C.gold, 0.9);
    ctx.fillStyle = "#24343e"; ctx.beginPath(); ctx.moveTo(w * 0.1, shore); ctx.lineTo(w * 0.35, h * 0.2); ctx.lineTo(w * 0.5, shore); ctx.lineTo(w * 0.65, h * 0.25); ctx.lineTo(w * 0.9, shore); ctx.fill();
    const g = ctx.createLinearGradient(0, shore, 0, h);
    g.addColorStop(0, "#c9a96b"); g.addColorStop(1, "#0e2233");
    ctx.fillStyle = g; ctx.fillRect(0, shore, w, h - shore);
    for (let i = 0; i < 30; i++) {
      const x = w * 0.2 + (i % 15) * (w * 0.04), y = shore - s * 0.01 - Math.floor(i / 15) * s * 0.025;
      bird(ctx, x, y, s * 0.014, 0, C.sand);
      bird(ctx, x, shore + (shore - y) + Math.sin(t * 2 + i) * 1.5, s * 0.012, Math.PI, rgba(C.gold, 0.4 + p * 0.6));
    }
    if (p > 0) {
      glow(ctx, w / 2, shore + s * 0.15, s * 0.3 * p, C.gold, p);
      label(ctx, "سی مرغ", w / 2, shore + s * 0.22, s * 0.07, rgba(C.ink, p));
      label(ctx, "si murgh: thirty birds", w / 2, shore + s * 0.31, s * 0.035, rgba(C.ink, p));
    }
  };

  /* ================================================ KAINAAT */

  // A hidden treasure, then light bursts into creation
  S.genesis = function (ctx, w, h, t) {
    ctx.fillStyle = "#020609"; ctx.fillRect(0, 0, w, h);
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    if (t < 2) { glow(ctx, cx, cy, s * 0.03 * (t / 2), C.gold, 1); return; }
    const p = ease((t - 2) / 6);
    glow(ctx, cx, cy, s * (0.1 + p * 0.5), C.gold, 1 - p * 0.6);
    for (let i = 0; i < 400; i++) {
      const a = rand(i) * TAU + p * rand(i + 1) * 2, r = Math.pow(rand(i + 2), 0.6) * s * 0.6 * p;
      ctx.fillStyle = rgba([C.gold, C.sand, C.tileSoft][i % 3], 0.8 * (1 - p * 0.3));
      ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 2);
    }
  };

  // Light upon light: the niche, the lamp, the glass, the olive tree
  S.niche = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#0e2233");
    const s = Math.min(w, h), cx = w / 2, base = h * 0.85, nw = s * 0.32, top = h * 0.15;
    ctx.fillStyle = "#0b1a24";
    ctx.beginPath(); ctx.moveTo(cx - nw, base); ctx.lineTo(cx - nw, top + nw); ctx.arc(cx, top + nw, nw, Math.PI, TAU); ctx.lineTo(cx + nw, base); ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
    const ly = h * 0.55, pulse = 1 + Math.sin(t * 1.5) * 0.05;
    for (let k = 4; k > 0; k--) glow(ctx, cx, ly, s * 0.12 * k * pulse, C.gold, 0.45);
    ctx.strokeStyle = rgba(C.sand, 0.8); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, ly, s * 0.07, s * 0.09, 0, 0, TAU); ctx.stroke();
    ctx.fillStyle = "#fff4d6"; ctx.beginPath(); ctx.moveTo(cx - s * 0.015, ly + s * 0.02); ctx.quadraticCurveTo(cx, ly - s * 0.08, cx + s * 0.015, ly + s * 0.02); ctx.fill();
    ctx.strokeStyle = rgba(C.sand, 0.6); ctx.beginPath(); ctx.moveTo(cx, ly - s * 0.09); ctx.lineTo(cx, top + nw * 0.6); ctx.stroke();
    // olive branch, neither of the east nor the west
    ctx.strokeStyle = "#5a7a4a"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx + nw + s * 0.05, base); ctx.quadraticCurveTo(cx + nw + s * 0.12, h * 0.5, cx + nw + s * 0.02, h * 0.3); ctx.stroke();
    for (let k = 0; k < 8; k++) { ctx.fillStyle = "#7d9c5f"; ctx.beginPath(); ctx.ellipse(cx + nw + s * 0.08 - k * 4, h * (0.75 - k * 0.055), s * 0.025, s * 0.01, k % 2 ? 0.6 : -0.6, 0, TAU); ctx.fill(); }
    label(ctx, "نُورٌ عَلَىٰ نُورٍ", cx, h * 0.1, s * 0.05, C.gold);
  };

  // A spiral galaxy turning
  S.galaxy = function (ctx, w, h, t) {
    ctx.fillStyle = "#03080d"; ctx.fillRect(0, 0, w, h);
    stars(ctx, w, h, t, 160);
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    glow(ctx, cx, cy, s * 0.25, C.gold, 1);
    for (let i = 0; i < 900; i++) {
      const arm = i % 3, r = Math.pow(rand(i), 0.7) * s * 0.45;
      const a = (arm / 3) * TAU + r * 0.018 + t * 0.12 * (1 - r / (s * 0.6)) + (rand(i + 1) - 0.5) * 0.5;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.55;
      ctx.fillStyle = rgba(r < s * 0.1 ? C.gold : i % 4 ? C.sand : C.tileSoft, 0.35 + rand(i + 2) * 0.5);
      ctx.fillRect(x, y, 1.6, 1.6);
    }
  };

  // Planets orbiting their sun, counterclockwise
  S.orbits = function (ctx, w, h, t) {
    ctx.fillStyle = "#03080d"; ctx.fillRect(0, 0, w, h);
    stars(ctx, w, h, t, 100);
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    glow(ctx, cx, cy, s * 0.18, C.gold, 1);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(cx, cy, s * 0.04, 0, TAU); ctx.fill();
    const cols = ["#b9b19f", "#e3a72f", "#5cc8bd", "#b5482c", "#d9c9a8", "#c9a96b"];
    for (let i = 0; i < 6; i++) {
      const R = s * (0.09 + i * 0.065), sp = 1.4 / Math.pow(i + 1, 1.2);
      ctx.strokeStyle = rgba(C.sand, 0.15); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.45, 0, 0, TAU); ctx.stroke();
      const a = -t * sp + i * 1.3; // negative angle: counterclockwise on screen
      ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.45, s * (0.008 + (i % 3) * 0.004), 0, TAU); ctx.fill();
    }
    label(ctx, "counterclockwise", cx, h * 0.92, s * 0.035, rgba(C.sand, 0.6));
  };

  // Tawaf around the Kaaba, seen from above
  S.tawaf = function (ctx, w, h, t) {
    sky(ctx, w, h, "#d9cdb4", "#c8baa0");
    const s = Math.min(w, h), cx = w / 2, cy = h / 2, k = s * 0.08;
    for (let ring = 0; ring < 6; ring++) {
      const R = s * (0.14 + ring * 0.05), n = 40 + ring * 18;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU - t * (0.25 - ring * 0.025) + rand(i + ring * 100) * 0.1;
        ctx.fillStyle = rgba(i % 5 ? "#ffffff" : C.ink, 0.85);
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, s * 0.006, 0, TAU); ctx.fill();
      }
    }
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.15);
    ctx.fillStyle = "#0b0b0b"; ctx.fillRect(-k, -k * 0.85, k * 2, k * 1.7);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.strokeRect(-k + 4, -k * 0.85 + 4, k * 2 - 8, k * 1.7 - 8);
    ctx.restore();
    label(ctx, "counterclockwise", cx, h * 0.93, s * 0.035, rgba(C.ink, 0.7));
  };

  // An atom: everything down to the smallest is turning
  S.atom = function (ctx, w, h, t) {
    ctx.fillStyle = "#03080d"; ctx.fillRect(0, 0, w, h);
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    glow(ctx, cx, cy, s * 0.12, C.henna, 1);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? C.henna : C.sand; ctx.beginPath(); ctx.arc(cx + (rand(i) - 0.5) * s * 0.05, cy + (rand(i + 1) - 0.5) * s * 0.05, s * 0.014, 0, TAU); ctx.fill(); }
    for (let k = 0; k < 3; k++) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate((k * Math.PI) / 3 + t * 0.1);
      ctx.strokeStyle = rgba(C.tileSoft, 0.5); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.36, s * 0.11, 0, 0, TAU); ctx.stroke();
      const a = -t * (2 + k * 0.6);
      glow(ctx, Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.11, s * 0.04, C.tileSoft, 1);
      ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.11, s * 0.01, 0, TAU); ctx.fill();
      ctx.restore();
    }
  };

  // The human as a small world: a galaxy where the heart is
  S.microcosm = function (ctx, w, h, t) {
    ctx.fillStyle = "#03080d"; ctx.fillRect(0, 0, w, h);
    stars(ctx, w, h, t, 200);
    const s = Math.min(w, h), cx = w / 2, base = h * 0.95;
    glow(ctx, cx, h * 0.5, s * 0.5, C.tile, 0.4);
    person(ctx, cx, base, s * 0.85, { pose: "stand", color: "#0d2230" });
    const hx = cx, hy = base - s * 0.85 * 0.62;
    glow(ctx, hx, hy, s * 0.12, C.gold, 1);
    for (let i = 0; i < 260; i++) {
      const r = Math.pow(rand(i), 0.7) * s * 0.07, a = (i % 2) * Math.PI + r * 0.15 + t * 0.5;
      ctx.fillStyle = rgba(i % 3 ? C.sand : C.gold, 0.7);
      ctx.fillRect(hx + Math.cos(a) * r, hy + Math.sin(a) * r * 0.6, 1.4, 1.4);
    }
  };

  // One sun, many mirrors
  S.mirrors = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#0e2233");
    const s = Math.min(w, h), sx = w / 2, sy = h * 0.16;
    glow(ctx, sx, sy, s * 0.25, C.gold, 1);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(sx, sy, s * 0.05, 0, TAU); ctx.fill();
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = Math.PI * (0.15 + (i / (n - 1)) * 0.7), R = s * 0.6;
      const x = sx + Math.cos(a) * R * 1.3, y = sy + Math.sin(a) * R;
      const on = 0.5 + 0.5 * Math.sin(t * 1.5 - i * 0.6);
      ctx.strokeStyle = rgba(C.gold, 0.12 + on * 0.25); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(x, y); ctx.stroke();
      ctx.save(); ctx.translate(x, y); ctx.rotate(a - Math.PI / 2);
      ctx.fillStyle = "#24343e"; ctx.fillRect(-s * 0.05, -s * 0.07, s * 0.1, s * 0.14);
      ctx.strokeStyle = C.sand; ctx.lineWidth = 2; ctx.strokeRect(-s * 0.05, -s * 0.07, s * 0.1, s * 0.14);
      glow(ctx, 0, 0, s * 0.05, C.gold, 0.6 + on * 0.4);
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, s * 0.012, 0, TAU); ctx.fill();
      ctx.restore();
    }
  };

  // Creation renewed every instant: every point flickers, the form remains
  S.renewal = function (ctx, w, h, t) {
    ctx.fillStyle = "#03080d"; ctx.fillRect(0, 0, w, h);
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    const frame = Math.floor(t * 12);
    for (let i = 0; i < 1400; i++) {
      const a = rand(i) * TAU, r = s * 0.35 * Math.abs(Math.cos(4 * a)) * Math.sqrt(rand(i + 1)) + s * 0.04;
      const alive = rand(i * 7 + frame) > 0.35;
      if (!alive) continue;
      ctx.fillStyle = rgba(i % 5 ? C.gold : C.tileSoft, 0.4 + rand(i + frame) * 0.6);
      ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.8, 1.8);
    }
    glow(ctx, cx, cy, s * 0.12, C.gold, 0.6);
  };

  // Four worlds from the physical to the divine
  S.worlds = function (ctx, w, h, t) {
    const bands = [
      { name: "Lahut", note: "the divine, beyond form", c: "#fff4d6" },
      { name: "Jabarut", note: "the world of power", c: C.gold },
      { name: "Malakut", note: "the angelic, unseen world", c: C.tileSoft },
      { name: "Nasut", note: "the human, physical world", c: C.tile },
    ];
    const s = Math.min(w, h), bh = h / 4;
    bands.forEach((b, i) => {
      const y = i * bh;
      ctx.fillStyle = rgba(b.c, 0.06 + (3 - i) * 0.0); ctx.fillRect(0, y, w, bh);
      ctx.strokeStyle = rgba(b.c, 0.3); ctx.beginPath(); ctx.moveTo(0, y + bh); ctx.lineTo(w, y + bh); ctx.stroke();
      label(ctx, b.name, w * 0.05, y + bh * 0.42, s * 0.05, b.c, "left");
      label(ctx, b.note, w * 0.05, y + bh * 0.7, s * 0.03, rgba(C.sand, 0.65), "left");
    });
    glow(ctx, w * 0.65, bh * 0.5, s * 0.25, C.gold, 1);
    for (let i = 0; i < 8; i++) { star8(ctx, w * (0.45 + i * 0.06), bh * 1.5 + Math.sin(t + i) * 8, s * 0.018, t * 0.3); ctx.fillStyle = rgba(C.gold, 0.7); ctx.fill(); }
    for (let i = 0; i < 30; i++) { ctx.fillStyle = rgba(C.tileSoft, 0.7); ctx.beginPath(); ctx.arc(w * (0.4 + rand(i) * 0.55), bh * 2 + rand(i + 1) * bh, 2 + Math.sin(t * 2 + i), 0, TAU); ctx.fill(); }
    for (let i = 0; i < 5; i++) person(ctx, w * (0.45 + i * 0.1), h - 6, bh * 0.6, { pose: "stand", color: rgba(C.sand, 0.6) });
    const p = (t % 10) / 10, y = h - bh * 0.5 - p * h * 0.85;
    glow(ctx, w * 0.65, y, s * 0.05, C.sand, 1);
    ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(w * 0.65, y, s * 0.01, 0, TAU); ctx.fill();
  };

  // Dervish turning inside a turning cosmos
  S.cosmicwhirl = function (ctx, w, h, t, env) {
    S.orbits(ctx, w, h, t);
    ctx.save(); ctx.globalAlpha *= 0.95; S.whirl(ctx, w, h, t, env); ctx.restore();
  };
})();
