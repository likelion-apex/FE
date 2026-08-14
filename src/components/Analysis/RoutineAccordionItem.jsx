import React, { useState } from "react";
import more_Arrow from "../../assets/routine-analyze/more_arrow.svg";
import notIcon from "../../assets/routine-analyze/notIcon.svg";
import glassesIcon from "../../assets/routine-analyze/glassesIcon.svg";

const RoutineAccordionItem = ({ step }) => {
  // 기본적으로 열려있도록 설정
  const [isExpanded, setIsExpanded] = useState(true);
  //단계에서 아이디와 대체품 가져오기
  const { id, replacement } = step;

  // 상태에 따른 테마 색상 매핑
  const theme = {
    none: {
      badge: "bg-violet-02 text-violet-45",
      box: "bg-gray-05",
      iconColor: "bg-gray-40",
      title: "text-gray-60",
      icon: notIcon,
    },
    replace: {
      badge: "bg-blue-05 text-blue-50",
      box: "bg-blue-05",
      iconColor: "bg-blue-50",
      title: "text-blue-50",
      icon: glassesIcon,
    },
    compatible: {
      badge: "bg-green-05 text-green-70",
      box: "bg-green-05",
      iconColor: "bg-green-50",
      title: "text-green-70",
      icon: glassesIcon,
    },
  };
  //대체 테마가 있다면 대체테마로, 아니라면 none으로 (오류방지)
  const currentTheme = theme[replacement.badgeType] || theme.none;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[16px] border bg-white transition-colors ${
        isExpanded ? "border-blue-50" : "border-gray-20"
      }`}
    >
      <div
        className="flex cursor-pointer items-center justify-between p-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-40 text-[16px] font-bold text-white">
            {step.id}
          </div>
          <div className="size-[36px] shrink-0 rounded-lg bg-gray-40" />

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-black">
                {replacement.productName}
              </span>
              <span
                className={`rounded px-2 py-1 text-[10px] font-bold ${currentTheme.badge}`}
              >
                {replacement.badgeText}
              </span>
            </div>
            <span className="text-[12px] text-gray-60">
              {replacement.originalProduct}
            </span>
          </div>
        </div>

        {/* 화살표 아이콘(돌아가는 애니메이션 추가) */}
        <div
          className={`text-gray-400 transition-transform duration-300 ${
            isExpanded ? "rotate-270" : "rotate-90"
          }`}
        >
          <img src={more_Arrow} alt="아코디언 화살표" className="size-4" />
        </div>
      </div>

      {/* 아코디언 내용 */}
      {isExpanded && (
        <div className="px-3 pb-3">
          <div
            className={`flex flex-col gap-2 rounded-xl p-3 ${currentTheme.box}`}
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`size-4 rounded-[4px] flex items-center justify-center ${currentTheme.iconColor}`}
              >
                <img src={currentTheme.icon} alt="아이콘" />{" "}
              </div>
              <span
                className={`text-[12px] font-semibold ${currentTheme.title}`}
              >
                {replacement.reasonTitle}
              </span>
            </div>
            <div className="flex justify-between text-[12px] leading-relaxed text-gray-600">
              <p>{replacement.reasonDesc}</p>
              {replacement.actionText && (
                <span className="ml-1 cursor-pointer font-bold text-blue-50">
                  {replacement.actionText}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineAccordionItem;
