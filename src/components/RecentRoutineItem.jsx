import video_button from "../assets/routine-analyze/video_button.svg";
import more_arrow from "../assets/routine-analyze/more_arrow.svg";

const RecentRoutineItem = ({ title, day, matchCount }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="flex h-[60px] w-10 items-center justify-center shrink-0">
          <div className="rotate-90">
            <div className="relative h-10 w-[60px] overflow-clip rounded-lg bg-gray-10">
              <div className="absolute left-[18px] top-2 flex size-6 items-center justify-center">
                <div className="-rotate-90">
                  <img src={video_button} alt="" className="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold leading-7 text-black whitespace-nowrap">
            {title}
          </p>
          <p className="text-[12px] font-medium leading-[14px] text-gray-60 whitespace-nowrap">
            {day}일 전 • 내 화장품 {matchCount}개 매칭됨
          </p>
        </div>
      </div>
      <div className="size-5 overflow-clip rounded-full bg-gray-10 flex items-center justify-center shrink-0">
        <img src={more_arrow} alt="" className="h-4 w-2" />
      </div>
    </div>
  );
};

export default RecentRoutineItem;
