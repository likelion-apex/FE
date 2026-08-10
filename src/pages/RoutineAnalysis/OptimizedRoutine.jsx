import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import RoutineAccordionItem from "../../components/Analysis/RoutineAccordionItem";
import FinishModal from "../../components/Analysis/FinishModal";
import {
  USER_NAME,
  MATCHING_REPORT_DATA,
  ROUTINE_STEPS,
} from "../../mocks/mockData";


const OptimizedRoutine = () => {
  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 3,
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <div className="flex-1 overflow-y-auto pb-[100px] pt-6">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="break-keep text-[22px] font-semibold  leading-snug text-black">
            {USER_NAME}님의 인벤토리 제품으로
            <br />
            안전하게 루틴을 재구성했어요
          </h1>
          <p className="text-[13px] text-gray-60">
            자극적인 성분은 빼고, 역할이 같은 제품으로!
          </p>
        </div>
        {/* 이부분 컴포넌트로 빼는게 좋을것같음!!! */}
        <div className="mb-8">
          <div className="flex w-full flex-col gap-2 rounded-[24px] bg-gray-05 px-6 py-4">
            <div className="flex">
              <span className="rounded-md bg-gray-10 px-[8px] py-[4px] text-[12px] font-bold text-gray-60">
                AI 매칭 리포트
              </span>
            </div>

            <div className="flex flex-col gap-[10px] border-b border-gray-20 pb-4 pt-2 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-60 font-normal">
                  그대로 사용 가능한 제품
                </span>
                <span className="font-bold text-black">
                  {MATCHING_REPORT_DATA.keepCount}개 완료
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-60 font-normal">
                  AI가 안전하게 대체한 제품
                </span>
                <span className="font-bold text-blue-50">
                  {MATCHING_REPORT_DATA.replacedCount}개
                  {MATCHING_REPORT_DATA.replacedDetail}
                </span>
              </div>
            </div>

            {/* 최하단: 상세 설명 */}
            <p className="text-[13px] leading-[22px] text-gray-600">
              {MATCHING_REPORT_DATA.description}
            </p>
          </div>
        </div>

        {/* 아코디언 리스트 섹션 */}
        <div>
          <h2 className="mb-6 text-[16px] font-semibold text-gray-900">
            오늘 밤을 위한 안전한 4단계 루틴
          </h2>
          <div className="flex flex-col gap-2">
            {ROUTINE_STEPS.map((step) => (
              <RoutineAccordionItem key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>

      {/* 5. 하단 고정 버튼 영역 */}
      <div className="flex flex-col gap-2 items-center justify-center w-full mb-5 mt-3">
        <button
          type="button"
          className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          이 안전한 루틴으로 오늘 케어하기
        </button>
      </div>

      {isModalOpen && <FinishModal />}
    </div>
  );
};

export default OptimizedRoutine;
