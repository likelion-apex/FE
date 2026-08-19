import KakaoCircle from "../assets/kakaoCircle.png";

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const params = new URLSearchParams({
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
    });
    const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

    // TODO(DEBUG): 원인 확인 후 이 블록 전체 삭제
    console.log(
      "[KAKAO_DEBUG] client_id:",
      REST_API_KEY,
      "length:",
      REST_API_KEY?.length,
    );
    console.log("[KAKAO_DEBUG] redirect_uri:", REDIRECT_URI);
    console.log("[KAKAO_DEBUG] full url:", authorizeUrl);
    alert(`client_id: ${REST_API_KEY}\nredirect_uri: ${REDIRECT_URI}`);
    // TODO(DEBUG) 끝

    window.location.href = authorizeUrl;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex h-[68px] w-full cursor-pointer items-center justify-center gap-[50px] rounded-lg bg-white px-5 py-4"
    >
      <img src={KakaoCircle} alt="" className="size-[35px] shrink-0" />
      <p className="text-[18px] leading-[30px] font-semibold text-blue-60">
        카카오로 시작하기
      </p>
      {/* 텍스트를 버튼 가운데로 맞추기 위한 여백 (Figma의 opacity 0 아이콘) */}
      <span aria-hidden className="size-[35px] shrink-0" />
    </button>
  );
};

export default KakaoLoginButton;
