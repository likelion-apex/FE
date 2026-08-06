// src/pages/KakaoCallback.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("로그인 처리 중...");

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
    setMessage("인가 코드를 받았습니다. 콘솔을 확인하세요.");
  }, [searchParams]);

  return <div>{message}</div>;
};

export default KakaoCallback;
