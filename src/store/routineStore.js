import { create } from "zustand";

import {
  getDailyRoutine,
  updateStepCompletion,
  completeAllSteps,
  completeToday,
} from "../api/routine";

// 오늘의 데일리 루틴 상태를 한 곳에서 관리한다.
// 홈/데일리 등 여러 화면이 이 store를 구독하므로, 한 화면에서 바꾸면 나머지도 즉시 반영된다.
const useRoutineStore = create((set, get) => ({
  routine: null,
  loaded: false, // 최초 조회를 한 번이라도 마쳤는지 (로딩/미가입 구분용)

  // 루틴을 직접 세팅한다. (예: apply-today 응답을 바로 반영)
  setRoutine: (routine) => set({ routine, loaded: true }),

  // 오늘의 데일리 루틴 조회
  loadRoutine: async () => {
    try {
      const data = await getDailyRoutine();
      // 빈 응답이 오면 이미 들고 있는 루틴을 지우지 않는다.
      // (방금 apply-today로 적용한 루틴이 서버 재조회에서 잠깐 안 잡히는 경우 대비)
      if (data) set({ routine: data, loaded: true });
      else set({ loaded: true });
    } catch (err) {
      console.error("루틴 조회 실패:", err);
      set({ loaded: true });
    }
  },

  // 스텝 하나 완료/미완료 토글 (낙관적 업데이트)
  toggleStep: async (stepId) => {
    const { routine } = get();
    if (!routine) return;

    const target = routine.steps.find((s) => s.stepId === stepId);
    const nextCompleted = !target?.completed;

    // 1) 화면 먼저 바꾼다
    set({
      routine: {
        ...routine,
        steps: routine.steps.map((s) =>
          s.stepId === stepId ? { ...s, completed: nextCompleted } : s,
        ),
      },
    });

    // 2) 서버에 저장하고, 응답으로 최종 상태 동기화
    try {
      const data = await updateStepCompletion(stepId, nextCompleted);
      set({ routine: data });
    } catch (err) {
      console.error("스텝 완료 상태 저장 실패:", err);
      // 실패 시 되돌린다
      set((state) => ({
        routine: state.routine && {
          ...state.routine,
          steps: state.routine.steps.map((s) =>
            s.stepId === stepId ? { ...s, completed: !nextCompleted } : s,
          ),
        },
      }));
    }
  },

  // 전체 완료 <-> 전체 취소 토글
  completeAll: async () => {
    const { routine } = get();
    if (!routine) return;

    const allCompleted = routine.steps.every((s) => s.completed);
    const setAll = (completed) =>
      set((state) => ({
        routine: state.routine && {
          ...state.routine,
          steps: state.routine.steps.map((s) => ({ ...s, completed })),
        },
      }));

    if (allCompleted) {
      // 전체 취소: 벌크 취소 API가 없어 스텝별로 개별 취소한다.
      const previous = routine;
      setAll(false);
      try {
        const ids = routine.steps.map((s) => s.stepId);
        const results = await Promise.all(
          ids.map((id) => updateStepCompletion(id, false)),
        );
        set({ routine: results[results.length - 1] });
      } catch (err) {
        console.error("전체 취소 실패:", err);
        set({ routine: previous });
      }
      return;
    }

    // 전체 완료
    const previous = routine;
    setAll(true);
    try {
      const data = await completeAllSteps();
      set({ routine: data });
    } catch (err) {
      console.error("전체 완료 처리 실패:", err);
      set({ routine: previous });
    }
  },

  // 오늘의 루틴을 완료 처리 (완료 화면 전환)
  completeToday: async () => {
    try {
      const data = await completeToday();
      set({ routine: data });
    } catch (err) {
      console.error("루틴 완료 처리 실패:", err);
    }
  },
}));

export default useRoutineStore;
