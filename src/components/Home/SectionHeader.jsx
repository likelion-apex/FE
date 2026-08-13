import arrowRightIcon from "../../assets/icons/arrowRight.svg";

// 홈 화면 섹션 제목 + 우측 링크(더보기 / 전체보기)
const SectionHeader = ({ title, actionLabel = "더보기", onAction }) => {
  return (
    <div className="flex w-full items-end justify-between">
      <h2 className="text-[18px] leading-7 font-semibold text-black">
        {title}
      </h2>
      <button
        type="button"
        onClick={onAction}
        className="flex cursor-pointer items-center gap-1"
      >
        <span className="text-xs leading-[14px] text-gray-60">
          {actionLabel}
        </span>
        <img src={arrowRightIcon} alt="" className="h-4 w-2" />
      </button>
    </div>
  );
};

export default SectionHeader;
