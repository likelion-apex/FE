import React from "react";

const SolventItem = ({ ing }) => {
  // 💡 백엔드의 riskLevel에 따른 색상 매핑 함수
  const getBgColor = (riskLevel) => {
    if (riskLevel === "LOW") return "bg-blue-50";
    if (riskLevel === "MODERATE") return "bg-yellow-50a";
    if (riskLevel === "HIGH") return "bg-red-40";
    return "bg-gray-40"; // 알 수 없는 위험도일 경우 기본값
  };

  const getTextColor = (riskLevel) => {
    if (riskLevel === "LOW") return "text-blue-50";
    if (riskLevel === "MODERATE") return "text-yellow-50a";
    if (riskLevel === "HIGH") return "text-red-40";
    return "text-gray-40";
  };

  return (
    <div className="flex gap-3 border-b border-gray-20">
      {/* 1. 왼쪽 동그라미 (위험도 점수) */}
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white ${getBgColor(
          ing.riskLevel,
        )}`}
      >
        {/* 💡 risk -> riskScore 로 변경 */}
        {ing.riskScore || "-"}
      </div>

      {/* 2. 오른쪽 텍스트 정보 */}
      <div className="flex w-full flex-col gap-1 pb-3">
        <span className="text-[14px] text-black">{ing.name}</span>
        <span className="break-keep text-[11px] text-gray-40">
          {/* 💡 purpose (문자열) -> purposes (배열)로 변경 후 join(", ")으로 연결 */}
          배합목적 :{" "}
          {ing.purposes && ing.purposes.length > 0
            ? ing.purposes.join(", ")
            : "정보 없음"}
        </span>

        {/* 💡 effects -> skinBenefits 로 변경 */}
        {ing.skinBenefits && ing.skinBenefits.length > 0 && (
          <div className="mt-0.5 flex gap-1">
            {ing.skinBenefits.map((benefit, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-bold ${getTextColor(ing.riskLevel)}`}
              >
                {benefit}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolventItem;
