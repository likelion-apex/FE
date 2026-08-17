import ScoreGoal from "../Use/ScoreGoal";

const RoutineScore = ({ data, isDetailPage, isRoutine }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-[24px] bg-white px-6 py-4 border-bray-20 shadow-card">
      {isDetailPage === false ? (
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-blue-50">{data.title}</h2>
          <span className="rounded-md bg-blue-50 px-[8px] py-[4px] text-[12px] font-bold text-white">
            {data.tag}
          </span>
        </div>
      ) : (
        ""
      )}

      <ScoreGoal data={data} isRoutine={isRoutine} />

      {/* 최하단: 상세 설명 */}
      <p className="text-[13px] leading-[22px] text-gray-600">{data.summary}</p>
    </div>
  );
};

export default RoutineScore;
