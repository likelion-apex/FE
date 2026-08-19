import axiosInstance from "./axiosInstance";

// 서버 응답은 { success, code, message, data } 형태로 감싸져 온다.
const unwrap = (response) => response.data.data;

export const getDailyRoutine = () =>
  axiosInstance.post("/api/v1/routines/daily").then(unwrap);

