import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_DRAFT = {
  nickname: "",
  skinTypeId: null,
  skinConcernIds: [],
};

// 온보딩 화면은 라우트가 바뀔 때마다 다시 생성된다. 입력 중인 값은 화면이 아니라
// 이 공통 임시 저장소에 보관해, 다음/뒤로 가기와 새로고침 뒤에도 복원한다.
const useOnboardingStore = create(
  persist(
    (set) => ({
      ...INITIAL_DRAFT,
      setNickname: (nickname) => set({ nickname }),
      setSkinTypeId: (skinTypeId) => set({ skinTypeId }),
      setSkinConcernIds: (skinConcernIds) =>
        set((state) => ({
          skinConcernIds:
            typeof skinConcernIds === "function"
              ? skinConcernIds(state.skinConcernIds)
              : skinConcernIds,
        })),
      resetOnboarding: () => set(INITIAL_DRAFT),
    }),
    {
      name: "soak-onboarding-draft",
    },
  ),
);

export default useOnboardingStore;
