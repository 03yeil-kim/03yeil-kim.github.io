/* =========================================================
   PRESS PLAY. — main.js
   화면 연결: 처음 화면(01 악보 ⇄ 02 소개, 페이지 넘김) ⇄ 작품 화면,
   키보드 조작, 주소(#works)
   ========================================================= */
(function () {
  const PressPlay = window.PressPlay || {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const home = document.getElementById("home");
  const works = document.getElementById("works");
  let screen = "home";
  let locked = false;
  let turnTimer = null;
  const TURN_MS = 1100;      // 페이지가 넘어가는 시간 (css/landing.css의 page-turn과 같게)
  const AUTO_TURN_DELAY = 1000; // 재생이 끝난 뒤 넘기기까지 기다리는 시간

  function isWorksHash() {
    return window.location.hash === "#works";
  }

  /* ---------- 01 악보 ⇄ 02 소개: 악보 넘기기 ---------- */
  function setPage(page) {
    home.dataset.page = page;
    document.documentElement.classList.toggle("on-score-page", page === "score");
    if (page !== "about") {
      PressPlay.drawing.stop();
      PressPlay.aboutStage.reset();
    }
  }

  function turnTo(page) {
    window.clearTimeout(turnTimer);
    if (screen !== "home" || locked || home.dataset.page === page) return;
    const hero = home.querySelector(".score-hero");

    if (reducedMotion) {
      setPage(page);
      window.scrollTo(0, 0);
      return;
    }

    locked = true;
    if (page === "about") {
      // 악보 페이지가 왼쪽 끝을 축으로 넘어가며 아래의 소개 페이지가 드러남
      window.scrollTo(0, 0);
      home.dataset.page = "turning";
      hero.classList.add("is-turning");
      window.setTimeout(() => {
        hero.classList.remove("is-turning");
        setPage("about");
        locked = false;
      }, TURN_MS);
    } else {
      // 넘겼던 악보 페이지가 다시 돌아와 덮음
      window.scrollTo(0, 0);
      home.dataset.page = "turning";
      document.documentElement.classList.add("on-score-page");
      hero.classList.add("is-returning-page");
      window.setTimeout(() => {
        hero.classList.remove("is-returning-page");
        setPage("score");
        locked = false;
      }, TURN_MS);
    }
  }

  // 재생이 끝까지 끝나면 잠시 뒤 자동으로 소개 페이지로
  document.addEventListener("pressplay:played", () => {
    window.clearTimeout(turnTimer);
    turnTimer = window.setTimeout(() => {
      if (screen === "home" && home.dataset.page === "score") turnTo("about");
    }, AUTO_TURN_DELAY);
  });

  // ABOUT 맨 아래에서 종이가 다 타면 작품 화면으로 (js/burn.js)
  document.addEventListener("pressplay:burned", () => {
    if (screen === "home" && home.dataset.page === "about") enterIndex();
  });

  /* ---------- 처음 화면 ---------- */
  function showHome({ returning = false, toAbout = false } = {}) {
    screen = "home";
    locked = false;
    works.hidden = true;
    works.innerHTML = "";
    home.hidden = false;
    home.classList.remove("is-pressing");
    // 인트로 직후 상태 해제 (돌아올 때는 일반 등장 애니메이션 사용)
    document.querySelectorAll(".from-intro").forEach((el) => el.classList.remove("from-intro"));
    home.classList.toggle("is-returning", returning);
    PressPlay.score.restore();
    setPage(toAbout ? "about" : "score");
    window.scrollTo(0, 0);
  }

  /* ---------- 작품 화면 ---------- */
  function showWorks(index = 0, { arriving = false } = {}) {
    screen = "works";
    window.clearTimeout(turnTimer);
    document.documentElement.classList.remove("on-score-page");
    PressPlay.score.stop();
    PressPlay.drawing.stop();
    home.hidden = true;
    works.hidden = false;
    window.scrollTo(0, 0);
    PressPlay.worksView.render(index, { arriving });
    if (arriving) {
      locked = true;
      window.setTimeout(() => { locked = false; }, reducedMotion ? 80 : 780);
    }
  }

  /* ---------- ENTER THE INDEX: 전환 연출 후 작품 화면으로 ---------- */
  function enterIndex(index = 0) {
    if (typeof index !== "number") index = 0;
    if (locked || screen !== "home") return;
    locked = true;
    window.clearTimeout(turnTimer);
    PressPlay.score.stop();
    PressPlay.drawing.stop();
    home.classList.add("is-pressing");
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="route-transition" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PRESS / PLAY</span></div>`,
    );
    window.setTimeout(() => {
      document.querySelector(".route-transition:not(.route-transition--reveal)")?.remove();
      if (!isWorksHash()) history.pushState(null, "", "#works");
      showWorks(index, { arriving: true });
    }, reducedMotion ? 40 : 560);
  }

  function goHome({ toAbout = false } = {}) {
    if (isWorksHash()) history.pushState(null, "", window.location.pathname + window.location.search);
    showHome({ returning: true, toAbout });
  }

  /* 브라우저 뒤로/앞으로 가기 */
  window.addEventListener("popstate", () => {
    if (isWorksHash() && screen !== "works") showWorks(PressPlay.worksView.current());
    else if (!isWorksHash() && screen !== "home") showHome({ returning: true });
  });

  /* ---------- 키보드 ---------- */
  window.addEventListener("keydown", (event) => {
    if (locked || event.repeat) return;
    const target = event.target.closest ? event.target : document.body;
    if (target.closest("input, textarea, select, [contenteditable]")) return;
    // 버튼·링크에 포커스가 있을 때 Enter/Space는 그 버튼의 기본 동작에 맡김 (숫자키는 계속 동작)
    const onControl = target.closest("button, a, [role='button']");

    if (screen === "home") {
      const page = home.dataset.page;
      if ((event.key === "Enter" || event.key === " ") && !onControl) {
        // 01 악보: PRESS PLAY / 02 소개: 작품 화면으로
        event.preventDefault();
        if (page === "about") enterIndex();
        else if (page === "score") PressPlay.score.play();
        return;
      }
      if (event.key === "ArrowRight" && page === "score") return turnTo("about");
      if (event.key === "ArrowLeft" && page === "about") return turnTo("score");
      if (page !== "about") return;
      if (PressPlay.aboutStage.handleKey(event)) return; // A S D F G H J = 소개 건반
      const step = Number(event.key) - 1;
      if (step >= 0 && step < PressPlay.drawing.stepCount) PressPlay.drawing.focusStep(step);
      return;
    }

    if (PressPlay.worksView.isDetailOpen()) return;
    const index = Number(event.key) - 1;
    if (index >= 0 && index < PressPlay.worksView.count()) PressPlay.worksView.render(index);
  });

  /* ---------- 시작 ---------- */
  PressPlay.score.init();
  PressPlay.drawing.init();
  PressPlay.burn && PressPlay.burn.init();
  PressPlay.aboutStage.init({ openWork: (index) => enterIndex(index) });
  PressPlay.worksView.init({
    goHome: () => goHome(),
    goAbout: () => goHome({ toAbout: true }),
  });
  document.querySelectorAll("[data-enter-index]").forEach((button) => button.addEventListener("click", () => enterIndex(0)));
  document.querySelectorAll("[data-turn]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      turnTo(button.dataset.turn);
    });
  });

  // 주소가 #works로 열리면 바로 작품 화면, 아니면 01 악보 페이지에서 시작
  if (isWorksHash()) showWorks(0);
  else setPage("score");
})();
