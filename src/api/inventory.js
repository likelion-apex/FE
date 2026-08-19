import axiosInstance from "./axiosInstance"; // 기존에 만드신 instance import

//전체 인벤토리 리스트 렌더링
export const getMyInventory = () =>
  axiosInstance.get("/api/v1/inventory").then((res) => res.data.data);

//제품 상세 정보 가져오기
//ai 분석
export const getInventoryDetail = (inventoryId) =>
  axiosInstance
    .get(`/api/v1/inventory/${inventoryId}/ai-analysis`)
    .then((res) => res.data.data);

//성분 분석
export const getInventoryIngredients = (inventoryId) =>
  axiosInstance
    .get(`/api/v1/inventory/${inventoryId}/ingredients`)
    .then((res) => res.data.data);

// 즐겨찾기 목록 조회
export const getFavorites = (limit = 20) =>
  axiosInstance
    .get("/api/v1/inventory/favorites", { params: { limit } })
    .then((res) => res.data.data);

// 즐겨찾기 토글
export const updateFavorite = (inventoryId, isFavorite) =>
  axiosInstance
    .patch(`/api/v1/inventory/${inventoryId}/favorite`, { isFavorite })
    .then((res) => res.data.data);

// 인벤토리 아이템 삭제
export const deleteInventoryItem = (inventoryId) =>
  axiosInstance
    .delete(`/api/v1/inventory/${inventoryId}`)
    .then((res) => res.data.data);

//제품 검색
export const searchProducts = (keyword) =>
  axiosInstance
    .get("/api/v1/products", { params: { keyword } })
    .then((res) => res.data.data);

// 인벤토리 아이템 추가
export const addInventoryItem = (itemData) =>
  axiosInstance
    .post("/api/v1/inventory", itemData)
    .then((res) => res.data.data);
