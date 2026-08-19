// src/pages/KakaoCallback.jsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { kakaoLogin } from "../../api/auth";
import useAuthStore from "../../store/authStore";

const LOADING_MESSAGE = "로그인 처리 중입니다...";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(LOADING_MESSAGE);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // 인가 코드는 1회용이라 StrictMode의 이중 실행을 막아야 합니다.
  const hasRequested = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setMessage(`로그인 실패: ${error}`);
      return;
    }

    if (!code) {
      setMessage("인가 코드가 없습니다.");
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    const login = async () => {
      try {
        const tokens = await kakaoLogin(code);

        setAuth(tokens);

        // 신규 회원은 온보딩부터, 기존 회원은 홈으로.
        // 뒤로가기로 이 콜백 화면에 다시 들어오지 않도록 replace로 이동합니다.
        navigate(tokens.isNewMember ? "/onboarding/nickname" : "/main", {
          replace: true,
        });
      } catch (err) {
        // TODO(DEBUG): 원인 확인 후 아래 한 줄 삭제
        console.error(
          "[KAKAO_DEBUG] status:",
          err.response?.status,
          "data:",
          err.response?.data,
        );
        console.error("카카오 로그인 실패:", err);
        setMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    login();
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-6 bg-white px-5">
      <p className="text-base leading-5 text-gray-60">{message}</p>

      {/* 실패했을 때만 온보딩으로 돌아가는 버튼을 노출합니다. */}
      {message !== LOADING_MESSAGE && (
        <button
          type="button"
          onClick={() => navigate("/", { replace: true })}
          className="cursor-pointer text-sm leading-5 font-bold text-blue-50 underline"
        >
          처음으로 돌아가기
        </button>
      )}
    </div>
  );
};

export default KakaoCallback;
