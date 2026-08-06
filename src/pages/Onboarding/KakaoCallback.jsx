// src/pages/KakaoCallback.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("로그인 처리 중...");
  const navigate = useNavigate();

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

    // TODO: 백엔드가 준비되면 이 code를 서버로 보내 토큰을 교환합니다.
    // await api.post("/auth/kakao", { code });
    console.log("인가 코드:", code);
    navigate("/onboarding/skin-type");
  }, [searchParams]);

  return <div>{message}</div>;
};

export default KakaoCallback;
