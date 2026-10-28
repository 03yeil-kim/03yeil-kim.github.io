# PRESS PLAY. 유지보수 및 재배포 지침

이 문서는 김예일의 PRESS PLAY. 포트폴리오를 계속 수정하면서도 랜딩 페이지, 작품 인덱스, 프로토타입, GitHub Pages 배포가 깨지지 않도록 하기 위한 운영 지침입니다.

## 1. 공개 링크와 저장소 구조

공개 웹사이트는 다음 주소입니다.

`https://03yeil-kim.github.io`

현재 GitHub 저장소는 `03yeil-kim/03yeil-kim.github.io`입니다.

- `source` 브랜치: HTML·CSS·JavaScript·이미지·프로토타입을 편집하는 원본 소스
- `main` 브랜치: GitHub Pages가 직접 제공하는 빌드 결과물
- `gh-pages` 브랜치: 이전 프로젝트형 Pages 배포본. 루트 사용자 사이트의 실제 배포 기준은 `main`

중요: 원본 소스 전체를 `main`에 그대로 올리면 GitHub Pages에서 README나 저장소 파일 화면이 보일 수 있습니다. 공개 사이트를 업데이트할 때는 반드시 `dist/public`의 빌드 결과물을 `main` 루트에 배포합니다.

## 2. 어디를 수정해야 하는가

### 작품 정보와 Project Detail 텍스트

파일: `client/src/main.js`

`const artworks = [...]` 안에서 작품별 다음 값을 수정합니다.

- `title`, `shortTitle`: 작품명
- `kicker`: 작품 한 줄 문장
- `description`: 인덱스 화면의 짧은 설명
- `detail`: 역할·매체를 요약한 상단 라벨
- `gallery`: Work Preview 이미지 또는 프로토타입
- `project.overview`: Project Detail 개요
- `project.focus`: 핵심 키워드 태그
- `project.insights`: Overview와 구분되는 차별화 포인트

`project.insights`는 다음 형식을 유지합니다.

```js
insights: [
  { label: "DESIGN DECISION", text: "왜 이렇게 설계했는지 설명하는 문장입니다." },
]
```

상단 Overview에는 프로젝트가 무엇인지 쓰고, 하단 DIFFERENTIATING POINTS에는 문제 해결 방식·인터랙션·정보 구조·시각적 판단을 씁니다. 같은 문장을 두 영역에 반복하지 않습니다.

### 전체 색상·레이아웃·타이포그래피

파일: `client/src/styles.css`

- 색상 토큰과 전역 분위기: 파일 상단 변수
- 랜딩 페이지: `landing-*`
- 작품 스테이지와 인덱스: `index-*`, `project-*`
- 피아노 건반 내비게이션: `piano-*`, `key-*`
- Project Detail 오버레이: `project-detail-*`, `project-insight-*`
- 모바일 대응: 파일 하단의 `@media` 블록

기존 프레임 크기와 여백을 먼저 보존한 뒤, 필요한 컴포넌트에만 수정합니다. `body`, `.app-shell`, `.project-stage` 같은 전역 레이아웃을 한 번에 바꾸면 모든 인덱스가 함께 변할 수 있습니다.

### 이미지 자산

폴더: `client/public/assets/`

새 이미지는 이 폴더에 넣고, `main.js`의 작품 데이터에서 `/assets/파일명`으로 연결합니다. 파일명은 공백 대신 영문·숫자·하이픈을 사용합니다.

예:

```js
detailImage: "/assets/new-project-overview.webp"
```

큰 이미지는 가능하면 WebP를 우선 사용합니다. PNG는 투명도나 원본 보존이 필요한 경우에만 사용합니다.

### 인터랙티브 프로토타입

폴더: `client/public/prototypes/`

외부 의존성이 적은 단일 HTML 프로토타입을 넣는 방식이 가장 안전합니다. 작품 데이터에는 다음처럼 연결합니다.

