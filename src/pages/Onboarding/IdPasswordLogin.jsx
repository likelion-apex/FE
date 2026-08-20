import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { localLogin } from "../../api/auth";
import backArrow from "../../assets/routine-analyze/back_arrow.svg";
import soakMark from "../../assets/logo/soak-mark.png";
import useAuthStore from "../../store/authStore";

const IdPasswordLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = loginId.trim().length > 0 && password.length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const tokens = await localLogin(loginId.trim(), password);
      setAuth(tokens);
      const onboardingRequired =
        tokens.onboardingRequired ?? tokens.isNewMember ?? false;
      navigate(onboardingRequired ? "/onboarding/nickname" : "/main", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(
        error?.response?.status === 404
          ? "현재 ID/PW 로그인을 사용할 수 없습니다."
          : "아이디 또는 비밀번호를 확인해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-full w-full flex-col bg-white px-6 pt-[51px]">
      <header className="relative flex h-14 items-center justify-center">
        <button
          type="button"
          onClick={() => navigate("/", { replace: true })}
          aria-label="처음 화면으로 돌아가기"
          className="absolute left-0 flex size-10 cursor-pointer items-center justify-center"
        >
          <img src={backArrow} alt="" className="size-7" />
        </button>
        <h1 className="text-[20px] font-bold text-black">ID/PW 로그인</h1>
      </header>

      <div className="mt-12 flex flex-col items-center">
        <img src={soakMark} alt="SOAK" className="size-[104px] object-cover" />
        <p className="mt-5 text-center text-[24px] leading-9 font-bold text-black">
          아이디로
          <br />
          SOAK을 시작해 보세요
        </p>
        <p className="mt-3 text-center text-sm leading-5 text-gray-60">
          아이디와 비밀번호를 입력해 주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-bold text-gray-80">
          아이디
          <input
            type="text"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            autoComplete="username"
            maxLength={50}
            placeholder="아이디를 입력하세요"
            className="h-14 rounded-2xl border border-gray-20 bg-white px-4 text-base font-normal text-black outline-none transition focus:border-blue-50"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-gray-80">
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            maxLength={100}
            placeholder="비밀번호를 입력하세요"
            className="h-14 rounded-2xl border border-gray-20 bg-white px-4 text-base font-normal text-black outline-none transition focus:border-blue-50"
          />
        </label>

        <div aria-live="polite" className="min-h-5 text-sm text-red-40">
          {errorMessage}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="mt-2 h-14 rounded-2xl bg-blue-50 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-20"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default IdPasswordLogin;
