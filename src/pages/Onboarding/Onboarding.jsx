import soakMark from "../../assets/logo/soak-mark.png";
import soakWordmark from "../../assets/logo/soak-wordmark.svg";
import KakaoLoginButton from "../../components/KakaoLoginButton";

import useAuthStore from "../../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;

    const timer = setTimeout(() => {
      navigate("/main", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [accessToken, navigate]);

  return (
    <div className="flex min-h-full w-full flex-col bg-gradient-to-b from-white from-[32.7%] via-[#33cdfb] via-[87.5%] to-blue-50 px-5 pt-[69px] items-center">
      <div className="flex w-full flex-col gap-[48px]">
        <div className="flex w-full flex-col items-center gap-[300px]">
          <div className="flex w-[188px] flex-col items-center">
            <img
              src={soakMark}
              alt=""
              className="aspect-square w-full object-cover"
            />
            <img
              src={soakWordmark}
              alt="SOAK"
              className="h-[42px] w-[142px] shrink-0"
            />
          </div>

          <p className="text-center text-[20px] leading-[30px] font-semibold text-white">
            나만을 위한 맞춤형 AI
            <br />
            스킨 케어 서비스
          </p>
        </div>

        {!accessToken && <KakaoLoginButton />}
      </div>
      <div
        className="underline text-blue-05 font-semibold text-[14px] text-center cursor-pointer"
        onClick={() => navigate("/onboarding/LoginPage")}
      >
        ID/PW로 로그인
      </div>
    </div>
  );
};

export default Onboarding;
