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
let activeIndex = 0;
let currentScreen = "landing";

const lineArt = {
  piano: () => `
    <svg class="line-art line-art--piano" viewBox="0 0 560 480" role="img" aria-label="Piano keyboard one-line artwork">
      <path class="art-stroke art-stroke--main" pathLength="1" d="M105 159h346v181H105z" />
      <path class="art-stroke art-stroke--secondary" pathLength="1" d="M105 159l36-29h345l-35 29m35-29v181l-35 29" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M155 159v181m50-181v181m50-181v181m50-181v181m50-181v181m50-181v181m50-181v181" />
      <path class="art-stroke art-stroke--main" pathLength="1" d="M146 159v58h25v-58m35 0v58h25v-58m85 0v58h25v-58m35 0v58h25v-58m35 0v58h25v-58" />
      <path class="art-stroke art-stroke--fine" pathLength="1" d="M70 228c24-39 52-57 84-55m-84 55c-12 18-18 37-18 57 0 61 49 111 110 111" />
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

function renderLanding() {
  currentScreen = "landing";
  root.innerHTML = `
    <div class="landing-shell">
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
          <div class="landing-art-label landing-art-label--top">A LINE IS A BEGINNING</div>
          <div class="landing-art-label landing-art-label--side">SELECTED PRACTICE / 2025—26</div>
          ${lineArt.piano()}
          <div class="landing-art-caption">PIANO STUDY <span>01</span></div>
        </section>
      </main>
      <footer class="landing-footer">
        <div class="landing-footer-note"><span class="landing-footer-dot"></span><span>AN INDEX OF WORKS IN MOTION</span></div>
        <button class="enter-index" type="button"><span>ENTER THE INDEX</span><span class="enter-index-arrow">↗</span></button>
        <span class="landing-key-hint">PRESS ENTER TO BEGIN</span>
      </footer>
    </div>`;

  root.querySelector(".enter-index").addEventListener("click", renderIndex);
}

function renderIndex(index = activeIndex) {
  currentScreen = "index";
  activeIndex = index;
  const artwork = artworks[activeIndex];
  root.innerHTML = `
    <div class="press-play-shell">
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
    </div>`;

  root.querySelector(".wordmark").addEventListener("click", renderLanding);
  root.querySelector(".about-toggle").addEventListener("click", toggleAbout);
  root.querySelectorAll(".piano-key").forEach((button) => {
    button.addEventListener("click", () => renderIndex(Number(button.dataset.index)));
  });

  window.setTimeout(() => {
    root.querySelector(".piano-key.is-pressed")?.classList.remove("is-pressed");
  }, 260);
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
  if (currentScreen === "landing") {
    if (event.key === "Enter" || event.key === " ") renderIndex();
    return;
  }
  if (event.repeat) return;
  const index = Number(event.key) - 1;
  if (index >= 0 && index < artworks.length) renderIndex(index);
});

renderLanding();
