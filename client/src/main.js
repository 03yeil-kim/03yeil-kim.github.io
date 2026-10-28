import "./styles.css";

const artworks = [
  {
    key: "1", number: "01", title: "Culture Pass", shortTitle: "경기컬처패스 리디자인",
    kicker: "Culture in your everyday.",
    description: "좋아하는 문화를 더 가까이, 더 편리하게. 문화 혜택 탐색부터 쿠폰 사용까지 이어지는 웹·모바일 경험을 설계했습니다.",
    detail: "UI/UX DESIGN · WEB + MOBILE", year: "2026", variant: "contour",
    gallery: [
      { kind: "prototype", src: "/prototypes/culturepass-prototype.html", alt: "경기컬처패스 모바일 및 인터랙션 프로토타입", label: "INTERACTION PREVIEW" },
    ],
    project: { client: "경기컬처패스", role: "UI/UX Design", medium: "Web + Mobile", url: "", overview: "컬처패스의 주요 화면을 웹과 모바일로 확장한 인터랙티브 데모입니다. 사용자가 문화 혜택을 탐색하고 쿠폰 상세를 확인한 뒤 제휴사로 이동하는 흐름을 한눈에 이해하도록 구성했습니다.", focus: ["혜택 탐색", "쿠폰 상세", "번호 복사", "반응형 화면"] },
  },
  {
    key: "2", number: "02", title: "BITE", shortTitle: "BITE 콘텐츠 추천 앱",
    kicker: "Small bites, brighter days.",
    description: "식사 시간과 이동 시간 사이, 지금의 여유에 맞는 콘텐츠를 발견하는 시간 기반 추천 앱입니다.",
    detail: "APP UX/UI · CONTENT DISCOVERY", year: "2026", variant: "orbit",
    gallery: [
      { kind: "image", src: "/assets/bite-portfolio-overview.png", alt: "BITE 콘텐츠 추천 앱의 홈, 재생, 취향 화면", label: "PROJECT OVERVIEW" },
    ],
    project: { client: "BITE", role: "UX/UI Design", medium: "Content Discovery App", url: "", overview: "BITE는 사용자가 설정한 식사·이동 시간과 상황에 맞춰 부담 없이 볼 수 있는 영상 콘텐츠를 제안하는 앱 콘셉트입니다. 추천 이유와 예상 시청 시간을 함께 보여줍니다.", focus: ["시간 기반 추천", "식사·이동 상황", "취향 설정", "저장 콘텐츠"] },
  },
  {
    key: "3", number: "03", title: "STILL", shortTitle: "STILL 비주얼 저널 랜딩페이지",
    kicker: "익숙한 순간, 새로운 시선.",
    description: "건축과 일상의 장면을 따라 시선이 흐르는 비주얼 저널. 절제된 타이포그래피와 이미지 시퀀스로 감상의 리듬을 만들었습니다.",
    detail: "WEB DESIGN · INTERACTION · RESPONSIVE", year: "2026", variant: "bloom",
    gallery: [
      { kind: "image", src: "/assets/STILL-portfolio-overview.png", alt: "STILL 비주얼 저널의 데스크톱과 모바일 반응형 랜딩페이지", label: "PROJECT OVERVIEW" },
    ],
    project: { client: "STILL", role: "Web Design / Interaction", medium: "Responsive Web", url: "", overview: "STILL은 익숙한 장면을 새로운 시선으로 바라보게 하는 비주얼 저널 웹사이트 콘셉트입니다. 큰 제목과 넉넉한 여백, 이미지 시퀀스로 편집적인 인상을 만들었습니다.", focus: ["비주얼 저널", "순차 등장 애니메이션", "스크롤 인터랙션", "반응형 웹"] },
  },
];

const root = document.getElementById("root");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeIndex = 0;
let currentScreen = "landing";
let transitionLock = false;
let patentTimers = [];
let keyboardTimers = [];
let keyboardLoopTimer = null;

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

const keyboardPhrases = [
  [0, 2, 4, 7, 5, 3],
  [8, 10, 12, 14, 12, 10],
  [3, 6, 9, 11, 9, 6],
  [14, 12, 10, 8, 7, 5],
  [1, 4, 7, 10, 8, 5],
];

const keyboardRhythm = [0, 125, 275, 445, 625, 790];

function clearPatentTimers() {
  patentTimers.forEach((timer) => window.clearTimeout(timer));
  patentTimers = [];
}

