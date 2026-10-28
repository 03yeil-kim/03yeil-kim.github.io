(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const d=e=>`./${String(e).replace(/^\/+/,"")}`,p=[{key:"1",number:"01",title:"Culture Pass",shortTitle:"경기컬처패스 리디자인",kicker:"Redesigning culture, one clear step at a time.",description:"기존 컬처패스 서비스의 정보 구조와 쿠폰 사용 흐름을 다시 살펴, 문화 혜택을 더 빠르게 발견하고 실제 사용까지 자연스럽게 이어지도록 웹·모바일 경험을 리디자인했습니다.",detail:"SERVICE REDESIGN · UI/UX · WEB + MOBILE",year:"2026",variant:"contour",gallery:[{kind:"prototype",src:"/prototypes/culturepass-prototype.html",alt:"경기컬처패스 모바일 및 인터랙션 프로토타입",label:"INTERACTION PREVIEW",modes:["mobile","interaction"]}],project:{client:"경기컬처패스",role:"Service Redesign / UI·UX",medium:"Web + Mobile",url:"",overview:"기존 컬처패스 서비스의 복잡한 탐색과 쿠폰 사용 흐름을 분석하고, 혜택 발견부터 쿠폰 상세 확인·번호 복사·제휴사 이동까지의 경험을 다시 설계한 리디자인 프로젝트입니다.",focus:["기존 서비스 분석","정보 구조 재정리","쿠폰 사용 흐름","반응형 리디자인"],insights:[{label:"REDUCE THE DISTANCE",text:"문화 혜택을 발견한 뒤 실제 쿠폰 사용까지 이동해야 하는 단계를 줄이고, 사용자가 다음 행동을 자연스럽게 이해하도록 정보 구조를 재정리했습니다."},{label:"COUPON AS ACTION",text:"쿠폰을 단순히 보여주는 데서 끝내지 않고 선택·번호 복사·제휴사 이동을 하나의 연속된 행동으로 연결했습니다."},{label:"WEB TO MOBILE",text:"웹에서 혜택을 탐색하고 모바일에서 쿠폰을 사용하는 실제 흐름을 고려해 두 화면이 단절되지 않도록 설계했습니다."}]}},{key:"2",number:"02",title:"BITE",shortTitle:"BITE 콘텐츠 추천 앱",kicker:"Small bites, brighter days.",description:"식사 시간과 이동 시간 사이, 지금의 여유에 맞는 콘텐츠를 발견하는 시간 기반 추천 앱입니다.",detail:"APP UX/UI · CONTENT DISCOVERY",year:"2026",variant:"orbit",gallery:[{kind:"prototype",src:"/prototypes/bite-portfolio-prototype.html",alt:"BITE 모바일 콘텐츠 추천 앱 프로토타입",label:"MOBILE INTERACTION",modes:["mobile"]}],project:{client:"BITE",role:"UX/UI Design",medium:"Content Discovery App",detailImage:"/assets/bite-portfolio-overview.webp",url:"",overview:"BITE는 사용자가 설정한 식사·이동 시간과 상황에 맞춰 부담 없이 볼 수 있는 영상 콘텐츠를 제안하는 앱 콘셉트입니다. 추천 이유와 예상 시청 시간을 함께 보여줍니다.",focus:["시간 기반 추천","식사·이동 상황","취향 설정","저장 콘텐츠"],insights:[{label:"CONTENT FOR THE MOMENT",text:"콘텐츠를 장르나 인기 순위만으로 추천하지 않고, 사용자가 지금 어떤 상황에 있는지를 중심으로 탐색 경험을 구성했습니다."},{label:"LOW-EFFORT DISCOVERY",text:"긴 탐색 과정을 거치지 않아도 바로 선택할 수 있도록 예상 시청 시간과 콘텐츠의 분위기를 함께 보여줍니다."},{label:"KEEP GOING",text:"이미 본 콘텐츠와 저장한 콘텐츠를 다시 이어볼 수 있도록 구성해 한 번의 선택이 다음 감상으로 자연스럽게 이어지게 했습니다."},{label:"SMALL STORY, CLEAR ACTION",text:"콘텐츠의 제목과 설명은 짧고 명확하게 정리하고, 바로 재생·저장·다른 추천 행동을 쉽게 찾을 수 있도록 했습니다."}]}},{key:"3",number:"03",title:"STILL",shortTitle:"STILL 비주얼 저널 랜딩페이지",kicker:"익숙한 순간, 새로운 시선.",description:"건축과 일상의 장면을 따라 시선이 흐르는 비주얼 저널. 절제된 타이포그래피와 이미지 시퀀스로 감상의 리듬을 만들었습니다.",detail:"WEB DESIGN · INTERACTION · RESPONSIVE",year:"2026",variant:"bloom",gallery:[{kind:"prototype",src:"/prototypes/still-demo.html",alt:"STILL 비주얼 저널 인터랙티브 랜딩 프로토타입",label:"INTERACTIVE PREVIEW",modes:["mobile"]}],project:{client:"STILL",role:"Web Design / Interaction",medium:"Responsive Web",detailImage:"/assets/STILL-portfolio-overview.png",url:"",overview:"STILL은 익숙한 장면을 새로운 시선으로 바라보게 하는 비주얼 저널 웹사이트 콘셉트입니다. 큰 제목과 넉넉한 여백, 이미지 시퀀스로 편집적인 인상을 만들었습니다.",focus:["비주얼 저널","순차 등장 애니메이션","스크롤 인터랙션","반응형 웹"],insights:[{label:"SCROLL AS EDITING",text:"스크롤을 단순한 이동 방식으로 사용하지 않고 이미지와 텍스트가 등장하고 사라지는 순서를 조절하는 편집 장치로 활용했습니다."},{label:"IMAGE SEQUENCE",text:"한 장의 이미지를 크게 보여주는 대신 여러 장면을 순차적으로 연결해 사용자가 작품을 읽는 듯한 감상 흐름을 경험하도록 했습니다."},{label:"SPACE AS CONTENT",text:"콘텐츠를 채우는 것보다 비워둔 공간의 역할을 중요하게 다뤘습니다. 여백은 이미지와 제목 사이에 호흡을 만듭니다."},{label:"QUIET INTERACTION",text:"강한 효과나 빠른 전환 대신 느린 움직임과 절제된 타이포그래피로 작품의 분위기를 방해하지 않는 인터랙션을 구성했습니다."}]}}],i=document.getElementById("root"),c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let u=0,E="landing",m=!1,S=[],g=[],h=null;const y=[{number:"01",x:178,y:365,label:"KEY BED",path:"M178 365 C205 345 225 310 252 275"},{number:"02",x:762,y:262,label:"FRAME",path:"M762 262 C815 248 858 270 884 315"},{number:"03",x:595,y:445,label:"SOUND BOARD",path:"M595 445 C622 410 666 379 720 353"},{number:"04",x:735,y:582,label:"DETAIL B",path:"M735 582 C778 563 820 545 854 512"},{number:"05",x:510,y:663,label:"SECTION A",path:"M510 663 C548 665 590 659 628 644"}],C=[{x:178,y:365,zoom:1.16},{x:762,y:262,zoom:1.2},{x:595,y:445,zoom:1.22},{x:735,y:582,zoom:1.28},{x:510,y:663,zoom:1.16}],T=[[0,2,4,7,5,3],[8,10,12,14,12,10],[3,6,9,11,9,6],[14,12,10,8,7,5],[1,4,7,10,8,5]],x=[0,125,275,445,625,790];function f(){S.forEach(e=>window.clearTimeout(e)),S=[]}function v(){g.forEach(e=>window.clearTimeout(e)),g=[],h&&(window.clearTimeout(h),h=null),i.querySelectorAll(".keyboard-key.is-playing").forEach(e=>e.classList.remove("is-playing"))}function P(){return`
    <svg class="keyboard-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g class="keyboard-sequence">
        ${Array.from({length:18},(t,r)=>`
          <rect class="keyboard-key" data-key="${r}" x="132" y="${108+r*32}" width="82" height="30" rx="1" />
        `).join("")}
        <path class="keyboard-spine" d="M216 108V684" />
      </g>
    </svg>`}function $(e=0,{preserveLoop:s=!1}={}){s?g=[]:v();const a=i.querySelector(".keyboard-overlay");if(!a)return;(T[e]||T[0]).forEach((r,o)=>{const l=window.setTimeout(()=>{const n=a.querySelector(`[data-key="${r}"]`);if(!n)return;n.classList.remove("is-playing"),n.getBoundingClientRect(),n.classList.add("is-playing");const b=window.setTimeout(()=>n.classList.remove("is-playing"),c?1:330);g.push(b)},c?o*30:x[o]);g.push(l)})}function D(){v();let e=0;const s=()=>{E!=="landing"||!i.querySelector(".keyboard-overlay")||($(e,{preserveLoop:!0}),e=(e+1)%T.length,h=window.setTimeout(s,c?900:1850))};s()}function k(e=null,{instant:s=!1}={}){const a=i.querySelector(".patent-plate"),t=i.querySelector(".patent-artwork");if(!a||!t)return;const r=a.clientWidth*.02;if(e===null){t.style.transform=`translate3d(${r}px, 0, 0) scale(1)`,a.classList.remove("is-focused");return}const o=C[e];if(!o)return;const l=a.clientWidth,n=a.clientHeight,b=o.x/1e3*l,j=o.y/750*n,R=l/2-b*o.zoom+r,N=n/2-j*o.zoom;t.style.transitionDuration=s||c?"1ms":"980ms",t.style.transform=`translate3d(${R}px, ${N}px, 0) scale(${o.zoom})`,a.classList.add("is-focused")}function I(e){f(),$(e);const s=i.querySelector(".patent-overlay");if(!s||!y[e])return;s.querySelectorAll(".patent-step").forEach((r,o)=>{r.classList.toggle("is-active",o<=e)});const a=s.querySelector(".patent-cursor"),t=y[e];a?.setAttribute("transform",`translate(${t.x} ${t.y})`),k(e)}function M(){return`
    <svg class="patent-overlay" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Patent drawing focus points">
      <g class="patent-sequence">
        ${y.map((e,s)=>`
          <g class="patent-step" data-step="${s}" role="button" tabindex="0" aria-label="Focus ${e.label}">
            <path class="patent-route" pathLength="1" d="${e.path}" />
            <circle class="patent-node" cx="${e.x}" cy="${e.y}" r="5" />
            <text class="patent-number" x="${e.x+12}" y="${e.y-10}">${e.number}</text>
            <text class="patent-label" x="${e.x+12}" y="${e.y+5}">${e.label}</text>
          </g>
        `).join("")}
        <circle class="patent-cursor" cx="0" cy="0" r="6" />
      </g>
    </svg>`}function q(){f(),v();const e=i.querySelector(".patent-overlay");if(!e)return;k(null,{instant:!0}),e.querySelectorAll(".patent-step").forEach(a=>a.classList.remove("is-active")),y.forEach((a,t)=>{const r=window.setTimeout(()=>{const o=e.querySelector(`[data-step="${t}"]`),l=e.querySelector(".patent-cursor");o&&(o.classList.add("is-active"),k(t),$(t),l?.animate([{transform:`translate(${t===0?0:y[t-1].x}px, ${t===0?0:y[t-1].y}px)`},{transform:`translate(${a.x}px, ${a.y}px)`}],{duration:c?1:620,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}))},c?t*45:620+t*920);S.push(r)});const s=window.setTimeout(()=>{k(null),e.querySelectorAll(".patent-step").forEach(a=>a.classList.remove("is-active")),D()},c?260:6e3);S.push(s)}function L(e,s){if(e.kind==="image")return`<img class="artwork-photo" src="${d(e.src)}" alt="${e.alt||`${s.title} image`}" loading="lazy" />`;if(e.kind==="prototype"){const a=e.modes||["interaction"],t=a.includes("interaction")?"interaction":a[0];return`<div class="prototype-preview" data-prototype-preview>
      ${a.length>1?`<div class="prototype-preview-toolbar" role="tablist" aria-label="${s.title} preview mode">
        <span class="prototype-preview-label">WORK PREVIEW</span>
        ${a.map(o=>`<button type="button" class="prototype-mode-button ${o===t?"is-selected":""}" data-prototype-mode="${o}" aria-selected="${o===t}">${o.toUpperCase()}</button>`).join("")}
      </div>`:""}
      <iframe class="project-index-prototype" data-prototype-frame src="${d(e.src)}${e.src.includes("?")?"&":"?"}chrome=0&mode=${t}" title="${e.alt}" loading="eager" allow="clipboard-write; fullscreen"></iframe>
    </div>`}return`<div class="project-image-placeholder"><span class="placeholder-index">PROJECT ${s.number}</span><strong>${s.shortTitle}</strong><span>${e.label||"ARTWORK IMAGE TO BE ADDED"}</span><div class="placeholder-line"></div></div>`}function Y(e){const s=(e.gallery||[])[0]||{kind:"placeholder",label:"ARTWORK IMAGE TO BE ADDED"};return`
    <div class="artwork-gallery" aria-label="${e.title} image gallery">
      <div class="gallery-viewport ${s.kind==="image"?"gallery-viewport--image":s.kind==="prototype"?"gallery-viewport--prototype":"gallery-viewport--placeholder"}">
        ${L(s,e)}
      </div>
    </div>`}function A({returning:e=!1}={}){E="landing",m=!1,f(),v(),i.innerHTML=`
    <div class="landing-shell ${e?"is-returning":""}">
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
                <source srcset="${d("/assets/kim-yeil-piano-cutout.webp")}" type="image/webp" />
                <img class="landing-art-image" src="${d("/assets/kim-yeil-piano-cutout.png")}" alt="Transparent grand piano technical drawing with keyboard, internal strings, and structural callouts" />
              </picture>
              ${P()}
              ${M()}
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
    </div>`,i.querySelector(".enter-index").addEventListener("click",O),i.querySelectorAll(".patent-step").forEach(s=>{const a=()=>I(Number(s.dataset.step));s.addEventListener("click",a),s.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),a())})}),window.setTimeout(q,e?120:420)}function O(){m||E!=="landing"||(m=!0,f(),v(),i.querySelector(".landing-shell")?.classList.add("is-pressing"),i.insertAdjacentHTML("beforeend",'<div class="route-transition" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PRESS / PLAY</span></div>'),window.setTimeout(()=>w(0,{arriving:!0}),c?40:560))}function w(e=u,{arriving:s=!1}={}){E="index",u=e,m=s,f(),v();const a=p[u];i.innerHTML=`
    <div class="press-play-shell ${s?"is-arriving":""}">
      <header class="topbar">
        <button class="wordmark" type="button" aria-label="Return to Kim Yeil introduction"><span>PRESS</span> PLAY<span class="wordmark-period">.</span></button>
        <div class="topbar-center" aria-hidden="true"><span class="topbar-rule"></span><span>KIM YEIL / SELECTED WORKS</span><span class="topbar-rule"></span></div>
        <div class="topbar-right"><button class="about-toggle" type="button">ABOUT</button><span class="edition">SEOUL — 2026</span></div>
      </header>
      <main class="gallery-main">
        <div class="gallery-index" aria-hidden="true"><span class="vertical-label">SELECTED WORK / ${String(p.length).padStart(2,"0")}</span><span class="index-line"></span><span class="index-count">${a.number}</span></div>
        <section class="work-copy" aria-live="polite">
          <div class="copy-topline"><span class="eyebrow">WORK ${a.number} / ${String(p.length).padStart(2,"0")}</span><span class="copy-status"><span class="status-dot"></span> PLAYING</span></div>
          <div class="title-wrap"><p class="work-kicker">${a.kicker}</p><h1>${a.title}</h1></div>
          <div class="copy-bottom"><p class="work-description">${a.description}</p><div class="work-meta"><span>${a.detail}</span><span>${a.year}</span></div></div>
          <aside class="project-detail-box" aria-label="${a.title} project details">
            <div class="project-detail-heading"><span class="eyebrow">PROJECT DETAILS</span><span class="project-detail-number">${a.number}</span></div>
            <p class="project-detail-summary">${a.project.overview}</p>
            <div class="project-detail-grid">
              <div><span class="project-detail-label">CLIENT</span><span>${a.project.client}</span></div>
              <div><span class="project-detail-label">ROLE</span><span>${a.project.role}</span></div>
              <div><span class="project-detail-label">MEDIUM</span><span>${a.project.medium}</span></div>
              <div><span class="project-detail-label">YEAR</span><span>${a.year}</span></div>
            </div>
            <div class="project-focus-list">${a.project.focus.map(t=>`<span>${t}</span>`).join("")}</div>
            <button class="project-link" type="button" data-project-detail>PROJECT DETAIL <span>↗</span></button>
          </aside>
        </section>
        <section class="art-stage" aria-label="${a.title} artwork">
          <div class="stage-corner stage-corner--tl">ONE-LINE / MOTION</div><div class="stage-corner stage-corner--br">PRESS TO PLAY</div>
          <div class="art-frame">${Y(a)}</div>
        </section>
      </main>
      <footer class="key-dock">
        <div class="dock-intro"><p class="eyebrow">SELECTED WORKS</p><p class="dock-instruction">Press a key<br class="desktop-break" /> to play.</p></div>
        <div class="piano-keys" role="group" aria-label="Choose a piece">
          ${p.map((t,r)=>`<button class="piano-key ${r===u?"is-active is-pressed":""}" type="button" data-index="${r}" aria-pressed="${r===u}" aria-label="Play ${t.title}, key ${t.key}"><span class="key-cap"></span><span class="key-number">KEY ${t.key}</span><span class="key-name">${t.title}</span><span class="key-arrow">↗</span></button>`).join("")}
        </div>
        <div class="dock-side-note" aria-hidden="true"><span>01</span><span class="dock-side-line"></span><span>${String(p.length).padStart(2,"0")}</span></div>
      </footer>
      ${s?`<div class="route-transition route-transition--reveal" aria-hidden="true"><span class="route-transition__line"></span><span class="route-transition__label">PLAYING 01 / ${String(p.length).padStart(2,"0")}</span></div>`:""}
    </div>`,i.querySelector(".wordmark").addEventListener("click",()=>A({returning:!0})),i.querySelector(".about-toggle").addEventListener("click",U),i.querySelector("[data-project-detail]")?.addEventListener("click",K),i.querySelectorAll("[data-prototype-mode]").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.prototypeMode,o=i.querySelector("[data-prototype-frame]");!o||!r||(i.querySelectorAll("[data-prototype-mode]").forEach(l=>{const n=l===t;l.classList.toggle("is-selected",n),l.setAttribute("aria-selected",String(n))}),o.src=`${d("/prototypes/culturepass-prototype.html")}?chrome=0&mode=${r}`)})}),i.querySelectorAll(".piano-key").forEach(t=>{t.addEventListener("click",()=>w(Number(t.dataset.index)))}),window.setTimeout(()=>{i.querySelector(".piano-key.is-pressed")?.classList.remove("is-pressed"),m=!1,i.querySelector(".route-transition--reveal")?.remove()},s?c?80:780:c?60:260)}function K(){if(i.querySelector(".project-detail-overlay"))return;const e=p[u],s=e.gallery?.[0]||{kind:"placeholder",label:"ARTWORK IMAGE TO BE ADDED"},a=e.key==="1"?`<iframe class="project-detail-prototype" src="${d("/prototypes/culturepass-prototype.html")}?chrome=0&mode=interaction" title="Culture Pass interactive prototype" loading="eager" allow="clipboard-write; fullscreen"></iframe>`:e.project.detailImage?`<img class="project-detail-image" src="${d(e.project.detailImage)}" alt="${e.shortTitle} project overview" />`:L(s,e),t=document.createElement("div");t.className="project-detail-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label",`${e.shortTitle} project details`),t.innerHTML=`
    <div class="project-detail-panel">
      <button class="project-detail-close" type="button" aria-label="Close project detail">CLOSE <span>×</span></button>
      <div class="project-detail-heading">
        <p class="eyebrow">PROJECT ${e.number} / ${String(p.length).padStart(2,"0")} · ${e.detail}</p>
        <h2>${e.title}</h2>
        <p class="project-detail-kicker">${e.kicker}</p>
      </div>
      <div class="project-detail-visual">${a}</div>
      <div class="project-detail-content">
        <section class="project-detail-section project-detail-section--wide">
          <p class="eyebrow">OVERVIEW</p>
          <h3>작은 흐름을 더 나은 경험으로.</h3>
          <p>${e.project.overview}</p>
        </section>
        <section class="project-detail-section">
          <p class="eyebrow">DESIGN FOCUS</p>
          <div class="project-focus-list">${e.project.focus.map(n=>`<span>${n}</span>`).join("")}</div>
        </section>
        <section class="project-detail-section">
          <p class="eyebrow">ROLE / MEDIUM</p>
          <p>${e.project.role} · ${e.project.medium}</p>
        </section>
        <section class="project-detail-section project-detail-insights">
          <p class="eyebrow">DIFFERENTIATING POINTS</p>
          <div class="project-insight-list">
            ${(e.project.insights||[]).map((n,b)=>`<article class="project-insight"><span class="project-insight-number">${String(b+1).padStart(2,"0")}</span><div><h4>${n.label}</h4><p>${n.text}</p></div></article>`).join("")}
          </div>
        </section>
      </div>
      <footer class="project-detail-footer"><span>KIM YEIL / SELECTED WORKS</span><span>${e.year}</span></footer>
    </div>`,i.appendChild(t),document.body.classList.add("project-detail-open");const r=t.querySelector(".project-detail-close"),o=()=>{t.remove(),document.body.classList.remove("project-detail-open"),document.removeEventListener("keydown",l),i.querySelector("[data-project-detail]")?.focus()},l=n=>{n.key==="Escape"&&o()};r.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()}),document.addEventListener("keydown",l),r.focus()}function U(){const e=i.querySelector(".about-panel");if(e){e.remove(),i.querySelector(".about-toggle").textContent="ABOUT";return}const s=document.createElement("aside");s.className="about-panel",s.setAttribute("aria-label","About Kim Yeil and Press Play"),s.innerHTML='<p class="eyebrow">ABOUT THE PRACTICE</p><p>Kim Yeil is a Seoul-based visual designer and art director working across identity, objects, and moving images.</p><p>Press Play is a small archive of moving lines. Choose a key, give it a moment, and let the work play.</p><p class="about-note">Use the keys 1—4 or click below.</p>',i.querySelector(".press-play-shell").appendChild(s),i.querySelector(".about-toggle").textContent="CLOSE"}window.addEventListener("keydown",e=>{if(m)return;if(E==="landing"){(e.key==="Enter"||e.key===" ")&&O();const a=Number(e.key)-1;a>=0&&a<4&&I(a);return}if(e.repeat)return;const s=Number(e.key)-1;s>=0&&s<p.length&&w(s)});A();
