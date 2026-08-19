import axiosInstance from "./axiosInstance";

// 서버 응답은 { success, code, message, data } 형태로 감싸져 온다.
const unwrap = (response) => response.data.data;

export const getDailyRoutine = () =>
  axiosInstance.get("/api/v1/routines/daily").then(unwrap);

// 데일리 루틴의 스텝 하나를 완료/미완료로 토글한다.
export const updateStepCompletion = (stepId, completed) =>
  axiosInstance
    .patch(`/api/v1/routine-logs/today/steps/${stepId}`, { completed })
    .then(unwrap);

