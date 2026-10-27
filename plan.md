# PRESS PLAY. 재구성 계획

## 목표
김예일 디자이너의 정체성을 먼저 전달한 뒤, 사용자가 피아노 건반을 누르듯 작품을 재생하는 포트폴리오 경험을 완성한다.

## 승인된 유저플로우
1. `LANDING` — 김예일 소개와 피아노 원라인 시그니처
2. `PRESS` — ENTER THE INDEX 또는 Enter 키로 진입 액션 시작
3. `DRAW / OPEN` — 선이 화면을 가르고 인덱스 프레임이 열리는 전환
4. `INDEX` — 선택된 작품과 4개 피아노 건반
5. `PLAY` — 클릭 또는 숫자키 1–4로 작품 전환
6. `RETURN` — PRESS PLAY. 워드마크로 랜딩 복귀
7. `ABOUT` — 인덱스 위에 작업 태도 패널을 열고 닫음

## 구현 구조
- `client/index.html`: 최소 HTML 셸과 접근성 메타데이터
- `client/src/main.js`: 상태(`landing`, `transition`, `index`, `about`)와 DOM 렌더링, 키보드·터치 이벤트
- `client/src/styles.css`: 랜딩, 전환, 인덱스, 피아노 키, 반응형 및 reduced-motion 규칙
- inline SVG: 피아노 시그니처와 4개 작품의 선 그래픽

## 디자인 방향
- 아이보리 종이, 잉크 블랙, 절제된 테라코타
- Serif 타이틀과 Sans-serif 메타데이터의 편집 디자인
- 한 번의 선이 다음 화면의 프레임으로 이어지는 전환
- 장식보다 여백, 선 굵기, 키 프레스 피드백을 우선

## 전환 원칙
- Enter 버튼은 실제 건반처럼 눌린다.
- 850ms 내외의 짧은 전환에서 선이 확장되고 랜딩이 인덱스로 교체된다.
- `prefers-reduced-motion`에서는 150ms 이하의 단순 페이드로 대체한다.
