# 💧 SOAK - Frontend Repository

AI 맞춤형 화장품 성분 분석 및 데일리 케어 루틴 관리 서비스 'SOAK'의 프론트엔드 레포지토리입니다.

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (w/ persist)
- **Routing:** React Router DOM
- **HTTP Client:** Axios

---

## 🚀 Key Features (주요 기능)

### 1. 사용자 인증 및 온보딩
- 카카오 OAuth 2.0 기반 메인 소셜 로그인 및 심사/시연용 ID/PW 로컬 로그인 지원
- Zustand 기반 JWT(`accessToken`, `refreshToken`) 및 회원 정보 세션 관리
- 신규 유저 온보딩(피부 타입, 고민 설정) 여부에 따른 라우팅 분기 처리

### 2. 마이 인벤토리 (화장대 관리)
- 보유 중인 화장품 등록, 삭제 및 즐겨찾기 기능
- 터치/마우스 스와이프 기반 인벤토리 페이지네이션 및 제품 상세 정보 확인

### 3. AI 화장품 성분 분석 및 최적화 루틴
- 숏폼 영상 속 제품의 성분 분석 및 피부 맞춤 점수 제공
- 보유 인벤토리 제품을 활용한 AI 대체 추천 및 맞춤 루틴 생성
- 데일리 루틴 단계별 완료 체크 및 루틴 기록(로그) 캘린더 관리

---

## 📐 Conventions (규칙 및 컨벤션)

### 📌 이슈 생성 (Issue)
* `[Feature]` : 새로운 페이지 또는 UI 기능 구현
* `[Fix]` : UI 깨짐, 스크립트 오류 등 버그 수정
* `[Refactor]` : 컴포넌트 구조 개선, 코드 리팩토링
* `[Style]` : CSS 스타일링, 디자인 레이아웃 수정

### 💌 네이밍 컨벤션 (Naming)
- **컴포넌트 or 페이지 (PascalCase):** `Button.jsx`, `RouteCard.jsx`, `HomePage.jsx`
- **그 외 파일 (camelCase):** API, Store, Hook, Util 등 (`storeApi.js`, `axiosInstance.js`, `useAuthStore.js`, `formatPrice.js`)

### 🌿 브랜치 컨벤션 (Branch)
- `main` : 배포용 브랜치
- `feature/기능명` : 새로운 기능 개발
- `fix/버그명` : 버그 수정

### 📝 커밋 컨벤션 (Commit)
- `[Feat]` : 새로운 기능 구현
- `[Mod]` : 코드 수정 및 내부 파일 수정
- `[Add]` : 부수적인 코드 추가 및 라이브러리 추가, 새로운 파일 생성
- `[Fix]` : 버그 및 오류 해결
- `[Docs]` : 문서화 작업 시
- `[Chore]` : 버전 코드 수정, 패키지 구조 변경, 타입 및 변수명 변경 등 사소한 변경
- `[Rename]` : 파일명 또는 폴더명 수정한 경우
- `[Del]` : 쓸모없는 코드나 파일 삭제
- `[Environment]` : 개발 환경 세팅 시
- `[!HOTFIX]` : 급하게 치명적인 버그를 고쳐야 하는 경우
