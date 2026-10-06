/* SufiAudio: everything is synthesised in the browser with the Web Audio API.
   No audio files. Narration uses the Web Speech API (speechSynthesis).

   Ambience modes:
     dervish : tanpura drone in D + daf rhythm
     lamp    : tanpura in E + soft pentatonic chimes
     sky     : low drone in C + high slow bells
     qawwali : harmonium-like chord in G + dholak and handclaps
*/
(function () {
  const MODES = {
    dervish: { root: 146.83, bpm: 72, rhythm: "daf", chimes: false },
    lamp: { root: 164.81, bpm: 60, rhythm: null, chimes: true },
    sky: { root: 130.81, bpm: 48, rhythm: null, chimes: true },
    qawwali: { root: 98.0, bpm: 92, rhythm: "qawwali", chimes: false, harmonium: true },
    ney: { root: 146.83, bpm: 44, rhythm: null, chimes: false, ney: true },
    cosmos: { root: 110.0, bpm: 30, rhythm: null, chimes: true, pad: true, noPluck: true },
  };
  const MAQAM = [1, 16 / 15, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5, 2]; // a sad, Hijaz-like colour for the ney
  const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2]; // Sa Re Ga Pa Dha Sa

  class SufiAudio {
    constructor() {
      this.ctx = null;
      this.mode = "dervish";
      this.playing = false;
      this.timer = null;
      this.nextBeat = 0;
      this.beat = 0;
      this.nextPluck = 0;
      this.pluckIdx = 0;
      this.pulseOn = false;
      this.nextPulse = 0;
      this.sustain = [];
    }

    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      const c = this.ctx;
      this.master = c.createGain();
      this.master.gain.value = 0.8;
      this.duck = c.createGain();
      this.duck.gain.value = 1;
      this.reverb = c.createConvolver();
      this.reverb.buffer = this._impulse(3.2, 2.6);
      this.wet = c.createGain();
      this.wet.gain.value = 0.35;
      this.dry = c.createGain();
      this.dry.gain.value = 0.8;
      this.bus = c.createGain();
      this.bus.connect(this.dry).connect(this.duck);
      this.bus.connect(this.reverb).connect(this.wet).connect(this.duck);
      this.analyser = c.createAnalyser();
      this.analyser.fftSize = 256;
      this.duck.connect(this.master).connect(this.analyser).connect(c.destination);
    }

    _impulse(seconds, decay) {
      const c = this.ctx, len = Math.floor(c.sampleRate * seconds);
      const buf = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      return buf;
    }

    _noise(dur) {
      const c = this.ctx, len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      return src;
    }

    setMode(mode) {
      if (!MODES[mode]) mode = "dervish";
      const changed = mode !== this.mode;
      this.mode = mode;
      if (changed && this.playing) { this.stop(); this.start(); }
    }

    async start() {
      this.init();
      if (this.ctx.state === "suspended") await this.ctx.resume();
      if (this.playing) return;
      this.playing = true;
      const m = MODES[this.mode], t = this.ctx.currentTime;
      this.nextBeat = t + 0.1;
      this.nextPluck = t + 0.05;
      this.beat = 0;
      this._startSustain(m);
      this.timer = setInterval(() => this._schedule(), 60);
    }

    stop() {
      this.playing = false;
      clearInterval(this.timer);
      const t = this.ctx ? this.ctx.currentTime : 0;
      this.sustain.forEach(({ osc, gain }) => {
        gain.gain.cancelScheduledValues(t);
        gain.gain.setTargetAtTime(0, t, 0.4);
        osc.stop(t + 2);
      });
      this.sustain = [];
    }

    toggle() { return this.playing ? (this.stop(), false) : (this.start(), true); }

    /* continuous bed: soft sine drone, or harmonium chord for qawwali */
    _startSustain(m) {
      const c = this.ctx, t = c.currentTime;
      const voices = m.harmonium
        ? [[1, "sawtooth", 0.03], [1.5, "sawtooth", 0.022], [2, "sawtooth", 0.02], [1.004, "sawtooth", 0.02]]
        : m.pad
        ? [[0.5, "sine", 0.1], [1, "sine", 0.05], [1.5, "sine", 0.03], [2.002, "sine", 0.02], [3, "sine", 0.012], [4.01, "sine", 0.008]]
        : [[0.5, "sine", 0.09], [1, "sine", 0.05], [1.5, "sine", 0.025]];
      voices.forEach(([ratio, type, level]) => {
        const osc = c.createOscillator();
        osc.type = type;
        osc.frequency.value = m.root * ratio;
        const lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = m.harmonium ? 1400 : 900;
        const gain = c.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(level, t + 3);
        // slow breathing swell
        const lfo = c.createOscillator();
        lfo.frequency.value = 0.08 + Math.random() * 0.05;
        const lfoG = c.createGain();
        lfoG.gain.value = level * 0.35;
        lfo.connect(lfoG).connect(gain.gain);
        lfo.start();
        osc.connect(lp).connect(gain).connect(this.bus);
        osc.start();
        this.sustain.push({ osc, gain }, { osc: lfo, gain: lfoG });
      });
    }

    _schedule() {
      const c = this.ctx, m = MODES[this.mode], ahead = c.currentTime + 0.25;
      // tanpura cycle: Pa, Sa', Sa', Sa
      if (!m.harmonium && !m.noPluck) {
        const cycle = [1.5, 2, 2, 1];
        while (this.nextPluck < ahead) {
          this._pluck(m.root * cycle[this.pluckIdx % 4], this.nextPluck);
          this.pluckIdx++;
          this.nextPluck += (this.pluckIdx % 4 === 0 ? 1.6 : 0.9);
        }
      }
      const spb = 60 / m.bpm;
      while (this.nextBeat < ahead) {
        if (m.rhythm === "daf") this._dafPattern(this.beat, this.nextBeat, spb);
        if (m.rhythm === "qawwali") this._qawwaliPattern(this.beat, this.nextBeat, spb);
        if (m.ney && this.beat % 3 === 0 && Math.random() < 0.85) {
          this.neyStep = Math.max(0, Math.min(MAQAM.length - 1, (this.neyStep || 3) + [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)]));
          this._ney(m.root * 2 * MAQAM[this.neyStep], this.nextBeat, spb * (2 + Math.random() * 2));
        }
        if (m.chimes && Math.random() < 0.35) {
          const r = PENTA[Math.floor(Math.random() * PENTA.length)];
          this._chime(m.root * 4 * r, this.nextBeat, this.mode === "sky" ? 0.05 : 0.04);
        }
        this.beat++;
        this.nextBeat += spb;
      }
      if (this.pulseOn) {
        // dhikr heartbeat matched to an 8 second breath cycle: 2 pulses per second of rhythm
        while (this.nextPulse < ahead) {
          this._thump(this.nextPulse, 70, 0.5);
          this._thump(this.nextPulse + 0.22, 62, 0.32);
          this.nextPulse += 1.0;
        }
      }
    }

    _pluck(freq, t) {
      const c = this.ctx;
      const osc = c.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      const osc2 = c.createOscillator(); // jawari buzz shimmer
      osc2.type = "triangle";
      osc2.frequency.value = freq * 2.003;
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.Q.value = 6;
      lp.frequency.setValueAtTime(3200, t);
      lp.frequency.exponentialRampToValueAtTime(500, t + 2.5);
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.06, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 3.4);
      osc.connect(lp); osc2.connect(lp);
      lp.connect(g).connect(this.bus);
      osc.start(t); osc2.start(t);
      osc.stop(t + 3.5); osc2.stop(t + 3.5);
    }

    /* breathy reed flute: sine with vibrato plus band-passed breath noise */
    _ney(freq, t, dur) {
      const c = this.ctx;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 0.985, t);
      osc.frequency.linearRampToValueAtTime(freq, t + 0.25);
      const vib = c.createOscillator();
      vib.frequency.value = 5.2;
      const vibG = c.createGain();
      vibG.gain.setValueAtTime(0, t);
      vibG.gain.linearRampToValueAtTime(freq * 0.008, t + dur * 0.5);
      vib.connect(vibG).connect(osc.frequency);
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.07, t + 0.3);
      g.gain.setValueAtTime(0.07, t + dur * 0.7);
      g.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(g).connect(this.bus);
      const n = this._noise(dur);
      const bp = c.createBiquadFilter();
      bp.type = "bandpass"; bp.frequency.value = freq * 2; bp.Q.value = 7;
      const ng = c.createGain();
      ng.gain.setValueAtTime(0, t);
      ng.gain.linearRampToValueAtTime(0.05, t + 0.15);
      ng.gain.linearRampToValueAtTime(0.012, t + dur * 0.6);
      ng.gain.linearRampToValueAtTime(0, t + dur);
      n.connect(bp).connect(ng).connect(this.bus);
      osc.start(t); vib.start(t); n.start(t);
      osc.stop(t + dur + 0.05); vib.stop(t + dur + 0.05);
    }

    _thump(t, freq, level) {
      const c = this.ctx;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 2.2, t);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.08);
      const g = c.createGain();
      g.gain.setValueAtTime(level, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(g).connect(this.bus);
      osc.start(t);
      osc.stop(t + 0.5);
    }

    _slap(t, center, level, dur = 0.12) {
      const c = this.ctx;
      const n = this._noise(dur);
      const bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = center;
      bp.Q.value = 1.4;
      const g = c.createGain();
      g.gain.setValueAtTime(level, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      n.connect(bp).connect(g).connect(this.bus);
      n.start(t);
    }

    _clap(t, level) {
      // three tiny bursts make a hand clap
      [0, 0.011, 0.022].forEach((o, i) => this._slap(t + o, 1300, level * (i === 2 ? 1 : 0.6), i === 2 ? 0.16 : 0.03));
    }

    _dafPattern(beat, t, spb) {
      const b = beat % 4;
      if (b === 0) this._thump(t, 58, 0.7);
      if (b === 1) this._slap(t + spb / 2, 2400, 0.12);
      if (b === 2) { this._thump(t, 58, 0.45); this._slap(t, 900, 0.18); }
      if (b === 3) { this._slap(t, 2400, 0.1); this._slap(t + spb / 2, 2400, 0.08); }
    }

    _qawwaliPattern(beat, t, spb) {
      const b = beat % 4;
      if (b === 0) this._thump(t, 75, 0.6);
      if (b === 1 || b === 3) this._clap(t, 0.32);
      if (b === 2) { this._thump(t, 75, 0.35); this._slap(t + spb / 2, 3000, 0.08); }
      this._slap(t + spb * 0.75, 3500, 0.04, 0.05);
    }

    _chime(freq, t, level) {
      const c = this.ctx;
      [1, 2.76, 5.4].forEach((h, i) => {
        const osc = c.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq * h;
        const g = c.createGain();
        const l = level / (i * 2 + 1);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(l, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0005, t + 3 - i);
        osc.connect(g).connect(this.bus);
        osc.start(t);
        osc.stop(t + 3.1);
      });
    }

    /* one-off bell when the visual scene changes */
    bell() {
      if (!this.ctx || !this.playing) return;
      const m = MODES[this.mode];
      this._chime(m.root * 4, this.ctx.currentTime + 0.02, 0.06);
    }

    setPulse(on) {
      this.init();
      if (on && !this.playing) this.start();
      this.pulseOn = on;
      this.nextPulse = this.ctx.currentTime + 0.1;
    }

    setDuck(on) {
      if (!this.ctx) return;
      this.duck.gain.setTargetAtTime(on ? 0.3 : 1, this.ctx.currentTime, 0.3);
    }

    setVolume(v) { this.init(); this.master.gain.value = v; }

    level() {
      if (!this.analyser) return 0;
      const a = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(a);
      let s = 0;
      for (let i = 0; i < a.length; i++) s += a[i];
      return s / a.length / 255;
    }
  }

  /* ---------------- Narrator: Web Speech API */
  class Narrator {
    constructor(audio) {
      this.audio = audio;
      this.synth = window.speechSynthesis || null;
      this.voices = [];
      this.voice = null;
      this.rate = 0.92;
      this.queue = [];
      this.onstate = () => {};
      if (this.synth) {
        const load = () => { this.voices = this.synth.getVoices(); this.onvoices && this.onvoices(this.voices); };
        load();
        this.synth.onvoiceschanged = load;
      }
    }

    get supported() { return !!this.synth; }

    englishVoices() {
      return this.voices.filter((v) => /^en/i.test(v.lang));
    }

    urduVoice() {
      return this.voices.find((v) => /^ur/i.test(v.lang)) || null;
    }

    speak(text, { lang = "en", onstart, onend } = {}) {
      if (!this.synth) return Promise.resolve();
      return new Promise((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = this.rate;
        u.pitch = 0.95;
        if (lang === "ur") {
          const v = this.urduVoice();
          if (v) { u.voice = v; u.lang = v.lang; }
        } else if (this.voice) {
          u.voice = this.voice; u.lang = this.voice.lang;
        } else {
          u.lang = "en-GB";
        }
        u.onstart = () => { this.audio.setDuck(true); this.onstate("speaking"); onstart && onstart(); };
        const done = () => { this.audio.setDuck(false); this.onstate("idle"); onend && onend(); resolve(); };
        u.onend = done;
        u.onerror = done;
        this.synth.speak(u);
      });
    }

    async speakAll(items, hooks = {}) {
      this.cancel();
      this.running = true;
      for (const it of items) {
        if (!this.running) break;
        hooks.before && hooks.before(it);
        await this.speak(it.text, { lang: it.lang });
        hooks.after && hooks.after(it);
        if (!this.running) break;
        await new Promise((r) => setTimeout(r, 500));
      }
      this.running = false;
      hooks.done && hooks.done();
    }

    cancel() {
      this.running = false;
      if (this.synth) this.synth.cancel();
      this.audio.setDuck(false);
      this.onstate("idle");
    }
  }

  window.SufiAudio = SufiAudio;
  window.Narrator = Narrator;
})();