function clearKeyboardTimers() {
  keyboardTimers.forEach((timer) => window.clearTimeout(timer));
  keyboardTimers = [];
  if (keyboardLoopTimer) {
    window.clearTimeout(keyboardLoopTimer);
    keyboardLoopTimer = null;
  }
  root.querySelectorAll(".keyboard-key.is-playing").forEach((key) => key.classList.remove("is-playing"));
}

function keyboardOverlay() {
  const keyCount = 18;
  const startY = 108;
  const keyHeight = 32;
  return `
    <svg class="keyboard-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g class="keyboard-sequence">
        ${Array.from({ length: keyCount }, (_, index) => `
          <rect class="keyboard-key" data-key="${index}" x="132" y="${startY + index * keyHeight}" width="82" height="${keyHeight - 2}" rx="1" />
        `).join("")}
        <path class="keyboard-spine" d="M216 108V684" />
      </g>
    </svg>`;
}

function playKeyboardPhrase(phraseIndex = 0, { preserveLoop = false } = {}) {
  if (!preserveLoop) clearKeyboardTimers();
  else keyboardTimers = [];
  const overlay = root.querySelector(".keyboard-overlay");
  if (!overlay) return;
  const phrase = keyboardPhrases[phraseIndex] || keyboardPhrases[0];

  phrase.forEach((keyIndex, noteIndex) => {
    const timer = window.setTimeout(() => {
      const key = overlay.querySelector(`[data-key="${keyIndex}"]`);
      if (!key) return;
      key.classList.remove("is-playing");
      void key.getBoundingClientRect();
      key.classList.add("is-playing");
      const releaseTimer = window.setTimeout(() => key.classList.remove("is-playing"), prefersReducedMotion ? 1 : 330);
      keyboardTimers.push(releaseTimer);
    }, prefersReducedMotion ? noteIndex * 30 : keyboardRhythm[noteIndex]);
    keyboardTimers.push(timer);
  });
}

function startKeyboardLoop() {
  clearKeyboardTimers();
  let phraseIndex = 0;

  const playNextPhrase = () => {
    if (currentScreen !== "landing" || !root.querySelector(".keyboard-overlay")) return;
    playKeyboardPhrase(phraseIndex, { preserveLoop: true });
    phraseIndex = (phraseIndex + 1) % keyboardPhrases.length;
    keyboardLoopTimer = window.setTimeout(playNextPhrase, prefersReducedMotion ? 900 : 1850);
  };

  playNextPhrase();
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
  playKeyboardPhrase(index);
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
  clearKeyboardTimers();
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
      playKeyboardPhrase(index);
      cursor?.animate(
        [{ transform: `translate(${index === 0 ? 0 : patentSequence[index - 1].x}px, ${index === 0 ? 0 : patentSequence[index - 1].y}px)` }, { transform: `translate(${item.x}px, ${item.y}px)` }],
        { duration: prefersReducedMotion ? 1 : 620, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
      );
    }, prefersReducedMotion ? index * 45 : 620 + index * 920);
    patentTimers.push(timer);
  });

  const resetTimer = window.setTimeout(() => {
    setPatentCamera(null);
    overlay.querySelectorAll(".patent-step").forEach((step) => step.classList.remove("is-active"));
    startKeyboardLoop();
  }, prefersReducedMotion ? 260 : 6000);
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

function gallerySlideMarkup(slide, artwork) {
  if (slide.kind === "image") {
    return `<img class="artwork-photo" src="${slide.src}" alt="${slide.alt || `${artwork.title} image`}" loading="lazy" />`;
  }
  if (slide.kind === "prototype") {
    return `<div class="prototype-preview" data-prototype-preview>
      <div class="prototype-preview-toolbar" role="tablist" aria-label="Culture Pass preview mode">
        <span class="prototype-preview-label">WORK PREVIEW</span>
        <button type="button" class="prototype-mode-button" data-prototype-mode="mobile" aria-selected="false">MOBILE</button>
        <button type="button" class="prototype-mode-button is-selected" data-prototype-mode="interaction" aria-selected="true">INTERACTION</button>
      </div>
      <iframe class="project-index-prototype" data-prototype-frame src="${slide.src}?chrome=0&mode=interaction" title="${slide.alt}" loading="eager" allow="clipboard-write; fullscreen"></iframe>
    </div>`;
  }
  return `<div class="project-image-placeholder"><span class="placeholder-index">PROJECT ${artwork.number}</span><strong>${artwork.shortTitle}</strong><span>${slide.label || "ARTWORK IMAGE TO BE ADDED"}</span><div class="placeholder-line"></div></div>`;
}

