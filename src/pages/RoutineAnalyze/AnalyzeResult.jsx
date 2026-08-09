import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineAnalyzeCard from "../../components/RoutineAnalyzeCard";
import TopNavbar from "../../components/layouts/TopNavbar";
import BottomNavbar from "../../components/layouts/BottomNavbar";

const USER_NAME = "서영";
const STEP_COUNT = 4;

const BRIEFING_DATA = {
  tag: "여름철 수부지 맞춤",
  target: "속건조 해결 & 장벽 재생",
  synergy: "히알루론산 + 고함량 판테놀",
  description:
    "수분 공급(자작나무 앰플)과 장벽 보호(판테놀 크림)의 시너지가 돋보이는 4단계 루틴입니다. 다만, 각질 제거 성분(HATCHING EX-07)이 포함된 토너가 있어 민감성 피부는 매일 사용하기보다 주 2~3회로 조절하는 것을 권장합니다.",
};

const ROUTINE_STEPS = [
  {
    id: 1,
    type: "클렌징",
    name: "초미세먼지\n세정 클렌저",
    desc: "뛰어난 세정력과 촉촉한 마무리감",
    status: "safe", // safe | warning
    statusTitle: "피부 안전도 평가",
    statusDesc: "세정력이 강하지만 자극이 적어 민감성 피부도 안심이에요.",
  },
  {
    id: 2,
    type: "토너 (주의)",
    name: "라운드랩 1025\n독도 토너",
    desc: "수분 공급 및 피지·각질 제거",
    status: "warning",
    statusTitle: "[HATCHING EX-07 각질 제거 효소]",
    statusDesc: `${USER_NAME}님은 민감성이라 매일 쓰면 자극이 될 수 있어요. 주 2~3회만 사용하거나 부드러운 패드로 닦아내세요.`,
  },
  {
    id: 3,
    type: "앰플",
    name: "라운드랩\n자작나무 수분 앰플",
    desc: "산뜻하고 쫀쫀한 속건조 케어",
    status: "safe",
    statusTitle: "피부 안전도 평가",
    statusDesc: "자작나무 수액과 히알루론산이 수부지 피부에 찰떡이에요.",
  },
  {
    id: 4,
    type: "크림",
    name: "고함량 판테놀\n10% 재생 크림",
    desc: "피부 장벽 회복 및 재생",
    status: "safe",
    statusTitle: "피부 안전도 평가",
    statusDesc: "판테놀이 약해진 민감성 피부 장벽을 튼튼하게 재생해 줘요.",
  },
];

const AnalyzeResult = () => {
  return (
    <div>
      <div className="flex flex-col mx-[24px]">
        <div className="flex-col gap-3 mb-6">
          <h3 className="text-[20px] font-semibold leading-7 mb-[8px]">
            {USER_NAME}님이 공유하신 영상에서 <br />
            핵심 루틴만 AI가 쏙 뽑아왔어요
          </h3>
          <span className="text-gray-60 text-[14px] leading-7">
            단계별 성분이 내 피부에 맞는지 미리 체크해 보세요.
          </span>
        </div>
        <section className="mb-10 rounded-[20px] bg-[#F8F9FA] p-5">
          <div className="mb-4 flex items-start justify-between gap-2">
            <h2 className="text-[16px] font-bold leading-snug whitespace-pre-line">
              영상 속 뷰티 루틴,
              <br /> 어떤 피부에 가장 효과적일까요?
            </h2>
            <span className="shrink-0 rounded bg-[#E2E8F0] px-2 py-1 text-[11px] font-semibold text-gray-600">
              {BRIEFING_DATA.tag}
            </span>
          </div>

          <div className="mb-4 flex flex-col gap-2 border-b border-gray-200 pb-4 text-[13px]">
            <div className="flex justify-between">
              <span className="text-gray-500">루틴 핵심 목표</span>
              <span className="font-bold">{BRIEFING_DATA.target}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">시너지 성분 조합</span>
              <span className="font-bold text-[#00C4FE]">
                {BRIEFING_DATA.synergy}
              </span>
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-gray-700">
            {BRIEFING_DATA.description}
          </p>
        </section>

        {/* 성분 분석 그리드 */}
        <section>
          <h3 className="mb-4 text-[16px] font-bold">
            영상 속 {ROUTINE_STEPS.length}단계 루틴 성분 분석
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {ROUTINE_STEPS.map((step) => (
              <RoutineAnalyzeCard key={step.id} step={step} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyzeResult;
