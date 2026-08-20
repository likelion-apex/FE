import video_button from "../../assets/routine-analyze/video_button.svg";
import more_arrow from "../../assets/routine-analyze/more_arrow.svg";

const RecentRoutineItem = ({ title, day, score, thumbnailUrl }) => {
  const getDaysAgo = (dateString) => {
    if (!dateString) return "";

    const targetDate = new Date(dateString);
    const today = new Date();

    // 시간 차이를 밀리초(ms) 단위로 계산
    const diffTime = today.getTime() - targetDate.getTime();

    // 밀리초를 일(day) 단위로 변환 (소수점 버림)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘"; // 오늘인 경우
    if (diffDays > 0) return `${diffDays}일 전`; // 1일 이상 지난 경우

    return "방금 전"; // 방금 막 생성되어서 시간차가 거의 없는 경우
  };
  return (
    <div className="flex items-center w-full gap-3">
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
        <div className="rotate-90">
          <div className="relative h-[40px] w-[60px] overflow-clip rounded-lg bg-gray-200">
            {/* 배경으로 깔리는 유튜브 썸네일 */}
            <img
              src={thumbnailUrl}
              alt="유튜브 썸네일"
              className="absolute inset-0 h-full w-full object-fill -rotate-90 scale-150"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="text-[16px] font-semibold leading-7 text-black truncate">
          {title}
        </p>
        <p className="text-[12px] font-medium leading-[14px] text-gray-60 truncate">
          {getDaysAgo(day)} • AI 궁합점수
          <span className="text-blue-50 font-semibold"> {score}점</span>
        </p>
      </div>

      {/* 3. 오른쪽 화살표 영역 (크기 고정: shrink-0) */}
      <div className="flex size-5 shrink-0 items-center justify-center overflow-clip rounded-full">
        <img src={more_arrow} alt="자세히 보기" className="h-4 w-2" />
      </div>
    </div>
  );
};

export default RecentRoutineItem;