function galleryMarkup(artwork) {
  const slide = (artwork.gallery || [])[0] || { kind: "placeholder", label: "ARTWORK IMAGE TO BE ADDED" };
  return `
    <div class="artwork-gallery" aria-label="${artwork.title} image gallery">
      <div class="gallery-viewport ${slide.kind === "image" ? "gallery-viewport--image" : "gallery-viewport--placeholder"}">
        ${gallerySlideMarkup(slide, artwork)}
      </div>
    </div>`;
}

function renderLanding({ returning = false } = {}) {
  currentScreen = "landing";
  transitionLock = false;
  clearPatentTimers();
  clearKeyboardTimers();
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
          <div class="landing-art-label landing-art-label--side">STRUCTURAL INDEX / 01—03</div>
          <div class="patent-plate">
            <div class="patent-artwork">
              <picture>
                <source srcset="/assets/kim-yeil-piano-cutout.webp" type="image/webp" />
                <img class="landing-art-image" src="/assets/kim-yeil-piano-cutout.png" alt="Transparent grand piano technical drawing with keyboard, internal strings, and structural callouts" />
              </picture>
              ${keyboardOverlay()}
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
  clearKeyboardTimers();
  root.querySelector(".landing-shell")?.classList.add("is-pressing");
  root.insertAdjacentHTML("beforeend", `<div class="route-transition" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PRESS / PLAY</span></div>`);
  window.setTimeout(() => renderIndex(0, { arriving: true }), prefersReducedMotion ? 40 : 560);
}

function renderIndex(index = activeIndex, { arriving = false } = {}) {
  currentScreen = "index";
  activeIndex = index;
  transitionLock = arriving;
  clearPatentTimers();
  clearKeyboardTimers();
  const artwork = artworks[activeIndex];
  root.innerHTML = `
    <div class="press-play-shell ${arriving ? "is-arriving" : ""}">
      <header class="topbar">
        <button class="wordmark" type="button" aria-label="Return to Kim Yeil introduction"><span>PRESS</span> PLAY<span class="wordmark-period">.</span></button>
        <div class="topbar-center" aria-hidden="true"><span class="topbar-rule"></span><span>KIM YEIL / SELECTED WORKS</span><span class="topbar-rule"></span></div>
        <div class="topbar-right"><button class="about-toggle" type="button">ABOUT</button><span class="edition">SEOUL — 2026</span></div>
      </header>
      <main class="gallery-main">
        <div class="gallery-index" aria-hidden="true"><span class="vertical-label">SELECTED WORK / ${String(artworks.length).padStart(2, "0")}</span><span class="index-line"></span><span class="index-count">${artwork.number}</span></div>
        <section class="work-copy" aria-live="polite">
          <div class="copy-topline"><span class="eyebrow">WORK ${artwork.number} / ${String(artworks.length).padStart(2, "0")}</span><span class="copy-status"><span class="status-dot"></span> PLAYING</span></div>
          <div class="title-wrap"><p class="work-kicker">${artwork.kicker}</p><h1>${artwork.title}</h1></div>
          <div class="copy-bottom"><p class="work-description">${artwork.description}</p><div class="work-meta"><span>${artwork.detail}</span><span>${artwork.year}</span></div></div>
          <aside class="project-detail-box" aria-label="${artwork.title} project details">
            <div class="project-detail-heading"><span class="eyebrow">PROJECT DETAILS</span><span class="project-detail-number">${artwork.number}</span></div>
            <p class="project-detail-summary">${artwork.project.overview}</p>
            <div class="project-detail-grid">
              <div><span class="project-detail-label">CLIENT</span><span>${artwork.project.client}</span></div>
              <div><span class="project-detail-label">ROLE</span><span>${artwork.project.role}</span></div>
              <div><span class="project-detail-label">MEDIUM</span><span>${artwork.project.medium}</span></div>
              <div><span class="project-detail-label">YEAR</span><span>${artwork.year}</span></div>
            </div>
            <div class="project-focus-list">${artwork.project.focus.map((item) => `<span>${item}</span>`).join("")}</div>
            <button class="project-link" type="button" data-project-detail>PROJECT DETAIL <span>↗</span></button>
          </aside>
        </section>
        <section class="art-stage" aria-label="${artwork.title} artwork">
          <div class="stage-corner stage-corner--tl">ONE-LINE / MOTION</div><div class="stage-corner stage-corner--br">PRESS TO PLAY</div>
          <div class="art-frame">${galleryMarkup(artwork)}</div><div class="stage-mark" aria-hidden="true">PP<span>01—${String(artworks.length).padStart(2, "0")}</span></div>
        </section>
      </main>
      <footer class="key-dock">
        <div class="dock-intro"><p class="eyebrow">SELECTED WORKS</p><p class="dock-instruction">Press a key<br class="desktop-break" /> to play.</p></div>
        <div class="piano-keys" role="group" aria-label="Choose a piece">
          ${artworks.map((item, itemIndex) => `<button class="piano-key ${itemIndex === activeIndex ? "is-active is-pressed" : ""}" type="button" data-index="${itemIndex}" aria-pressed="${itemIndex === activeIndex}" aria-label="Play ${item.title}, key ${item.key}"><span class="key-cap"></span><span class="key-number">KEY ${item.key}</span><span class="key-name">${item.title}</span><span class="key-arrow">↗</span></button>`).join("")}
        </div>
        <div class="dock-side-note" aria-hidden="true"><span>01</span><span class="dock-side-line"></span><span>${String(artworks.length).padStart(2, "0")}</span></div>
      </footer>
      ${arriving ? `<div class="route-transition route-transition--reveal" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PLAYING 01 / ${String(artworks.length).padStart(2, "0")}</span></div>` : ""}
    </div>`;

  root.querySelector(".wordmark").addEventListener("click", () => renderLanding({ returning: true }));
  root.querySelector(".about-toggle").addEventListener("click", toggleAbout);
  root.querySelector("[data-project-detail]")?.addEventListener("click", openProjectDetail);
  root.querySelectorAll("[data-prototype-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.prototypeMode;
      const frame = root.querySelector("[data-prototype-frame]");
      if (!frame || !mode) return;
      root.querySelectorAll("[data-prototype-mode]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      frame.src = `/prototypes/culturepass-prototype.html?chrome=0&mode=${mode}`;
    });
  });
  root.querySelectorAll(".piano-key").forEach((button) => {
    button.addEventListener("click", () => renderIndex(Number(button.dataset.index)));
  });

  window.setTimeout(() => {
    root.querySelector(".piano-key.is-pressed")?.classList.remove("is-pressed");
    transitionLock = false;
    root.querySelector(".route-transition--reveal")?.remove();
  }, arriving ? (prefersReducedMotion ? 80 : 780) : (prefersReducedMotion ? 60 : 260));
}

