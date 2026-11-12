/* =========================================================
   PRESS PLAY. — stage.js
   02 ABOUT: 연주하는 소개
   - 건반 K I M Y E I L을 누르면 소리(랜딩 사운드 설정을 따름)와 함께 무대에 소개 조각이 펼쳐짐
   - I(Analyze): 피아노 도면 시퀀스 연주
   - M(Selected works): 작품은 인덱스에만 — 인덱스로 안내
   - Y(Behind the score): 화면에 레이아웃 그리드가 겹쳐짐
   - 건반 7개를 모두 연주하면 앙코르 (한 번)
   - 아무것도 누르지 않고 잠시 두면 타이틀(Kim Yeil.)로 돌아감
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const KEY_COUNT = 7;
  const TONES = [0, 1, 2, 3, 4, 5, 6]; // score.js FREQUENCIES 위치 (E F G A B C D)
  const SHORTCUTS = ["a", "s", "d", "f", "g", "h", "j"];
  const IDLE_MS = 20000;              // 이 시간 동안 아무것도 안 하면 타이틀로

  let root = null;
  let section = null;
  let stage = null;
  let keys = [];
  let panels = {};
  let current = "title";
  let played = new Set();
  let encored = false;
  let encoreTimer = null;
  let idleTimer = null;
  let hovering = false;
  let options = {};

  const tone = (pos) => PressPlay.score && PressPlay.score.tone && PressPlay.score.tone(pos);

  function setPanel(name) {
    if (current === name) return;
    const leaving = current;
    current = name;
    Object.entries(panels).forEach(([key, panel]) => panel.classList.toggle("is-on", key === String(name)));
    stage.classList.toggle("is-title", name === "title");
    stage.classList.toggle("is-encore", name === "encore");
    stage.dataset.spot = typeof name === "number" ? String(name) : ""; // 조명 위치 (css/about.css)

    // I(Analyze)를 떠나면 도면 정지, 들어오면 처음부터 재생
    if (String(leaving) === "1") {
      PressPlay.drawing && PressPlay.drawing.stop();
    }
    if (String(name) === "1") {
      // 패널이 보이고 크기가 잡힌 뒤 재생
      window.requestAnimationFrame(() => PressPlay.drawing && PressPlay.drawing.play());
    }
    // Y(Behind the score)에서만 그리드
    section.classList.toggle("is-grid", String(name) === "3");
  }

  function markKey(index) {
    keys.forEach((key, i) => {
      const on = i === index;
      key.classList.toggle("is-current", on);
      key.setAttribute("aria-pressed", String(on));
    });
  }

  function hitAnimation(key) {
    key.classList.remove("is-hit");
    void key.offsetWidth;
    key.classList.add("is-hit");
    window.setTimeout(() => key.classList.remove("is-hit"), 220);
  }

  function updateProgress() {
    root.querySelector("[data-pa-count]").textContent = played.size;
    root.querySelectorAll(".pa-progress i").forEach((dot, i) => dot.classList.toggle("is-on", played.has(i)));
  }

  function press(index) {
    if (!root || index < 0 || index >= KEY_COUNT) return;
    const key = keys[index];
    hitAnimation(key);
    tone(TONES[index]);
    markKey(index);

    played.add(index);
    updateProgress();
    window.clearTimeout(encoreTimer);
    setPanel(index);

    // 7개를 모두 연주하면: 마지막 조각을 잠깐 보여준 뒤 앙코르
    if (!encored && played.size === KEY_COUNT) {
      encored = true;
      encoreTimer = window.setTimeout(encore, reducedMotion ? 600 : 2200);
    }
    armIdle();
  }

  function encore() {
    [5, 7, 8, 7].forEach((pos, i) => window.setTimeout(() => tone(pos), reducedMotion ? 0 : 120 + i * 130));
    markKey(-1);
    setPanel("encore");
    if (!reducedMotion) sparks();
  }

  function sparks() {
    const rect = stage.getBoundingClientRect();
    for (let i = 0; i < 34; i += 1) {
      const spark = document.createElement("i");
      spark.className = "pa-spark";
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.setProperty("--hue", Math.random() > 0.35 ? "var(--accent)" : "var(--accent-2)");
      stage.appendChild(spark);
      const rise = rect.height * (0.35 + Math.random() * 0.5);
      spark.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${(Math.random() - 0.5) * 140}px, ${-rise}px) scale(0.4)`, opacity: 0 },
        ],
        { duration: 1000 + Math.random() * 900, easing: "cubic-bezier(.2,.8,.2,1)", delay: Math.random() * 180 },
      ).onfinish = () => spark.remove();
    }
  }

  function home() {
    markKey(-1);
    setPanel("title");
    window.clearTimeout(idleTimer);
  }

  function armIdle() {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      if (hovering || current === "title") return armIdle();
      home();
    }, IDLE_MS);
  }

  // main.js의 키보드 처리에서 호출: 처리했으면 true
  function handleKey(event) {
    if (!root || event.metaKey || event.ctrlKey || event.altKey) return false;
    const index = SHORTCUTS.indexOf(event.key.toLowerCase());
    if (index < 0) return false;
    event.preventDefault();
    press(index);
    return true;
  }

  function reset() {
    window.clearTimeout(idleTimer);
    window.clearTimeout(encoreTimer);
    if (!root) return;
    home();
  }

  function init(opts = {}) {
    options = opts;
    root = document.querySelector("[data-play-about]");
    if (!root) return;
    section = root.closest(".about-section");
    stage = root.querySelector("[data-pa-stage]");
    keys = Array.from(root.querySelectorAll("[data-pa-key]"));
    root.querySelectorAll("[data-panel]").forEach((panel) => { panels[panel.dataset.panel] = panel; });

    keys.forEach((key, i) => key.addEventListener("click", () => press(i)));
    root.querySelector("[data-pa-home]").addEventListener("click", home);
    root.querySelectorAll("[data-pa-work]").forEach((button) => {
      button.addEventListener("click", () => options.openWork && options.openWork(Number(button.dataset.paWork)));
    });
    stage.addEventListener("pointerenter", () => { hovering = true; });
    stage.addEventListener("pointerleave", () => { hovering = false; });

    root.classList.add("is-live"); // 스크립트가 있을 때만 무대 모드
    stage.classList.add("is-title");
  }

  PressPlay.aboutStage = { init, press, reset, handleKey };
})();
