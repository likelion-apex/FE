// src/components/RoutineCard.jsx
import React from "react";

// 💡 1. isChecked를 부모로부터 받아오도록 props에 추가했습니다!
const RoutineCard = ({ step, isChecked, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between rounded-[20px] border p-[18px] transition-all duration-200 ${
        isChecked
          ? "border-blue-50 bg-blue-05" // 체크 시
          : "border-gray-20 bg-white" // 미체크 시
      }`}
    >
      {/* 왼쪽: 번호 + 이미지 */}
      <div className="flex shrink-0 items-center gap-4">
        <div className="flex size-[20px] items-center justify-center rounded-full bg-gray-40 text-[12px] font-semibold text-white">
          {step.id}
        </div>
        <div className="size-[40px] rounded-[10px] bg-gray-40"></div>
      </div>

      {/* 중앙: 텍스트 영역 */}
      <div className="ml-4 mr-3 flex flex-1 flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-semibold text-gray-black">
            {step.title}
          </h3>

          {/* 💡 2. data.badge를 step.badge로 수정했습니다! */}
          {step.badge && (
            <span className="rounded bg-blue-05 px-2 py-1 text-[10px] font-bold text-blue-50">
              {step.badge}
            </span>
          )}
        </div>

        <p className="text-[12px] leading-[18px] text-gray-60 line-clamp-2 pr-7">
          {step.description}
        </p>
      </div>

      {/* 오른쪽: 체크박스 */}
      <div className="shrink-0">
        {isChecked ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#03C1FB" />
            <path
              d="M7 12.5L10.5 16L17 8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div className="size-[28px] rounded-full border border-gray-20 bg-white"></div>
        )}
      </div>
    </div>
  );
};

export default RoutineCard;
