/* =========================================================
   PRESS PLAY. — drawing.js
   소개(I · Analyze)의 피아노 특허 도면: 01→05 포인트 시퀀스, 확대 카메라, 건반 프레이즈
   재생은 stage.js가 I 건반을 눌렀을 때 play()로 시작
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 도면 좌표계: 1000 × 750
  const STEPS = [
    { number: "01", x: 178, y: 365, label: "KEY BED", path: "M178 365 C205 345 225 310 252 275", zoom: 1.16 },
    { number: "02", x: 762, y: 262, label: "FRAME", path: "M762 262 C815 248 858 270 884 315", zoom: 1.2 },
    { number: "03", x: 595, y: 445, label: "SOUND BOARD", path: "M595 445 C622 410 666 379 720 353", zoom: 1.22 },
    { number: "04", x: 735, y: 582, label: "DETAIL B", path: "M735 582 C778 563 820 545 854 512", zoom: 1.28 },
    { number: "05", x: 510, y: 663, label: "SECTION A", path: "M510 663 C548 665 590 659 628 644", zoom: 1.16 },
  ];
  const PHRASES = [
    [0, 2, 4, 7, 5, 3],
    [8, 10, 12, 14, 12, 10],
    [3, 6, 9, 11, 9, 6],
    [14, 12, 10, 8, 7, 5],
    [1, 4, 7, 10, 8, 5],
  ];
  const RHYTHM = [0, 125, 275, 445, 625, 790];

  let section = null;
  let plate = null;
  let artwork = null;
  let stepTimers = [];
  let keyTimers = [];
  let loopTimer = null;
  let active = false;
  let observer = null;

  function clearStepTimers() {
    stepTimers.forEach((t) => window.clearTimeout(t));
    stepTimers = [];
  }

  function clearKeyTimers() {
    keyTimers.forEach((t) => window.clearTimeout(t));
    keyTimers = [];
    if (loopTimer) window.clearTimeout(loopTimer);
    loopTimer = null;
    section && section.querySelectorAll(".keyboard-key.is-playing").forEach((key) => key.classList.remove("is-playing"));
  }

  function keyboardOverlay() {
    const keyHeight = 32;
    return `
      <svg class="keyboard-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g class="keyboard-sequence">
          ${Array.from({ length: 18 }, (_, i) => `<rect class="keyboard-key" data-key="${i}" x="132" y="${108 + i * keyHeight}" width="82" height="${keyHeight - 2}" rx="1" />`).join("")}
          <path class="keyboard-spine" d="M216 108V684" />
        </g>
      </svg>`;
  }

  function patentOverlay() {
    return `
      <svg class="patent-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" role="group" aria-label="피아노 도면 포인트">
        <g class="patent-sequence">
          ${STEPS.map((item, index) => `
            <g class="patent-step" data-step="${index}" role="button" tabindex="0" aria-label="${item.label} 확대">
              <path class="patent-route" pathLength="1" d="${item.path}" />
              <circle class="patent-node" cx="${item.x}" cy="${item.y}" r="5" />
              <text class="patent-number" x="${item.x + 12}" y="${item.y - 10}">${item.number}</text>
              <text class="patent-label" x="${item.x + 12}" y="${item.y + 5}">${item.label}</text>
            </g>`).join("")}
          <circle class="patent-cursor" cx="0" cy="0" r="6" />
        </g>
      </svg>`;
  }

  function playPhrase(index, { keepLoop = false } = {}) {
    if (!keepLoop) clearKeyTimers();
    const overlay = section.querySelector(".keyboard-overlay");
    if (!overlay) return;
    (PHRASES[index] || PHRASES[0]).forEach((keyIndex, noteIndex) => {
      keyTimers.push(window.setTimeout(() => {
        const key = overlay.querySelector(`[data-key="${keyIndex}"]`);
        if (!key) return;
        key.classList.remove("is-playing");
        void key.getBoundingClientRect();
        key.classList.add("is-playing");
        keyTimers.push(window.setTimeout(() => key.classList.remove("is-playing"), reducedMotion ? 1 : 330));
      }, reducedMotion ? noteIndex * 30 : RHYTHM[noteIndex]));
    });
  }

  function startLoop() {
    clearKeyTimers();
    let index = 0;
    const next = () => {
      if (!active) return;
      playPhrase(index, { keepLoop: true });
      index = (index + 1) % PHRASES.length;
      loopTimer = window.setTimeout(next, reducedMotion ? 900 : 1850);
    };
    next();
  }

  function setCamera(index = null, { instant = false } = {}) {
    if (!plate || !artwork) return;
    const restX = plate.clientWidth * 0.02;
    if (index === null) {
      artwork.style.transform = `translate3d(${restX}px, 0, 0) scale(1)`;
      plate.classList.remove("is-focused");
      return;
    }
    const point = STEPS[index];
    const width = plate.clientWidth;
    const height = plate.clientHeight;
    const moveX = width / 2 - (point.x / 1000) * width * point.zoom + restX;
    const moveY = height / 2 - (point.y / 750) * height * point.zoom;
    artwork.style.transitionDuration = instant || reducedMotion ? "1ms" : "980ms";
    artwork.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${point.zoom})`;
    plate.classList.add("is-focused");
  }

  function focusStep(index) {
    if (!section || !STEPS[index]) return;
    clearStepTimers();
    playPhrase(index);
    section.querySelectorAll(".patent-step").forEach((step, i) => step.classList.toggle("is-active", i <= index));
    section.querySelector(".patent-cursor")?.setAttribute("transform", `translate(${STEPS[index].x} ${STEPS[index].y})`);
    setCamera(index);
  }

  function playSequence() {
    if (!section) return;
    active = true;
    clearStepTimers();
    clearKeyTimers();
    setCamera(null, { instant: true });
    const steps = section.querySelectorAll(".patent-step");
    steps.forEach((step) => step.classList.remove("is-active"));

    STEPS.forEach((item, index) => {
      stepTimers.push(window.setTimeout(() => {
        steps[index].classList.add("is-active");
        setCamera(index);
        playPhrase(index);
        const prev = index === 0 ? { x: 0, y: 0 } : STEPS[index - 1];
        section.querySelector(".patent-cursor")?.animate(
          [{ transform: `translate(${prev.x}px, ${prev.y}px)` }, { transform: `translate(${item.x}px, ${item.y}px)` }],
          { duration: reducedMotion ? 1 : 620, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
        );
      }, reducedMotion ? index * 45 : 620 + index * 920));
    });

    stepTimers.push(window.setTimeout(() => {
      setCamera(null);
      steps.forEach((step) => step.classList.remove("is-active"));
      startLoop();
    }, reducedMotion ? 260 : 6000));
  }

  function stop() {
    active = false;
    clearStepTimers();
    clearKeyTimers();
    observer && observer.disconnect();
  }

  // 도면이 화면에 보이면 시퀀스를 한 번 재생
  function watch() {
    if (!section) return;
    observer && observer.disconnect();
    if (!("IntersectionObserver" in window)) {
      playSequence();
      return;
    }
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        playSequence();
      }
    }, { threshold: 0.45 });
    observer.observe(section);
  }

  function init() {
    section = document.querySelector("[data-drawing]");
    if (!section) return;
    plate = section.querySelector(".patent-plate");
    artwork = section.querySelector(".patent-artwork");
    artwork.insertAdjacentHTML("beforeend", keyboardOverlay() + patentOverlay());

    section.querySelectorAll(".patent-step").forEach((step) => {
      const focus = () => focusStep(Number(step.dataset.step));
      step.addEventListener("click", focus);
      step.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focus();
        }
      });
    });
  }

  PressPlay.drawing = { init, watch, play: playSequence, stop, focusStep, stepCount: STEPS.length };
})();
