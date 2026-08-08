import { useState, useEffect } from "react";

const SmartLoading = () => {
  //현재 진행 중인 스탭(1: 완료, 2: 진행중, 3: 대기, 4: 대기)
  const [currentStep, setCurrentStep] = useState(2);
  const userName = "서영";

  const steps = [
    {
      id: 1,
      title: "영상 속 핵심 제품 및 성분 추출",
      sub: "",
    },
    {
      id: 2,
      title: `${userName}님의 피부 타입 적합도 분석`,
      sub: "민감성 피부 기준 자극도 체크 중...",
    },
    {
      id: 3,
      title: "인벤토리 제품과 성분 충돌 확인",
      sub: "",
    },
    {
      id: 4,
      title: `오직 ${userName}님만을 위한 맞춤형 루틴 설계`,
      sub: "",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prev < 5 ? prev + 1 : 1));
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="m-[40px] flex flex-col items-center justify-center text-center gap-8">
      {/*윗 네브바*/}
      {/* 로딩 애니메이션 그래픽 */}
      <div className="flex relative mb-[34px] h-32 w-32 items-center justify-center">
        {/* 퍼지는 원 애니메이션 */}
        <div className="absolute h-[186px] w-[186px] rounded-full border-[1.5px] border-gray-10"></div>
        <div className="absolute h-[150px] w-[150px]  rounded-full border-[1.5px] border-gray-20"></div>
        <div className="absolute h-[110px] w-[110px] rounded-full border-[1.5px] border-gray-40"></div>
        <div className="h-[60px] w-[60px] rounded-full bg-gray-300"></div>
      </div>

      <div className="text-center">
        <h2 className="text-[24px] text-black font-semibold">
          영상 속 루틴이 윤지님에게 <br />
          적합한지 검토하고 있어요
        </h2>
        <p className="text-gray-60 text-[14px] ">
          피부 적합도와 성분 궁합 분석 중
        </p>
      </div>
      <div className="w-fit h-fit p-[20px] border border-gray-20">
        <div></div>
      </div>
    </div>
  );
};

export default SmartLoading;
