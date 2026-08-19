import { create } from "zustand";

const useUserStore = create((set) => ({
  nickname: "", // 초기값은 빈 문자열
  setNickname: (name) => set({ nickname: name }), // 닉네임을 업데이트하는 함수
}));

export default useUserStore;
