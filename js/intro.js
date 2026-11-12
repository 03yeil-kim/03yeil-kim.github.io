/* =========================================================
   PRESS PLAY. — intro.js
   로딩 인트로: 선이 차오르고 숫자가 000 → 100으로 굴러간 뒤,
   선이 악보 랜딩의 오선 자리로 늘어나 다섯 줄로 갈라집니다.
   인트로를 보여줄지는 index.html <head>의 짧은 스크립트가 정합니다.
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const root = document.documentElement;
  const intro = document.querySelector("[data-intro]");

  const FILL_MS = 1700;   // 선이 차오르는 시간
  const HOLD_MS = 160;    // 100에서 잠깐 멈춤
  const EXPAND_MS = 650;  // 선이 오선 자리로 늘어나는 시간
  const SPLIT_MS = 560;   // 다섯 줄로 갈라지는 시간
  const REVEAL_MS = 450;  // 배경이 걷히는 시간

  function finish() {
    try { window.sessionStorage.setItem("pp-intro-seen", "1"); } catch (error) { /* 저장 불가 환경 */ }
    root.classList.remove("has-intro");
    intro && intro.remove();
  }

  if (!intro || !root.classList.contains("has-intro")) {
    intro && intro.remove();
    return;
  }

  const lines = intro.querySelector(".intro-lines");
  const fill = intro.querySelector(".intro-fill");
  const digits = Array.from(intro.querySelectorAll(".intro-digit-strip"));
  const home = document.getElementById("home");
  const hero = document.querySelector(".score-hero");

  let pageLoaded = document.readyState === "complete";
  window.addEventListener("load", () => { pageLoaded = true; });

  function setCount(value) {
    const text = String(value).padStart(3, "0");
    digits.forEach((strip, i) => strip.style.setProperty("--d", text[i]));
  }

  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  function fillUp() {
    return new Promise((resolve) => {
      const start = performance.now();
      const tick = (now) => {
        // 이미지가 다 불러와지기 전에는 90에서 기다림
        const cap = pageLoaded ? 1 : 0.9;
        const progress = Math.min(ease(Math.min((now - start) / FILL_MS, 1)), cap);
        fill.style.transform = `scaleX(${progress})`;
        setCount(Math.round(progress * 100));
        if (progress >= 1) resolve();
        else window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    });
  }

  async function run() {
    await fillUp();
    await wait(HOLD_MS);

    // 랜딩 오선의 실제 위치를 재서, 인트로의 선을 그 자리로 보냄
    const staff = document.querySelector(".score-staff");
    if (!staff) return finish();
    const rect = staff.getBoundingClientRect();
    lines.style.setProperty("--gap", `${rect.height / 4}px`);
    lines.style.left = `${rect.left}px`;
    lines.style.width = `${rect.width}px`;
    lines.style.top = `${rect.top + rect.height / 2}px`;
    intro.classList.add("is-expanding");
    await wait(EXPAND_MS);

    intro.classList.add("is-splitting");
    await wait(SPLIT_MS);

    // 랜딩은 오선을 다시 그리지 않고 이어서 등장
    home.classList.add("from-intro");
    hero && hero.classList.add("from-intro");
    intro.classList.add("is-revealing");
    root.classList.remove("has-intro"); // 뒤쪽 랜딩 애니메이션 재개
    await wait(REVEAL_MS);
    finish();
  }

  intro.classList.add("is-active");
  setCount(0);
  run();

  PressPlay.intro = { skip: finish };
})();
