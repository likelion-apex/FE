import glassesIcon from "../../assets/routine-analyze/glassesIcon.svg";
import dangerIcon from "../../assets/routine-analyze/dangerIcon.svg";

const IngredientCard = ({ step, onClick }) => {
  //단계가 비었다면
  if (!step) return null;

  // 💡 4가지 상태별 스타일 및 아이콘 매핑
  const STATUS_STYLE = {
    safe: {
      // 성분이 안전함 (초록)
      bg: "bg-green-05",
      iconColor: "bg-green-50",
      titleText: "text-gray-60",
      descText: "text-gray-60",
      icon: glassesIcon,
    },
    soso: {
      // 아쉬움-애매 (노랑)
      bg: "bg-yellow-05a",
      iconColor: "bg-yellow-50a",
      titleText: "text-gray-60",
      descText: "text-gray-60",
      icon: glassesIcon,
    },
    good: {
      // 피부에 좋음 (파랑)
      bg: "bg-blue-05",
      iconColor: "bg-blue-50",
      titleText: "text-blue-50",
      descText: "text-gray-60",
      icon: glassesIcon,
    },
    dangerIconing: {
      // 경고-위험 (빨강)
      bg: "bg-red-05",
      iconColor: "bg-red-40",
      titleText: "text-red-40",
      descText: "text-red-70",
      icon: dangerIcon,
    },
  };

  // 현재 step.status 값에 맞는 스타일 가져오기 (매칭 안 되면 기본값 safe)
  const currentStyle = STATUS_STYLE[step.status] || STATUS_STYLE.safe;

  return (
    <div
      className="flex h-fit break-inside-avoid flex-col rounded-xl border border-gray-20 p-3 cursor-pointer shadow-card"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[16px] font-bold text-white">
          {step.id}
        </div>
        <span className="text-[13px] font-bold text-gray-800">{step.type}</span>
      </div>

      <div className="mx-auto mb-3 h-15 w-15 rounded-xl bg-gray-400"></div>

      <h4 className="mb-1 text-center text-[16px] font-semibold leading-snug whitespace-pre-line">
        {step.name}
      </h4>
      <p className="mb-4 text-center text-[12px] text-gray-60 break-keep">
        {step.desc}
      </p>

      <div
        className={`mt-auto flex flex-col gap-2 rounded-lg p-2 text-[12px] ${currentStyle.bg} ${currentStyle.descText}`}
      >
        <div className="mb-1 flex items-center gap-1.5 font-semibold">
          {/* 회색 박스 대신 설정하신 아이콘 적용 */}
          <div
            className={`${currentStyle.iconColor} size-4 rounded-sm flex items-center justify-center`}
          >
            <img
              src={currentStyle.icon}
              alt={step.statusTitle}
              className="h-3 w-3 shrink-0"
            />
          </div>
          <div className={`flex items-center gap-1 ${currentStyle.titleText}`}>
            {step.statusTitle}
          </div>
        </div>
        <p className="break-keep leading-tight opacity-90">{step.statusDesc}</p>
      </div>
    </div>
  );
};

export default IngredientCard;
