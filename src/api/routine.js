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
  axiosInstance
    .post("/api/v1/routine-logs/today/steps/complete-all")
    .then(unwrap);

// 오늘의 데일리 루틴을 전체 완료 처리한다.
export const completeToday = () =>
  axiosInstance.post("/api/v1/routine-logs/today/complete").then(unwrap);

// 루틴 로그 조회 API (서영이가만들엇더염)
export const getRoutineLogs = async ({ year, month, date }) => {
  const params = {};

  if (year) params.year = year;
  if (month) params.month = month;
  if (date) params.date = date; // ex: "2026-08-20"

  return await axiosInstance
    .get("/api/v1/routines/logs", { params })
    .then(unwrap);
};

export const applyRoutineToToday = async (routineId) => {
  // unwrap이나 axiosInstance 등 기존에 쓰시던 방식에 맞춰주시면 됩니다!
  return await axiosInstance
    .post(`/api/v1/routines/${routineId}/apply-today`)
    .then(unwrap);
};
