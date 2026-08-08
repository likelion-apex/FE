import soakLogo from "../../assets/logo/soak.svg";
import KakaoLoginButton from "../../components/KakaoLoginButton";

const Onboarding = () => {
  return (
    <div className="flex min-h-full w-full flex-col items-center bg-blue-50 px-5 pt-[199px] pb-[92px]">
      <div className="flex w-[257px] flex-col items-center gap-[60px]">
        <img
          src={soakLogo}
          alt="SOAK"
          className="h-[88.33px] w-[241.82px] shrink-0"
        />
        <p className="text-center text-[20px] leading-[30px] font-medium text-white">
          나만을 위한 맞춤형 AI
          <br />
          스킨 케어 서비스
        </p>
      </div>

      <div className="mt-[300px] w-[360px]">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Onboarding;
