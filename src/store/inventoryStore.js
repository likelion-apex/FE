import { create } from "zustand";

const useInventoryStore = create((set) => ({
  inventoryList: [], // 전체 화장품 리스트를 보관할 곳
  setInventoryList: (list) => set({ inventoryList: list }), // 리스트를 업데이트하는 함수
}));

export default useInventoryStore;
