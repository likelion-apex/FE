# 💧 SOAK

> **AI 기반 맞춤형 화장품 성분 분석 및 데일리 케어 루틴 관리 서비스**

SOAK은 사용자의 피부 상태와 보유 화장품을 바탕으로  
더 나은 스킨케어 루틴을 제안하고, 매일의 피부 기록과 루틴 실천을 관리할 수 있도록 돕는 서비스입니다.

<br />

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=zustand&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

<br />

## ✨ Key Features

### 1. 사용자 인증 및 온보딩

- 카카오 OAuth 2.0 기반 소셜 로그인 및 심사·시연용 ID/PW 로컬 로그인 지원
- Zustand Persist를 활용한 JWT(access token, refresh token) 및 회원 세션 관리
- 피부 타입과 피부 고민 설정 여부에 따른 신규 사용자 온보딩 라우팅 분기

### 2. 마이 인벤토리 · 화장대 관리

- 보유 화장품 등록, 삭제 및 즐겨찾기 기능
- 터치·마우스 스와이프 기반 인벤토리 페이지네이션
- 등록한 제품의 상세 정보와 성분 정보 확인

### 3. AI 성분 분석 및 맞춤 루틴

- 숏폼 영상 속 화장품을 분석해 성분 정보와 피부 맞춤 점수 제공
- 보유 중인 인벤토리 제품을 활용한 AI 대체 제품 추천
- 피부 상태와 제품 정보를 바탕으로 한 개인 맞춤형 스킨케어 루틴 생성

### 4. 데일리 루틴 및 피부 기록 관리

- 오늘의 루틴을 단계별로 체크하고, 전체 완료 및 실천 진행률을 한눈에 확인
- Zustand 전역 상태를 통해 홈과 데일리 루틴 화면의 완료 상태를 실시간으로 동기화
- 월별 캘린더에서 루틴을 완료했거나 피부 기록을 남긴 날짜를 확인
- 날짜 선택 시 해당 일자의 피부 컨디션, 메모, 수행 루틴 및 실천도를 상세 모달로 제공
- 과거 기록은 저장된 루틴 로그를, 오늘 기록은 현재 진행 중인 활성 루틴을 기준으로 표시
- 루틴 완료 후 월별 완료 일수와 캘린더 데이터를 즉시 갱신하여 최신 상태 유지

### 5. 마이페이지

- 사용자 프로필 및 기본 회원 정보 확인
- 피부 타입과 피부 고민 등 개인 피부 정보 조회
- 서비스 이용에 필요한 계정 설정 및 로그아웃 기능 제공
- 사용자 정보를 기반으로 개인화된 SOAK 서비스 경험 지원

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
