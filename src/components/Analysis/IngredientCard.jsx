import glassesIcon from "../../assets/routine-analyze/glassesIcon.svg";
import dangerIcon from "../../assets/routine-analyze/dangerIcon.svg";
import ProductImage from "../ProductImage";

const IngredientCard = ({ step, onClick }) => {
  // 단계 데이터가 없다면 렌더링하지 않음
  if (!step) return null;

  // 💡 4가지 상태별 스타일 및 아이콘 매핑 (기존 유지)
  const STATUS_STYLE = {
    safe: {
      bg: "bg-green-05",
      iconColor: "bg-green-50",
      titleText: "text-gray-60",
      descText: "text-gray-60",
      icon: glassesIcon,
      safetyTitle: "피부 안전도 평가",
    },
    soso: {
      bg: "bg-yellow-05a",
      iconColor: "bg-yellow-50a",
      titleText: "text-gray-60",
      descText: "text-gray-60",
      icon: glassesIcon,
      safetyTitle: "피부 안전도 평가",
    },
    good: {
      bg: "bg-blue-05",
      iconColor: "bg-blue-50",
      titleText: "text-blue-50",
      descText: "text-gray-60",
      icon: glassesIcon,
      safetyTitle: "피부 안전도 평가",
    },
    dangerIconing: {
      bg: "bg-red-05",
      iconColor: "bg-red-40",
      titleText: "text-red-40",
      descText: "text-red-70",
      icon: dangerIcon,
      safetyTitle: "AI 경고",
    },
  };

  const getStyleByStatus = (status) => {
    const s = status?.toUpperCase();
    if (s === "EXCELLENT" || s === "GOOD") return STATUS_STYLE.good;
    if (s === "CAUTION" || s === "NORMAL") return STATUS_STYLE.soso;
    if (s === "DANGER" || s === "WARNING" || s === "BAD")
      return STATUS_STYLE.dangerIconing;
    return STATUS_STYLE.safe; // 기본값 (SAFE)
  };

  const currentStyle = getStyleByStatus(
    step.primaryAssessmentCategory || step.safetyLevel,
  );

  return (
    <div
      className="flex h-fit break-inside-avoid flex-col rounded-xl border border-gray-20 p-3 cursor-pointer shadow-card"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[16px] font-bold text-white">
          {step.order}
        </div>
        <span className="text-[13px] font-bold text-gray-800">
          {/* 💡 API 명세: step.type -> step.category (예: 토너, 크림 등) */}
          {step.category}
        </span>
      </div>

      <ProductImage
        alt={step.displayProductName || step.productName}
        category={step.category}
        className="mx-auto mb-3 size-[60px] rounded-xl border border-gray-10 object-cover"
      />

      <h4 className="mb-1 text-center text-[16px] font-semibold leading-snug whitespace-pre-line break-keep">
        {step.displayBrand && (
          <span className="block text-[11px] font-medium text-gray-500 mb-0.5">
            {step.displayBrand}
          </span>
        )}
        {step.displayProductName || step.productName}
      </h4>

      <p className="mb-4 text-center text-[12px] text-gray-60 break-keep line-clamp-2">
        {step.matchSummary}
      </p>

      <div
        className={`mt-auto flex flex-col gap-2 rounded-lg p-2 text-[12px] ${currentStyle.bg} ${currentStyle.descText}`}
      >
        <div className="mb-1 flex items-center gap-1.5 font-semibold">
          <div
            className={`${currentStyle.iconColor} size-4 rounded-sm flex items-center justify-center`}
          >
            <img
              src={currentStyle.icon}
              alt={currentStyle.safetyTitle}
              className="h-3 w-3 shrink-0"
            />
          </div>
          <div className={`flex items-center gap-1 ${currentStyle.titleText}`}>
            {currentStyle.safetyTitle}
          </div>
        </div>
        <p className="break-keep leading-tight opacity-90">
          {step.safetySummary}
        </p>
      </div>
    </div>
  );
};

export default IngredientCard;
