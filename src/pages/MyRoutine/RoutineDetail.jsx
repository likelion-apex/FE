import {
  ROUTINE_STEPS,
  ROUTINE_BRIEFING_DATA,
  SAVED_ROUTINE_DATA,
} from "../../mocks/mockData";
import RoutineScore from "../../components/Analysis/RoutineScore";
import RoutineAccordionItem from "../../components/Analysis/RoutineAccordionItem";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

//일단 구색만 맞출려고 임시 데이터 사용
const RoutineDetail = () => {
  const { setNavProps } = useOutletContext();
  const { id } = useParams();

  const selectedSave = SAVED_ROUTINE_DATA.find(
    (routine) => routine.id === parseInt(id),
  );
  const selectedBriefing = ROUTINE_BRIEFING_DATA.find(
    (routine) => routine.id === parseInt(id),
  );
  const stepContainer = ROUTINE_STEPS.find(
    (routine) => routine.id === parseInt(id),
  );

  const selectedSteps = stepContainer ? stepContainer.steps : [];

  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "루틴 상세",
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

  if (!selectedSteps || !selectedBriefing) {
    return (
      <div className="p-10 text-center">루틴 정보를 찾을 수 없습니다.</div>
    );
  }

  const isDetailPage = true;
  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <div className="flex-1 overflow-y-auto pb-[100px] pt-6 ">
        <div className="flex justify-between mb-6">
          <h2 className="text-[16px] font-semibold text-gray-900">
            {selectedBriefing.title}
          </h2>
          <div className="bg-gray-10 px-2 py-1 rounded-lg flex items-center text-[12px] font-bold ">
            {selectedBriefing.tag}
          </div>
        </div>
        <div className="mb-8">
          <RoutineScore data={selectedBriefing} isDetailPage={isDetailPage} />
        </div>
        <div className="flex flex-col gap-2">
          {selectedSteps.map((step) => (
            <RoutineAccordionItem key={step.id} step={step} />
          ))}
        </div>
      </div>
      <div>
        <Button
          item={"이 루틴으로 시작하기"}
          bgColor={"blue-50"}
          textColor={"white"}
          borderColor={"blue-50"}
        />
      </div>
    </div>
  );
};

export default RoutineDetail;
