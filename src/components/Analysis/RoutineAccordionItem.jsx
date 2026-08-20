import React, { useState } from "react";
import more_Arrow from "../../assets/routine-analyze/more_arrow.svg";
import notIcon from "../../assets/routine-analyze/notIcon.svg";
import glassesIcon from "../../assets/routine-analyze/glassesIcon.svg";

import { addInventoryItem } from "../../api/inventory"; // 🚀 1. API 임포트
import useUserStore from "../../store/userStore"; // 🚀 2. 닉네임 스토어 임포트

const RoutineAccordionItem = ({ step }) => {
  // 기본적으로 열려있도록 설정
  const [isExpanded, setIsExpanded] = useState(true);
  const nickname = useUserStore((state) => state.nickname);
  // 등록 완료 상태를 관리하는 State 추가
  const [isRegistered, setIsRegistered] = useState(false);

  // 상태에 따른 테마 색상 매핑
  const theme = {
    VIDEO_PRODUCT: {
      badge: "bg-violet-02 text-violet-45",
      box: "bg-gray-05",
      iconColor: "bg-gray-40",
      title: "text-gray-60",
      icon: notIcon,
      bedgeText: "영상 속 제품",
      reasonTitle: "대체품 없음",
    },
    REPLACED: {
      badge: "bg-blue-05 text-blue-50",
      box: "bg-blue-05",
      iconColor: "bg-blue-50",
      title: "text-blue-50",
      icon: glassesIcon,
      bedgeText: "대체",
      reasonTitle: "AI 대체 이유",
    },
    compatible: {
      badge: "bg-green-05 text-green-70",
      box: "bg-green-05",
      iconColor: "bg-green-50",
      title: "text-green-70",
      icon: glassesIcon,
      bedgeText: "호환",
      reasonTitle: "AI 대체 이유",
    },
  };
  //대체 테마가 있다면 대체테마로, 아니라면 none으로 (오류방지)
  const currentTheme = theme[step.status] || theme.VIDEO_PRODUCT;

  //인벤토리 단일 제품 등록
  const handleRegisterProduct = async (e) => {
    e.stopPropagation();

    const confirmAdd = window.confirm(
      `'${step.productName}'을(를) 인벤토리에 등록하시겠습니까?`,
    );
    if (!confirmAdd) return;

    try {
      await addInventoryItem({
        productName: step.productName,
      });
      alert("성공적으로 등록되었습니다!");

      setIsRegistered(true);
    } catch (error) {
      console.error("인벤토리 등록 실패:", error);
      if (error.response && error.response.status === 409) {
        alert("이미 화장대에 등록되어 있는 제품입니다! 🪞");
        // 이미 등록된 제품이므로 굳이 버튼을 또 누를 필요가 없게 '등록 완료' 처리
        setIsRegistered(true);
      } else {
        alert("등록 중 오류가 발생했습니다.");
      }
    }
  };

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
          <div className="flex size-5 items-center justify-center rounded-full bg-blue-50 text-[16px] font-semibold text-white shrink-0">
            {step.order}
          </div>
          <img
            src={step.imageUrl}
            className="size-[36px] shrink-0 rounded-lg border-gray-40"
          />

          <div className="flex flex-col justify-between w-full">
            <div className="flex items-center gap-1">
              <div className="text-[16px] font-bold text-black">
                {step.replaceName || step.productName}
              </div>
              <div
                className={`rounded px-2 py-1 text-[10px] whitespace-nowrap shrink-0 font-bold ${currentTheme.badge}`}
              >
                {currentTheme.bedgeText}
              </div>
            </div>
            <span className="text-[12px] text-gray-60">
              {step.replaceName
                ? step.productName
                : "인벤토리 미등록 · 영상 속 루틴"}
            </span>
          </div>
        </div>

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
                {currentTheme.reasonTitle}
              </span>
            </div>
            <div className="flex justify-between text-[12px] leading-relaxed text-gray-600">
              <p>
                {step.status === "VIDEO_PRODUCT"
                  ? `대체 제품이 ${nickname}님의 인벤토리에 없어요`
                  : step.reason}
              </p>

              {/* 연결필요 ~ ㅜㅜ */}
              {step.status === "VIDEO_PRODUCT" &&
                (!isRegistered ? (
                  <span
                    onClick={handleRegisterProduct}
                    className="ml-1 cursor-pointer font-bold text-blue-50 shrink-0 whitespace-nowrap"
                  >
                    제품 등록하기
                  </span>
                ) : (
                  <span className="ml-1 font-bold text-gray-40 shrink-0 whitespace-nowrap cursor-default">
                    등록 완료
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineAccordionItem;
