import axiosInstance from "./axiosInstance";

// 서버 응답은 { success, code, message, data } 형태로 감싸져 온다.
const unwrap = (response) => response.data.data;

export const getSummary = () => axiosInstance.get("/api/v1/home").then(unwrap);

export const updateCondition = (condition, memo) =>
  axiosInstance.post("/api/v1/home/condition", { condition, memo }).then(unwrap);
