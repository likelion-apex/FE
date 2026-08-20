import video_button from "../../assets/routine-analyze/video_button.svg";
import more_arrow from "../../assets/routine-analyze/more_arrow.svg";

const RecentRoutineItem = ({
  title,
  day,
  score,
  thumbnailUrl,
  status,
  onClick,
}) => {
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

  const clickable = status === "COMPLETED";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className="flex items-center w-full gap-3 text-left disabled:cursor-default"
    >
      {/* 왼쪽 썸네일 영역 */}
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
        <div className="relative h-[60px] w-[40px] overflow-clip rounded-lg bg-gray-200">
          <img
            src={thumbnailUrl}
            alt="유튜브 썸네일"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 중앙 텍스트 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="text-[16px] font-semibold leading-7 text-black truncate">
          {title}
        </p>
        <p className="text-[12px] font-medium leading-[14px] text-gray-60 truncate">
          {getDaysAgo(day)} • AI 궁합점수
          <span className="text-blue-50 font-semibold"> {score}점</span>
        </p>
      </div>

      {/* 오른쪽 화살표 영역 */}
      <div className="flex size-5 shrink-0 items-center justify-center overflow-clip rounded-full">
        <img src={more_arrow} alt="자세히 보기" className="h-4 w-2" />
      </div>
    </button>
  );
};

export default RecentRoutineItem;
