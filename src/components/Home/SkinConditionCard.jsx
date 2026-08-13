import troubleIcon from "../../assets/icons/skin-condition/trouble.svg";
import dryIcon from "../../assets/icons/skin-condition/dry.svg";
import normalIcon from "../../assets/icons/skin-condition/normal.svg";
import moistIcon from "../../assets/icons/skin-condition/moist.svg";
import bestIcon from "../../assets/icons/skin-condition/best.svg";

// 피부 컨디션 선택지. lines는 디자인상 2줄로 끊어지는 라벨.
// iconClassName: 디자인에서 아이콘마다 크기/회전이 조금씩 다르다.
export const SKIN_CONDITIONS = [
  {
    id: "trouble",
    icon: troubleIcon,
    iconClassName: "size-8",
    lines: ["트러블이 있고", "예민해요"],
  },
  {
    id: "dry",
    icon: dryIcon,
    iconClassName: "size-8 rotate-90",
    lines: ["건조하고", "푸석해요"],
  },
  {
    id: "normal",
    icon: normalIcon,
    iconClassName: "size-8",
    lines: ["평범하고", "무난해요"],
  },
  {
    id: "moist",
    icon: moistIcon,
    iconClassName: "size-7",
    lines: ["촉촉하고", "편안해요"],
  },
  {
    id: "best",
    icon: bestIcon,
    iconClassName: "size-7",
    lines: ["컨디션", "최고예요"],
  },
];

// 오늘의 피부 컨디션 선택 + 한 줄 메모
const SkinConditionCard = ({
  selectedId,
  onSelect,
  memo,
  onMemoChange,
  onMemoSubmit,
  isMemoSaved = false,
}) => {
  return (
    <div className="h-[176px] w-full overflow-clip rounded-[20px] border border-gray-20 bg-blue-05 shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      {/* 컨디션 선택 */}
      <div className="flex items-center px-3 pt-5">
        {SKIN_CONDITIONS.map((condition) => {
          const isSelected = selectedId === condition.id;

          return (
            <button
              type="button"
              key={condition.id}
              onClick={() => onSelect?.(condition.id)}
              aria-pressed={isSelected}
              className={`flex w-[66px] shrink-0 cursor-pointer flex-col items-center gap-2 overflow-clip rounded-lg px-1 py-2 ${
                isSelected
                  ? "border border-blue-50 shadow-[0px_20px_120px_0px_#03c1fb]"
                  : "border border-transparent"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center overflow-clip rounded-full ${
                  isSelected ? "bg-blue-50" : "bg-gray-20"
                }`}
              >
                <img src={condition.icon} alt="" className={condition.iconClassName} />
              </span>
              <span
                className={`text-center text-[10px] leading-[14px] ${
                  isSelected ? "font-semibold text-black" : "text-gray-60"
                }`}
              >
                {condition.lines[0]}
                <br />
                {condition.lines[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 한 줄 메모 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onMemoSubmit?.();
        }}
        className="mt-[10px] flex items-start gap-2 px-[22px]"
      >
        <input
          type="text"
          value={memo}
          onChange={(e) => onMemoChange?.(e.target.value)}
          placeholder="한 줄 메모를 남겨보세요"
          className="h-9 w-[260px] rounded border border-gray-20 bg-gray-05 px-[10px] text-sm leading-[14px] text-black shadow-[0px_12px_12px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] outline-none placeholder:text-gray-60"
        />
        <button
          type="submit"
          className="shrink-0 cursor-pointer rounded bg-blue-50 p-[10px] text-sm leading-[14px] whitespace-nowrap text-white shadow-[0px_12px_12px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
        >
          {isMemoSaved ? "수정" : "작성"}
        </button>
      </form>
    </div>
  );
};

export default SkinConditionCard;
