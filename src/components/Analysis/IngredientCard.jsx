const IngredientCard = ({ step, onClick }) => {
  //단계가 비었다면
  if (!step) return null;

  return (
    <div
      className="flex h-fit break-inside-avoid flex-col rounded-xl border border-gray-40 p-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-40 text-[16px] font-bold text-white">
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
        className={`mt-auto rounded-lg p-2 text-[12px] flex flex-col gap-2 ${
          step.status === "warning" ? "bg-red-05 text-red-70" : "bg-green-05"
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1 text-gray-60 font-semibold">
          <div className="h-4 w-4 shrink-0 rounded bg-gray-400" />
          <div
            className={`flex items-center gap-1  ${
              step.status === "warning" ? "text-red-40" : "text-gray-60"
            }`}
          >
            {step.statusTitle}
          </div>
        </div>
        <p className="leading-tight opacity-90 break-keep">{step.statusDesc}</p>
      </div>
    </div>
  );
};

export default IngredientCard;
