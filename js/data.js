/* =========================================================
   PRESS PLAY. — data.js
   작품 정보만 모아 둔 파일입니다. 작품 내용 수정은 여기서 하세요.
   - 순서 = 건반 순서 (KEY 1, 2, 3 …)
   - 이미지·프로토타입 경로는 index.html 기준 상대경로입니다.
   ========================================================= */
window.PressPlay = window.PressPlay || {};

window.PressPlay.works = [
  {
    key: "1",
    number: "01",
    title: "Culture Pass",
    shortTitle: "경기컬처패스 리디자인",
    kicker: "Culture, one clear step closer.",
    description: "문화 혜택을 발견하는 순간부터 쿠폰을 사용하기까지, 끊김 없이 이어지도록 다시 설계한 웹·모바일 리디자인입니다.",
    detail: "SERVICE REDESIGN · UI/UX · WEB + MOBILE",
    year: "2026",
    preview: {
      kind: "prototype",
      src: "asset/prototypes/culturepass-prototype.html",
      alt: "경기컬처패스 모바일 및 인터랙션 프로토타입",
      modes: ["mobile", "interaction"],
      // '처음부터' 버튼을 누르면 지우는 저장 기록 (받은 쿠폰·찜 목록)
      resetKeys: ["culturepass-portfolio-prototype-v1", "culturepass-portfolio-favorites-v1"],
    },
    project: {
      client: "경기컬처패스",
      role: "Service Redesign / UI·UX",
      medium: "Web + Mobile",
      url: "",
      // 상세 창 화면 갤러리 (kind: "mobile" 세로 화면 / "desktop" 가로 화면)
      screens: [
        { src: "asset/images/screens/culturepass-01-home.webp", label: "Home", kind: "mobile" },
        { src: "asset/images/screens/culturepass-02-benefits.webp", label: "Benefits", kind: "mobile" },
        { src: "asset/images/screens/culturepass-03-coupon.webp", label: "Coupon", kind: "mobile" },
      ],
      overview: "복잡했던 탐색과 쿠폰 사용 흐름을 분석해, 혜택 발견부터 쿠폰 확인·번호 복사·제휴사 이동까지의 경험을 다시 설계했습니다.",
      focus: ["기존 서비스 분석", "정보 구조 재정리", "쿠폰 사용 흐름", "반응형 리디자인"],
      insights: [
        { label: "REDUCE THE DISTANCE", text: "문화 혜택을 발견한 뒤 실제 쿠폰 사용까지 이동해야 하는 단계를 줄이고, 사용자가 다음 행동을 자연스럽게 이해하도록 정보 구조를 재정리했습니다." },
        { label: "COUPON AS ACTION", text: "쿠폰을 단순히 보여주는 데서 끝내지 않고 선택·번호 복사·제휴사 이동을 하나의 연속된 행동으로 연결했습니다." },
        { label: "WEB TO MOBILE", text: "웹에서 혜택을 탐색하고 모바일에서 쿠폰을 사용하는 실제 흐름을 고려해 두 화면이 단절되지 않도록 설계했습니다." },
      ],
    },
  },
  {
    key: "2",
    number: "02",
    title: "BITE",
    shortTitle: "BITE 콘텐츠 추천 앱",
    kicker: "Small bites, brighter days.",
    description: "식사 시간과 이동 시간 사이, 지금의 여유에 맞는 콘텐츠를 발견하는 시간 기반 추천 앱입니다.",
    detail: "APP UX/UI · CONTENT DISCOVERY",
    year: "2026",
    preview: {
      kind: "prototype",
      src: "asset/prototypes/bite/index.html",
      alt: "BITE 모바일 콘텐츠 추천 앱 프로토타입",
      modes: ["mobile"],
    },
    project: {
      client: "BITE",
      role: "UX/UI Design",
      medium: "Content Discovery App",
      url: "",
      // 상세 창 화면 갤러리 (kind: "mobile" 세로 화면 / "desktop" 가로 화면)
      screens: [
        { src: "asset/images/screens/bite-01-onboarding.webp", label: "Onboarding", kind: "mobile" },
        { src: "asset/images/screens/bite-02-home.webp", label: "Home", kind: "mobile" },
        { src: "asset/images/screens/bite-03-player.webp", label: "Player", kind: "mobile" },
      ],
      overview: "BITE는 사용자가 설정한 식사·이동 시간과 상황에 맞춰 부담 없이 볼 수 있는 영상 콘텐츠를 제안하는 앱 콘셉트입니다. 추천 이유와 예상 시청 시간을 함께 보여줍니다.",
      focus: ["시간 기반 추천", "식사·이동 상황", "취향 설정", "저장 콘텐츠"],
      insights: [
        { label: "CONTENT FOR THE MOMENT", text: "콘텐츠를 장르나 인기 순위만으로 추천하지 않고, 사용자가 지금 어떤 상황에 있는지를 중심으로 탐색 경험을 구성했습니다." },
        { label: "LOW-EFFORT DISCOVERY", text: "긴 탐색 과정을 거치지 않아도 바로 선택할 수 있도록 예상 시청 시간과 콘텐츠의 분위기를 함께 보여줍니다." },
        { label: "KEEP GOING", text: "이미 본 콘텐츠와 저장한 콘텐츠를 다시 이어볼 수 있도록 구성해 한 번의 선택이 다음 감상으로 자연스럽게 이어지게 했습니다." },
        { label: "SMALL STORY, CLEAR ACTION", text: "콘텐츠의 제목과 설명은 짧고 명확하게 정리하고, 바로 재생·저장·다른 추천 행동을 쉽게 찾을 수 있도록 했습니다." },
      ],
    },
  },
  {
    key: "3",
    number: "03",
    title: "STILL",
    shortTitle: "STILL 비주얼 저널 랜딩페이지",
    kicker: "익숙한 순간, 새로운 시선.",
    description: "건축과 일상의 장면을 따라 시선이 흐르는 비주얼 저널. 절제된 타이포그래피와 이미지 시퀀스로 감상의 리듬을 만들었습니다.",
    detail: "WEB DESIGN · INTERACTION · RESPONSIVE",
    year: "2026",
    preview: {
      kind: "prototype",
      src: "asset/prototypes/still-demo.html",
      alt: "STILL 비주얼 저널 인터랙티브 랜딩 프로토타입",
      modes: ["mobile"],
    },
    project: {
      client: "STILL",
      role: "Web Design / Interaction",
      medium: "Responsive Web",
      url: "",
      // 상세 창 화면 갤러리 (kind: "mobile" 세로 화면 / "desktop" 가로 화면)
      screens: [
        { src: "asset/images/screens/still-01-desktop.webp", label: "Desktop", kind: "desktop" },
        { src: "asset/images/screens/still-02-mobile-hero.webp", label: "Mobile — Hero", kind: "mobile" },
        { src: "asset/images/screens/still-03-mobile-sequence.webp", label: "Mobile — Sequence", kind: "mobile" },
      ],
      overview: "STILL은 익숙한 장면을 새로운 시선으로 바라보게 하는 비주얼 저널 웹사이트 콘셉트입니다. 큰 제목과 넉넉한 여백, 이미지 시퀀스로 편집적인 인상을 만들었습니다.",
      focus: ["비주얼 저널", "순차 등장 애니메이션", "스크롤 인터랙션", "반응형 웹"],
      insights: [
        { label: "SCROLL AS EDITING", text: "스크롤을 단순한 이동 방식으로 사용하지 않고 이미지와 텍스트가 등장하고 사라지는 순서를 조절하는 편집 장치로 활용했습니다." },
        { label: "IMAGE SEQUENCE", text: "한 장의 이미지를 크게 보여주는 대신 여러 장면을 순차적으로 연결해 사용자가 작품을 읽는 듯한 감상 흐름을 경험하도록 했습니다." },
        { label: "SPACE AS CONTENT", text: "콘텐츠를 채우는 것보다 비워둔 공간의 역할을 중요하게 다뤘습니다. 여백은 이미지와 제목 사이에 호흡을 만듭니다." },
        { label: "QUIET INTERACTION", text: "강한 효과나 빠른 전환 대신 느린 움직임과 절제된 타이포그래피로 작품의 분위기를 방해하지 않는 인터랙션을 구성했습니다." },
      ],
    },
  },
];
