/* Film: plays a sequence of animated shots with subtitles, narration and ambience.
   Each shot: { scene, caption, narration?, ur?, roman?, credit?, dur? } */
(function () {
  const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  class Film {
    constructor(root, film, { audio, narrator, ambience }) {
      this.root = root;
      this.film = film;
      this.audio = audio;
      this.narrator = narrator;
      this.ambience = ambience;
      this.idx = -1;
      this.playing = false;
      this.token = 0;
      this.sound = true;
      this.render();
      this.stage = new Stage(this.$(".film-canvas"), film.shots[0].scene, () => audio.level());
      this.stage.zoom = true;
    }

    $(s) { return this.root.querySelector(s); }

    render() {
      const f = this.film;
      this.root.innerHTML = `
        <div class="film-head">
          <h2>${esc(f.title)}</h2>
          <p>${esc(f.intro)}</p>
        </div>
        <div class="film" tabindex="-1">
          <div class="film-screen">
            <canvas class="film-canvas" aria-hidden="true"></canvas>
            <div class="film-vignette"></div>
            <div class="film-card"><span>${esc(f.title)}</span><button class="btn film-start">Play film</button></div>
          </div>
          <div class="film-sub" aria-live="polite">
            <p class="f-ur" lang="ur"></p>
            <p class="f-roman"></p>
            <p class="f-cap"></p>
            <p class="f-credit"></p>
          </div>
        </div>
        <div class="film-controls">
          <button class="small-btn f-prev" aria-label="Previous shot">Previous</button>
          <button class="btn f-play">Play</button>
          <button class="small-btn f-next" aria-label="Next shot">Next</button>
          <button class="small-btn f-sound" aria-pressed="true">Sound on</button>
          <div class="f-timeline" role="tablist" aria-label="Shots">
            ${f.shots.map((s, i) => `<button class="f-seg" role="tab" data-i="${i}" aria-label="Shot ${i + 1}"><i></i></button>`).join("")}
          </div>
          <span class="f-count">0 / ${f.shots.length}</span>
        </div>`;
      this.$(".film-start").onclick = () => this.play(0);
      this.$(".f-play").onclick = () => (this.playing ? this.pause() : this.play(this.idx < 0 ? 0 : this.idx));
      this.$(".f-next").onclick = () => this.play(Math.min(this.idx + 1, this.film.shots.length - 1));
      this.$(".f-prev").onclick = () => this.play(Math.max(this.idx - 1, 0));
      this.$(".f-sound").onclick = (e) => {
        this.sound = !this.sound;
        e.target.setAttribute("aria-pressed", this.sound);
        e.target.textContent = this.sound ? "Sound on" : "Sound off";
        if (!this.sound) { this.narrator.cancel(); this.audio.stop(); }
        else if (this.playing) this.play(this.idx);
      };
      this.$(".f-timeline").onclick = (e) => {
        const b = e.target.closest(".f-seg");
        if (b) this.play(+b.dataset.i);
      };
    }

    async play(i) {
      this.playing = true;
      this.$(".f-play").textContent = "Pause";
      this.$(".film-card").classList.add("hide");
      if (this.sound) {
        this.audio.setMode(this.ambience);
        await this.audio.start();
        this.onsound && this.onsound();
      }
      this.runFrom(i);
    }

    pause() {
      this.playing = false;
      this.token++;
      this.narrator.cancel();
      this.$(".f-play").textContent = "Play";
    }

    async runFrom(i) {
      const my = ++this.token;
      const shots = this.film.shots;
      for (let k = i; k < shots.length; k++) {
        if (my !== this.token) return;
        await this.shot(k, my);
      }
      if (my !== this.token) return;
      this.end();
    }

    showShot(i) {
      const s = this.film.shots[i];
      this.idx = i;
      this.stage.set(s.scene, { restart: true, zoom: true });
      this.audio.bell();
      const sub = this.$(".film-sub");
      sub.classList.remove("in");
      void sub.offsetWidth; // restart the reveal animation
      this.$(".f-ur").textContent = s.ur || "";
      this.$(".f-roman").textContent = s.roman || "";
      this.$(".f-cap").textContent = s.caption || "";
      this.$(".f-credit").textContent = s.credit || "";
      sub.classList.toggle("has-verse", !!s.ur);
      sub.classList.add("in");
      this.root.querySelectorAll(".f-seg").forEach((b, k) => {
        b.classList.toggle("done", k < i);
        b.classList.toggle("now", k === i);
        b.style.setProperty("--d", `${s.dur || 8}s`);
      });
      this.$(".f-count").textContent = `${i + 1} / ${this.film.shots.length}`;
    }

    async shot(i, my) {
      const s = this.film.shots[i];
      this.showShot(i);
      const minMs = (s.dur || 8) * 1000;
      const started = performance.now();
      const say = s.narration || s.caption;
      if (this.sound && this.narrator.supported) {
        this.narrator.cancel();
        await wait(400);
        if (my !== this.token) return;
        if (s.ur && this.narrator.urduVoice()) {
          await this.narrator.speak(s.ur.replace(/\n/g, "، "), { lang: "ur" });
          if (my !== this.token) return;
        }
        await this.narrator.speak(say);
      } else {
        // silent mode: time the shot by reading length
        await wait(Math.max(minMs, say.split(/\s+/).length * 380));
      }
      const left = minMs - (performance.now() - started);
      if (left > 0) await wait(left);
      await wait(700);
    }

    end() {
      this.playing = false;
      this.$(".f-play").textContent = "Play again";
      this.idx = -1;
      const card = this.$(".film-card");
      card.querySelector("span").textContent = "The end";
      card.querySelector(".film-start").textContent = "Watch again";
      card.classList.remove("hide");
      this.$(".film-sub").classList.remove("in");
      this.root.querySelectorAll(".f-seg").forEach((b) => { b.classList.add("done"); b.classList.remove("now"); });
    }
  }

  window.Film = Film;
})();
