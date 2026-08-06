// src/pages/OnboardingPage.jsx
import KakaoLoginButton from "../../components/KakaoLoginButton";

const Onboarding = () => {
  return (
    <div className="flex flex-col items-center  justify-center">
      <h1>나만을 위한 맞춤형 AI</h1>
      <h1> 스킨케어 서비스 </h1>
      <KakaoLoginButton />
    </div>
  );
};

export default Onboarding;
