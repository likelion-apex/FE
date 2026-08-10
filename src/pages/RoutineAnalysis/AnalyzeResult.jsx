import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
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

const STEP_COUNT = 4;

const AnalyzeResult = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const { setNavProps } = useOutletContext();

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

  const { title, tag, score, matchDetails, coreGoal, synergy, description } =
    ROUTINE_BRIEFING_DATA;

  //정렬을 위해 짝수, 홀수 카드 분리하기
  const leftColumnData = ROUTINE_STEPS.filter((_, index) => index % 2 === 0);
  const rightColumnData = ROUTINE_STEPS.filter((_, index) => index % 2 !== 0);

  return (
    <div className="mt-[24px] mb-[70px] flex flex-col text-black px-[20px]">
      <div className="flex flex-col gap-5">
        <div className="flex-col gap-3 mb-6">
          <h3 className="text-[20px] font-semibold leading-7 mb-[8px]">
            {USER_NAME}님이 공유하신 영상에서 <br />
            핵심 루틴만 AI가 쏙 뽑아왔어요
          </h3>
          <span className="text-gray-60 text-[14px] leading-7">
            단계별 성분이 내 피부에 맞는지 미리 체크해 보세요.
          </span>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-[24px] bg-gray-05 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-black">{title}</h2>
            <span className="rounded-md bg-gray-10 px-[8px] py-[4px] text-[12px] font-bold text-gray-60">
              {tag}
            </span>
          </div>

          <div className="flex flex-col gap-2 rounded-[16px] bg-blue-05 py-3 px-9">
            <h3 className="text-[14px] font-bold text-blue-50">
              AI 매칭 점수 {score}점
            </h3>
            <div className="flex flex-col gap-1">
              {matchDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[12px] font-bold text-black"
                >
                  {" "}
                  {/* 회색 둥근 사각형 아이콘 */}
                  <div className="size-[16px] rounded-[4px] bg-gray-400 shrink-0" />
                  {detail}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px] border-b border-gray-20 pb-4 pt-2 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-60 font-normal">루틴 핵심 목표</span>
              <span className="font-bold text-black">{coreGoal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-60 font-normal">시너지 성분 조합</span>
              <span className="font-bold text-blue-50">{synergy}</span>
            </div>
          </div>

          {/* 최하단: 상세 설명 */}
          <p className="text-[13px] leading-[22px] text-gray-600">
            {description}
          </p>
        </div>

        {/* 성분 분석 그리드 */}
        <section>
          <h3 className="mb-4 text-[16px] font-semibold">
            영상 속 {ROUTINE_STEPS.length}단계 루틴 성분 분석
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
        <IngredientModal
          stepData={selectedStep}
          onClose={() => setSelectedStep(null)}
        />
      )}
      <div className="flex flex-col gap-2 items-center justify-center w-full mt-5">
        <p className="text-[12px] font-semibold text-blue-50">
          이제 {USER_NAME}님의 인벤토리와 성분 충돌이 없는지 알아볼까요?
        </p>
        <div>
          <button
            type="button"
            className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white"
          >
            인벤토리 제품과 성분 궁합 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResult;
