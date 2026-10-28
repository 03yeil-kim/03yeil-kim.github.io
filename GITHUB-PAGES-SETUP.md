# GitHub Pages 배포 안내

저장소는 `03yeil-kim/final`을 기준으로 구성되어 있습니다. GitHub Actions가 `main` 브랜치에 push될 때 Vite 정적 빌드를 실행하고 `dist/public`을 GitHub Pages에 배포합니다.

## 저장소 설정

GitHub 저장소의 **Settings → Pages → Build and deployment**에서 Source를 **GitHub Actions**로 선택합니다. 별도의 브랜치나 `/docs` 폴더를 선택하지 않습니다.

배포가 완료되면 기본 주소는 다음과 같습니다.

`https://03yeil-kim.github.io/final/`

## 포함된 배포 규칙

- `.github/workflows/deploy-pages.yml`
- Node.js 20
- pnpm 10
- `pnpm install --frozen-lockfile`
- `pnpm build:static`
- `dist/public` 업로드
- GitHub Pages 하위 경로를 위한 Vite 상대 base 설정

이미지, Culture Pass, BITE, STILL 프로토타입은 모두 정적 파일로 포함되며, 프로젝트 경로에서 작동하도록 상대 경로로 빌드됩니다.
