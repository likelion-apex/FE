import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import IngredientCard from "../../components/Analysis/IngredientCard";
import TopNavbar from "../../components/layouts/TopNavbar";
import BottomNavbar from "../../components/layouts/BottomNavbar";
// AnalyzeResult.jsx 상단
import {
  USER_NAME,
  ROUTINE_BRIEFING_DATA,
  ROUTINE_STEPS,
} from "../../mocks/mockData";
import IngredientModal from "../../components/Analysis/IngredientModal";
import RoutineScore from "../../components/Analysis/RoutineScore";

const STEP_COUNT = 4;

const AnalyzeResult = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const { setNavProps } = useOutletContext();
  const navigate = useNavigate();
  const isModal = true;
  const isDetailPage = false;

  useEffect(() => {
    setNavProps({
      step: 2,
      totalSteps: 4,
      stepName: "",
    });

    //다른 페이지로 넘어갈 때 네비바 초기화
    return () => {
      setNavProps({
        step: 0,
        totalSteps: 0,
        stepName: "",
      });
    };
  }, [setNavProps]);

  const currentStep = ROUTINE_STEPS[0].steps;
  //정렬을 위해 짝수, 홀수 카드 분리하기(일단 1번 루틴)
  const leftColumnData = currentStep.filter((_, index) => index % 2 === 0);
  const rightColumnData = currentStep.filter((_, index) => index % 2 !== 0);

  //최적화된 페이지로 이동
  const handleOptimize = () => {
    navigate("/RoutineAnalysis/OptimizedRoutine");
  };

  return (
    <div className="mt-[24px] mb-6 flex flex-col text-black px-[20px]">
      <div className="flex flex-col">
        <div className="flex-col gap-3 mb-6">
          <h3 className="text-[20px] font-semibold leading-7 mb-[8px]">
            {USER_NAME}님이 공유하신 영상에서 <br />
            핵심 루틴만 AI가 쏙 뽑아왔어요
          </h3>
          <span className="text-gray-60 text-[14px] leading-7">
            단계별 성분이 내 피부에 맞는지 미리 체크해 보세요.
          </span>
        </div>
        <div className="mb-5">
          <RoutineScore
            data={ROUTINE_BRIEFING_DATA[0]}
            isDetailPage={isDetailPage}
          />
        </div>

        {/* 성분 분석 그리드 */}
        <section>
          <h3 className="mb-4 text-[16px] font-semibold">
            영상 속 {currentStep.length}단계 루틴 성분 분석
          </h3>
          <div className="flex items-start gap-2 ">
            {/* 왼쪽(홀수) 열*/}
            <div className="flex flex-1 flex-col gap-2">
              {leftColumnData.map((step) => (
                <IngredientCard
                  key={step.id}
                  step={step}
                  onClick={() => setSelectedStep(step)}
                />
              ))}
            </div>

            {/* 오른쪽(짝수) 열 */}
            <div className="flex flex-1 flex-col gap-2">
              {rightColumnData.map((step) => (
                <IngredientCard
                  key={step.id}
                  step={step}
                  onClick={() => setSelectedStep(step)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      {selectedStep && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/60"
          onClick={() => setSelectedStep(null)}
        >
          <IngredientModal
            stepData={selectedStep}
            isModal={isModal}
            onClose={() => setSelectedStep(null)}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 items-center justify-center w-full mt-5">
        <p className="text-[12px] font-semibold text-blue-50">
          이제 {USER_NAME}님의 인벤토리와 성분 충돌이 없는지 알아볼까요?
        </p>
        <div>
          <button
            type="button"
            className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
            onClick={handleOptimize}
          >
            인벤토리 제품과 성분 궁합 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResult;
