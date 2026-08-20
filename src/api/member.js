import axiosInstance from "./axiosInstance";

const unwrap = (response) => response.data.data;

export const getMyProfile = () =>
  axiosInstance.get("/api/members/me").then(unwrap);

// 닉네임/피부타입/피부고민을 한 번에 저장한다. 온보딩 마지막 단계에서 사용한다.
// skinType, skinConcerns는 서버 enum 문자열이어야 한다. (constants/skin.js 참고)
export const updateProfile = ({ nickname, skinType, skinConcerns }) =>
  axiosInstance
    .patch("/api/members/me", { nickname, skinType, skinConcerns })
    .then(unwrap);

export const updateNickname = (nickname) =>
  axiosInstance.patch("/api/members/me/nickname", { nickname }).then(unwrap);

export const updateSkinType = (skinType) =>
  axiosInstance.patch("/api/members/me/skin-type", { skinType }).then(unwrap);

export const updateSkinConcerns = (skinConcerns) =>
  axiosInstance
    .patch("/api/members/me/skin-concerns", { skinConcerns })
    .then(unwrap);

export const completeOnboarding = () =>
  axiosInstance.post("/api/members/me/onboarding/complete").then(unwrap);
