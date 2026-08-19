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

// 오늘의 데일리 루틴 스텝을 전체완료 일괄처리한다.
export const completeAllSteps = () =>
  axiosInstance.post("/api/v1/routine-logs/today/steps/complete-all").then(unwrap);

// 오늘의 데일리 루틴을 전체 완료 처리한다.
export const completeToday = () =>
  axiosInstance.post("/api/v1/routine-logs/today/complete").then(unwrap);