function openProjectDetail() {
  if (root.querySelector(".project-detail-overlay")) return;
  const artwork = artworks[activeIndex];
  const firstSlide = artwork.gallery?.[0] || { kind: "placeholder", label: "ARTWORK IMAGE TO BE ADDED" };
  const visual = artwork.key === "1"
    ? `<iframe class="project-detail-prototype" src="/prototypes/culturepass-prototype.html?chrome=0" title="Culture Pass interactive prototype" loading="eager" allow="clipboard-write; fullscreen"></iframe>`
    : gallerySlideMarkup(firstSlide, artwork);
  const overlay = document.createElement("div");
  overlay.className = "project-detail-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `${artwork.shortTitle} project details`);
  overlay.innerHTML = `
    <div class="project-detail-panel">
      <button class="project-detail-close" type="button" aria-label="Close project detail">CLOSE <span>×</span></button>
      <div class="project-detail-heading">
        <p class="eyebrow">PROJECT ${artwork.number} / ${String(artworks.length).padStart(2, "0")} · ${artwork.detail}</p>
        <h2>${artwork.title}</h2>
        <p class="project-detail-kicker">${artwork.kicker}</p>
      </div>
      <div class="project-detail-visual">${visual}</div>
      <div class="project-detail-content">
        <section class="project-detail-section project-detail-section--wide">
          <p class="eyebrow">OVERVIEW</p>
          <h3>작은 흐름을 더 나은 경험으로.</h3>
          <p>${artwork.project.overview}</p>
        </section>
        <section class="project-detail-section">
          <p class="eyebrow">DESIGN FOCUS</p>
          <div class="project-focus-list">${artwork.project.focus.map((item) => `<span>${item}</span>`).join("")}</div>
        </section>
        <section class="project-detail-section">
          <p class="eyebrow">ROLE / MEDIUM</p>
          <p>${artwork.project.role} · ${artwork.project.medium}</p>
        </section>
      </div>
      <footer class="project-detail-footer"><span>KIM YEIL / SELECTED WORKS</span><span>${artwork.year}</span></footer>
    </div>`;
  root.appendChild(overlay);
  document.body.classList.add("project-detail-open");
  const closeButton = overlay.querySelector(".project-detail-close");
  const close = () => {
    overlay.remove();
    document.body.classList.remove("project-detail-open");
    document.removeEventListener("keydown", onKeydown);
    root.querySelector("[data-project-detail]")?.focus();
  };
  const onKeydown = (event) => {
    if (event.key === "Escape") close();
  };
  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", onKeydown);
  closeButton.focus();
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
