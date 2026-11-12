/* =========================================================
   PRESS PLAY. — works.js
   작품 화면: 작품 정보, 프로토타입 미리보기, 피아노 건반 내비게이션, 상세 창
   작품 내용은 data.js에서 가져옵니다.
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const workList = PressPlay.works || [];
  if (!workList.length) console.error("[PRESS PLAY] data.js를 불러오지 못했습니다. index.html의 script 순서를 확인하세요.");

  const pad = (n) => String(n).padStart(2, "0");
  const total = pad(workList.length);

  let view = null;
  let current = 0;
  let onHome = () => {};
  let onAbout = () => {};

  function frameSrc(src, mode) {
    return `${src}${src.includes("?") ? "&" : "?"}chrome=0&mode=${mode}`;
  }

  function previewMarkup(work) {
    const preview = work.preview;
    if (!preview) {
      return `<div class="project-image-placeholder"><span class="placeholder-index">PROJECT ${work.number}</span><strong>${work.shortTitle}</strong><span>ARTWORK IMAGE TO BE ADDED</span><div class="placeholder-line"></div></div>`;
    }
    if (preview.kind === "image") {
      return `<div class="gallery-viewport gallery-viewport--image"><img class="artwork-photo" src="${preview.src}" alt="${preview.alt}" loading="lazy" /></div>`;
    }
    const modes = preview.modes || ["interaction"];
    const initialMode = modes.includes("interaction") ? "interaction" : modes[0];
    const modeButtons = modes.length > 1
      ? modes.map((mode) => `<button type="button" class="prototype-mode-button${mode === initialMode ? " is-selected" : ""}" data-mode="${mode}" aria-pressed="${mode === initialMode}">${mode.toUpperCase()}</button>`).join("")
      : "";
    const toolbar = `
      <div class="prototype-preview-toolbar">
        <span class="prototype-preview-label">WORK PREVIEW</span>
        ${modeButtons}
        <button type="button" class="prototype-restart" data-restart aria-label="${work.title} 프로토타입을 첫 화면부터 다시 보기">RESTART <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12"><path d="M3.2 6.2A5 5 0 1 1 3 9.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M2.6 2.8v3.6h3.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>`;
    return `
      <div class="gallery-viewport gallery-viewport--prototype">
        <div class="prototype-preview">
          ${toolbar}
          <iframe class="project-index-prototype" data-frame src="${frameSrc(preview.src, initialMode)}" title="${preview.alt}" loading="eager" allow="clipboard-write; fullscreen"></iframe>
        </div>
      </div>`;
  }

  function render(index = current, { arriving = false } = {}) {
    current = Math.max(0, Math.min(index, workList.length - 1));
    const work = workList[current];
    const p = work.project;

    view.innerHTML = `
      <div class="press-play-shell${arriving ? " is-arriving" : ""}">
        <header class="topbar">
          <button class="wordmark" type="button" data-go-home aria-label="처음 화면으로"><span>PRESS</span> PLAY<span class="wordmark-period">.</span></button>
          <div class="topbar-center" aria-hidden="true"><span class="topbar-rule"></span><span>KIM YEIL / SELECTED WORKS</span><span class="topbar-rule"></span></div>
          <div class="topbar-right"><button class="about-toggle" type="button" data-go-about>ABOUT</button><span class="edition">SEOUL — 2026</span></div>
        </header>

        <main class="gallery-main">
          <div class="gallery-index" aria-hidden="true">
            <span class="vertical-label">SELECTED WORK / ${total}</span><span class="index-line"></span><span class="index-count">${work.number}</span>
          </div>

          <section class="work-copy" aria-live="polite">
            <div class="copy-topline"><span class="eyebrow">WORK ${work.number} / ${total}</span><span class="copy-status"><span class="status-dot"></span> PLAYING</span></div>
            <div class="title-wrap"><p class="work-kicker">${work.kicker}</p><h1>${work.title}</h1></div>
            <div class="copy-bottom">
              <p class="work-description">${work.description}</p>
              <div class="work-meta"><span>${work.detail}</span><span>${work.year}</span></div>
            </div>
            <aside class="project-detail-box" aria-label="${work.title} 프로젝트 정보">
              <div class="project-detail-heading"><span class="eyebrow">PROJECT DETAILS</span><span class="project-detail-number">${work.number}</span></div>
              <p class="project-detail-summary">${p.overview}</p>
              <div class="project-detail-grid">
                <div><span class="project-detail-label">CLIENT</span><span>${p.client}</span></div>
                <div><span class="project-detail-label">ROLE</span><span>${p.role}</span></div>
                <div><span class="project-detail-label">MEDIUM</span><span>${p.medium}</span></div>
                <div><span class="project-detail-label">YEAR</span><span>${work.year}</span></div>
              </div>
              <div class="project-focus-list">${p.focus.map((item) => `<span>${item}</span>`).join("")}</div>
              <button class="project-link" type="button" data-open-detail>PROJECT DETAIL <span>↗</span></button>
            </aside>
          </section>

          <section class="art-stage" aria-label="${work.title} 미리보기">
            <div class="art-frame"><div class="artwork-gallery">${previewMarkup(work)}</div></div>
          </section>
        </main>

        <footer class="key-dock">
          <div class="dock-intro"><p class="eyebrow">SELECTED WORKS</p><p class="dock-instruction">Press a key<br class="desktop-break" /> to play.</p></div>
          <div class="piano-keys" role="group" aria-label="작품 선택">
            ${workList.map((item, i) => `
              <button class="piano-key${i === current ? " is-active is-pressed" : ""}" type="button" data-index="${i}" aria-pressed="${i === current}" aria-label="${item.title} 보기 (숫자키 ${item.key})">
                <span class="key-cap"></span><span class="key-number">KEY ${item.key}</span><span class="key-name">${item.title}</span><span class="key-arrow">↗</span>
              </button>`).join("")}
          </div>
          <div class="dock-side-note" aria-hidden="true"><span>01</span><span class="dock-side-line"></span><span>${total}</span></div>
        </footer>
        ${arriving ? `<div class="route-transition route-transition--reveal" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PLAYING ${work.number} / ${total}</span></div>` : ""}
      </div>`;

    view.querySelector("[data-go-home]").addEventListener("click", () => onHome());
    view.querySelector("[data-go-about]").addEventListener("click", () => onAbout());
    view.querySelector("[data-open-detail]").addEventListener("click", openDetail);
    view.querySelectorAll(".piano-key").forEach((key) => {
      key.addEventListener("click", () => render(Number(key.dataset.index)));
    });
    // 미리보기 창 새로 고침: src를 바꾸면 브라우저 '뒤로 가기' 기록이 쌓이므로 iframe을 새로 만들어 교체
    const reloadFrame = (src) => {
      const oldFrame = view.querySelector("[data-frame]");
      if (!oldFrame) return;
      const newFrame = oldFrame.cloneNode(false);
      if (src) newFrame.src = src;
      oldFrame.replaceWith(newFrame);
    };
    view.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        view.querySelectorAll("[data-mode]").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-selected", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        reloadFrame(frameSrc(work.preview.src, button.dataset.mode));
      });
    });
    // RESTART: 저장된 진행 기록을 지우고 프로토타입을 첫 화면·첫 흐름부터 다시 시작
    view.querySelector("[data-restart]")?.addEventListener("click", () => {
      const keys = work.preview.resetKeys || [];
      const frame = view.querySelector("[data-frame]");
      keys.forEach((key) => {
        try { frame.contentWindow.localStorage.removeItem(key); } catch (error) { /* 접근 불가 시 무시 */ }
        try { window.localStorage.removeItem(key); } catch (error) { /* 저장소 사용 불가 시 무시 */ }
      });
      reloadFrame();
    });

    window.setTimeout(() => {
      view.querySelector(".piano-key.is-pressed")?.classList.remove("is-pressed");
      view.querySelector(".route-transition--reveal")?.remove();
    }, arriving ? (reducedMotion ? 80 : 780) : (reducedMotion ? 60 : 260));
  }

  function openDetail() {
    if (document.querySelector(".project-detail-overlay")) return;
    const work = workList[current];
    const p = work.project;
    // 상세 창 화면 갤러리 (data.js의 screens, 비어 있으면 표시하지 않음)
    const screens = p.screens || [];
    const figure = (screen, i) => `
      <figure class="detail-screen detail-screen--${screen.kind}">
        <div class="detail-screen-frame"><img src="${screen.src}" alt="${work.shortTitle} ${screen.label} 화면" loading="lazy" /></div>
        <figcaption><span>${pad(i + 1)}</span>${screen.label}</figcaption>
      </figure>`;
    // 가로(데스크톱) 화면은 위 한 줄, 세로(모바일) 화면은 그 아래 한 줄로 묶음
    const row = (kind) => {
      const items = screens.map((screen, i) => (screen.kind === kind ? figure(screen, i) : "")).join("");
      return items ? `<div class="detail-screens-row detail-screens-row--${kind}">${items}</div>` : "";
    };
    const visual = screens.length
      ? `<div class="project-detail-screens" aria-label="${work.shortTitle} 화면">${row("desktop")}${row("mobile")}</div>`
      : "";
    const overlay = document.createElement("div");
    overlay.className = "project-detail-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `${work.shortTitle} 상세`);
    overlay.innerHTML = `
      <div class="project-detail-panel">
        <button class="project-detail-close" type="button" aria-label="상세 창 닫기">CLOSE <span>×</span></button>
        <div class="project-detail-heading">
          <p class="eyebrow">PROJECT ${work.number} / ${total} · ${work.detail}</p>
          <h2>${work.title}</h2>
          <p class="project-detail-kicker">${work.kicker}</p>
        </div>
        ${visual}
        <div class="project-detail-content">
          <section class="project-detail-section project-detail-section--wide">
            <p class="eyebrow">OVERVIEW</p>
            <h3>작은 흐름을 더 나은 경험으로.</h3>
            <p>${p.overview}</p>
          </section>
          <section class="project-detail-section">
            <p class="eyebrow">DESIGN FOCUS</p>
            <div class="project-focus-list">${p.focus.map((item) => `<span>${item}</span>`).join("")}</div>
          </section>
          <section class="project-detail-section">
            <p class="eyebrow">ROLE / MEDIUM</p>
            <p>${p.role} · ${p.medium}</p>
          </section>
          <section class="project-detail-section project-detail-insights">
            <p class="eyebrow">DIFFERENTIATING POINTS</p>
            <div class="project-insight-list">
              ${(p.insights || []).map((insight, i) => `<article class="project-insight"><span class="project-insight-number">${pad(i + 1)}</span><div><h4>${insight.label}</h4><p>${insight.text}</p></div></article>`).join("")}
            </div>
          </section>
        </div>
        <footer class="project-detail-footer"><span>KIM YEIL / SELECTED WORKS</span><span>${work.year}</span></footer>
      </div>`;
    document.body.appendChild(overlay);
    document.body.classList.add("project-detail-open");

    const closeButton = overlay.querySelector(".project-detail-close");
    const onKeydown = (event) => {
      if (event.key === "Escape") close();
    };
    function close() {
      overlay.remove();
      document.body.classList.remove("project-detail-open");
      document.removeEventListener("keydown", onKeydown);
      view.querySelector("[data-open-detail]")?.focus();
    }
    closeButton.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);
    closeButton.focus();
  }

  function isDetailOpen() {
    return Boolean(document.querySelector(".project-detail-overlay"));
  }

  function init({ goHome, goAbout }) {
    view = document.getElementById("works");
    onHome = goHome;
    onAbout = goAbout;
  }

  PressPlay.worksView = { init, render, isDetailOpen, count: () => workList.length, current: () => current };
})();
