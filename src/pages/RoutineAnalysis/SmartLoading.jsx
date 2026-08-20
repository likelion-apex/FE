import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // 💡 통신을 위해 추가
import useAuthStore from "../../store/authStore"; // 💡 토큰을 위해 추가
import soakImage from "../../assets/logo/soakImage.png";
import useUserStore from "../../store/userStore";

const SmartLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useAuthStore((state) => state.accessToken);
  const nickname = useUserStore((state) => state.nickname);

  const type = location.state?.type || "routine";
  const analysisId = location.state?.analysisId;

  const [currentStep, setCurrentStep] = useState(1);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    // 혹시라도 서버 응답이 더 빠를 수 있으니, Math.max로 역주행 방지
    const timer1 = setTimeout(
      () => setCurrentStep((prev) => Math.max(prev, 2)),
      4000,
    );
    const timer2 = setTimeout(
      () => setCurrentStep((prev) => Math.max(prev, 3)),
      8000,
    );
    const timer3 = setTimeout(
      () => setCurrentStep((prev) => Math.max(prev, 4)),
      12000,
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (!analysisId) return; // ID가 없으면 실행 안 함

    let intervalId;

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}/status`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        // 명세서에 따른 응답 데이터 구조
        const { status, progress, errorMessage } = response.data.data;
        console.log("현재 진행 상태:", status, progress);

        // 백엔드 완료 상태 확인
        if (status === "COMPLETED" || status === "DONE") {
          clearInterval(intervalId);
          setCurrentStep(5);

          setTimeout(() => {
            setCurrentStep(6);
            // 다음 결과 페이지로 이동 (결과 페이지에서 조회할 수 있도록 analysisId도 함께 넘겨줌)
            if (type === "routine") {
              navigate("/RoutineAnalysis/AnalyzeResult", {
                state: { analysisId },
              });
            } else {
              navigate("/RoutineAnalysis/SearchItem", {
                state: { analysisId },
              });
            }
          }, 500); // 0.5초 뒤 넘어감
        } else if (status === "FAILED" || status === "ERROR") {
          clearInterval(intervalId);
          alert(
            `분석 중 문제가 발생했습니다: ${errorMessage || "알 수 없는 오류"}`,
          );
          navigate(-1);
        }
      } catch (error) {
        console.error("상태 체크 실패:", error);
      }
    };

    intervalId = setInterval(checkStatus, 2500);

    return () => clearInterval(intervalId);
  }, [analysisId, accessToken, navigate, type]);

  //분석 취소
  const handleCancel = async () => {
    if (!analysisId || isCanceling) return;
    setIsCanceling(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      alert("분석이 취소되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("분석 취소 실패:", error);
      alert("취소 요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
      setIsCanceling(false);
    }
  };

  const LOADING_DATA = {
    routine: {
      typeTitle: "루틴",
      title: `영상 속 루틴이 ${nickname}님에게 \n적합한지 검토하고 있어요`,
      subTitle: "피부 적합도와 성분 궁합 분석 중",
      navigateUrl: "/RoutineAnalysis/AnalyzeResult",
      steps: [
        { id: 1, title: "영상 속 핵심 제품 및 성분 추출", desc: null },
        {
          id: 2,
          title: `${nickname}님의 피부 타입 적합도 분석`,
          desc: "민감성 피부 기준 자극도 체크 중...",
        },
        { id: 3, title: "인벤토리 제품과 성분 충돌 확인", desc: null },
        {
          id: 4,
          title: `오직 ${nickname}님만을 위한 맞춤형 루틴 설계`,
          desc: null,
        },
      ],
    },
    item: {
      typeTitle: "제품",
      title: `영상 속 핵심 제품이 ${nickname}님 화장대와 \n잘 어울리는지 검토하고 있어요`,
      subTitle: "보유 제품과의 시너지 및 성분 충돌 분석 중",
      navigateUrl: "/RoutineAnalysis/AnalyzeResult",
      steps: [
        { id: 1, title: "핵심 제품 주요 성분 및 효능 분석", desc: null },
        {
          id: 2,
          title: `${nickname}님의 피부 타입 적합도 분석`,
          desc: "민감성 피부 기준 자극도 체크 중...",
        },
        {
          id: 3,
          title: "기존 인벤토리 제품과 성분 궁합 확인",
          desc: "성분 충돌이 없는지 꼼꼼히 확인해요.",
        },
        { id: 4, title: "최적의 스킨케어 순서 및 조합 설계", desc: null },
      ],
    },
  };

  const currentData = LOADING_DATA[type];

  const renderIcon = (stepId) => {
    if (currentStep > stepId) {
      return (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-white">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    } else if (currentStep === stepId) {
      return (
        <div className="h-6 w-6 shrink-0 animate-spin rounded-full border-[2.5px] border-blue-50 border-t-transparent"></div>
      );
    } else {
      return (
        <div className="h-6 w-6 shrink-0 rounded-full border-[2.5px] border-gray-20"></div>
      );
    }
  };

  return (
    <div className="m-[40px] flex flex-col items-center justify-center text-center gap-8">
      {/* 상단 빙글빙글 애니메이션 */}
      <div className="relative h-[190px] w-[190px]">
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 transform"
          viewBox="0 0 190 190"
        >
          <circle
            cx="95"
            cy="95"
            r="94"
            fill="none"
            className="stroke-blue-50"
            strokeWidth="2"
            strokeDasharray="590"
            strokeDashoffset="590"
            style={{ animation: "fill-up 60s linear forwards" }}
          />
        </svg>

        <style>
          {`
      @keyframes fill-up {
        to { stroke-dashoffset: 0; }
      }
    `}
        </style>
        <div className="absolute inset-0 m-auto h-[150px] w-[150px] rounded-full border border-gray-20"></div>
        <img
          src={soakImage}
          alt="SoakLogo"
          className="absolute inset-0 m-auto h-[120px] w-[120px] rounded-full "
        />
      </div>

      <div className="text-center">
        <h2 className="text-[20px] text-black font-semibold leading-relaxed whitespace-pre-wrap">
          {currentData.title}
        </h2>
        <p className="text-gray-60 text-[14px] mt-2">{currentData.subTitle}</p>
      </div>

      <div className="flex w-full flex-col gap-6 px-4 text-left">
        {currentData.steps.map((step) => (
          <div key={step.id} className="flex items-start gap-4">
            {renderIcon(step.id)}
            <div className="flex flex-col pt-[2px]">
              <span
                className={`text-[15px] font-bold transition-colors duration-300 ${
                  currentStep > step.id
                    ? "text-gray-900"
                    : currentStep === step.id
                      ? "text-blue-50"
                      : "text-gray-40"
                }`}
              >
                {step.title}
              </span>

              {step.desc && currentStep >= step.id && (
                <span className="mt-1 text-[12px] font-medium text-gray-500">
                  {step.desc}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 취소 버튼 */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleCancel}
          disabled={isCanceling}
          className="text-[13px] font-semibold text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-600"
        >
          분석 취소하기
        </button>
      </div>
    </div>
  );
};

export default SmartLoading;
