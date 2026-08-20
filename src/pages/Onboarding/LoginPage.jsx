import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";
import wordamark from "../../assets/logo/soak-wordmark.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  // 🚀 로그인 API 연동 로직
  const handleLogin = async () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/local/login`,
        {
          loginId: id,
          password: password,
        },
      );

      const data = response.data.data;
      console.log("✅ 로그인 성공:", data);

      setAuth(data);

      // 실제 데이터가 있는지 프론트에서 2중 체크
      const member = data.member;
      const hasOnboardingData =
        member?.skinType ||
        (member?.skinConcerns && member.skinConcerns.length > 0);

      // 온보딩 데이터가 이미 있다면 무조건 메인(/)으로! 데이터가 아예 없을 때만 온보딩으로!
      if (data.onboardingRequired && !hasOnboardingData) {
        navigate("/onboarding/nickname");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      // 명세서에 있는 401 에러(아이디/비밀번호 불일치) 처리
      if (error.response && error.response.status === 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 중 서버 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-[400px] flex-col bg-white px-6">
      {/* 1. 로고 영역 */}
      <div className="mt-[140px] flex justify-center pb-[80px]">
        <img src={wordamark} alt="SOAK" className="w-[142px]" />
      </div>

      {/* 2. 입력 폼 영역 */}
      <div className="flex flex-col gap-6">
        {/* ID 입력창 */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-gray-600">ID</label>
          <div className="flex h-[52px] items-center rounded-2xl border border-blue-50 bg-[#E8F8FF] px-4 transition-colors">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 bg-transparent text-[16px] text-black outline-none"
              placeholder="아이디를 입력하세요"
            />
            {id && (
              <button
                onClick={() => setId("")}
                className="flex size-4 shrink-0 items-center justify-center rounded-full bg-gray-300 text-[10px] text-white hover:bg-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Password 입력창 */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-gray-600">Password</label>
          <div className="flex h-[52px] items-center rounded-2xl border border-blue-50 bg-[#E8F8FF] px-4 transition-colors">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} // 엔터 키 입력 시 로그인 실행
              className="flex-1 bg-transparent text-[16px] text-black outline-none"
              placeholder="비밀번호를 입력하세요"
            />
            {password && (
              <button
                onClick={() => setPassword("")}
                className="flex size-4 shrink-0 items-center justify-center rounded-full bg-gray-300 text-[10px] text-white hover:bg-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. 하단 로그인 버튼 */}
      <div className="mt-auto pb-[40px]">
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="h-[56px] w-full rounded-full bg-blue-50 text-[18px] font-bold text-white transition-opacity mb-[550px] hover:opacity-90 disabled:bg-gray-300"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
