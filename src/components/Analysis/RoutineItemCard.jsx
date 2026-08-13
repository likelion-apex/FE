import React from "react";

const RoutineItemCard = ({ item, index }) => {
  // 💡 status에 따라 지정해주신 테마 컬러를 맵핑합니다.
  const getTheme = (status) => {
    switch (status) {
      case "new":
        return {
          border: "border-violet-45",
          badgeBg: "bg-violet-02",
          badgeText: "text-violet-45",
          aiBoxBg: "bg-violet-02",
          aiText: "text-violet-45",
        };
      case "synergy":
        return {
          border: "border-gray-200", // 기본 테두리
          badgeBg: "bg-green-05",
          badgeText: "text-green-70",
          aiBoxBg: "bg-green-05",
          aiText: "text-green-70",
        };
      case "replace":
        return {
          border: "border-blue-50",
          badgeBg: "bg-blue-05",
          badgeText: "text-blue-50",
          aiBoxBg: "bg-blue-05",
          aiText: "text-blue-50",
        };
      case "owned":
      default:
        return {
          border: "border-gray-200",
          badgeBg: "bg-gray-05",
          badgeText: "text-gray-60",
          aiBoxBg: null,
          aiText: null,
        };
    }
  };

  const theme = getTheme(item.status);

  return (
    <div
      className={`flex flex-col rounded-2xl border ${theme.border} bg-white p-4 shadow-sm`}
    >
      <div className="flex gap-4">
        {/* 왼쪽: 번호 & 제품 썸네일 */}

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-40 text-[16px] font-bold text-white">
          {index + 1}
        </div>
        <div className="flex gap-4">
          <div className="h-[40px] w-[40px] rounded-lg bg-gray-40"></div>

          {/* 오른쪽: 텍스트 정보 */}
          <div className="flex flex-col justify-center">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="text-[16px] font-bold text-black">
                {item.name.replace("\n", " ")}
              </h4>
              <span
                className={`rounded px-2 py-1 text-[10px] font-bold ${theme.badgeBg} ${theme.badgeText}`}
              >
                {item.statusTitle}
              </span>
            </div>
            <p className="text-[12px] leading-snug text-gray-60 w-[190px]">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 하단 AI 분석 박스 (보유 제품이 아닐 때만 렌더링) */}
      {theme.aiBoxBg && (
        <div className={`mt-2 rounded-xl p-3 ${theme.aiBoxBg}`}>
          <div className="mb-2 flex items-center gap-1.5">
            <div
              className={`size-4 rounded-sm bg-current ${theme.aiText}`}
            ></div>
            <span className={`text-[12px] font-semibold ${theme.aiText}`}>
              {item.statusTitle === "AI 시너지 팁"
                ? "AI 시너지 팁"
                : "AI 제품 평가"}
            </span>
          </div>
          <p className={`text-[12px] leading-snug opacity-95 ${theme.aiText}`}>
            {item.statusDesc}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoutineItemCard;
