import axiosInstance, { plainAxios } from "./axiosInstance";

// 서버 응답은 { success, code, message, data } 형태로 감싸져 온다.
const unwrap = (response) => response.data.data;

// 카카오 인가 코드로 로그인/회원가입 후 토큰을 발급받는다.
export const kakaoLogin = (code) =>
  plainAxios.post("/api/auth/kakao/login", { code }).then(unwrap);

export const localLogin = (loginId, password) =>
  plainAxios
    .post("/api/auth/local/login", { loginId, password })
    .then(unwrap);

export const logout = () => axiosInstance.post("/api/auth/logout");

export const reissueToken = (refreshToken) =>
  plainAxios.post("/api/auth/reissue", { refreshToken }).then(unwrap);
