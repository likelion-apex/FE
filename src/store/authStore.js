import { create } from "zustand";
import { persist } from "zustand/middleware";

// 로컬 개발 중 카카오 로그인을 거치지 않고 API를 붙이기 위한 토큰.
// .env.local에 VITE_DEV_ACCESS_TOKEN을 넣어두면 첫 진입 시 자동으로 주입된다.
// 개발 모드에서만 동작하므로 배포 빌드에는 영향이 없다.
const DEV_ACCESS_TOKEN = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_ACCESS_TOKEN
  : undefined;

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      member: null,

      // 로그인 성공 시 받은 TokenResponse를 그대로 넘긴다.
      setAuth: (tokenResponse) =>
        set({
          accessToken: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken ?? null,
          member: tokenResponse.member ?? null,
        }),

      // 재발급으로 토큰만 갱신할 때 사용한다.
      setTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken: refreshToken ?? get().refreshToken,
        }),

      // /api/members/me 응답 등으로 회원 정보만 갱신할 때 사용한다.
      setMember: (member) => set({ member }),

      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, member: null }),

      isAuthenticated: () => Boolean(get().accessToken),
    }),
    {
      name: "soak-auth",
      partialize: ({ accessToken, refreshToken, member }) => ({
        accessToken,
        refreshToken,
        member,
      }),
    },
  ),
);

// 저장된 토큰이 없을 때만 개발용 토큰을 넣는다. 실제 로그인 값을 덮어쓰지 않는다.
if (DEV_ACCESS_TOKEN && !useAuthStore.getState().accessToken) {
  useAuthStore.setState({ accessToken: DEV_ACCESS_TOKEN });
}

// 개발 중 콘솔에서 토큰을 갈아끼울 수 있게 열어둔다.
// 예) __auth.set("eyJhbGciOi...") 후 새로고침
if (import.meta.env.DEV) {
  window.__auth = {
    set: (accessToken) => useAuthStore.setState({ accessToken }),
    clear: () => useAuthStore.getState().clearAuth(),
    get: () => useAuthStore.getState(),
  };
}

export default useAuthStore;
