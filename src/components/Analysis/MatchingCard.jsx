const MatchingCard = ({ data }) => {
  return (
    <div className="mb-8 bg-white border border-gray-20 shadow-card rounded-2xl">
      <div className="flex w-full flex-col gap-2 rounded-[24px] px-6 py-4">
        <div className="flex">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-[12px] font-bold text-white">
            AI 매칭 리포트
          </span>
        </div>

        <div className="flex flex-col gap-[10px] border-b border-gray-20 pb-4 pt-2 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-gray-60 font-normal">
              숏폼 속 새로운 제품
            </span>
            <span className="font-bold text-black">
              {data.newProductCount}개
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-60 font-normal">
              그대로 사용 가능한 제품
            </span>
            <span className="font-bold text-black">
              {data.compatibleCount}개
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-60 font-normal">
              AI가 안전하게 대체한 제품
            </span>
            <span className="font-bold text-blue-50">
              {data.replacedCount}개
            </span>
          </div>
        </div>

        {/* 최하단: 상세 설명 */}
        <p className="text-[13px] leading-[22px] text-gray-600">
          {data.summary}
        </p>
      </div>
    </div>
  );
};

export default MatchingCard;
