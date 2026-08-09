const RoutineAnalyzeCard = ({ step }) => {
  //수정필요
  if (!step) return null;

  return (
    <div className="mb-3 flex flex-col rounded-xl border border-gray-300 p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-[11px] font-bold text-white">
          {step.id}
        </div>
        <span className="text-[13px] font-bold text-gray-800">{step.type}</span>
      </div>

      <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-gray-400"></div>

      <h4 className="mb-1 text-center text-[14px] font-bold leading-snug whitespace-pre-line">
        {step.name}
      </h4>
      <p className="mb-4 text-center text-[11px] text-gray-500 break-keep">
        {step.desc}
      </p>

      <div
        className={`mt-auto rounded-lg p-2.5 text-[11px] ${
          step.status === "warning"
            ? "bg-[#FFF0F0] text-[#FF4B4B]"
            : "bg-[#E8F8F0] text-[#00A86B]"
        }`}
      >
        <div className="mb-1 flex items-center gap-1 font-bold">
          {step.status === "safe" && (
            <span className="inline-block h-3 w-3 rounded bg-[#00A86B] text-center text-[8px] leading-3 text-white">
              ✓
            </span>
          )}
          {step.statusTitle}
        </div>
        <p className="leading-tight opacity-90 break-keep">{step.statusDesc}</p>
      </div>
    </div>
  );
};

export default RoutineAnalyzeCard;
