import { create } from "zustand";
import { getMyProfile } from "../api/member"; // 방금 찾으신 API

const useUserStore = create((set) => ({
  nickname: "",

  fetchUserInfo: async () => {
    try {
      const data = await getMyProfile();
      set({ nickname: data.nickname });
    } catch (error) {
      console.error("유저 정보 세팅 실패:", error);
    }
  },
}));

export default useUserStore;
