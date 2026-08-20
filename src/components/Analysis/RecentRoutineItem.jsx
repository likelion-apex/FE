import video_button from "../../assets/routine-analyze/video_button.svg";
import more_arrow from "../../assets/routine-analyze/more_arrow.svg";

const RecentRoutineItem = ({
  title,
  day,
  score,
  thumbnailUrl,
  status,
  stepCount,
  onClick,
}) => {
  const clickable = status === "COMPLETED";

  if (!title || !day || !score) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className="flex items-center w-full gap-3 text-left disabled:cursor-default"
    >
      {/* 왼쪽 썸네일 영역 */}
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
        <div className="relative flex h-[60px] w-[40px] items-start justify-center overflow-clip rounded-lg bg-gray-200 pt-1.5">
          <img
            src={thumbnailUrl}
            alt="유튜브 썸네일"
            // 💡 opacity-50 (또는 40~60)을 주어 뒤의 회색 배경이 비치게 만듭니다.
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />

          {/* 💡 z-10을 주어 텍스트가 이미지 위로 올라오게 합니다. */}
          <span className="relative z-10 text-[10px] font-bold tracking-tight text-red-800">
            Shorts
          </span>
        </div>
      </div>

      {/* 중앙 텍스트 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="text-[16px] font-semibold leading-7 text-black truncate">
          {title}
        </p>
        <p className="text-[12px] font-medium leading-[14px] text-gray-60 truncate">
          {stepCount}단계 • AI 궁합점수
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
