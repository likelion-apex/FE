import KakaoIcon from "../assets/kakaoIcon.png";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }

    window.Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    });
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="h-[68px] w-[360px] flex justify-center items-center bg-[#FFE812] rounded-[10px] cursor-pointer"
    >
      <img
        src={KakaoIcon}
        alt="카카오 로그인"
        className="absolute w-6 h-6 left-[40px]"
      />

      <p className="text-black font-bold text-[18px]">카카오로 계속하기</p>
    </button>
  );
};

export default KakaoLoginButton;
