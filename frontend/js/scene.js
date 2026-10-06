/* Canvas scenes. Each scene: draw(ctx, w, h, t, env) where t is seconds and
   env = { level } (audio level 0..1, used to make light breathe with sound). */
(function () {
  const C = {
    ink: "#071520", lapis: "#0e2233", tile: "#2a9d8f", tileSoft: "#5cc8bd",
    gold: "#e3a72f", sand: "#efe4cc", henna: "#b5482c",
  };
  const TAU = Math.PI * 2;
  const rgba = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };
  const rand = (seed) => { const x = Math.sin(seed * 9301.17) * 49297.31; return x - Math.floor(x); };

  function glow(ctx, x, y, r, color, a = 1) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(color, 0.55 * a));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }

  function star8(ctx, x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = rot + (i * TAU) / 16, rr = i % 2 ? r * 0.55 : r;
      const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath();
  }

  /* ------------------------------------------------ whirling dervish */
  function whirl(ctx, w, h, t, env) {
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.56;
    // cosmos rings turning around him
    for (let ring = 0; ring < 4; ring++) {
      const R = s * (0.24 + ring * 0.08), n = 10 + ring * 6, sp = (ring % 2 ? -1 : 1) * (0.12 + ring * 0.04);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU + t * sp;
        const x = cx + Math.cos(a) * R, y = cy - s * 0.08 + Math.sin(a) * R * 0.38;
        ctx.fillStyle = rgba(ring % 2 ? C.tileSoft : C.gold, 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(a * 3 + t)));
        ctx.beginPath(); ctx.arc(x, y, s * 0.004 + ring * 0.6, 0, TAU); ctx.fill();
      }
    }
    glow(ctx, cx, cy - s * 0.18, s * (0.32 + env.level * 0.2), C.gold, 0.6);

    const waist = cy - s * 0.02, hemY = cy + s * 0.2, hemR = s * 0.2, spin = t * 2.4;
    // skirt (tennure): pleats sweeping around an ellipse, back ones darker
    const pleats = 28;
    const pts = [];
    for (let i = 0; i < pleats; i++) {
      const a = (i / pleats) * TAU + spin;
      const flare = 1 + 0.08 * Math.sin(a * 2 + t * 3);
      pts.push({ a, x: cx + Math.cos(a) * hemR * flare, y: hemY + Math.sin(a) * hemR * 0.22 + Math.sin(a * 3 + t * 4) * s * 0.008, front: Math.sin(a) });
    }
    pts.sort((p, q) => p.front - q.front);
    pts.forEach((p) => {
      const f = (p.front + 1) / 2;
      ctx.strokeStyle = rgba(C.sand, 0.15 + f * 0.75);
      ctx.lineWidth = 1 + f * 1.4;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(p.a) * s * 0.02, waist); ctx.quadraticCurveTo(cx + Math.cos(p.a) * hemR * 0.6, (waist + hemY) / 2, p.x, p.y); ctx.stroke();
    });
    ctx.strokeStyle = rgba(C.sand, 0.9); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(cx, hemY, hemR, hemR * 0.22, 0, 0, TAU); ctx.stroke();

    // torso
    ctx.strokeStyle = C.sand; ctx.lineWidth = s * 0.012; ctx.lineCap = "round";
    const neck = waist - s * 0.12;
    ctx.beginPath(); ctx.moveTo(cx, waist); ctx.lineTo(cx, neck); ctx.stroke();
    // right arm up, palm to the sky (receiving)
    ctx.beginPath(); ctx.moveTo(cx, neck + s * 0.01); ctx.quadraticCurveTo(cx + s * 0.08, neck - s * 0.03, cx + s * 0.12, neck - s * 0.1); ctx.stroke();
    // left arm down, palm to the earth (giving)
    ctx.beginPath(); ctx.moveTo(cx, neck + s * 0.01); ctx.quadraticCurveTo(cx - s * 0.09, neck + s * 0.01, cx - s * 0.13, neck + s * 0.06); ctx.stroke();
    // head tilted, tall felt hat (sikke)
    ctx.save(); ctx.translate(cx + s * 0.012, neck - s * 0.035); ctx.rotate(0.28);
    ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(0, 0, s * 0.022, 0, TAU); ctx.fill();
    ctx.fillStyle = C.henna;
    ctx.beginPath(); ctx.moveTo(-s * 0.016, -s * 0.016); ctx.lineTo(s * 0.016, -s * 0.016); ctx.lineTo(s * 0.012, -s * 0.085); ctx.lineTo(-s * 0.012, -s * 0.085); ctx.closePath(); ctx.fill();
    ctx.restore();
    // light received above the raised hand
    glow(ctx, cx + s * 0.12, neck - s * 0.12, s * 0.05, C.gold, 1);
  }

  /* ------------------------------------------------ four rings, a seeker moving inward */
  function path(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    const radii = [0.42, 0.32, 0.22, 0.12].map((r) => r * s);
    const cols = [C.tile, C.tileSoft, C.gold, C.sand];
    radii.forEach((R, i) => {
      const rot = t * (i % 2 ? -0.18 : 0.14) * (i + 1);
      ctx.strokeStyle = rgba(cols[i], 0.7); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, R, rot + 0.35, rot + TAU - 0.35); ctx.stroke();
      for (let k = 0; k < 8; k++) { star8(ctx, cx + Math.cos(rot + k * TAU / 8 + 0.6) * R, cy + Math.sin(rot + k * TAU / 8 + 0.6) * R, s * 0.008, t); ctx.fillStyle = rgba(cols[i], 0.6); ctx.fill(); }
    });
    // seeker spirals in over 12 seconds then begins again
    const p = (t % 12) / 12, R = radii[0] * (1 - p) + 2, a = p * TAU * 3;
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    glow(ctx, x, y, s * 0.06, C.gold);
    ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(x, y, s * 0.012, 0, TAU); ctx.fill();
    glow(ctx, cx, cy, s * (0.08 + p * 0.1), C.gold, 0.4 + p);
    star8(ctx, cx, cy, s * 0.04, -t * 0.3); ctx.fillStyle = rgba(C.gold, 0.9); ctx.fill();
  }

  /* ------------------------------------------------ three levels of the self */
  function nafs(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2;
    const tiers = [h * 0.8, h * 0.5, h * 0.2];
    // ammarah: restless red jitter
    for (let i = 0; i < 70; i++) {
      const x = cx + (rand(i) - 0.5) * s * 0.8 + Math.sin(t * 7 + i) * 8, y = tiers[0] + (rand(i + 9) - 0.5) * s * 0.12 + Math.cos(t * 9 + i) * 6;
      ctx.fillStyle = rgba(C.henna, 0.7); ctx.fillRect(x, y, 3, 3);
    }
    // lawwamah: a pendulum arguing with itself
    for (let i = 0; i < 40; i++) {
      const ph = Math.sin(t * 1.6) * 0.8, x = cx + (rand(i + 3) - 0.5) * s * 0.7 + ph * 30, y = tiers[1] + Math.sin(i + t * 2) * s * 0.03;
      ctx.fillStyle = rgba(C.tileSoft, 0.6); ctx.beginPath(); ctx.arc(x, y, 2.2, 0, TAU); ctx.fill();
    }
    // mutma'innah: still light
    glow(ctx, cx, tiers[2], s * 0.16, C.gold, 0.8);
    ctx.strokeStyle = rgba(C.gold, 0.8); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, tiers[2], s * 0.06, 0, TAU); ctx.stroke();
    // tier lines
    tiers.forEach((y, i) => { ctx.strokeStyle = rgba(C.sand, 0.15); ctx.beginPath(); ctx.moveTo(cx - s * 0.45, y + s * 0.09); ctx.lineTo(cx + s * 0.45, y + s * 0.09); ctx.stroke(); });
    // the climbing soul
    const p = (t % 10) / 10, y = tiers[0] - (tiers[0] - tiers[2]) * (p < 0.5 ? p * 1.3 : Math.min(1, 0.65 + (p - 0.5) * 0.9));
    const jit = (1 - p) * 10 * Math.sin(t * 20);
    glow(ctx, cx + jit, y, s * 0.05, C.sand);
    ctx.fillStyle = C.sand; ctx.beginPath(); ctx.arc(cx + jit, y, s * 0.014, 0, TAU); ctx.fill();
  }

  /* ------------------------------------------------ the heart as a mirror being polished */
  function mirror(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, cy = h / 2, R = s * 0.32;
    const cycle = 9, p = (t % cycle) / cycle;
    const clean = Math.min(1, p * 1.25);
    glow(ctx, cx, cy, R * (1 + clean * 0.8), C.gold, clean);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
    ctx.fillStyle = rgba(C.lapis, 1); ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    // rays inside the mirror, visible as it clears
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU + t * 0.1;
      ctx.strokeStyle = rgba(C.gold, 0.25 * clean); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke();
    }
    // rust: dust that disappears behind the polishing sweep
    const sweep = p * TAU * 1.2;
    for (let i = 0; i < 420; i++) {
      const a = rand(i) * TAU, r = Math.sqrt(rand(i + 1)) * R;
      const cleared = a < sweep % TAU || p > 0.83 ? 1 : 0;
      const fade = cleared ? Math.max(0, 1 - clean * 1.4) : 0.85;
      if (fade <= 0.02) continue;
      ctx.fillStyle = rgba(i % 3 ? C.henna : "#5a4632", fade);
      ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3.4, 3.4);
    }
    ctx.restore();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
    // cloth
    const ca = sweep;
    ctx.fillStyle = rgba(C.sand, 0.85);
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(ca) * R * 0.6, cy + Math.sin(ca) * R * 0.6, s * 0.04, s * 0.025, ca, 0, TAU); ctx.fill();
  }

  /* ------------------------------------------------ breath circle, 4s in, 4s out */
  function dhikr(ctx, w, h, t, env) {
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    const ph = (t % 8) / 8, breath = 0.5 - 0.5 * Math.cos(ph * TAU);
    const R = s * (0.14 + breath * 0.16);
    for (let k = 0; k < 4; k++) {
      const rp = ((t + k * 2) % 8) / 8;
      ctx.strokeStyle = rgba(C.tileSoft, 0.4 * (1 - rp)); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.12 + rp * s * 0.36, 0, TAU); ctx.stroke();
    }
    glow(ctx, cx, cy, R * 2, C.gold, 0.5 + breath * 0.5 + env.level);
    ctx.fillStyle = rgba(C.gold, 0.18 + breath * 0.25); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
    // 33 bead tasbih around
    for (let i = 0; i < 33; i++) {
      const a = (i / 33) * TAU - Math.PI / 2, lit = i <= Math.floor((t / 8) % 33);
      ctx.fillStyle = lit ? C.gold : rgba(C.sand, 0.25);
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * s * 0.43, cy + Math.sin(a) * s * 0.43, s * 0.009, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = C.sand; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `${Math.round(s * 0.045)}px Amiri, serif`;
    ctx.fillText(ph < 0.5 ? "breathe in" : "breathe out", cx, cy);
  }

  /* ------------------------------------------------ moth and candle */
  function moth(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.55;
    // candle
    ctx.fillStyle = rgba(C.sand, 0.9); ctx.fillRect(cx - s * 0.03, cy, s * 0.06, s * 0.25);
    const fl = Math.sin(t * 13) * 0.06 + Math.sin(t * 7.3) * 0.05;
    glow(ctx, cx, cy - s * 0.05, s * 0.3, C.gold, 0.9);
    ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(cx - s * 0.022, cy - s * 0.005);
    ctx.quadraticCurveTo(cx - s * 0.03, cy - s * 0.06, cx + fl * s * 0.2, cy - s * 0.12);
    ctx.quadraticCurveTo(cx + s * 0.03, cy - s * 0.06, cx + s * 0.022, cy - s * 0.005); ctx.fill();
    // moth spiralling closer, then a flash, then a new moth
    const cyc = 10, p = (t % cyc) / cyc;
    const R = s * 0.38 * (1 - p * 0.95), a = t * (1.5 + p * 4);
    const mx = cx + Math.cos(a) * R, my = cy - s * 0.06 + Math.sin(a) * R * 0.6;
    if (p < 0.96) {
      const flap = Math.abs(Math.sin(t * 22)) * s * 0.025;
      ctx.fillStyle = rgba(C.sand, 0.9);
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx - s * 0.03, my - flap); ctx.lineTo(mx - s * 0.02, my + s * 0.01); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + s * 0.03, my - flap); ctx.lineTo(mx + s * 0.02, my + s * 0.01); ctx.closePath(); ctx.fill();
    } else {
      glow(ctx, cx, cy - s * 0.08, s * 0.5, C.sand, (1 - p) * 25);
    }
  }

  /* ------------------------------------------------ drops into the ocean */
  function fana(ctx, w, h, t) {
    const s = Math.min(w, h), sea = h * 0.62;
    for (let k = 0; k < 6; k++) {
      ctx.strokeStyle = rgba(C.tile, 0.6 - k * 0.08); ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = sea + k * s * 0.05 + Math.sin(x * 0.02 + t * (1 + k * 0.2) + k) * (4 + k);
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    for (let i = 0; i < 4; i++) {
      const cyc = 5, p = ((t + i * 1.3) % cyc) / cyc, x = w * (0.25 + 0.17 * i);
      if (p < 0.6) {
        const y = h * 0.1 + (sea - h * 0.1) * (p / 0.6) ** 2;
        ctx.fillStyle = C.gold;
        ctx.beginPath(); ctx.moveTo(x, y - s * 0.03); ctx.quadraticCurveTo(x + s * 0.016, y, x, y + s * 0.012); ctx.quadraticCurveTo(x - s * 0.016, y, x, y - s * 0.03); ctx.fill();
      } else {
        const rp = (p - 0.6) / 0.4;
        ctx.strokeStyle = rgba(C.gold, 1 - rp); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(x, sea, rp * s * 0.12, rp * s * 0.025, 0, 0, TAU); ctx.stroke();
        glow(ctx, x, sea + s * 0.06, s * 0.15 * rp, C.gold, (1 - rp) * 0.8);
      }
    }
  }

  /* ------------------------------------------------ silsila chain of light */
  function chain(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, n = 9, top = h * 0.12, bot = h * 0.88;
    const nodes = [];
    for (let i = 0; i < n; i++) {
      const y = bot - ((bot - top) * i) / (n - 1), x = cx + Math.sin(i * 1.3 + t * 0.4) * s * 0.08 * (1 - i / n);
      nodes.push([x, y]);
    }
    ctx.strokeStyle = rgba(C.tileSoft, 0.5); ctx.lineWidth = 1.5;
    ctx.beginPath(); nodes.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
    const p = (t % 6) / 6, idx = p * (n - 1), k = Math.floor(idx), f = idx - k;
    nodes.forEach(([x, y], i) => {
      const last = i === n - 1;
      if (last) { glow(ctx, x, y, s * 0.2, C.gold, 1); star8(ctx, x, y, s * 0.045, t * 0.2); ctx.fillStyle = C.gold; ctx.fill(); return; }
      const lit = i <= k;
      ctx.fillStyle = lit ? C.sand : rgba(C.sand, 0.3); ctx.beginPath(); ctx.arc(x, y, s * 0.014, 0, TAU); ctx.fill();
    });
    if (k < n - 1) {
      const [x1, y1] = nodes[k], [x2, y2] = nodes[k + 1];
      glow(ctx, x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, s * 0.05, C.gold);
    }
  }

  /* ------------------------------------------------ two lives converging on one light */
  function twopaths(ctx, w, h, t) {
    const s = Math.min(w, h), goal = [w / 2, h * 0.16];
    glow(ctx, goal[0], goal[1], s * 0.24, C.gold, 1);
    star8(ctx, goal[0], goal[1], s * 0.04, t * 0.2); ctx.fillStyle = C.gold; ctx.fill();
    const curves = [
      { c: C.tileSoft, p0: [w * 0.12, h * 0.95], p1: [w * 0.05, h * 0.45], p2: [w * 0.5, h * 0.55] },
      { c: C.henna, p0: [w * 0.88, h * 0.95], p1: [w * 1.0, h * 0.35], p2: [w * 0.45, h * 0.6] },
    ];
    const pt = (cv, u) => {
      // cubic: p0, p1, p2, goal
      const P = [cv.p0, cv.p1, cv.p2, goal], m = 1 - u;
      return [0, 1].map((d) => m ** 3 * P[0][d] + 3 * m * m * u * P[1][d] + 3 * m * u * u * P[2][d] + u ** 3 * P[3][d]);
    };
    curves.forEach((cv, ci) => {
      ctx.strokeStyle = rgba(cv.c, 0.45); ctx.lineWidth = 2; ctx.beginPath();
      for (let u = 0; u <= 1.001; u += 0.02) { const [x, y] = pt(cv, u); u ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      for (let k = 0; k < 7; k++) {
        const u = ((t * 0.07 + k / 7 + ci * 0.05) % 1), [x, y] = pt(cv, u);
        ctx.fillStyle = rgba(cv.c, 0.4 + u * 0.6); ctx.beginPath(); ctx.arc(x, y, 2 + u * 3, 0, TAU); ctx.fill();
      }
    });
  }

  /* ------------------------------------------------ a lamp held steady in wind */
  function lamp(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.58;
    for (let i = 0; i < 40; i++) {
      const y = h * 0.1 + rand(i) * h * 0.8, sp = 0.15 + rand(i + 5) * 0.3;
      const x = ((rand(i + 2) + t * sp) % 1.2) * w * 1.1 - w * 0.1, len = s * (0.06 + rand(i + 7) * 0.1);
      ctx.strokeStyle = rgba(C.tileSoft, 0.25); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + len / 2, y - 6, x + len, y); ctx.stroke();
    }
    // diya lamp
    ctx.fillStyle = C.henna;
    ctx.beginPath(); ctx.ellipse(cx, cy, s * 0.13, s * 0.045, 0, 0, Math.PI); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + s * 0.1, cy); ctx.quadraticCurveTo(cx + s * 0.17, cy - s * 0.01, cx + s * 0.16, cy - s * 0.03); ctx.lineTo(cx + s * 0.08, cy); ctx.fill();
    const lean = Math.sin(t * 1.3) * 0.5 + Math.sin(t * 5.1) * 0.15;
    const fx = cx + s * 0.155, fy = cy - s * 0.035;
    glow(ctx, fx, fy - s * 0.05, s * 0.28, C.gold, 0.9);
    ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(fx - s * 0.018, fy);
    ctx.quadraticCurveTo(fx - s * 0.02, fy - s * 0.06, fx + lean * s * 0.05, fy - s * 0.13);
    ctx.quadraticCurveTo(fx + s * 0.03, fy - s * 0.06, fx + s * 0.018, fy); ctx.fill();
  }

  /* ------------------------------------------------ a brilliant mind in a spinning maze */
  function voidScene(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2, cy = h / 2;
    for (let i = 0; i < 9; i++) {
      const r = s * (0.06 + i * 0.045);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * (i % 2 ? 0.3 : -0.22) * (1 + i * 0.1));
      ctx.strokeStyle = rgba(C.tileSoft, 0.15 + (i / 9) * 0.35); ctx.lineWidth = 1.2;
      ctx.strokeRect(-r, -r, r * 2, r * 2);
      ctx.restore();
    }
    // wandering, restless point that never finds the centre
    const x = cx + Math.sin(t * 1.7) * s * 0.3 + Math.sin(t * 4.1) * s * 0.05;
    const y = cy + Math.cos(t * 1.3) * s * 0.3 + Math.cos(t * 3.7) * s * 0.05;
    ctx.fillStyle = C.henna; ctx.beginPath(); ctx.arc(x, y, s * 0.012, 0, TAU); ctx.fill();
    glow(ctx, x, y, s * 0.05, C.henna);
    // a faint light at the centre he has not noticed yet
    glow(ctx, cx, cy, s * 0.06, C.gold, 0.4 + 0.2 * Math.sin(t));
  }

  /* ------------------------------------------------ complaint rising to the heavens */
  function ascend(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2;
    for (let i = 0; i < 60; i++) {
      const x = w * 0.05 + rand(i) * w * 0.9, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.8 + i));
      ctx.fillStyle = rgba(C.sand, 0.15 + tw * 0.4); ctx.fillRect(x, rand(i + 3) * h * 0.35, 2, 2);
    }
    for (let k = 0; k < 7; k++) {
      const p = ((t * 0.12 + k / 7) % 1), y = h * 0.92 - p * h * 0.85, R = s * (0.06 + p * 0.38);
      ctx.strokeStyle = rgba(p > 0.7 ? C.gold : C.tileSoft, 0.7 * (1 - p)); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, y, R, R * 0.18, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    }
    // the poet
    ctx.fillStyle = rgba(C.sand, 0.9);
    ctx.beginPath(); ctx.arc(cx, h * 0.86, s * 0.022, 0, TAU); ctx.fill();
    ctx.fillRect(cx - s * 0.02, h * 0.885, s * 0.04, s * 0.09);
    ctx.strokeStyle = rgba(C.sand, 0.9); ctx.lineWidth = s * 0.01; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx - s * 0.02, h * 0.9); ctx.lineTo(cx - s * 0.07, h * 0.83); ctx.moveTo(cx + s * 0.02, h * 0.9); ctx.lineTo(cx + s * 0.07, h * 0.83); ctx.stroke();
  }

  /* ------------------------------------------------ the reply descending */
  function descend(ctx, w, h, t) {
    const s = Math.min(w, h), cx = w / 2;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, rgba(C.gold, 0.35)); g.addColorStop(1, rgba(C.gold, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(cx - s * 0.08, 0); ctx.lineTo(cx + s * 0.08, 0); ctx.lineTo(cx + s * 0.35, h); ctx.lineTo(cx - s * 0.35, h); ctx.fill();
    for (let i = 0; i < 80; i++) {
      const sp = 0.05 + rand(i) * 0.08, p = (rand(i + 1) + t * sp) % 1;
      const x = cx + (rand(i + 2) - 0.5) * s * 0.16 * (1 + p * 4), y = p * h;
      ctx.fillStyle = rgba(C.sand, 0.8 * (1 - p * 0.6)); ctx.beginPath(); ctx.arc(x, y, 1.2 + rand(i) * 2, 0, TAU); ctx.fill();
    }
    star8(ctx, cx, h * 0.12, s * 0.05, t * 0.15); ctx.fillStyle = C.gold; ctx.fill();
    glow(ctx, cx, h * 0.12, s * 0.2, C.gold);
    // open hands receiving
    ctx.strokeStyle = rgba(C.sand, 0.85); ctx.lineWidth = s * 0.01; ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(cx, h * 0.84, s * 0.08, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    glow(ctx, cx, h * 0.86, s * 0.1, C.gold, 0.6 + 0.3 * Math.sin(t * 2));
  }

  /* ------------------------------------------------ the tavern circle and the saqi */
  function tavern(ctx, w, h, t, env) {
    const s = Math.min(w, h), cx = w / 2, cy = h * 0.58, R = s * 0.3;
    for (let i = 0; i < 5; i++) {
      const x = w * (0.18 + i * 0.16), y = h * 0.1 + Math.sin(t + i) * 4;
      ctx.strokeStyle = rgba(C.sand, 0.3); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y); ctx.stroke();
      glow(ctx, x, y + s * 0.02, s * 0.06, C.gold, 0.6);
      star8(ctx, x, y + s * 0.02, s * 0.018, 0); ctx.fillStyle = rgba(C.gold, 0.9); ctx.fill();
    }
    const cyc = 8, p = (t % cyc) / cyc, fill = Math.min(1, p * 1.6);
    const n = 10;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + Math.PI / 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * 0.45;
      const sway = Math.sin(t * 2.2 + i) * 0.12, lit = fill > 0.6 ? (fill - 0.6) / 0.4 : 0;
      glow(ctx, x, y - s * 0.04, s * 0.07, C.gold, lit);
      ctx.save(); ctx.translate(x, y); ctx.rotate(sway);
      ctx.fillStyle = rgba(C.sand, 0.55 + lit * 0.45);
      ctx.beginPath(); ctx.arc(0, -s * 0.05, s * 0.018, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, -s * 0.005, s * 0.028, s * 0.035, 0, Math.PI, TAU); ctx.fill();
      ctx.restore();
    }
    // the cup at the centre
    const cupW = s * 0.07, cupH = s * 0.08, top = cy - cupH;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(cx - cupW, top); ctx.lineTo(cx + cupW, top); ctx.lineTo(cx + cupW * 0.6, cy); ctx.lineTo(cx - cupW * 0.6, cy); ctx.closePath(); ctx.clip();
    ctx.fillStyle = rgba(C.gold, 0.9); ctx.fillRect(cx - cupW, cy - cupH * fill, cupW * 2, cupH * fill);
    ctx.restore();
    ctx.strokeStyle = C.sand; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - cupW, top); ctx.lineTo(cx - cupW * 0.6, cy); ctx.lineTo(cx + cupW * 0.6, cy); ctx.lineTo(cx + cupW, top); ctx.stroke();
    // saqi's pour from above
    if (p < 0.62) {
      ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx + s * 0.02, h * 0.2); ctx.quadraticCurveTo(cx + s * 0.01, (h * 0.2 + top) / 2, cx, top + 4); ctx.stroke();
      ctx.fillStyle = C.henna;
      ctx.beginPath(); ctx.ellipse(cx + s * 0.05, h * 0.19, s * 0.045, s * 0.03, -0.6, 0, TAU); ctx.fill();
    }
    glow(ctx, cx, top, s * (0.12 + fill * 0.2 + env.level * 0.2), C.gold, fill);
  }

  const SCENES = { whirl, path, nafs, mirror, dhikr, moth, fana, chain, twopaths, lamp, void: voidScene, ascend, descend, tavern };

  class Stage {
    constructor(canvas, sceneName, getLevel) {
      this.cv = canvas;
      this.ctx = canvas.getContext("2d");
      this.scene = SCENES[sceneName] || whirl;
      this.prev = null;
      this.fade = 1;
      this.getLevel = getLevel || (() => 0);
      this.t0 = performance.now();
      this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.visible = true;
      this._resize = () => this.resize();
      window.addEventListener("resize", this._resize);
      new IntersectionObserver((e) => { this.visible = e[0].isIntersecting; }).observe(canvas);
      this.resize();
      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }
    resize() {
      const r = this.cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      this.cv.width = Math.max(1, r.width * d);
      this.cv.height = Math.max(1, r.height * d);
      this.ctx.setTransform(d, 0, 0, d, 0, 0);
      this.w = r.width; this.h = r.height;
    }
    set(name, opts = {}) {
      const next = SCENES[name] || whirl;
      if (opts.restart) { this.shotStart = performance.now(); this.zoom = !!opts.zoom; }
      if (next === this.scene && !opts.restart) return;
      if (next !== this.scene) { this.prev = this.scene; this.fade = 0; }
      this.scene = next;
    }
    loop(now) {
      requestAnimationFrame(this.loop);
      if (!this.visible) return;
      const base = this.shotStart || this.t0;
      const t = Math.max(0, (now - base) / 1000) * (this.reduced ? 0.25 : 1);
      const env = { level: this.getLevel() };
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      if (this.zoom && !this.reduced) {
        const z = 1 + Math.min(t, 14) * 0.004;
        ctx.translate(w / 2, h / 2); ctx.scale(z, z); ctx.translate(-w / 2, -h / 2);
      }
      if (this.prev && this.fade < 1) {
        ctx.globalAlpha = 1 - this.fade; this.prev(ctx, w, h, t, env);
      }
      this.fade = Math.min(1, this.fade + 0.03);
      ctx.globalAlpha = this.fade; this.scene(ctx, w, h, t, env);
      ctx.globalAlpha = 1;
      ctx.restore();
      this.after && this.after(ctx, w, h, t);
    }
  }

  window.Stage = Stage;
  window.SUFI_SCENES = SCENES;
  window.SUFI_DRAW = { C, TAU, rgba, rand, glow, star8 };
})();
