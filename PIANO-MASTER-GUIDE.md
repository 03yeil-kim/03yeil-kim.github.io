# Kim Yeil — Piano One-Line Master

랜딩페이지의 대표 시각 자산을 제작하기 위한 디자인 및 SVG 구조 가이드입니다. 이 이미지는 단순한 피아노 일러스트가 아니라, 김예일의 작업 태도와 `PRESS PLAY.`라는 인터랙션을 하나의 선으로 정의하는 시그니처 그래픽입니다.

## 1. 이미지의 역할

이 이미지는 사이트 진입 시 가장 먼저 보이는 대표 아트워크입니다. 사용자는 다음 세 가지를 한눈에 이해해야 합니다.

1. 이 사이트의 핵심 인터랙션은 피아노 건반을 누르는 경험이다.
2. 김예일의 작업은 정교하고 조용한 선에서 시작된다.
3. 랜딩의 피아노와 작품 인덱스 하단의 네비게이션 건반은 하나의 시각 시스템이다.

따라서 실제 피아노를 사실적으로 묘사하기보다, `keyboard / line / motion / pause`의 네 가지 키워드를 우선합니다.

## 2. 캔버스와 기본 비율

- Master SVG viewBox: `0 0 560 480`
- 랜딩 데스크톱 표시 영역: 가로 약 440px, 세로 약 330px
- 모바일 표시 영역: 가로 280~320px, 세로 약 220px
- 피아노 본체가 차지하는 영역: 전체 가로의 60~68%
- 피아노 본체의 중심: viewBox 기준 `x=280`, `y=250`
- 최소 안전 여백: 상하 50px, 좌우 45px
- 피아노는 정면에서 아주 약한 원근만 갖는다. 과도한 3D 표현은 사용하지 않는다.

권장 형태는 정면 키보드에 얇은 상부 면과 오른쪽 측면을 추가한 낮은 사각형 구조입니다.

```text
      ┌──────────────────────────────┐
     /                              /│
    ┌──────────────────────────────┐ │
    │  ▯  ▯  ▯  ▯  ▯                │ │
    │ ││││││││││││││││││││││││││││││ │
    └──────────────────────────────┘ │
     └───────────────────────────────┘
```

## 3. 색상 시스템

마스터 아트워크 내부에서는 색상을 세 가지로 제한합니다.

```css
--paper: #f3f0e9;       /* 배경과 건반의 아이보리 */
--ink: #171717;         /* 외곽선과 검은 상부 키 */
--terracotta: #bb5e3b;  /* 단 하나의 시선 포인트 */
--muted-ink: #746f67;   /* 필요한 경우에만 사용하는 보조 선 */
```

원칙:

- 검은 선은 완전한 순수 검정보다 `#171717`을 사용한다.
- 모든 주요 선은 `#171717`로 통일한다.
- 테라코타는 반드시 한두 군데만 사용한다. 권장 위치는 피아노 오른쪽 상단의 작은 점이다.
- 피아노 건반 내부는 배경과 같은 아이보리로 유지해 선의 구조가 먼저 보이게 한다.
- 검은 상부 키는 면으로 채우지 않고, 기본 마스터에서는 외곽선 중심으로 제작한다. 웹 인터랙션 버전에서만 필요한 경우 채움색을 적용한다.

## 4. 선 규칙

SVG는 선의 굵기 차이로 깊이를 표현합니다.

| 레이어 | stroke width | 용도 |
|---|---:|---|
| `main` | 2.2 | 피아노 외곽, 전면 프레임, 핵심 상부 키 |
| `secondary` | 1.6 | 상부 면, 측면, 연결되는 큰 곡선 |
| `fine` | 1.05 | 건반 분할선, 보조 선, 잔상 |
| `accent` | 0 | 테라코타 점 또는 작은 포인트 |

공통 SVG 속성:

```svg
fill="none"
stroke="#171717"
stroke-linecap="round"
stroke-linejoin="round"
vector-effect="non-scaling-stroke"
```

`vector-effect="non-scaling-stroke"`는 다양한 화면 크기에서 선이 지나치게 굵어지는 것을 막기 위해 사용합니다.

## 5. 아트워크 구성 레이어

SVG 내부는 다음 순서로 구성합니다.

```text
01. background-free canvas
02. outer motion curve
03. piano top plane
04. piano side plane
05. piano front frame
06. white key divisions
07. black key silhouettes
08. terracotta focal dot
09. optional registration marks
```

레이어 순서를 지키면 피아노 외곽선이 건반 분할선보다 먼저 읽히고, 긴 곡선은 피아노 뒤에서 시작해 하나의 동작처럼 보입니다.

## 6. 권장 SVG 코드 구조

아래 구조를 마스터 파일의 출발점으로 사용합니다. 실제 작업에서는 path의 좌표를 다듬되, 그룹 구조와 클래스명은 유지하는 것을 권장합니다.

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 560 480"
  role="img"
  aria-labelledby="piano-title piano-desc"
