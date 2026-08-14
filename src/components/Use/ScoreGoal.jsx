const ScoreGoal = ({ data, isRoutine }) => {
  return (
    <div>
      <div className="flex flex-col gap-2 rounded-[16px] bg-blue-05 py-3 px-9">
        <h3 className="text-[14px] font-bold text-blue-50">
          AI 매칭 점수 {data.score}점
        </h3>
        <div className="flex flex-col gap-1">
          {data.matchDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-[12px] font-bold text-black"
            >
              {/* 회색 둥근 사각형 아이콘 */}
              <div className="size-[16px] rounded-[4px] bg-gray-400 shrink-0" />
              {detail}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col gap-[10px] ${isRoutine ? "border-b border-gray-20" : ""}  pb-4 pt-2 text-[13px]`}
      >
        {isRoutine === false ? (
          <div className="border border-gray-20 my-3" />
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-60 font-normal">
            {isRoutine === true ? "루틴" : "제품"} 핵심 목표
          </span>
          <span className="font-bold text-black">{data.coreGoal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-60 font-normal">시너지 성분 조합</span>
          <span className="font-bold text-blue-50">{data.synergy}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGoal;
