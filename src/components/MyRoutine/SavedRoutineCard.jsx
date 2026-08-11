import React from "react";

const SavedRoutineCard = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full flex-col justify-center rounded-[12px] border border-gray-20 bg-white p-3 cursor-pointer"
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        {/* 루틴 타이틀 */}
        <h3 className="text-[16px] font-semibold text-black line-clamp-1">
          {data.title}
        </h3>
      </div>

      {/* 하단 상세 정보 (단계 & AI 궁합 점수) */}
      <div className="flex items-center text-[12px] font-medium text-gray-60">
        <span>{data.steps}단계</span>

        {/* 구분선 점 */}
        <span className="mx-1.5 text-gray-60">·</span>

        <span>
          AI 궁합 점수 {/* 점수 부분만 파란색(#00C4FE) 적용 */}
          <span className="font-semibold text-blue-50">{data.score}점</span>
        </span>
      </div>
    </div>
  );
};

export default SavedRoutineCard;