>
  <title id="piano-title">Piano keyboard one-line study</title>
  <desc id="piano-desc">
    A minimal one-line piano keyboard drawing created for Kim Yeil's Press Play portfolio.
  </desc>

  <defs>
    <style>
      .ink {
        fill: none;
        stroke: #171717;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }

      .main {
        stroke-width: 2.2;
      }

      .secondary {
        stroke-width: 1.6;
      }

      .fine {
        stroke-width: 1.05;
      }

      .key-cap {
        fill: #f3f0e9;
      }

      .accent {
        fill: #bb5e3b;
        stroke: none;
      }
    </style>
  </defs>

  <!-- 01. One continuous gesture that leads into the keyboard -->
  <g id="motion-curve" class="ink secondary" aria-hidden="true">
    <path d="M70 228c24-39 52-57 84-55" />
    <path d="M70 228c-12 18-18 37-18 57 0 61 49 111 110 111" />
  </g>

  <!-- 02. Thin upper plane: the only perspective cue -->
  <g id="piano-top" class="ink secondary">
    <path d="M105 159l36-29h345l-35 29" />
  </g>

  <!-- 03. Right side plane -->
  <g id="piano-side" class="ink secondary">
    <path d="M451 159v181l35-29V130" />
  </g>

  <!-- 04. Front keyboard frame -->
  <g id="piano-frame" class="ink main">
    <path d="M105 159h346v181H105z" />
  </g>

  <!-- 05. Ivory key divisions -->
  <g id="ivory-keys" class="ink fine">
    <path d="M155 159v181" />
    <path d="M205 159v181" />
    <path d="M255 159v181" />
    <path d="M305 159v181" />
    <path d="M355 159v181" />
    <path d="M405 159v181" />
  </g>

  <!-- 06. Black key caps, deliberately irregular like a drawn object -->
  <g id="black-keys" class="ink main">
    <path d="M146 159v58h25v-58" />
    <path d="M196 159v58h25v-58" />
    <path d="M281 159v58h25v-58" />
    <path d="M331 159v58h25v-58" />
    <path d="M381 159v58h25v-58" />
  </g>

  <!-- 07. One controlled point of color -->
  <circle id="accent-dot" class="accent" cx="462" cy="114" r="7" />
</svg>
```

## 7. 원라인의 해석 규칙

피아노를 단순한 아이콘처럼 닫힌 도형으로 그리지 않습니다. 최소 한 군데는 선이 구조 밖으로 빠져나가야 합니다. 이 선은 다음 세 가지 역할을 합니다.

- 작품 인덱스의 선 드로잉과 연결
- `Press Play`의 재생 동작을 시각화
- 정적인 피아노를 살아 있는 오브젝트로 변환

권장 연결선은 피아노 왼쪽 하단에서 시작해 바깥쪽으로 크게 한 번 휘어진 뒤 멈추는 형태입니다. 끝을 피아노에 다시 닫지 않는 것이 중요합니다.

피해야 할 것:

- 실제 피아노의 다리, 페달, 건반 깊이를 모두 묘사하는 것
- 과도한 원근과 사실적인 음영
- 10개 이상의 검은 키를 세밀하게 그리는 것
- 테라코타 포인트를 여러 개 사용하는 것
- 선이 서로 겹쳐 복잡하게 뭉치는 것

## 8. 애니메이션용 속성

마스터 SVG에는 애니메이션을 직접 굽지 않고, 웹에서 클래스를 추가하는 방식으로 관리합니다. 각 선에는 `pathLength="1"`을 넣어 길이에 상관없이 동일한 애니메이션을 적용합니다.

```svg
<path
  class="ink main draw-line"
  pathLength="1"
  d="M105 159h346v181H105z"
/>
```

```css
.draw-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw-line 900ms cubic-bezier(.2, .75, .2, 1) forwards;
}

#piano-top .draw-line,
#piano-side .draw-line {
  animation-delay: 120ms;
}

#ivory-keys .draw-line {
  animation-delay: 280ms;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}
```

전환 시퀀스는 다음을 권장합니다.

```text
0ms       외곽 연결선 시작
120ms     상부 면과 측면 시작
220ms     전면 프레임 시작
380ms     아이보리 키 분할선
520ms     검은 상부 키
680ms     테라코타 포인트 등장
```

테라코타 점은 그려지는 대신 `scale(0.4) → scale(1)`의 작은 pulse를 사용하는 것이 좋습니다.

## 9. 파일 산출물

디자인 작업이 끝나면 다음 네 가지를 저장합니다.

```text
assets/
├── kim-yeil-piano-master.svg      # 편집 가능한 원본
├── kim-yeil-piano-master.webp     # 2x 웹 프리뷰
├── kim-yeil-piano-master.png      # 투명 배경 검수용
└── kim-yeil-piano-master-guide.pdf # 디자인 전달용 검수본
```

권장 export:

- SVG: viewBox 유지, 불필요한 editor metadata 제거
- WebP: 1120×960 또는 2x 기준, 배경 투명
- PNG: 투명 배경, 선 검수용
- PDF: 아이보리 배경 위 실제 사용 크기와 흑백 1색 버전 포함

## 10. 검수 체크리스트

- [ ] 축소했을 때 피아노라는 형태가 1초 안에 인식되는가
- [ ] 320px 모바일 표시에서도 건반 분할이 뭉개지지 않는가
- [ ] 원라인의 시작점과 끝점이 의도적으로 보이는가
- [ ] 테라코타 포인트가 시선을 끌되 전체보다 앞서지 않는가
- [ ] 검은 상부 키가 아이보리 건반과 구분되는가
- [ ] 선 굵기가 작품 인덱스의 원라인 아트와 일관되는가
- [ ] `prefers-reduced-motion`에서 정적인 이미지로도 완성도가 유지되는가
- [ ] SVG에 title과 desc가 포함되어 있는가
- [ ] 외부 폰트나 래스터 이미지 없이 독립적으로 열리는가

## 11. 한 줄 아트 디렉션

> 피아노를 그리는 것이 아니라, 한 번의 선으로 “재생되기 직전의 침묵”을 그린다.
