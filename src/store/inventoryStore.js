import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore";

const useInventoryStore = create((set) => ({
  inventoryList: [], // 전체 화장품 리스트를 보관할 곳
  setInventoryList: (list) => set({ inventoryList: list }), // 리스트를 강제로 업데이트할 때 쓰는 함수

  // 💡 새롭게 추가한 데이터 새로고침(Fetch) 함수!
  fetchInventoryList: async () => {
    try {
      // 1. authStore에서 내 신분증(토큰)을 직접 꺼내옵니다.
      const accessToken = useAuthStore.getState().accessToken;

      if (!accessToken) {
        console.error("토큰이 없어서 데이터를 불러올 수 없습니다.");
        return;
      }

      // 2. 백엔드에서 전체 인벤토리 목록을 다시 가져옵니다. (주소는 명세서 전체 조회 API에 맞춤)
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 3. 받아온 진짜 데이터로 스토어의 inventoryList를 덮어씁니다!
      // (데이터 구조가 inventoryList.items일 수도 있고 data.items일 수도 있으니 안전하게 꺼냅니다)
      const newItems = response.data.data?.items || response.data.data || [];

      set({ inventoryList: newItems });
    } catch (error) {
      console.error("인벤토리 목록을 새로고침하는 데 실패했습니다.", error);
    }
  },
}));

export default useInventoryStore;
