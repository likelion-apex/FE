import ProductImage from "../ProductImage";

// 홈에서는 오늘의 활성 루틴을 읽기 전용으로 보여준다.
const NightCareCard = ({ tip, steps }) => {
  return (
    <div className="w-full overflow-clip rounded-[20px] border border-gray-10 bg-white shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-3 px-5 py-9">
        <p className="rounded-lg bg-white px-2 py-1 text-center text-xs text-gray-60 drop-shadow-[0px_20px_60px_#03c1fb]">
          {tip}
        </p>

        <ul className="mt-3 flex flex-col gap-2">
          {steps.map((step) => (
            <li
              key={step.id}
              className="flex w-full items-center rounded-lg border border-gray-20 bg-white p-3"
            >
              <ProductImage
                alt=""
                category={step.category}
                className="size-10 shrink-0 rounded-lg object-cover border border-gray-20"
              />
              <div className="ml-4 min-w-0">
                <p className="truncate text-sm leading-5 font-semibold text-black">
                  {step.order}. {step.name}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-4 text-gray-60">
                  {step.summary ||
                    [step.brand, step.category].filter(Boolean).join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NightCareCard;
