import "./styles.css";

const artworks = [
  {
    key: "1",
    number: "01",
    title: "Contour",
    kicker: "A study in stillness",
    description: "A single gesture holds the room. Contour follows the quiet architecture of a face before it becomes a portrait.",
    detail: "INK / DIGITAL LINE",
    year: "2026",
    variant: "contour",
  },
  {
    key: "2",
    number: "02",
    title: "Orbit",
    kicker: "Gravity, held lightly",
    description: "Two forms keep a measured distance, circling the invisible point where attention begins.",
    detail: "VECTOR / MOTION STUDY",
    year: "2026",
    variant: "orbit",
  },
  {
    key: "3",
    number: "03",
    title: "Ripple",
    kicker: "What remains after",
    description: "The surface remembers every touch. Ripple is a slow translation of sound into a line that keeps moving.",
    detail: "GENERATIVE / LINE SCORE",
    year: "2025",
    variant: "ripple",
  },
  {
    key: "4",
    number: "04",
    title: "Bloom",
    kicker: "An opening, repeated",
    description: "Four strokes lean toward one another, making a shape that feels less like an object and more like a beginning.",
    detail: "INK / OBSERVATION",
    year: "2025",
    variant: "bloom",
  },
];

const root = document.getElementById("root");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeIndex = 0;
let currentScreen = "landing";
let transitionLock = false;
let patentTimers = [];

const patentSequence = [
  { number: "01", x: 178, y: 365, label: "KEY BED", path: "M178 365 C205 345 225 310 252 275" },
  { number: "02", x: 762, y: 262, label: "FRAME", path: "M762 262 C815 248 858 270 884 315" },
  { number: "03", x: 595, y: 445, label: "SOUND BOARD", path: "M595 445 C622 410 666 379 720 353" },
  { number: "04", x: 735, y: 582, label: "DETAIL B", path: "M735 582 C778 563 820 545 854 512" },
  { number: "05", x: 510, y: 663, label: "SECTION A", path: "M510 663 C548 665 590 659 628 644" },
];

const patentFocus = [
  { x: 178, y: 365, zoom: 1.16 },
  { x: 762, y: 262, zoom: 1.2 },
  { x: 595, y: 445, zoom: 1.22 },
  { x: 735, y: 582, zoom: 1.28 },
  { x: 510, y: 663, zoom: 1.16 },
];

function clearPatentTimers() {
  patentTimers.forEach((timer) => window.clearTimeout(timer));
  patentTimers = [];
}

