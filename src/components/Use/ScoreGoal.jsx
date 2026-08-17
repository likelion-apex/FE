import checkIcon from "../../assets/routine-analyze/checkIcon.svg";

const ScoreGoal = ({ data, isRoutine }) => {
  // 데이터가 아직 안 넘어왔을 때를 대비한 방어 코드
  if (!data) return null;

  return (
    <div>
      <div className="flex flex-col gap-2 rounded-[16px] bg-blue-05 py-3 px-9">
        <h3 className="text-[14px] font-bold text-blue-50">
          {/* 💡 API 명세: score -> overallScore */}
          AI 매칭 점수 {data.overallScore}점
        </h3>
        <div className="flex flex-col gap-1">
          {/* 💡 API 명세: matchDetails -> highlights */}
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
          {/* 💡 API 명세: coreGoal (이건 기존과 이름이 같습니다!) */}
          <span className="font-bold text-black">{data.coreGoal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-60 font-normal">시너지 성분 조합</span>
          {/* 💡 API 명세: synergy -> synergyCombo */}
          <span className="font-bold text-blue-50">{data.synergyCombo}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGoal;
