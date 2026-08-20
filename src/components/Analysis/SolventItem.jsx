import React from "react";

const SolventItem = ({ ing }) => {
  if (!ing) return null;

  // 1. 한글/영문 위험도에 따른 배경색 매핑
  const getBgColor = (level = "") => {
    const val = String(level).toUpperCase();
    if (val.includes("LOW") || val.includes("낮음") || val.includes("안전"))
      return "bg-blue-50";
    if (
      val.includes("MODERATE") ||
      val.includes("중간") ||
      val.includes("보통")
    )
      return "bg-yellow-50a";
    if (val.includes("HIGH") || val.includes("높음") || val.includes("위험"))
      return "bg-red-40";
    return "bg-gray-40";
  };

  // 2. 텍스트 색상 매핑
  const getTextColor = (level = "") => {
    const val = String(level).toUpperCase();
    if (val.includes("LOW") || val.includes("낮음") || val.includes("안전"))
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

  // 3. 왼쪽 동그라미에 들어갈 텍스트 (점수가 없으면 위험도 텍스트 표시)
  const getRiskDisplay = () => {
    if (ing.riskScore) return ing.riskScore;
    if (ing.riskLevel) {
      if (ing.riskLevel.includes("낮음") || ing.riskLevel === "LOW")
        return "낮음";
      if (ing.riskLevel.includes("중간") || ing.riskLevel === "MODERATE")
        return "중간";
      if (ing.riskLevel.includes("높음") || ing.riskLevel === "HIGH")
        return "높음";
      return ing.riskLevel; // "중간" 글씨가 그대로 리턴됩니다.
    }
    return "-";
  };

  // 🚀 실제 데이터 키값 호환 처리 (여기서 만든 변수들을 아래에서 씁니다!)
  const ingredientName = ing.ingredientName || ing.name || "성분명 미확인";
  const efficacyList = ing.efficacyTags || ing.skinBenefits || [];

  return (
    <div className="flex gap-3 border-b border-gray-20">
      {/* 1. 왼쪽 동그라미 (위험도 점수/텍스트) */}
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${getBgColor(
          ing.riskLevel,
        )}`}
      >
        {/* 🚀 ing.riskScore 대신 함수 호출! (그래야 "중간"이라는 글씨가 뜹니다) */}
        {getRiskDisplay()}
      </div>

      {/* 2. 오른쪽 텍스트 정보 */}
      <div className="flex w-full flex-col gap-1 pb-3">
        {/* 🚀 ing.name 대신 위에서 만든 ingredientName 변수 사용! */}
        <span className="text-[14px] font-medium text-black">
          {ingredientName}
        </span>

        <span className="break-keep text-[11px] text-gray-40">
          배합목적 :{" "}
          {ing.purposes && ing.purposes.length > 0
            ? ing.purposes.join(", ")
            : "정보 없음"}
        </span>

        {/* 🚀 ing.skinBenefits 대신 위에서 만든 efficacyList 변수 사용! */}
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
