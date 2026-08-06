import right_arrow from "../assets/routine-analyze/right_arrow.svg";

const STEPS = [
  { label: "링크 입력", highlight: false },
  { label: "제품 추출", highlight: false },
  { label: "맞춤 큐레이션", highlight: true },
];

const AnalysisProcessCard = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-[20px] border border-gray-20 px-[25px] py-[10px]">
      {STEPS.flatMap((step, index) => {
        const items = [
          <div
            key={step.label}
            className="flex w-[76px] flex-col items-center gap-2"
          >
            <div className="size-10 shrink-0 rounded-full bg-gray-40" />
            <p
              className={`text-center text-[12px] font-bold leading-[14px] ${
                step.highlight ? "text-primary-10" : "text-gray-60"
              }`}
            >
              {step.label}
            </p>
          </div>,
        ];
        //마지막 아이템이 아니라면, 화살표 표시
        if (index < STEPS.length - 1) {
          items.push(
            <div
              key={`arrow-${step.label}`}
              className="flex size-6 shrink-0 items-center justify-center"
            >
              <img src={right_arrow} alt="" className="size-6" />
            </div>,
          );
        }

        return items;
      })}
    </div>
  );
};

export default AnalysisProcessCard;
