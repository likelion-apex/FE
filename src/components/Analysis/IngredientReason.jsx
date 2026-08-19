import safeIcon from "../../assets/routine-analyze/safeIcon.svg"; // 초록 체크
import thumbIcon from "../../assets/routine-analyze/thumbIcon.svg"; // 파란 따봉
import infoIcon from "../../assets/routine-analyze/infoIcon.svg"; // 보라 느낌표
import dangerIcon from "../../assets/routine-analyze/dangerIcon.svg"; // 빨강 경고

const IngredientReason = ({ reason }) => {
  const typeStyles = {
    POSITIVE: {
      card: "bg-green-05 border-green-50",
      iconBg: "bg-green-50",
      iconImg: safeIcon,
    },
    BENEFICIAL: {
      card: "bg-blue-05 border-blue-50",
      iconBg: "bg-blue-50",
      iconImg: thumbIcon,
    },
    CAUTION: {
      card: "bg-violet-02 border-violet-45",
      iconBg: "bg-violet-45",
      iconImg: infoIcon,
    },
    WARNING: {
      card: "bg-red-05 border-red-40",
      iconBg: "bg-red-40",
      iconImg: dangerIcon,
    },
  };

  const currentStyle = typeStyles[reason.tone] || typeStyles.POSITIVE;

  return (
    <div
      className={`flex gap-3 rounded-[16px] border p-4 ${currentStyle.card}`}
    >
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${currentStyle.iconBg}`}
      >
        <img
          src={currentStyle.iconImg}
          alt={reason.title}
          className="size-4" /* 아이콘 크기에 맞게 조절하세요 */
        />
      </div>

      {/* 텍스트 영역: 디자인상 간격이 좁아 보여 gap-3에서 gap-1.5로 줄였습니다 */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-[14px] font-bold text-black">{reason.title}</h4>
        <p className="break-keep text-[12px] leading-relaxed text-gray-60">
          {reason.description}
        </p>
      </div>
    </div>
  );
};

export default IngredientReason;