function setPatentCamera(index = null, { instant = false } = {}) {
  const plate = root.querySelector(".patent-plate");
  const artwork = root.querySelector(".patent-artwork");
  if (!plate || !artwork) return;

  const restingShiftX = plate.clientWidth * 0.02;
  if (index === null) {
    artwork.style.transform = `translate3d(${restingShiftX}px, 0, 0) scale(1)`;
    plate.classList.remove("is-focused");
    return;
  }

  const point = patentFocus[index];
  if (!point) return;
  const width = plate.clientWidth;
  const height = plate.clientHeight;
  const focusX = (point.x / 1000) * width;
  const focusY = (point.y / 750) * height;
  const moveX = width / 2 - focusX * point.zoom + restingShiftX;
  const moveY = height / 2 - focusY * point.zoom;
  artwork.style.transitionDuration = instant || prefersReducedMotion ? "1ms" : "980ms";
  artwork.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${point.zoom})`;
  plate.classList.add("is-focused");
}

function focusPatentStep(index) {
  clearPatentTimers();
  const overlay = root.querySelector(".patent-overlay");
  if (!overlay || !patentSequence[index]) return;
  overlay.querySelectorAll(".patent-step").forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex <= index);
  });
  const cursor = overlay.querySelector(".patent-cursor");
  const point = patentSequence[index];
  cursor?.setAttribute("transform", `translate(${point.x} ${point.y})`);
  setPatentCamera(index);
}

function patentOverlay() {
  return `
    <svg class="patent-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Patent drawing focus points">
      <g class="patent-sequence">
        ${patentSequence.map((item, index) => `
          <g class="patent-step" data-step="${index}" role="button" tabindex="0" aria-label="Focus ${item.label}">
            <path class="patent-route" pathLength="1" d="${item.path}" />
            <circle class="patent-node" cx="${item.x}" cy="${item.y}" r="5" />
            <text class="patent-number" x="${item.x + 12}" y="${item.y - 10}">${item.number}</text>
            <text class="patent-label" x="${item.x + 12}" y="${item.y + 5}">${item.label}</text>
          </g>
        `).join("")}
        <circle class="patent-cursor" cx="0" cy="0" r="6" />
      </g>
    </svg>`;
}

function playPatentSequence() {
  clearPatentTimers();
  const overlay = root.querySelector(".patent-overlay");
  if (!overlay) return;

  setPatentCamera(null, { instant: true });
  overlay.querySelectorAll(".patent-step").forEach((step) => step.classList.remove("is-active"));

  patentSequence.forEach((item, index) => {
    const timer = window.setTimeout(() => {
      const step = overlay.querySelector(`[data-step="${index}"]`);
      const cursor = overlay.querySelector(".patent-cursor");
      if (!step) return;
      step.classList.add("is-active");
      setPatentCamera(index);
      cursor?.animate(
        [{ transform: `translate(${index === 0 ? 0 : patentSequence[index - 1].x}px, ${index === 0 ? 0 : patentSequence[index - 1].y}px)` }, { transform: `translate(${item.x}px, ${item.y}px)` }],
        { duration: prefersReducedMotion ? 1 : 620, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
      );
    }, prefersReducedMotion ? index * 45 : 620 + index * 760);
    patentTimers.push(timer);
  });

  const resetTimer = window.setTimeout(() => {
    setPatentCamera(null);
    overlay.querySelectorAll(".patent-step").forEach((step) => step.classList.remove("is-active"));
  }, prefersReducedMotion ? 260 : 5300);
  patentTimers.push(resetTimer);
}

const lineArt = {
  piano: () => `
    <svg class="line-art line-art--piano" viewBox="0 0 560 480" role="img" aria-label="Piano keyboard one-line artwork">
      <g class="diagram-grid" aria-hidden="true">
        <path d="M66 101h410M66 379h410M82 88v308M464 88v308" />
        <path d="M78 119h10m-10 18h10m366-18h10m-10 18h10" />
      </g>
      <g class="diagram-piano" pathLength="1">
        <path class="art-stroke art-stroke--main" d="M120 159h71c18-31 52-49 104-49 75 0 146 32 171 84 20 41 18 91-7 128-24 36-67 55-119 55H120z" />
        <path class="art-stroke art-stroke--secondary" d="M120 159v218m0-218 29-27h60m-60 27v218m60-218v218m0-218c20-22 46-35 79-39m-79 257h177c53 0 92-17 113-49" />
        <path class="art-stroke art-stroke--fine" d="M209 172h85c72 0 127 22 166 66m-251-49h82c65 0 123 24 165 70m-247-45h77c65 0 122 25 156 69m-233-45h68c53 0 104 21 132 52" />
        <path class="art-stroke art-stroke--fine" d="M319 113c-10 36-9 72 2 108m24-101c-8 34-6 67 5 98m24-87c-6 32-3 60 8 86m22-72c-2 27 3 50 14 72m20-54c3 20 10 37 21 52" />
        <path class="art-stroke art-stroke--main" d="M120 159h71v34h25v-34h25v34h25v-34h25v34h25v-34h25v34h25v-34h25v34h25v-34h25v34h25v-34h25v34h25" />
        <path class="art-stroke art-stroke--secondary" d="M120 377h203c62 0 108-21 127-60 18-37 16-80-5-115-28-47-86-72-162-72H191" />
      </g>
      <g class="diagram-inset" aria-hidden="true">
        <rect class="art-stroke art-stroke--fine" x="103" y="399" width="105" height="42" />
        <path class="art-stroke art-stroke--fine" d="M115 414h81m-81 12h81m-61-12v12m20-12v12m20-12v12" />
        <rect class="art-stroke art-stroke--fine" x="356" y="399" width="92" height="42" />
        <circle class="art-stroke art-stroke--fine" cx="402" cy="420" r="13" />
        <path class="art-stroke art-stroke--fine" d="M402 407v26m-13-13h26" />
      </g>
      <g class="diagram-labels" aria-hidden="true">
        <text x="91" y="73">PLATE 01 / GRAND PIANO</text>
        <text x="96" y="151">KEY BED</text>
        <text x="337" y="101">SOUND BOARD</text>
        <text x="421" y="228">FRAME</text>
        <text x="111" y="465">DETAIL A</text>
        <text x="365" y="465">DETAIL B</text>
        <text class="diagram-number" x="83" y="176">01</text>
        <text class="diagram-number" x="462" y="263">02</text>
        <text class="diagram-number" x="316" y="386">03</text>
      </g>
      <circle class="art-dot art-dot--large" cx="462" cy="114" r="7" />
    </svg>`,
  contour: () => `
    <svg class="line-art line-art--contour" viewBox="0 0 560 480" role="img" aria-label="Contour one-line artwork">
      <path class="art-stroke art-stroke--main" pathLength="1" d="M286 83c-48 10-86 42-105 85-18 42-10 89 15 113 20 19 45 25 64 34 25 12 31 33 16 54-19 27-50 42-91 39-39-3-76-24-91-54-15-29-4-58 26-72 31-14 74-8 101 18 28 27 36 68 66 96 29 27 78 39 123 24 44-15 73-51 75-94 2-37-19-67-50-76-31-9-67 3-84 31-15 24-13 57 7 74" />
      <path class="art-stroke art-stroke--secondary" pathLength="1" d="M221 166c23-19 52-21 73-8 21 13 30 40 20 63-8 20-29 32-51 30-22-2-41-17-48-38-7-18-3-35 6-47Z" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M324 228c18-8 35-7 48 2m-149 7c-17 7-30 19-35 35m72 70c16 11 32 14 51 10" />
      <circle class="art-dot" cx="313" cy="198" r="4" />
    </svg>`,
  orbit: () => `
    <svg class="line-art line-art--orbit" viewBox="0 0 560 480" role="img" aria-label="Orbit one-line artwork">
      <ellipse class="art-stroke art-stroke--main" pathLength="1" cx="280" cy="240" rx="191" ry="105" />
      <ellipse class="art-stroke art-stroke--secondary" pathLength="1" cx="280" cy="240" rx="105" ry="191" transform="rotate(32 280 240)" />
      <path class="art-stroke art-stroke--main" pathLength="1" d="M107 222c44-57 101-87 173-87 72 0 130 30 174 88-43 58-101 87-174 87-72 0-130-29-173-88Z" />
      <circle class="art-stroke art-stroke--fine" pathLength="1" cx="280" cy="240" r="49" />
      <circle class="art-dot art-dot--large" cx="405" cy="158" r="7" />
      <circle class="art-dot" cx="154" cy="329" r="4" />
    </svg>`,
  ripple: () => `
    <svg class="line-art line-art--ripple" viewBox="0 0 560 480" role="img" aria-label="Ripple one-line artwork">
      <path class="art-stroke art-stroke--main" pathLength="1" d="M78 201c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
      <path class="art-stroke art-stroke--secondary" pathLength="1" d="M78 241c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
      <path class="art-stroke art-stroke--main" pathLength="1" d="M78 281c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M78 321c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M171 153c10 22 19 39 29 51m166-51c-10 22-19 39-29 51" />
      <circle class="art-dot art-dot--large" cx="280" cy="239" r="7" />
    </svg>`,
  bloom: () => `
    <svg class="line-art line-art--bloom" viewBox="0 0 560 480" role="img" aria-label="Bloom one-line artwork">
      <path class="art-stroke art-stroke--main" pathLength="1" d="M280 394c-4-87-3-165 0-234 4-80 43-119 94-118 49 1 67 45 40 76-23 27-65 35-103 42 50-4 107 5 121 42 13 36-25 67-66 65-39-2-76-27-87-67 8 52 9 113 1 194Z" />
      <path class="art-stroke art-stroke--secondary" pathLength="1" d="M280 394c4-87 3-165 0-234-4-80-43-119-94-118-49 1-67 45-40 76 23 27 65 35 103 42-50-4-107 5-121 42-13 36 25 67 66 65 39-2 76-27 87-67" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M280 160c-24 23-37 48-40 76m40-76c24 23 37 48 40 76M280 229c-25 17-42 37-51 59m51-59c25 17 42 37 51 59" />
      <circle class="art-dot" cx="280" cy="102" r="4" />
    </svg>`,
};

function renderLanding({ returning = false } = {}) {
  currentScreen = "landing";
  transitionLock = false;
  clearPatentTimers();
  root.innerHTML = `
    <div class="landing-shell ${returning ? "is-returning" : ""}">
      <header class="landing-topbar">
        <span class="landing-mark">PRESS PLAY<span>.</span></span>
        <span class="landing-edition">KIM YEIL / DESIGNER</span>
        <span class="landing-location">SEOUL — 2026</span>
      </header>
      <main class="landing-main">
        <section class="landing-intro">
          <p class="landing-overline">VISUAL DESIGNER / ART DIRECTOR</p>
          <h1>Kim<br /><em>Yeil</em></h1>
          <p class="landing-statement">A designer making quiet things<br class="desktop-break" /> move.</p>
          <p class="landing-description">Kim Yeil works across identity, objects, and moving images — finding the line between a precise idea and the feeling it leaves behind.</p>
        </section>
        <section class="landing-art" aria-label="Kim Yeil piano keyboard one-line signature artwork">
          <div class="landing-art-label landing-art-label--top">PATENT STUDY / GRAND PIANO</div>
          <div class="landing-art-label landing-art-label--side">STRUCTURAL INDEX / 01—04</div>
          <div class="patent-plate">
            <div class="patent-artwork">
              <picture>
                <source srcset="/assets/kim-yeil-piano-cutout.webp" type="image/webp" />
                <img class="landing-art-image" src="/assets/kim-yeil-piano-cutout.png" alt="Transparent grand piano technical drawing with keyboard, internal strings, and structural callouts" />
              </picture>
              ${patentOverlay()}
            </div>
          </div>
          <div class="landing-art-caption">DRAWING 01 <span>PLATE A</span></div>
        </section>
      </main>
      <footer class="landing-footer">
        <div class="landing-footer-note"><span class="landing-footer-dot"></span><span>AN INDEX OF WORKS IN MOTION</span></div>
        <button class="enter-index" type="button"><span>ENTER THE INDEX</span><span class="enter-index-arrow">↗</span></button>
        <span class="landing-key-hint">PRESS ENTER TO BEGIN</span>
      </footer>
    </div>`;

  root.querySelector(".enter-index").addEventListener("click", startIndexTransition);
  root.querySelectorAll(".patent-step").forEach((step) => {
    const focus = () => focusPatentStep(Number(step.dataset.step));
    step.addEventListener("click", focus);
    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        focus();
      }
    });
  });
  window.setTimeout(playPatentSequence, returning ? 120 : 420);
}

function startIndexTransition() {
  if (transitionLock || currentScreen !== "landing") return;
  transitionLock = true;
  clearPatentTimers();
  root.querySelector(".landing-shell")?.classList.add("is-pressing");
  root.insertAdjacentHTML("beforeend", `<div class="route-transition" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PRESS / PLAY</span></div>`);
  window.setTimeout(() => renderIndex(0, { arriving: true }), prefersReducedMotion ? 40 : 560);
}

function renderIndex(index = activeIndex, { arriving = false } = {}) {
  currentScreen = "index";
  activeIndex = index;
  transitionLock = arriving;
  clearPatentTimers();
  const artwork = artworks[activeIndex];
  root.innerHTML = `
    <div class="press-play-shell ${arriving ? "is-arriving" : ""}">
      <header class="topbar">
        <button class="wordmark" type="button" aria-label="Return to Kim Yeil introduction"><span>PRESS</span> PLAY<span class="wordmark-period">.</span></button>
        <div class="topbar-center" aria-hidden="true"><span class="topbar-rule"></span><span>KIM YEIL / SELECTED WORKS</span><span class="topbar-rule"></span></div>
        <div class="topbar-right"><button class="about-toggle" type="button">ABOUT</button><span class="edition">SEOUL — 2026</span></div>
      </header>
      <main class="gallery-main">
        <div class="gallery-index" aria-hidden="true"><span class="vertical-label">SELECTED WORK / 04</span><span class="index-line"></span><span class="index-count">${artwork.number}</span></div>
        <section class="work-copy" aria-live="polite">
          <div class="copy-topline"><span class="eyebrow">WORK ${artwork.number} / 04</span><span class="copy-status"><span class="status-dot"></span> PLAYING</span></div>
          <div class="title-wrap"><p class="work-kicker">${artwork.kicker}</p><h1>${artwork.title}</h1></div>
          <div class="copy-bottom"><p class="work-description">${artwork.description}</p><div class="work-meta"><span>${artwork.detail}</span><span>${artwork.year}</span></div></div>
        </section>
        <section class="art-stage" aria-label="${artwork.title} artwork">
          <div class="stage-corner stage-corner--tl">ONE-LINE / MOTION</div><div class="stage-corner stage-corner--br">PRESS TO PLAY</div>
          <div class="art-frame">${lineArt[artwork.variant]()}</div><div class="stage-mark" aria-hidden="true">PP<span>01—04</span></div>
        </section>
      </main>
      <footer class="key-dock">
        <div class="dock-intro"><p class="eyebrow">SELECTED WORKS</p><p class="dock-instruction">Press a key<br class="desktop-break" /> to play.</p></div>
        <div class="piano-keys" role="group" aria-label="Choose a piece">
          ${artworks.map((item, itemIndex) => `<button class="piano-key ${itemIndex === activeIndex ? "is-active is-pressed" : ""}" type="button" data-index="${itemIndex}" aria-pressed="${itemIndex === activeIndex}" aria-label="Play ${item.title}, key ${item.key}"><span class="key-cap"></span><span class="key-number">KEY ${item.key}</span><span class="key-name">${item.title}</span><span class="key-arrow">↗</span></button>`).join("")}
        </div>
        <div class="dock-side-note" aria-hidden="true"><span>01</span><span class="dock-side-line"></span><span>04</span></div>
      </footer>
      ${arriving ? `<div class="route-transition route-transition--reveal" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PLAYING 01 / 04</span></div>` : ""}
    </div>`;

  root.querySelector(".wordmark").addEventListener("click", () => renderLanding({ returning: true }));
  root.querySelector(".about-toggle").addEventListener("click", toggleAbout);
  root.querySelectorAll(".piano-key").forEach((button) => {
    button.addEventListener("click", () => renderIndex(Number(button.dataset.index)));
  });

  window.setTimeout(() => {
    root.querySelector(".piano-key.is-pressed")?.classList.remove("is-pressed");
    transitionLock = false;
    root.querySelector(".route-transition--reveal")?.remove();
  }, arriving ? (prefersReducedMotion ? 80 : 780) : (prefersReducedMotion ? 60 : 260));
}

function toggleAbout() {
  const existing = root.querySelector(".about-panel");
  if (existing) {
    existing.remove();
    root.querySelector(".about-toggle").textContent = "ABOUT";
    return;
  }
  const panel = document.createElement("aside");
  panel.className = "about-panel";
  panel.setAttribute("aria-label", "About Kim Yeil and Press Play");
  panel.innerHTML = `<p class="eyebrow">ABOUT THE PRACTICE</p><p>Kim Yeil is a Seoul-based visual designer and art director working across identity, objects, and moving images.</p><p>Press Play is a small archive of moving lines. Choose a key, give it a moment, and let the work play.</p><p class="about-note">Use the keys 1—4 or click below.</p>`;
  root.querySelector(".press-play-shell").appendChild(panel);
  root.querySelector(".about-toggle").textContent = "CLOSE";
}

window.addEventListener("keydown", (event) => {
  if (transitionLock) return;
  if (currentScreen === "landing") {
    if (event.key === "Enter" || event.key === " ") startIndexTransition();
    const focusIndex = Number(event.key) - 1;
    if (focusIndex >= 0 && focusIndex < 4) focusPatentStep(focusIndex);
    return;
  }
  if (event.repeat) return;
  const index = Number(event.key) - 1;
  if (index >= 0 && index < artworks.length) renderIndex(index);
});

renderLanding();
