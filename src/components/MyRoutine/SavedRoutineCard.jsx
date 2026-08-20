import React from "react";

const SavedRoutineCard = ({ data, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <div
      onClick={onClick}
      className="flex min-h-[152px] w-full cursor-pointer flex-col justify-center gap-3 rounded-[20px] border border-gray-20 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-card"
    >
      {data.createdAt && (
        <div className="text-[16px] font-bold text-gray-40">
          {formatDate(data.createdAt)}
        </div>
      )}
      <div className="flex items-center justify-between gap-4">
        {/* 루틴 타이틀 */}
        <h3 className="line-clamp-1 text-[22px] leading-7 font-semibold text-black">
          {data.name}
        </h3>

        {/* 오늘 적용중인(활성) 루틴 표시 */}
        {data.isActive && (
          <span className="shrink-0 rounded-full bg-blue-05 px-3 py-1 text-[14px] font-semibold text-blue-50">
            오늘 적용중
          </span>
        )}
      </div>

      {/* 하단 상세 정보 (단계 & AI 궁합 점수) */}
      <div className="flex items-center text-[17px] leading-6 font-medium text-gray-60">
        <span>{data.stepCount}단계</span>

        {/* AI 분석 기반 루틴에 점수가 있을 때만 표시 */}
        {data.overallScore != null && (
          <>
            {/* 구분선 점 */}
            <span className="mx-1.5 text-gray-60">·</span>

            <span>
              AI 매칭 점수
              <span className="font-semibold text-blue-50">
                {data.overallScore}점
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedRoutineCard;
