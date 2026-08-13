import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { USER_NAME } from "../../mocks/mockData";
import soakImage from "../../assets/logo/soakImage.png";

const SmartLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 진행 중인 단계를 저장하는 State (1~4단계)
  const [currentStep, setCurrentStep] = useState(1);
  const type = location.state?.type || "routine";

  useEffect(() => {
    // 2초(2000ms)마다 currentStep을 1씩 올려줍니다.
    const timer1 = setTimeout(() => setCurrentStep(2), 2000);
    const timer2 = setTimeout(() => setCurrentStep(3), 4000);
    const timer3 = setTimeout(() => setCurrentStep(4), 6000);
    const timer4 = setTimeout(() => setCurrentStep(5), 8000);
    const timer5 = setTimeout(() => {
      setCurrentStep(6);
      if (type === "routine") {
        navigate("/RoutineAnalysis/AnalyzeResult");
      } else {
        navigate("/RoutineAnalysis/SearchItem");
      }
    }, 8500);

    // 컴포넌트가 사라질 때 타이머 청소
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [navigate]);

  const LOADING_DATA = {
    // 1. 전체 스킨케어 루틴 분석용 데이터
    routine: {
      typeTitle: "루틴",
      title: `영상 속 루틴이 ${USER_NAME}님에게 \n적합한지 검토하고 있어요`,
      subTitle: "피부 적합도와 성분 궁합 분석 중",
      navigateUrl: "/RoutineAnalysis/AnalyzeResult",
      steps: [
        { id: 1, title: "영상 속 핵심 제품 및 성분 추출", desc: null },
        {
          id: 2,
          title: `${USER_NAME}님의 피부 타입 적합도 분석`,
          desc: "민감성 피부 기준 자극도 체크 중...",
        },
        { id: 3, title: "인벤토리 제품과 성분 충돌 확인", desc: null },
        {
          id: 4,
          title: `오직 ${USER_NAME}님만을 위한 맞춤형 루틴 설계`,
          desc: null,
        },
      ],
    },

    // 2. 핵심 제품 분석용 데이터
    item: {
      typeTitle: "제품",
      title: `영상 속 핵심 제품이 ${USER_NAME}님 화장대와 \n잘 어울리는지 검토하고 있어요`,
      subTitle: "보유 제품과의 시너지 및 성분 충돌 분석 중",
      navigateUrl: "/RoutineAnalysis/AnalyzeResult", // 필요시 제품 결과 페이지 경로로 수정하세요!
      steps: [
        { id: 1, title: "핵심 제품 주요 성분 및 효능 분석", desc: null },
        {
          id: 2,
          title: `${USER_NAME}님의 피부 타입 적합도 분석`,
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

  // 현재 상태에 따라 아이콘을 그려주는 마법의 함수 ✨
  const renderIcon = (stepId) => {
    if (currentStep > stepId) {
      // 1. 완료됨
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
      // 2. 진행 중
      return (
        <div className="h-6 w-6 shrink-0 animate-spin rounded-full border-[2.5px] border-blue-50 border-t-transparent"></div>
      );
    } else {
      // 3. 대기 중
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
            style={{ animation: "fill-up 8s linear forwards" }}
          />
        </svg>

        {/* 💡 2. 선이 차오르는 애니메이션을 정의하는 CSS 키프레임 */}
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
            {/* 아이콘 */}
            {renderIcon(step.id)}

            {/* 텍스트 영역 */}
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

              {/* 부가 설명 텍스트*/}
              {step.desc && currentStep >= step.id && (
                <span className="mt-1 text-[12px] font-medium text-gray-500">
                  {step.desc}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. 취소 버튼 */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => navigate(-1)} // 취소 누르면 이전 페이지로 가도록 추가!
          className="text-[13px] font-semibold text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-600"
        >
          분석 취소하기
        </button>
      </div>
    </div>
  );
};

export default SmartLoading;
