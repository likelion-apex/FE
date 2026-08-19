import axios from "axios";

import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// 재발급 요청은 인터셉터를 타면 안 되므로 별도 인스턴스를 쓴다.
const plainAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 동시에 여러 요청이 401을 받아도 재발급은 한 번만 수행한다.
let reissuePromise = null;

const redirectToOnboarding = () => {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

const reissue = async (refreshToken) => {
  const { data } = await plainAxios.post("/api/auth/reissue", { refreshToken });
  const tokens = data.data;

  useAuthStore.getState().setTokens(tokens);

  return tokens.accessToken;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    // 401이 아니거나, 이미 재발급 후 재시도한 요청이면 그대로 실패시킨다.
    if (response?.status !== 401 || config?._retried) {
      return Promise.reject(error);
    }

    const { refreshToken, clearAuth } = useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      redirectToOnboarding();
      return Promise.reject(error);
    }

    try {
      reissuePromise = reissuePromise ?? reissue(refreshToken);
      const accessToken = await reissuePromise;

      config._retried = true;
      config.headers.Authorization = `Bearer ${accessToken}`;

      return axiosInstance(config);
    } catch (reissueError) {
      clearAuth();
      redirectToOnboarding();
      return Promise.reject(reissueError);
    } finally {
      reissuePromise = null;
    }
  },
);

export default axiosInstance;
