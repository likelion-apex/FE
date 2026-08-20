import checkIcon from "../../assets/routine-analyze/checkIcon.svg";

const MatchingCard = ({ data }) => {
  return (
    <div className="mb-8 bg-white border border-gray-20 shadow-card rounded-2xl">
      <div className="flex w-full flex-col gap-2 rounded-[24px] px-6 py-4">
        <div className="flex">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-[12px] font-bold text-white">
            AI 매칭 리포트
          </span>
        </div>
        <div className="flex flex-col gap-2 rounded-[16px] bg-blue-05 py-3 px-9">
          <h3 className="text-[14px] font-bold text-blue-50">
            AI 매칭 점수 {data.overallScore}점
          </h3>
          <div className="flex flex-col gap-1">
            {data.highlights?.map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-[12px] font-semibold text-black"
              >
                {/* 파란색 둥근 사각형 체크 아이콘 */}
                <div className="size-4 rounded-sm bg-blue-50 flex items-center justify-center">
                  <img src={checkIcon} alt="체크" />
                </div>
                {detail}
              </div>
            ))}
          </div>
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
              {data.newProductCount || 0}개
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
