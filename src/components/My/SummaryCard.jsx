import IconBadge from "./IconBadge";

// 이번 달 요약 카드 (컨디션 기록 횟수 / 루틴 완수율)
const SummaryCard = ({ stats }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border-[0.93px] border-blue-50 bg-blue-05 px-6 py-5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconBadge icon={stat.icon} />
            <p className="text-sm font-semibold text-gray-60">{stat.label}</p>
          </div>
          <p className="text-base leading-7 font-semibold text-black">
            <span className="text-blue-50">{stat.value}</span>
            {stat.unit}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