```js
{
  kind: "prototype",
  src: "/prototypes/new-project.html",
  alt: "New project interactive preview",
  label: "INTERACTIVE PREVIEW",
  modes: ["mobile"]
}
```

프로토타입 내부의 버튼·스크롤·탭·재생 인터랙션은 iframe 안에서 작동합니다. 외부 API, 절대 URL, 서버 전용 기능에는 의존하지 않는 것을 권장합니다.

## 3. GitHub Pages 경로 규칙

현재 웹사이트는 사용자 루트 도메인 `https://03yeil-kim.github.io`에서 제공되므로 `/final/` 같은 하위 경로를 추가하지 않습니다.

`vite.config.ts`의 `base: "./"`와 `main.js`의 `publicPath()` 헬퍼는 이미지·프로토타입·번들 파일을 상대 경로로 연결하기 위해 필요합니다. 다음 코드를 임의로 절대 경로로 되돌리지 않습니다.

```js
const publicPath = (value) => `${import.meta.env.BASE_URL}${String(value).replace(/^\/+/, "")}`;
```

## 4. 수정 후 검증 순서

프로젝트 루트에서 실행합니다.

```bash
pnpm check
pnpm build:static
```

빌드 결과는 `dist/public/`에 생성됩니다. 다음 파일과 폴더가 있는지 확인합니다.

- `dist/public/index.html`
- `dist/public/assets/`
- `dist/public/prototypes/`
- `dist/public/api/platform/config.js`

간단한 로컬 확인이 필요하면 다음을 실행합니다.

```bash
python3 -m http.server 4173 --directory dist/public
```

브라우저에서 `http://localhost:4173`을 열어 랜딩 진입, 작품 건반, Project Detail, 프로토타입을 확인합니다.

## 5. GitHub Pages 배포 순서

현재 구조에서는 원본 소스와 Pages 빌드 결과를 분리합니다.

1. 수정한 원본을 `source` 브랜치에 커밋합니다.
2. `pnpm check`와 `pnpm build:static`을 통과시킵니다.
3. `dist/public/`의 내용만 사용자 사이트 저장소 `main` 루트에 복사합니다.
4. `main` 루트에 `.nojekyll` 파일이 있는지 확인합니다.
5. `main`에 push합니다.
6. 1–3분 뒤 `https://03yeil-kim.github.io`에서 확인합니다.

GitHub 저장소 화면인 `https://github.com/03yeil-kim/03yeil-kim.github.io`와 실제 웹사이트 URL을 혼동하지 않습니다.

## 6. 새 작품 추가 체크리스트

- [ ] 작품 이미지와 프로토타입 파일을 각각 올렸다.
- [ ] `artworks` 배열의 작품 수와 `KEY` 번호를 맞췄다.
- [ ] `project.overview`와 `project.insights`의 내용이 서로 반복되지 않는다.
- [ ] Work Preview 프레임 크기를 기존 인덱스와 동일하게 유지했다.
- [ ] Project Detail 대표 이미지를 별도로 지정했다.
- [ ] 모바일에서 제목·프레임·건반·오버레이가 화면 밖으로 나가지 않는다.
- [ ] `pnpm check`가 통과했다.
- [ ] `pnpm build:static`이 통과했다.
- [ ] 빌드 결과를 `main`에 배포한 뒤 공개 URL에서 실제로 확인했다.

## 7. 안전 원칙

- 기존 `source` 브랜치와 작업 파일을 먼저 백업한 뒤 수정합니다.
- 확인되지 않은 이미지를 삭제하지 않습니다.
- `main`에 소스 파일을 직접 올려 Pages 배포를 깨뜨리지 않습니다.
- 저장소 삭제보다 새 브랜치·새 커밋을 우선합니다.
- 콘텐츠 수정과 레이아웃 수정은 가능한 한 별도 커밋으로 나눕니다.
