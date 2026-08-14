import MaskIcon from "../MaskIcon";
import checkIcon from "../../assets/skin-type/check.svg";

// 피부 타입 선택지 카드 (1개만 선택)
const SkinTypeOption = ({ skinType, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(skinType.id)}
      aria-pressed={isSelected}
      className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3 py-4 text-left transition ${
        isSelected
          ? "border-blue-50 bg-blue-05"
          : "border-gray-10 bg-gray-05"
      }`}
    >
      <span className="flex items-center gap-5">
        <MaskIcon
          src={skinType.icon}
          className={`size-6 shrink-0 ${
            isSelected ? "bg-blue-50" : "bg-gray-40"
          }`}
        />

        <span className="flex flex-col gap-1">
          <span
            className={`text-base leading-5 font-bold ${
              isSelected ? "text-blue-50" : "text-black"
            }`}
          >
            {skinType.name}
          </span>
          <span
            className={`text-sm leading-5 ${
              isSelected ? "text-blue-50" : "text-gray-60"
            }`}
          >
            {skinType.description}
          </span>
        </span>
      </span>

      {isSelected && (
        <span className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
          <img src={checkIcon} alt="" className="h-[12px] w-[16px]" />
        </span>
      )}
    </button>
  );
};

export default SkinTypeOption;
