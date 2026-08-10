import React from "react";

// 💡 부모로부터 'ing' 데이터를 프롭스로 받아옵니다!
const SolventItem = ({ ing }) => {
  return (
    <div className="flex gap-3 border-b border-gray-20">
      {/* 1. 왼쪽 동그라미 (위험도) */}
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white ${
          ing.riskType === "low"
            ? "bg-blue-50"
            : ing.riskType === "medium"
              ? "bg-yellow-50a"
              : "bg-red-40"
        }`}
      >
        {ing.risk}
      </div>

      {/* 2. 오른쪽 텍스트 정보 */}
      <div className="flex w-full flex-col gap-1 pb-3">
        <span className="text-[14px] text-black">{ing.name}</span>
        <span className="break-keep text-[11px] text-gray-40">
          배합목적 : {ing.purpose}
        </span>

        {/* effects가 있을 때만 렌더링 */}
        {ing.effects && ing.effects.length > 0 && (
          <div className="mt-0.5 flex gap-1">
            {ing.effects.map((effect, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-bold  ${
                  ing.riskType === "low"
                    ? "text-blue-50"
                    : ing.riskType === "medium"
                      ? "text-yellow-50a"
                      : "text-red-40"
                }`}
              >
                {effect}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolventItem;
