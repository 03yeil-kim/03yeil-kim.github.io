/* =========================================================
   PRESS PLAY. — score.js
   악보 랜딩: 오선·음표 생성, PRESS PLAY 재생, 소리
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // pos: 0 = 오선 맨 아래 줄(E4), 1 = 반 칸 위, … 8 = 맨 윗줄(F5)
  // x: 왼쪽에서의 위치(%)
  const NOTES = [
    { letter: "K", x: 17, pos: 2 },
    { letter: "I", x: 26, pos: 4 },
    { letter: "M", x: 35.5, pos: 6 },
    { letter: "Y", x: 53, pos: 7, accent: true },
    { letter: "E", x: 62, pos: 5, accent: true },
    { letter: "I", x: 70.5, pos: 3, accent: true },
    { letter: "L", x: 79, pos: 1, accent: true },
  ];
  const BAR_X = 44.5;
  const START_X = 6;
  const END_X = 89;
  const DURATION = 3400; // 재생선이 지나가는 시간(ms)
  const FREQUENCIES = [329.63, 349.23, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 698.46];

  let scoreEl = null;
  let heroEl = null;
  let frame = null;
  let played = false;
  let soundOn = false;
  let audioContext = null;

  function playTone(pos) {
    if (!soundOn) return;
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === "suspended") audioContext.resume();
      const now = audioContext.currentTime;
      const frequency = FREQUENCIES[pos] || 440;
      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      gain.connect(audioContext.destination);
      [[1, "triangle", 1], [2, "sine", 0.28], [3, "sine", 0.08]].forEach(([ratio, type, level]) => {
        const osc = audioContext.createOscillator();
        const partial = audioContext.createGain();
        osc.type = type;
        osc.frequency.value = frequency * ratio;
        partial.gain.value = level;
        osc.connect(partial).connect(gain);
        osc.start(now);
        osc.stop(now + 1.7);
      });
    } catch (error) {
      /* 오디오를 지원하지 않는 환경에서는 소리 없이 진행 */
    }
  }

  function soundNote(index) {
    const note = scoreEl && scoreEl.querySelector(`.score-note[data-note="${index}"]`);
    if (!note) return;
    note.classList.add("is-sounded");
    note.classList.remove("is-ringing");
    void note.offsetWidth; // 애니메이션 재시작
    note.classList.add("is-ringing");
    playTone(NOTES[index].pos);
  }

  function stop() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = null;
    if (scoreEl && scoreEl.classList.contains("is-playing")) finish();
  }

  function finish({ natural = false } = {}) {
    if (frame) window.cancelAnimationFrame(frame);
    frame = null;
    played = true;
    scoreEl.classList.remove("is-playing");
    scoreEl.classList.add("is-played");
    scoreEl.style.setProperty("--progress", "1");
    scoreEl.querySelectorAll(".score-note").forEach((note) => note.classList.add("is-sounded"));
    heroEl.classList.add("is-played");
    const label = heroEl.querySelector(".score-play-label");
    if (label) label.textContent = "PLAY AGAIN";
    // 끝까지 재생됐을 때만 알림 → main.js가 소개 페이지로 넘김
    if (natural) document.dispatchEvent(new CustomEvent("pressplay:played"));
  }

  function play() {
    if (!scoreEl || scoreEl.classList.contains("is-playing")) return;
    scoreEl.classList.remove("is-played");
    scoreEl.classList.add("is-playing");
    scoreEl.querySelectorAll(".score-note").forEach((note) => note.classList.remove("is-sounded", "is-ringing"));

    if (reducedMotion) {
      NOTES.forEach((_, index) => soundNote(index));
      finish({ natural: true });
      return;
    }

    const startedAt = performance.now();
    let next = 0;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / DURATION, 1);
      const x = START_X + (END_X - START_X) * progress;
      scoreEl.style.setProperty("--progress", String(progress));
      while (next < NOTES.length && x >= NOTES[next].x) {
        soundNote(next);
        next += 1;
      }
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else finish({ natural: true });
    };
    frame = window.requestAnimationFrame(tick);
  }

  function buildScore() {
    const top = (pos) => `calc(${8 - pos} * var(--staff-gap) / 2)`;
    scoreEl.style.setProperty("--progress", played ? "1" : "0");
    scoreEl.style.setProperty("--start", START_X);
    scoreEl.style.setProperty("--end", END_X);
    scoreEl.innerHTML = `
      <div class="score-marks" aria-hidden="true"><span>OP. 01 — PORTFOLIO</span><span><em>♩</em> = 72 &nbsp;ANDANTE</span></div>
      <div class="score-staff">
        ${[0, 1, 2, 3, 4].map((i) => `<span class="staff-line" style="--i:${i}"></span>`).join("")}
        <span class="score-clef" aria-hidden="true">PP</span>
        <span class="score-bar" style="left:${BAR_X}%" aria-hidden="true"></span>
        <span class="score-bar score-bar--end" style="left:${END_X}%" aria-hidden="true"></span>
        <span class="score-playhead" aria-hidden="true"></span>
        ${NOTES.map((note, index) => `
          <button class="score-note${note.accent ? " is-accent" : ""}${note.pos >= 4 ? " stem-down" : ""}" type="button"
            data-note="${index}" style="left:${note.x}%; top:${top(note.pos)}; --n:${index}" aria-label="${note.letter} 음 재생">
            <span class="note-head" aria-hidden="true"></span>
            <span class="note-letter" aria-hidden="true">${note.letter}</span>
            <span class="note-ripple" aria-hidden="true"></span>
          </button>`).join("")}
      </div>`;
    scoreEl.querySelectorAll(".score-note").forEach((note) => {
      note.addEventListener("click", () => soundNote(Number(note.dataset.note)));
    });
  }

  // 다른 화면에서 돌아왔을 때: 이미 재생했다면 이름이 보이는 상태로 복원
  function restore() {
    buildScore();
    if (played) {
      scoreEl.classList.add("is-played");
      scoreEl.querySelectorAll(".score-note").forEach((note) => note.classList.add("is-sounded"));
      heroEl.classList.add("is-played");
      heroEl.querySelector(".score-play-label").textContent = "PLAY AGAIN";
    }
  }

  function init() {
    heroEl = document.querySelector(".score-hero");
    scoreEl = document.querySelector("[data-score]");
    if (!heroEl || !scoreEl) return;
    buildScore();

    heroEl.querySelector(".score-play").addEventListener("click", play);

    const soundButton = heroEl.querySelector(".sound-toggle");
    soundButton.addEventListener("click", () => {
      soundOn = !soundOn;
      soundButton.setAttribute("aria-pressed", String(soundOn));
      soundButton.querySelector("span").textContent = soundOn ? "ON" : "OFF";
      if (soundOn) playTone(4);
    });
  }

  PressPlay.score = { init, play, stop, restore, tone: playTone }; // tone: 소개 건반(stage.js)도 같은 소리·사운드 설정 사용
})();
