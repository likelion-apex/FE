const IngredientReason = ({ reason }) => {
  // 💡 type에 따른 색상 조합을 객체로 정의합니다.
  const typeColors = {
    excellent: "bg-green-05 border-green-50 text-black", // 초록색 테마
    safe: "bg-blue-05 border-blue-50 text-black", // 파란색 테마
    warning: "bg-violet-02 border-violet-45 text-black", // 보라색 테마
    danger: "bg-red-05 border-red-50 text-black", // 빨간색 테마
  };

  // 기본값 회색
  const currentColors =
    typeColors[reason.type] || "bg-gray-10 border-gray-50 text-black";

  return (
    <div className={`flex gap-3 rounded-[16px] border p-4 ${currentColors}`}>
      <div className="size-7 shrink-0 rounded-md bg-gray-400" />
      <div className="flex flex-col gap-3">
        <h4 className=" text-[14px] font-bold">{reason.title}</h4>
        <p className="break-keep text-[12px] leading-relaxed  text-gray-60">
          {reason.desc}
        </p>
      </div>
    </div>
  );
};

export default IngredientReason;
