import MaskIcon from "../MaskIcon";

// 피부 고민 선택 칩 (중복 선택 가능)
const SkinConcernChip = ({ concern, isSelected, onToggle }) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onToggle?.(concern.id)}
      className={`flex cursor-pointer items-end gap-2 rounded-3xl border p-4 transition ${
        isSelected ? "border-blue-50 bg-blue-05" : "border-gray-20 bg-gray-05"
      }`}
    >
      <MaskIcon
        src={concern.icon}
        className={`size-4 shrink-0 ${
          isSelected ? "bg-blue-50" : "bg-gray-40"
        }`}
      />
      <span
        className={`text-sm whitespace-nowrap ${
          isSelected ? "font-bold text-blue-50" : "text-gray-60"
        }`}
      >
        {concern.name}
      </span>
    </button>
  );
};

export default SkinConcernChip;
