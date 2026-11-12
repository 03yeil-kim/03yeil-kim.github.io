/* =========================================================
   PRESS PLAY. — burn.js
   ABOUT → 작품 전환. 스크롤에 따라
   1) 기울어진 종이가 정면으로 펴지고
   2) 아래부터 불꽃 가장자리를 남기며 타서 사라진 뒤
   3) 끝까지 내리면 'pressplay:burned' 이벤트 → main.js가 작품 화면으로 이동
   라이브러리 없이 캔버스 2D로 그림. '동작 줄이기' 설정이면 쓰지 않음.
   ========================================================= */
(function () {
  const PressPlay = (window.PressPlay = window.PressPlay || {});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const TILT_END = 0.3;   // 이 지점까지 종이가 펴짐 (스크롤 진행률 0~1)
  const BURN_START = 0.3; // 여기서부터 타기 시작
  const BURN_END = 0.9;   // 여기서 다 탐
  const MW = 240;         // 불꽃 계산 해상도(가로) — 작게 계산해 부드럽게 확대
  const MH = 320;

  let section, stage, wrap, canvas, ctx, glow, glowCtx, hint;
  let sheet, mask, ember, char, maskData, emberData, charData;
  let noiseA, noiseB;
  let statement = []; // 인트로 문장 (줄 단위)
  let dpr = 1, width = 0, height = 0;
  let inView = false, progress = 0, lastProgress = -1, burnedSent = false, frame = 0, glowDirty = false;
  const drawing = new Image();

  /* ---------- 값 노이즈 (불규칙한 타는 경계) ---------- */
  function makeNoise(seed) {
    let s = seed;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const G = 17;
    const grid = Array.from({ length: G * G }, rand);
    const at = (x, y) => grid[(y % G) * G + (x % G)];
    const smooth = (t) => t * t * (3 - 2 * t);
    const sample = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = smooth(x - xi), yf = smooth(y - yi);
      const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
      return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
    };
    const out = new Float32Array(MW * MH);
    for (let y = 0; y < MH; y++) {
      for (let x = 0; x < MW; x++) {
        let v = 0, amp = 0.55, f = 0.022, total = 0;
        for (let o = 0; o < 4; o++) {
          v += sample(x * f + 3, y * f + 5) * amp;
          total += amp;
          amp *= 0.5;
          f *= 2.1;
        }
        out[y * MW + x] = v / total;
      }
    }
    return out;
  }

  const layer = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };

  /* ---------- 종이 그리기 (한 번만, 크기가 바뀔 때 다시) ---------- */
  function paintSheet() {
    const W = width * dpr, H = height * dpr;
    sheet = layer(W, H);
    const g = sheet.getContext("2d");
    const u = W / 100; // 종이 폭의 1%

    g.fillStyle = "#f2eee5";
    g.fillRect(0, 0, W, H);

    // 도면처럼 얇은 기준선
    g.strokeStyle = "rgba(22, 21, 19, 0.16)";
    g.lineWidth = Math.max(1, dpr);
    g.beginPath();
    g.moveTo(W / 2, 0); g.lineTo(W / 2, H);
    g.moveTo(0, H * 0.62); g.lineTo(W, H * 0.62);
    g.moveTo(0, H); g.lineTo(W, H * 0.12);
    g.moveTo(W / 2, H * 0.62); g.lineTo(W, H);
    g.stroke();

    // 피아노 구조 도면 (오른쪽 아래, 문장 아래쪽)
    if (drawing.complete && drawing.naturalWidth) {
      const dw = W * 0.52, dh = dw * (drawing.naturalHeight / drawing.naturalWidth);
      g.save();
      g.globalAlpha = 0.9;
      g.globalCompositeOperation = "multiply";
      g.filter = "grayscale(1) contrast(1.5) brightness(0.62)";
      g.drawImage(drawing, W - dw - u * 5, H - dh - u * 17, dw, dh);
      g.restore();
    }

    const sans = `Arial, "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`;
    const serif = `Georgia, "Times New Roman", serif`;
    // 인트로 문장: 명조체 (css/tokens.css의 --font-serif-kr)
    const serifKr = getComputedStyle(document.documentElement).getPropertyValue("--font-serif-kr").trim() || "serif";
    g.textBaseline = "alphabetic";

    // 왼쪽 위: 섹션 이름 / 오른쪽 위: 표식
    g.fillStyle = "#2a5bd7";
    g.font = `${u * 2.5}px ${sans}`;
    if ("letterSpacing" in g) g.letterSpacing = `${u * 0.5}px`;
    g.fillText("INTRODUCTION", u * 7, u * 10);
    if ("letterSpacing" in g) g.letterSpacing = "0px";
    g.fillStyle = "#161513";
    g.font = `bold ${u * 3.2}px ${sans}`;
    g.textAlign = "right";
    g.fillText("PRESS PLAY.", W - u * 7, u * 10);

    // 인트로 문장: 단어 단위로 줄바꿈 (문장은 index.html의 .burn-statement-copy에서 가져옴)
    g.textAlign = "left";
    g.fillStyle = "#161513";
    const size = u * 5.2;
    g.font = `500 ${size}px ${serifKr}`;
    if ("letterSpacing" in g) g.letterSpacing = `${-size * 0.03}px`;
    // index.html의 줄바꿈(<br>)을 그대로 따르고, 종이 폭을 넘는 줄만 단어 단위로 한 번 더 나눔
    const lines = [];
    statement.forEach((row) => {
      let line = "";
      row.split(" ").forEach((word) => {
        const next = line ? `${line} ${word}` : word;
        if (line && g.measureText(next).width > u * 84) { lines.push(line); line = word; }
        else line = next;
      });
      if (line) lines.push(line);
    });
    lines.forEach((line, i) => g.fillText(line, u * 7, u * 21 + i * size * 1.6));
    if ("letterSpacing" in g) g.letterSpacing = "0px";

    // 아래: 이름 + 역할 / 오른쪽 아래: 연도
    g.font = `${u * 7.5}px ${serif}`;
    g.fillText("Kim", u * 7, H - u * 11);
    const kimWidth = g.measureText("Kim ").width;
    g.fillStyle = "#2a5bd7";
    g.font = `italic ${u * 7.5}px ${serif}`;
    g.fillText("Yeil.", u * 7 + kimWidth, H - u * 11);
    g.fillStyle = "#6b655b";
    g.font = `${u * 2.5}px ${sans}`;
    g.fillText("UX/UI Designer · Product Designer", u * 7, H - u * 5.5);
    g.textAlign = "right";
    g.fillText("PORTFOLIO 2026", W - u * 7, H - u * 5.5);
    g.textAlign = "left";
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    // 기울어진 상태의 크기가 아닌 원래 크기
    width = wrap.offsetWidth;
    height = wrap.offsetHeight;
    if (!width || !height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    paintSheet();
    render(true);
    return rect;
  }

  /* ---------- 스크롤 진행률 ---------- */
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function readProgress() {
    const rect = section.getBoundingClientRect();
    const run = rect.height - window.innerHeight;
    return run > 0 ? clamp01(-rect.top / run) : 0;
  }

  /* ---------- 한 장면 그리기 ---------- */
  function render(force = false, time = performance.now()) {
    if (!sheet) return;
    const tilt = easeOut(clamp01(progress / TILT_END));
    const burn = clamp01((progress - BURN_START) / (BURN_END - BURN_START));
    const rest = 1 - tilt;

    // 1) 기울어진 종이 → 정면
    wrap.style.transform =
      `translate3d(0, ${rest * 8}vh, 0) rotateX(${rest * 16}deg) rotateY(${rest * -26}deg) rotateZ(${rest * 9}deg) scale(${0.9 + tilt * 0.1})`;
    section.classList.toggle("is-burning", burn > 0);

    // 2) 아래부터 타기
    const front = 1.26 - burn * 1.5; // 이 값보다 아래(값이 큰 곳)는 타서 사라짐
    const flicker = burn > 0 && burn < 1 ? time * 0.004 : 0;
    const md = maskData.data, ed = emberData.data, cd = charData.data;
    for (let y = 0, i = 0; y < MH; y++) {
      const h = y / (MH - 1);
      for (let x = 0; x < MW; x++, i++) {
        const nb = noiseB[i];
        const jitter = flicker ? Math.sin(flicker + nb * 14) * 0.006 : 0;
        const d = h + (noiseA[i] - 0.5) * 0.46 + jitter - front;
        const p = i * 4;
        // 종이 남김(1) / 사라짐(0) — 경계는 살짝 부드럽게
        md[p + 3] = d > 0.008 ? 0 : d > -0.004 ? Math.round(255 * (0.008 - d) / 0.012) : 255;

        // 네온 불꽃 가장자리: 경계에서 흰빛 → 아이스 블루 → 인디고로 식어 감, 군데군데 인디고 불꽃
        if (d > -0.014 && d <= 0.05 && burn > 0) {
          const e = d <= 0 ? clamp01(1 + d / 0.014) : clamp01(1 - d / 0.05); // 경계에서 1
          let r, g, b;
          if (e > 0.78) { r = 170 + (e - 0.78) * 400; g = 230 + (e - 0.78) * 120; b = 255; }
          else if (e > 0.42) { const t = (e - 0.42) / 0.36; r = 170 * t + 76 * (1 - t); g = 230 * t + 201 * (1 - t); b = 255; }
          else { const t = e / 0.42; r = 111 * (1 - t) + 76 * t; g = 123 * (1 - t) + 201 * t; b = 255; }
          if (nb > 0.64) {
            const k = clamp01((nb - 0.64) * 4) * 0.9;
            r = r * (1 - k) + 111 * k; g = g * (1 - k) + 123 * k; b = b * (1 - k) + 255 * k;
          }
          ed[p] = r; ed[p + 1] = g; ed[p + 2] = b; ed[p + 3] = Math.round(255 * Math.pow(e, 1.25));
        } else {
          ed[p + 3] = 0;
        }

        // 그을음: 경계에 가까울수록 짙은 블루 블랙
        if (d > -0.12 && d <= 0.008 && burn > 0) {
          const c = clamp01(1 - (-d) / 0.12);
          cd[p] = 5; cd[p + 1] = 8; cd[p + 2] = 16; cd[p + 3] = Math.round(235 * c * c * c);
        } else {
          cd[p + 3] = 0;
        }
      }
    }
    mask.getContext("2d").putImageData(maskData, 0, 0);
    ember.getContext("2d").putImageData(emberData, 0, 0);
    char.getContext("2d").putImageData(charData, 0, 0);

    const W = canvas.width, H = canvas.height;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.globalCompositeOperation = "source-over";
    ctx.filter = "none";
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(sheet, 0, 0);
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(mask, 0, 0, W, H);
    if (burn > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(char, 0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(ember, 0, 0, W, H);
    }
    ctx.globalCompositeOperation = "source-over";
    // 번짐은 작은 캔버스에 그대로 옮기고 CSS 블러로 처리
    if (burn > 0 || glowDirty) {
      glowCtx.putImageData(emberData, 0, 0);
      glowDirty = burn > 0;
    }

    // 3) 끝까지 내리면 작품 화면으로 (다시 올렸다 내려오면 또 동작)
    if (progress >= 0.985 && !burnedSent) {
      burnedSent = true;
      document.dispatchEvent(new CustomEvent("pressplay:burned"));
    } else if (progress < 0.9) {
      burnedSent = false;
    }
  }

  /* 보이는 동안만 매 프레임 갱신 (타는 중에는 불꽃이 살짝 일렁임) */
  function loop(time) {
    frame = 0;
    if (!inView) return;
    progress = readProgress();
    // 타는 중에는 불꽃이 일렁이도록 매 프레임, 그 외에는 스크롤이 바뀔 때만 그림
    const burning = progress > BURN_START && progress < BURN_END;
    if (burning || progress !== lastProgress) render(false, time);
    lastProgress = progress;
    frame = window.requestAnimationFrame(loop);
  }

  function start() {
    if (!frame) frame = window.requestAnimationFrame(loop);
  }

  function init() {
    section = document.querySelector("[data-burn]");
    if (!section || reducedMotion) return;
    canvas = section.querySelector(".burn-sheet");
    ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx || !("IntersectionObserver" in window)) return;

    stage = section.querySelector(".burn-stage");
    wrap = section.querySelector(".burn-sheet-wrap");
    hint = section.querySelector(".burn-hint");
    glow = section.querySelector(".burn-glow");
    glow.width = MW;
    glow.height = MH;
    glowCtx = glow.getContext("2d");
    mask = layer(MW, MH);
    ember = layer(MW, MH);
    char = layer(MW, MH);
    maskData = mask.getContext("2d").createImageData(MW, MH);
    emberData = ember.getContext("2d").createImageData(MW, MH);
    charData = char.getContext("2d").createImageData(MW, MH);
    noiseA = makeNoise(20261110);
    noiseB = makeNoise(1103);

    const copy = section.querySelector(".burn-statement-copy");
    statement = copy ? copy.innerHTML.split(/<br\s*\/?>/i).map((row) => row.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()).filter(Boolean) : [];
    document.documentElement.classList.add("has-burn");
    section.classList.add("is-ready");

    drawing.addEventListener("load", () => { if (width) { paintSheet(); render(true); } });
    if (document.fonts && document.fonts.load) {
      document.fonts.load('500 40px "Noto Serif KR"', statement.join(" ")).then(() => { if (width) { paintSheet(); render(true); } }).catch(() => {});
    }
    drawing.src = "asset/images/kim-yeil-piano-cutout.webp";

    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView) {
        if (!sheet || wrap.offsetWidth !== width) resize();
        start();
      }
    }).observe(section);

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { if (inView) resize(); }, 150);
    });
  }

  PressPlay.burn = { init };
})();
