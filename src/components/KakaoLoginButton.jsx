import KakaoCircle from "../assets/kakaoCircle.png";

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
      className="flex h-[68px] w-full cursor-pointer items-center justify-center gap-[50px] rounded-lg bg-white px-5 py-4"
    >
      <img src={KakaoCircle} alt="" className="size-[35px] shrink-0" />
      <p className="text-[18px] leading-[30px]  text-blue-60">
        카카오로 시작하기
      </p>
      {/* 텍스트를 버튼 가운데로 맞추기 위한 여백 (Figma의 opacity 0 아이콘) */}
      <span aria-hidden className="size-[35px] font-semibold shrink-0 " />
    </button>
  );
};

export default KakaoLoginButton;
