import React from "react";

const SolventItem = ({ ing }) => {
  if (!ing) return null;

  const getBgColor = (level = "") => {
    const val = String(level).toUpperCase();
    if (
      val.includes("LOW") ||
      val.includes("낮음") ||
      val.includes("안전") ||
      val.includes("작음")
    )
      return "bg-blue-50";
    if (
      val.includes("MODERATE") ||
      val.includes("중간") ||
      val.includes("보통")
    )
      return "bg-yellow-50a";
    if (val.includes("HIGH") || val.includes("높음") || val.includes("위험"))
      return "bg-red-40";
    return "bg-gray-30";
  };

  // 2. 텍스트 색상 매핑
  const getTextColor = (level = "") => {
    const val = String(level).toUpperCase();
    if (
      val.includes("LOW") ||
      val.includes("낮음") ||
      val.includes("안전") ||
      val.includes("작음")
    )
      return "text-blue-50";
    if (
      val.includes("MODERATE") ||
      val.includes("중간") ||
      val.includes("보통")
    )
      return "text-yellow-50a";
    if (val.includes("HIGH") || val.includes("높음") || val.includes("위험"))
      return "text-red-40";
    return "text-gray-40";
  };

  const getRiskDisplay = () => {
    if (ing.riskScore) return ing.riskScore;

    const level = String(ing.riskLevel || "").toUpperCase();

    if (!level || level.includes("UNKNOWN") || level === "NONE") {
      return "-";
    }

    return "";
  };

  const ingredientName = ing.ingredientName || ing.name || "성분명 미확인";
  const efficacyList = ing.efficacyTags || ing.skinBenefits || [];

  return (
    <div className="flex gap-3 border-b border-gray-20">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white ${getBgColor(ing.riskLevel)}`}
      >
        {/* 🚀 방금 만든 똑똑한 함수를 여기에 쏙! */}
        {getRiskDisplay()}
      </div>

      <div className="flex w-full flex-col gap-1 pb-3">
        <span className="text-[14px] font-medium text-black">
          {ingredientName}
        </span>

        <span className="break-keep text-[11px] text-gray-40">
          배합목적 :{" "}
          {ing.purposes && ing.purposes.length > 0
            ? ing.purposes.join(", ")
            : "정보 없음"}
        </span>

        {efficacyList && efficacyList.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {efficacyList.map((benefit, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-bold ${getTextColor(ing.riskLevel)}`}
              >
                #{benefit}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolventItem;
