##📌 이슈 생성
* `[Feature]` : 새로운 페이지 또는 UI 기능 구현
* `[Fix]` : UI 깨짐, 스크립트 오류 등 버그 수정
* `[Refactor]` : 컴포넌트 구조 개선, 코드 리팩토링
* `[Style]` : CSS 스타일링, 디자인 레이아웃 수정

## 💌 네이밍 컨벤션
- 컴포넌트 or 페이지 : PascalCase
  - 예) Button.jsx, RouteCard.jsx, HomePage.jsx

- 그 외 파일(API, Store, Hook, Util 등) : camelCase
  - 예) storeApi.js, axiosInstance.js, useAuthStore.js, formatPrice.js


## 📌 브랜치 컨벤션
- main : 배포용 브랜치
- feature/기능명 : 새로운 기능 개발
- fix/버그명 : 버그 수정


## 📝 커밋 컨벤션
- [Feat] : 새로운 기능 구현
- [Mod] : 코드 수정 및 내부 파일 수정
- [Add] : 부수적인 코드 추가 및 라이브러리 추가, 새로운 파일 생성
- [Fix] : 버그 및 오류 해결
- [Docs] : 문서화 작업 시
- [Refactor] : 코드 리팩터링(전면수정)
- [Chore] : 버전 코드 수정, 패키지 구조 [C변경, 타입 및 변수명 변경 등의 작은 변경 등 진짜 별 거 아닌]
- [Rename] : 파일명 또는 폴더명 수정한 경우
- [Del]: 쓸모없는 코드나 파일 삭제
- [Environment] : 개발 환경 세팅 시
- [!HOTFIX] : 급하게 치명적인 버그를 고쳐야 하는 경우

## ID/PW 로그인

첫 화면에서 카카오 로그인과 ID/PW 로그인을 함께 제공합니다. ID/PW 로그인 활성화 여부는 백엔드의 `TEST_LOGIN_ENABLED` 환경변수로 관리하며 프론트엔드 환경변수는 필요하지 않습니다.
