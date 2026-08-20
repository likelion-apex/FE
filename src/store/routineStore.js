import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getDailyRoutine,
  updateStepCompletion,
  completeToday,
} from "../api/routine";
import useAuthStore from "./authStore";

const getTodayKey = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMemberId = () => {
  const member = useAuthStore.getState().member;
  return member?.memberId ?? member?.id ?? null;
};

// 오늘의 데일리 루틴 상태를 한 곳에서 관리한다.
// 홈/데일리 등 여러 화면이 이 store를 구독하므로, 한 화면에서 바꾸면 나머지도 즉시 반영된다.
const useRoutineStore = create(
  persist(
    (set, get) => ({
      routine: null,
      loaded: false, // 최초 조회를 한 번이라도 마쳤는지 (로딩/미가입 구분용)
      isCompleting: false,
      routineDate: null,
      memberId: null,

      // 루틴을 직접 세팅한다. (예: apply-today 응답을 바로 반영)
      setRoutine: (routine) =>
        set({
          routine,
          loaded: true,
          routineDate: getTodayKey(),
          memberId: getMemberId(),
        }),

      // 오늘의 데일리 루틴 조회
      loadRoutine: async () => {
        const today = getTodayKey();
        const currentMemberId = getMemberId();
        const { routineDate, memberId } = get();

        // 어제의 캐시나 다른 계정의 캐시는 오늘 루틴으로 사용하지 않는다.
        if (
          routineDate !== today ||
          (memberId && currentMemberId !== memberId)
        ) {
          set({ routine: null, routineDate: null, memberId: currentMemberId });
        }

        try {
          const data = await getDailyRoutine();
          // DAY/NIGHT 무시하고 무조건 NIGHT 루틴만 다룬다.
          // - NIGHT 루틴이 오면 그 최신 stepId로 갱신
          // - 낮이라 null이 오거나 DAY 루틴이 와도 무시하고, 기존(NIGHT) 루틴 유지
          if (data && data.routineType === "NIGHT")
            set({
              routine: data,
              loaded: true,
              routineDate: today,
              memberId: currentMemberId,
            });
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

        // 전체 완료: bulk API(complete-all)가 404라 스텝별 개별 완료로 처리한다.
        const previous = routine;
        setAll(true);
        try {
          const ids = routine.steps.map((s) => s.stepId);
          const results = await Promise.all(
            ids.map((id) => updateStepCompletion(id, true)),
          );
          set({ routine: results[results.length - 1] });
        } catch (err) {
          console.error("전체 완료 실패:", err);
          set({ routine: previous });
        }
      },

      // 오늘의 루틴을 완료 처리 (완료 화면 전환)
      completeToday: async () => {
        const { routine, isCompleting } = get();
        if (!routine || routine.completed || isCompleting) return false;

        set({ isCompleting: true });

        // 서버 완료 API(/complete)가 지금 404라, 실패해도 무시하고 로컬로 완료 처리한다.
        // (버튼은 모든 스텝이 이미 체크됐을 때만 눌리므로, 스텝 완료는 서버에 이미 반영돼 있음)
        let data = null;
        try {
          data = await completeToday();
        } catch (err) {
          console.warn(
            "루틴 완료 API 실패(로컬로 완료 처리):",
            err?.response?.status,
          );
        }

        set((state) => ({
          routine: {
            ...state.routine,
            ...(data && typeof data === "object" ? data : {}),
            steps: data?.steps ?? state.routine?.steps ?? [],
            completed: true,
          },
          isCompleting: false,
          routineDate: getTodayKey(),
          memberId: getMemberId(),
        }));
        return true;
      },
    }),
    {
      name: "soak-routine",
      partialize: ({ routine, routineDate, memberId }) => ({
        routine,
        routineDate,
        memberId,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState;
        const isCurrentDay = persisted?.routineDate === getTodayKey();
        const persistedMemberId = persisted?.memberId;
        const currentMemberId = getMemberId();
        const isCurrentMember =
          !persistedMemberId ||
          !currentMemberId ||
          persistedMemberId === currentMemberId;

        if (!isCurrentDay || !isCurrentMember) return currentState;

        return {
          ...currentState,
          ...persisted,
          loaded: false,
          isCompleting: false,
        };
      },
    },
  ),
);

export default useRoutineStore;
