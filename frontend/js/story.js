/* Story scenes used by the animated films. Registers into window.SUFI_SCENES.
   Every scene: (ctx, w, h, t, env). t restarts at 0 on each shot. */
(function () {
  const { C, TAU, rgba, rand, glow, star8 } = window.SUFI_DRAW;
  const S = window.SUFI_SCENES;
  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));

  /* ------------------------------------------------ helpers */
  function sky(ctx, w, h, top, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function stars(ctx, w, h, t, n = 70, maxY = 0.55) {
    for (let i = 0; i < n; i++) {
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.7 + i * 1.7));
      ctx.fillStyle = rgba(C.sand, 0.15 + tw * 0.5);
      ctx.fillRect(rand(i) * w, rand(i + 50) * h * maxY, 1.6, 1.6);
    }
  }
  function ground(ctx, w, h, y, color = C.ink) { ctx.fillStyle = color; ctx.fillRect(0, y, w, h - y); }

  /* A simple robed figure standing on (x, y). h is its height. */
  function person(ctx, x, y, h, o = {}) {
    const c = o.color || C.sand, pose = o.pose || "stand", ph = o.phase || 0;
    ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.lineWidth = h * 0.06;
    const hr = h * 0.085;
    let head;
    if (pose === "bow") {
      ctx.beginPath(); ctx.moveTo(-h * 0.13, 0); ctx.lineTo(-h * 0.05, -h * 0.5); ctx.lineTo(h * 0.05, -h * 0.5); ctx.lineTo(h * 0.07, 0); ctx.closePath(); ctx.fill();
      ctx.lineWidth = h * 0.13;
      ctx.beginPath(); ctx.moveTo(-h * 0.02, -h * 0.5); ctx.lineTo(h * 0.3, -h * 0.52); ctx.stroke();
      ctx.lineWidth = h * 0.05;
      ctx.beginPath(); ctx.moveTo(h * 0.24, -h * 0.5); ctx.lineTo(h * 0.1, -h * 0.28); ctx.stroke();
      head = [h * 0.4, -h * 0.5];
    } else if (pose === "sajda") {
      ctx.beginPath(); ctx.moveTo(-h * 0.28, 0); ctx.lineTo(-h * 0.06, 0); ctx.lineTo(-h * 0.02, -h * 0.26); ctx.lineTo(h * 0.3, -h * 0.08); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-h * 0.2, 0); ctx.quadraticCurveTo(-h * 0.04, -h * 0.36, h * 0.28, -h * 0.06); ctx.lineTo(h * 0.1, 0); ctx.closePath(); ctx.fill();
      head = [h * 0.36, -h * 0.06];
    } else if (pose === "sit") {
      ctx.beginPath(); ctx.moveTo(-h * 0.24, 0); ctx.quadraticCurveTo(-h * 0.2, -h * 0.3, -h * 0.07, -h * 0.5); ctx.lineTo(h * 0.07, -h * 0.5); ctx.quadraticCurveTo(h * 0.2, -h * 0.3, h * 0.24, 0); ctx.closePath(); ctx.fill();
      head = [0, -h * 0.6];
    } else {
      const lean = pose === "sway" ? Math.sin(ph) * 0.14 : pose === "walk" ? 0.05 : 0;
      ctx.rotate(lean);
      const hem = pose === "walk" ? Math.sin(ph) * h * 0.05 : 0;
      if (pose === "walk") {
        const k = Math.sin(ph) * h * 0.1;
        ctx.beginPath(); ctx.moveTo(0, -h * 0.25); ctx.lineTo(k, 0); ctx.moveTo(0, -h * 0.25); ctx.lineTo(-k, 0); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(-h * 0.07, -h * 0.78); ctx.lineTo(h * 0.07, -h * 0.78);
      ctx.lineTo(h * 0.15 + hem, pose === "walk" ? -h * 0.18 : 0); ctx.lineTo(-h * 0.15 + hem, pose === "walk" ? -h * 0.18 : 0); ctx.closePath(); ctx.fill();
      if (pose === "raise") {
        ctx.beginPath(); ctx.moveTo(-h * 0.06, -h * 0.74); ctx.lineTo(-h * 0.2, -h * 1.0); ctx.moveTo(h * 0.06, -h * 0.74); ctx.lineTo(h * 0.2, -h * 1.0); ctx.stroke();
      }
      if (o.carry) { // a lamp or bag held out
        ctx.beginPath(); ctx.moveTo(h * 0.06, -h * 0.7); ctx.lineTo(h * 0.2, -h * 0.5); ctx.stroke();
        if (o.carry === "lamp") glow(ctx, h * 0.22, -h * 0.46, h * 0.3, C.gold, 1);
        ctx.fillStyle = o.carry === "lamp" ? C.gold : C.henna;
        ctx.fillRect(h * 0.16, -h * 0.5, h * 0.1, h * 0.1); ctx.fillStyle = c;
      }
      if (o.staff) { ctx.beginPath(); ctx.moveTo(h * 0.2, -h * 0.95); ctx.lineTo(h * 0.2, 0); ctx.stroke(); }
      head = [0, -h * 0.88];
    }
    ctx.beginPath(); ctx.arc(head[0], head[1], hr, 0, TAU); ctx.fill();
    const hat = o.hat;
    if (hat === "turban") { ctx.fillStyle = o.hatColor || C.sand; ctx.beginPath(); ctx.ellipse(head[0], head[1] - hr * 0.7, hr * 1.2, hr * 0.65, 0, 0, TAU); ctx.fill(); }
    if (hat === "scarf") { ctx.fillStyle = o.hatColor || C.tile; ctx.beginPath(); ctx.arc(head[0], head[1], hr * 1.25, Math.PI, TAU); ctx.lineTo(head[0] + hr * 1.5, head[1] + hr * 2.2); ctx.lineTo(head[0] - hr * 1.5, head[1] + hr * 2.2); ctx.closePath(); ctx.fill(); }
    if (hat === "crown") { ctx.fillStyle = C.gold; ctx.beginPath(); const y0 = head[1] - hr * 0.8; ctx.moveTo(head[0] - hr, y0); for (let i = 0; i <= 4; i++) ctx.lineTo(head[0] - hr + (i * hr) / 2, y0 - (i % 2 ? hr * 0.4 : hr * 1.1)); ctx.lineTo(head[0] + hr, y0); ctx.closePath(); ctx.fill(); }
    if (hat === "cap") { ctx.fillStyle = o.hatColor || C.ink; ctx.beginPath(); ctx.arc(head[0], head[1] - hr * 0.2, hr, Math.PI, TAU); ctx.fill(); }
    ctx.restore();
  }
  window.SUFI_PERSON = person;

  function domeMosque(ctx, cx, base, s, color) {
    ctx.fillStyle = color;
    ctx.fillRect(cx - s * 0.5, base - s * 0.25, s, s * 0.25);
    ctx.beginPath(); ctx.arc(cx, base - s * 0.25, s * 0.2, Math.PI, TAU); ctx.fill();
    [-1, 1].forEach((d) => {
      ctx.beginPath(); ctx.arc(cx + d * s * 0.3, base - s * 0.25, s * 0.1, Math.PI, TAU); ctx.fill();
      ctx.fillRect(cx + d * s * 0.56 - s * 0.025, base - s * 0.75, s * 0.05, s * 0.75);
      ctx.beginPath(); ctx.moveTo(cx + d * s * 0.56 - s * 0.04, base - s * 0.75); ctx.lineTo(cx + d * s * 0.56, base - s * 0.84); ctx.lineTo(cx + d * s * 0.56 + s * 0.04, base - s * 0.75); ctx.fill();
    });
  }

  /* ================================================ SHIKWA FILM */
  // Lahore 1909: a poet before a crowd
  S.gathering = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0b1c2c", "#3a2a1e");
    stars(ctx, w, h, t, 40, 0.4);
    domeMosque(ctx, w * 0.5, h * 0.62, Math.min(w, h) * 0.7, rgba(C.ink, 0.85));
    ground(ctx, w, h, h * 0.62, "#0a1822");
    const s = Math.min(w, h);
    // stage
    ctx.fillStyle = C.henna; ctx.fillRect(w * 0.42, h * 0.62, w * 0.16, s * 0.04);
    person(ctx, w * 0.5, h * 0.62, s * 0.22, { pose: t % 6 < 3 ? "stand" : "raise", hat: "cap", color: C.sand });
    for (let k = 0; k < 4; k++) {
      const p = ((t * 0.35 + k / 4) % 1);
      ctx.strokeStyle = rgba(C.gold, 0.6 * (1 - p)); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(w * 0.5, h * 0.48, s * (0.05 + p * 0.4), Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    }
    // the crowd, heads turned toward him
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 16; i++) {
        const x = (i + 0.5 + (row % 2) * 0.5) * (w / 16), y = h * (0.78 + row * 0.08);
        ctx.fillStyle = rgba(C.ink, 1); ctx.strokeStyle = rgba(C.sand, 0.12 + row * 0.05);
        ctx.beginPath(); ctx.arc(x, y, s * 0.03, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.fillRect(x - s * 0.045, y + s * 0.025, s * 0.09, s * 0.08);
      }
    }
  };

  // The caravan carrying the message across deserts
  S.caravan = function (ctx, w, h, t) {
    sky(ctx, w, h, "#e3a72f", "#b5482c");
    const s = Math.min(w, h);
    glow(ctx, w * 0.75, h * 0.42, s * 0.4, C.sand, 1);
    ctx.fillStyle = rgba(C.sand, 0.9); ctx.beginPath(); ctx.arc(w * 0.75, h * 0.42, s * 0.08, 0, TAU); ctx.fill();
    for (let k = 0; k < 3; k++) {
      ctx.fillStyle = ["#7a3b22", "#5e2c1a", "#3d1d12"][k];
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 10) ctx.lineTo(x, h * (0.62 + k * 0.08) + Math.sin(x * 0.006 + k * 2) * s * 0.05);
      ctx.lineTo(w, h); ctx.fill();
    }
    const base = h * 0.7;
    for (let i = 0; i < 5; i++) {
      const x = ((t * 18 + i * w * 0.13) % (w * 1.3)) - w * 0.15, bob = Math.sin(t * 3 + i) * 3;
      ctx.fillStyle = "#1c0e09";
      // camel
      ctx.beginPath(); ctx.ellipse(x, base - s * 0.08 + bob, s * 0.07, s * 0.035, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(x - s * 0.01, base - s * 0.11 + bob, s * 0.03, Math.PI, TAU); ctx.fill();
      ctx.lineWidth = s * 0.012; ctx.strokeStyle = "#1c0e09"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x + s * 0.06, base - s * 0.09 + bob); ctx.lineTo(x + s * 0.09, base - s * 0.15 + bob); ctx.lineTo(x + s * 0.11, base - s * 0.14 + bob); ctx.stroke();
      const lg = Math.sin(t * 4 + i) * s * 0.012;
      [-0.045, -0.02, 0.025, 0.05].forEach((d, j) => { ctx.beginPath(); ctx.moveTo(x + d * s, base - s * 0.06 + bob); ctx.lineTo(x + d * s + (j % 2 ? lg : -lg), base); ctx.stroke(); });
      person(ctx, x - s * 0.01, base - s * 0.12 + bob, s * 0.08, { pose: "sit", color: "#1c0e09", hat: "turban", hatColor: "#1c0e09" });
      if (i === 0) {
        ctx.beginPath(); ctx.moveTo(x, base - s * 0.2); ctx.lineTo(x, base - s * 0.36); ctx.stroke();
        ctx.fillStyle = C.tile; ctx.beginPath(); ctx.moveTo(x, base - s * 0.36); ctx.quadraticCurveTo(x + s * 0.05, base - s * 0.34 + Math.sin(t * 4) * 4, x + s * 0.09, base - s * 0.33); ctx.lineTo(x, base - s * 0.29); ctx.fill();
      }
    }
  };

  // Mahmud and Ayaz in one row of prayer
  S.onerow = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0e2233", "#143049");
    const s = Math.min(w, h), y = h * 0.72;
    ground(ctx, w, h, y, "#0a1822");
    // prayer mats
    const n = 7;
    for (let i = 0; i < n; i++) {
      const x = w * (0.12 + (i * 0.76) / (n - 1));
      ctx.fillStyle = i % 2 ? C.henna : "#7a3b22"; ctx.fillRect(x - s * 0.05, y, s * 0.16, s * 0.012);
      const p = (t / 9) % 1;
      const pose = p < 0.28 ? "stand" : p < 0.45 ? "bow" : p < 0.62 ? "sajda" : p < 0.7 ? "sit" : p < 0.86 ? "sajda" : "stand";
      person(ctx, x, y, s * 0.2, { pose, hat: i === 3 ? "crown" : "cap", color: i === 3 ? "#f5e3b5" : C.sand });
    }
    glow(ctx, w * 0.5, h * 0.2, s * 0.3, C.gold, 0.5);
    star8(ctx, w * 0.5, h * 0.2, s * 0.03, t * 0.2); ctx.fillStyle = rgba(C.gold, 0.8); ctx.fill();
  };

  // Decline: ruined arches, falling leaves
  S.ruins = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0a1520", "#1f2a33");
    const s = Math.min(w, h);
    ctx.fillStyle = rgba(C.sand, 0.85); ctx.beginPath(); ctx.arc(w * 0.8, h * 0.2, s * 0.05, 0, TAU); ctx.fill();
    ctx.fillStyle = "#0e2233"; ctx.beginPath(); ctx.arc(w * 0.82, h * 0.19, s * 0.045, 0, TAU); ctx.fill();
    ground(ctx, w, h, h * 0.8, "#081218");
    ctx.fillStyle = "#24343e";
    for (let i = 0; i < 5; i++) {
      const x = w * (0.1 + i * 0.18), top = h * (0.35 + rand(i) * 0.25), aw = w * 0.12;
      ctx.fillRect(x, top, aw * 0.18, h * 0.8 - top);
      if (i % 2 === 0) {
        ctx.beginPath(); ctx.moveTo(x, top); ctx.quadraticCurveTo(x + aw * 0.5, top - s * 0.12, x + aw * (0.7 + rand(i + 3) * 0.2), top + s * 0.03); ctx.lineTo(x + aw * 0.6, top + s * 0.06); ctx.quadraticCurveTo(x + aw * 0.4, top - s * 0.05, x + aw * 0.18, top + s * 0.05); ctx.fill();
      }
    }
    for (let i = 0; i < 30; i++) {
      const p = (rand(i) + t * (0.05 + rand(i + 1) * 0.05)) % 1;
      const x = rand(i + 2) * w + Math.sin(t + i) * 20, y = p * h * 0.85;
      ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + i);
      ctx.fillStyle = rgba(i % 2 ? C.henna : C.gold, 0.7); ctx.beginPath(); ctx.ellipse(0, 0, 6, 3, 0, 0, TAU); ctx.fill();
      ctx.restore();
    }
    person(ctx, w * 0.5, h * 0.8, s * 0.16, { pose: "sit", color: rgba(C.sand, 0.8) });
  };

  // The heavens stir as the voice arrives
  S.heavens = function (ctx, w, h, t) {
    sky(ctx, w, h, "#06111a", "#0e2233");
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.45;
    for (let i = 0; i < 200; i++) {
      const r = s * (0.05 + rand(i) * 0.6), a = rand(i + 1) * TAU + t * (0.05 + 0.3 / (1 + r / 50));
      ctx.fillStyle = rgba(i % 5 ? C.sand : C.tileSoft, 0.2 + rand(i + 2) * 0.6);
      ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, 1.8, 1.8);
    }
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * TAU + t * 0.4;
      glow(ctx, cx + Math.cos(a) * s * 0.25, cy + Math.sin(a) * s * 0.12, s * 0.05, C.sand, 0.9);
    }
    const p = ease(t / 6);
    glow(ctx, cx, h * (0.95 - p * 0.5), s * 0.06, C.gold, 1);
    if (p >= 1) glow(ctx, cx, cy, s * (0.2 + Math.sin(t * 2) * 0.03), C.gold, 0.7);
  };

  // The Pen writing on the Tablet
  S.pen = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0b1c2c", "#0e2233");
    const s = Math.min(w, h), x0 = w * 0.22, y0 = h * 0.2, tw = w * 0.56, th = h * 0.6;
    glow(ctx, w / 2, h / 2, s * 0.6, C.gold, 0.5);
    ctx.fillStyle = "#f2e6c8"; ctx.fillRect(x0, y0, tw, th);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.strokeRect(x0 - 6, y0 - 6, tw + 12, th + 12);
    // calligraphic stroke drawn right to left
    const p = ease(t / 7);
    ctx.strokeStyle = "#0e2233"; ctx.lineWidth = s * 0.018; ctx.lineCap = "round";
    ctx.beginPath();
    let last = [x0 + tw * 0.9, y0 + th * 0.5];
    const N = 120;
    for (let i = 0; i <= N * p; i++) {
      const u = i / N, x = x0 + tw * (0.9 - u * 0.8), y = y0 + th * (0.5 + Math.sin(u * 14) * 0.12 * Math.sin(u * 3.1) + (u > 0.85 ? (u - 0.85) * 1.5 : 0));
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      last = [x, y];
    }
    ctx.stroke();
    // the pen
    ctx.save(); ctx.translate(last[0], last[1]); ctx.rotate(-0.8);
    ctx.fillStyle = C.henna; ctx.fillRect(-s * 0.012, -s * 0.28, s * 0.024, s * 0.26);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-s * 0.012, -s * 0.02); ctx.lineTo(0, 0); ctx.lineTo(s * 0.012, -s * 0.02); ctx.fill();
    ctx.restore();
    glow(ctx, last[0], last[1], s * 0.05, C.gold, 1);
  };

  /* ================================================ MAIKADA FILM */
  function lanternRow(ctx, w, h, t, y) {
    for (let i = 0; i < 6; i++) {
      const x = w * (0.08 + i * 0.17), yy = y + Math.sin(t + i) * 3;
      glow(ctx, x, yy, Math.min(w, h) * 0.06, C.gold, 0.7);
      star8(ctx, x, yy, Math.min(w, h) * 0.014, 0); ctx.fillStyle = C.gold; ctx.fill();
    }
  }
  function houses(ctx, w, h, base, seed = 0) {
    ctx.fillStyle = "#081520";
    let x = 0, i = seed;
    while (x < w) {
      const bw = w * (0.08 + rand(i) * 0.1), bh = h * (0.18 + rand(i + 9) * 0.22);
      ctx.fillRect(x, base - bh, bw, bh);
      if (rand(i + 4) > 0.5) { ctx.beginPath(); ctx.arc(x + bw / 2, base - bh, bw * 0.3, Math.PI, TAU); ctx.fill(); }
      for (let k = 0; k < 3; k++) if (rand(i * 3 + k) > 0.55) { ctx.fillStyle = rgba(C.gold, 0.5); ctx.fillRect(x + bw * (0.2 + k * 0.25), base - bh * 0.7, bw * 0.12, bh * 0.15); ctx.fillStyle = "#081520"; }
      x += bw + 2; i++;
    }
  }

  // A rind walks the night street toward a glowing door
  S.nightstreet = function (ctx, w, h, t) {
    sky(ctx, w, h, "#06111a", "#123047");
    stars(ctx, w, h, t, 60, 0.4);
    const s = Math.min(w, h), base = h * 0.8;
    houses(ctx, w, h, base, 3);
    ground(ctx, w, h, base, "#050d14");
    const dx = w * 0.82;
    glow(ctx, dx, base - s * 0.12, s * 0.35, C.gold, 1);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(dx - s * 0.06, base); ctx.lineTo(dx - s * 0.06, base - s * 0.18); ctx.quadraticCurveTo(dx, base - s * 0.28, dx + s * 0.06, base - s * 0.18); ctx.lineTo(dx + s * 0.06, base); ctx.fill();
    lanternRow(ctx, w, h, t, h * 0.15);
    const x = Math.min(dx - s * 0.1, w * 0.1 + t * w * 0.07);
    person(ctx, x, base, s * 0.2, { pose: x < dx - s * 0.11 ? "walk" : "stand", phase: t * 5, color: C.sand, hat: "cap", hatColor: C.henna });
  };

  // The sheikh stays stiff outside, the rind enters
  S.doorway = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0a1824", "#0e2233");
    const s = Math.min(w, h), base = h * 0.82, dx = w * 0.62;
    ground(ctx, w, h, base, "#050d14");
    ctx.fillStyle = "#081520"; ctx.fillRect(dx - s * 0.3, base - s * 0.55, s * 0.6, s * 0.55);
    glow(ctx, dx, base - s * 0.15, s * 0.4, C.gold, 1);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(dx - s * 0.09, base); ctx.lineTo(dx - s * 0.09, base - s * 0.25); ctx.quadraticCurveTo(dx, base - s * 0.38, dx + s * 0.09, base - s * 0.25); ctx.lineTo(dx + s * 0.09, base); ctx.fill();
    person(ctx, w * 0.22, base, s * 0.26, { pose: "stand", hat: "turban", staff: true, color: "#9fb3bf" });
    const p = ease(t / 7), x = w * 0.38 + (dx - w * 0.38) * p;
    person(ctx, x, base, s * 0.22 * (1 - p * 0.25), { pose: p < 1 ? "walk" : "sway", phase: t * 5, color: rgba(C.sand, 1 - p * 0.6) });
  };

  // Sama: the whole circle sways, one whirls
  S.sama = function (ctx, w, h, t, env) {
    sky(ctx, w, h, "#0e2233", "#071520");
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.68;
    glow(ctx, cx, cy - s * 0.15, s * (0.45 + env.level * 0.3), C.gold, 0.8);
    lanternRow(ctx, w, h, t, h * 0.12);
    const n = 12;
    const ring = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU, x = cx + Math.cos(a) * s * 0.42, y = cy + Math.sin(a) * s * 0.12;
      ring.push({ x, y, d: Math.sin(a) });
    }
    ring.sort((a, b) => a.d - b.d);
    ring.forEach((r, i) => person(ctx, r.x, r.y, s * (0.17 + r.d * 0.03), { pose: "sway", phase: t * 2.4 + i * 0.4, hat: "cap", hatColor: C.henna, color: rgba(C.sand, 0.65 + r.d * 0.3) }));
    // centre whirler
    S.whirl(ctx, w, h, t * 1.2, env);
  };

  // Dawn: sobriety after ecstasy, the seeker goes out to serve
  S.dawn = function (ctx, w, h, t) {
    const p = ease(t / 8);
    sky(ctx, w, h, p > 0.5 ? "#2a4d63" : "#123047", "#e3a72f");
    const s = Math.min(w, h), base = h * 0.8;
    const sy = h * (0.9 - p * 0.35);
    glow(ctx, w * 0.5, sy, s * 0.6, C.gold, 1);
    ctx.fillStyle = "#f6d58a"; ctx.beginPath(); ctx.arc(w * 0.5, sy, s * 0.09, 0, TAU); ctx.fill();
    houses(ctx, w, h, base, 11);
    ground(ctx, w, h, base, "#0a1822");
    for (let i = 0; i < 6; i++) {
      const bx = ((t * 30 + i * 80) % (w + 100)) - 50, by = h * 0.25 + Math.sin(i) * 30;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; const f = Math.sin(t * 8 + i) * 5;
      ctx.beginPath(); ctx.moveTo(bx - 8, by - f); ctx.quadraticCurveTo(bx - 4, by - 4, bx, by); ctx.quadraticCurveTo(bx + 4, by - 4, bx + 8, by - f); ctx.stroke();
    }
    person(ctx, w * 0.2 + t * w * 0.05, base, s * 0.2, { pose: "walk", phase: t * 4, carry: "lamp", hat: "cap", hatColor: C.henna, color: C.sand });
  };

  /* ================================================ PEER-E-KAMIL FILM */
  function hills(ctx, w, h, y, color) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 12) ctx.lineTo(x, y + Math.sin(x * 0.008) * 30 + Math.sin(x * 0.021) * 14);
    ctx.lineTo(w, h); ctx.fill();
  }
  function house(ctx, cx, base, s, litWindow) {
    ctx.fillStyle = "#0b1a24";
    ctx.fillRect(cx - s * 0.4, base - s * 0.45, s * 0.8, s * 0.45);
    ctx.fillRect(cx - s * 0.25, base - s * 0.62, s * 0.5, s * 0.18);
    for (let i = 0; i < 4; i++) {
      const lit = i === litWindow;
      ctx.fillStyle = lit ? C.gold : rgba(C.gold, 0.15);
      ctx.fillRect(cx - s * 0.32 + i * s * 0.18, base - s * 0.34, s * 0.1, s * 0.12);
    }
  }

  // Imama at her window in Islamabad, reading by lamplight
  S.window = function (ctx, w, h, t) {
    sky(ctx, w, h, "#06111a", "#123047");
    stars(ctx, w, h, t, 60, 0.35);
    hills(ctx, w, h, h * 0.45, "#0b2030");
    const s = Math.min(w, h), base = h * 0.85;
    ground(ctx, w, h, base, "#050d14");
    house(ctx, w * 0.35, base, s * 0.9, 1);
    // close-up window on the right
    const wx = w * 0.72, wy = h * 0.3, ww = s * 0.32, wh = s * 0.42;
    glow(ctx, wx + ww / 2, wy + wh / 2, s * 0.4, C.gold, 0.9);
    ctx.fillStyle = "#3a2a1e"; ctx.fillRect(wx, wy, ww, wh);
    ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
    person(ctx, wx + ww * 0.45, wy + wh, s * 0.35, { pose: "sit", hat: "scarf", hatColor: C.tile, color: C.sand });
    ctx.fillStyle = "#f2e6c8"; ctx.fillRect(wx + ww * 0.5, wy + wh * 0.66, ww * 0.25, wh * 0.08);
    const pg = Math.sin(t * 0.8) > 0.9 ? 1 : 0;
    glow(ctx, wx + ww * 0.62, wy + wh * 0.68, s * (0.06 + pg * 0.04), C.gold, 1);
    ctx.restore();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.strokeRect(wx, wy, ww, wh);
    ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh * 0.4); ctx.stroke();
  };

  // She leaves home in a storm
  S.storm = function (ctx, w, h, t) {
    const flash = Math.sin(t * 1.3) > 0.985 || (t % 5 > 4.85);
    sky(ctx, w, h, flash ? "#5c7a8a" : "#071520", "#0e2233");
    const s = Math.min(w, h), base = h * 0.82;
    house(ctx, w * 0.2, base, s * 0.8, -1);
    ground(ctx, w, h, base, "#050d14");
    ctx.strokeStyle = rgba(C.tileSoft, 0.35); ctx.lineWidth = 1;
    for (let i = 0; i < 140; i++) {
      const x = (rand(i) * w * 1.2 + t * 60) % (w * 1.2) - w * 0.1, y = (rand(i + 7) * h + t * 700 * (0.6 + rand(i) * 0.4)) % h;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 16); ctx.stroke();
    }
    const x = w * 0.32 + t * w * 0.06;
    person(ctx, x, base, s * 0.22, { pose: "walk", phase: t * 4, hat: "scarf", hatColor: C.tile, carry: "bag" });
    glow(ctx, w * 0.9, h * 0.2, s * 0.25, C.gold, 0.5 + 0.2 * Math.sin(t));
    star8(ctx, w * 0.9, h * 0.2, s * 0.025, t * 0.3); ctx.fillStyle = C.gold; ctx.fill();
  };

  // Salar: the speeding, restless highway
  S.highway = function (ctx, w, h, t) {
    sky(ctx, w, h, "#030a10", "#0b1a24");
    const hy = h * 0.42, cx = w / 2;
    ctx.fillStyle = "#081218"; ctx.beginPath(); ctx.moveTo(cx - 10, hy); ctx.lineTo(cx + 10, hy); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
    for (let i = 0; i < 12; i++) {
      const p = ((i / 12 + t * 0.9) % 1), y = hy + (h - hy) * p * p, len = 6 + p * 60;
      ctx.fillStyle = rgba(C.sand, 0.3 + p * 0.6); ctx.fillRect(cx - (1 + p * 4), y, 2 + p * 8, len);
    }
    for (let i = 0; i < 18; i++) {
      const p = ((rand(i) + t * (0.5 + rand(i + 3))) % 1), side = i % 2 ? 1 : -1;
      const x = cx + side * p * p * w * 0.7, y = hy + (h - hy) * p * p * 0.6;
      ctx.strokeStyle = rgba(i % 3 ? C.henna : C.gold, 0.7 * p); ctx.lineWidth = 1 + p * 3;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + side * p * 60, y + p * 20); ctx.stroke();
    }
    // the city's glow on the horizon, the void behind it
    glow(ctx, cx, hy, Math.min(w, h) * 0.3, C.henna, 0.6);
  };

  // Saeeda Amma's courtyard: shelter
  S.courtyard = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0b1c2c", "#1d3a4f");
    stars(ctx, w, h, t, 40, 0.3);
    const s = Math.min(w, h), base = h * 0.82;
    ctx.fillStyle = "#3a2a1e"; ctx.fillRect(0, h * 0.35, w * 0.1, base - h * 0.35); ctx.fillRect(w * 0.9, h * 0.35, w * 0.1, base - h * 0.35);
    ctx.fillStyle = "#2a1e16"; ctx.fillRect(0, base, w, h - base);
    // tree
    ctx.fillStyle = "#24170f"; ctx.fillRect(w * 0.78, h * 0.35, s * 0.03, base - h * 0.35);
    for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba(C.tile, 0.5); ctx.beginPath(); ctx.arc(w * 0.78 + Math.cos(i) * s * 0.1, h * 0.33 + Math.sin(i * 2) * s * 0.05 + Math.sin(t + i) * 2, s * 0.07, 0, TAU); ctx.fill(); }
    // prayer mat and lamp
    ctx.fillStyle = C.henna; ctx.fillRect(w * 0.3, base - 2, s * 0.25, s * 0.02);
    person(ctx, w * 0.38, base - 2, s * 0.24, { pose: "sit", hat: "scarf", hatColor: C.sand, color: "#c9bfa8" });
    person(ctx, w * 0.58, base - 2, s * 0.22, { pose: "sit", hat: "scarf", hatColor: C.tile, color: C.sand });
    glow(ctx, w * 0.48, base - s * 0.05, s * 0.25, C.gold, 0.9 + Math.sin(t * 3) * 0.1);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(w * 0.48, base - s * 0.04, s * 0.012, 0, TAU); ctx.fill();
  };

  // Years pass: one tree through the seasons
  S.seasons = function (ctx, w, h, t) {
    const cyc = 12, p = (t % cyc) / cyc, season = Math.floor(p * 4);
    const skies = [["#2a4d63", "#8fb5a8"], ["#123047", "#e3a72f"], ["#1d2a33", "#7a8a94"], ["#2a4d63", "#d9c9a8"]];
    sky(ctx, w, h, skies[season][0], skies[season][1]);
    const s = Math.min(w, h), base = h * 0.82, tx = w / 2;
    ground(ctx, w, h, base, season === 2 ? "#cfd8dc" : "#0a1822");
    ctx.strokeStyle = "#24170f"; ctx.lineCap = "round";
    function branch(x, y, a, len, d) {
      if (d === 0) return;
      const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
      ctx.lineWidth = d * 2.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
      branch(x2, y2, a - 0.45, len * 0.72, d - 1); branch(x2, y2, a + 0.4, len * 0.72, d - 1);
      if (d === 1) {
        const col = [C.tileSoft, C.henna, null, "#f4c6c0"][season];
        if (col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x2, y2, s * 0.018, 0, TAU); ctx.fill(); }
      }
    }
    branch(tx, base, -Math.PI / 2, s * 0.17, 6);
    for (let i = 0; i < 40; i++) {
      const q = (rand(i) + t * 0.1) % 1, x = rand(i + 1) * w + Math.sin(t + i) * 15, y = q * base;
      if (season === 1) { ctx.fillStyle = rgba(C.henna, 0.8); ctx.beginPath(); ctx.ellipse(x, y, 5, 2.5, t + i, 0, TAU); ctx.fill(); }
      if (season === 2) { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill(); }
    }
    ctx.fillStyle = rgba(C.sand, 0.9); ctx.font = `${Math.round(s * 0.05)}px Amiri, serif`; ctx.textAlign = "right";
    ctx.fillText(["Spring", "Autumn", "Winter", "Spring again"][season], w - 20, h * 0.12);
  };

  // A teacher and a student, a book of light between them
  S.teacher = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0e2233", "#143049");
    const s = Math.min(w, h), base = h * 0.8;
    ground(ctx, w, h, base, "#0a1822");
    ctx.fillStyle = "#081520";
    for (let i = 0; i < 3; i++) { ctx.fillRect(w * (0.15 + i * 0.3), h * 0.2, s * 0.03, base - h * 0.2); }
    person(ctx, w * 0.36, base, s * 0.3, { pose: "sit", hat: "cap", hatColor: C.sand, color: "#d8cfb8" });
    person(ctx, w * 0.64, base, s * 0.26, { pose: "sit", color: C.sand });
    const bx = w * 0.5, by = base - s * 0.05;
    ctx.fillStyle = "#f2e6c8"; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - s * 0.07, by - s * 0.03); ctx.lineTo(bx - s * 0.07, by + s * 0.01); ctx.lineTo(bx, by + s * 0.03); ctx.lineTo(bx + s * 0.07, by + s * 0.01); ctx.lineTo(bx + s * 0.07, by - s * 0.03); ctx.fill();
    glow(ctx, bx, by, s * 0.25, C.gold, 1);
    for (let i = 0; i < 20; i++) {
      const p = ((rand(i) + t * 0.15) % 1);
      ctx.fillStyle = rgba(C.gold, 1 - p); ctx.beginPath(); ctx.arc(bx + (rand(i + 2) - 0.5) * s * 0.2 * (1 - p), by - p * h * 0.6, 2, 0, TAU); ctx.fill();
    }
  };

  // Madina: the green dome under the light. No figure, only light.
  S.madina = function (ctx, w, h, t) {
    sky(ctx, w, h, "#06111a", "#123047");
    stars(ctx, w, h, t, 90, 0.6);
    const s = Math.min(w, h), base = h * 0.8, cx = w * 0.5;
    glow(ctx, cx, base - s * 0.3, s * (0.7 + Math.sin(t * 0.8) * 0.05), C.gold, 0.8);
    ctx.fillStyle = "#0a1822"; ctx.fillRect(0, base - s * 0.12, w, s * 0.12);
    ctx.fillRect(cx - s * 0.18, base - s * 0.22, s * 0.36, s * 0.12);
    ctx.fillStyle = "#2f8f5b"; ctx.beginPath(); ctx.moveTo(cx - s * 0.13, base - s * 0.22); ctx.quadraticCurveTo(cx - s * 0.14, base - s * 0.42, cx, base - s * 0.46); ctx.quadraticCurveTo(cx + s * 0.14, base - s * 0.42, cx + s * 0.13, base - s * 0.22); ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, base - s * 0.46); ctx.lineTo(cx, base - s * 0.53); ctx.stroke();
    ctx.fillStyle = "#0a1822";
    [-1, 1].forEach((d) => { const mx = cx + d * s * 0.42; ctx.fillRect(mx - s * 0.02, base - s * 0.55, s * 0.04, s * 0.55); ctx.beginPath(); ctx.moveTo(mx - s * 0.03, base - s * 0.55); ctx.lineTo(mx, base - s * 0.65); ctx.lineTo(mx + s * 0.03, base - s * 0.55); ctx.fill(); });
    ground(ctx, w, h, base, "#050d14");
    for (let i = 0; i < 9; i++) person(ctx, w * (0.1 + i * 0.1), base, s * 0.12, { pose: "stand", color: rgba(C.sand, 0.55) });
  };

  /* ================================================ POETRY FILM */
  // Many books dissolving into a single Alif
  S.alif = function (ctx, w, h, t) {
    sky(ctx, w, h, "#0b1c2c", "#0e2233");
    const s = Math.min(w, h), cx = w / 2, base = h * 0.82, p = ease((t - 1) / 6);
    for (let i = 0; i < 14; i++) {
      const bx = cx + (i - 7) * s * 0.055, bh = s * (0.12 + rand(i) * 0.1), fly = p * (rand(i + 1) * h * 0.6);
      ctx.fillStyle = rgba(i % 2 ? C.henna : C.tile, 1 - p);
      ctx.fillRect(bx, base - bh - fly, s * 0.045, bh);
    }
    glow(ctx, cx, h * 0.45, s * 0.35 * p, C.gold, p);
    ctx.strokeStyle = rgba(C.gold, p); ctx.lineWidth = s * 0.035; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx + s * 0.015, h * 0.25); ctx.quadraticCurveTo(cx - s * 0.01, h * 0.45, cx, h * 0.62); ctx.stroke();
  };

  // A veil lifting from a light that was always there
  S.veil = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#0e2233");
    const s = Math.min(w, h), cx = w / 2, cy = h / 2, p = ease((t - 0.5) / 6);
    glow(ctx, cx, cy, s * 0.4, C.gold, 1);
    star8(ctx, cx, cy, s * 0.07, t * 0.2); ctx.fillStyle = C.gold; ctx.fill();
    const top = -h * p * 1.05;
    ctx.fillStyle = "#3a2a1e";
    ctx.beginPath(); ctx.moveTo(0, top);
    for (let x = 0; x <= w; x += 10) ctx.lineTo(x, top + h + Math.sin(x * 0.03 + t * 2) * 10 * (1 - p));
    ctx.lineTo(w, top); ctx.fill();
    ctx.fillStyle = rgba(C.sand, 0.85 * (1 - p)); ctx.font = `${Math.round(s * 0.18)}px "Noto Nastaliq Urdu", serif`; ctx.textAlign = "center";
    ctx.fillText("میں", cx, top + h * 0.6);
  };

  // Heart of the human versus the angels' worship
  S.heartlight = function (ctx, w, h, t) {
    S.heavens(ctx, w, h, t + 6);
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.72, b = 1 + Math.sin(t * 3) * 0.06;
    glow(ctx, cx, cy, s * 0.25, C.henna, 1);
    ctx.fillStyle = C.henna; ctx.beginPath();
    ctx.moveTo(cx, cy + s * 0.07 * b);
    ctx.bezierCurveTo(cx - s * 0.12 * b, cy - s * 0.02, cx - s * 0.05 * b, cy - s * 0.1 * b, cx, cy - s * 0.04);
    ctx.bezierCurveTo(cx + s * 0.05 * b, cy - s * 0.1 * b, cx + s * 0.12 * b, cy - s * 0.02, cx, cy + s * 0.07 * b);
    ctx.fill();
  };

  // Phone screen turned off, the inner light seen
  S.screenoff = function (ctx, w, h, t) {
    sky(ctx, w, h, "#071520", "#0e2233");
    const s = Math.min(w, h), cx = w / 2, cy = h / 2, p = ease((t - 2) / 2);
    const pw = s * 0.28, ph = s * 0.52;
    ctx.fillStyle = "#111d26"; ctx.fillRect(cx - pw / 2, cy - ph / 2, pw, ph);
    if (p < 1) {
      for (let i = 0; i < 9; i++) {
        const y = cy - ph / 2 + 20 + ((i * 40 + t * 160) % (ph - 30));
        ctx.fillStyle = rgba([C.henna, C.tileSoft, C.gold][i % 3], 0.8 * (1 - p)); ctx.fillRect(cx - pw / 2 + 12, y, pw - 24, 22);
      }
    }
    ctx.strokeStyle = rgba(C.sand, 0.5); ctx.lineWidth = 3; ctx.strokeRect(cx - pw / 2, cy - ph / 2, pw, ph);
    glow(ctx, cx, cy, s * 0.45 * p, C.gold, p);
    ctx.fillStyle = rgba(C.gold, p); ctx.beginPath(); ctx.arc(cx, cy, s * 0.03 * (1 + Math.sin(t * 2) * 0.2), 0, TAU); ctx.fill();
  };
})();
