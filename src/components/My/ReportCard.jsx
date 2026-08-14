// 월간 / 연간 분석 리포트 진입 카드
const ReportCard = ({ period, title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[176px] shrink-0 cursor-pointer flex-col items-start gap-3 rounded-lg border border-gray-40 bg-gray-05 px-[21px] py-[15px] text-left"
    >
      {/* 아이콘. 디자인상 아직 placeholder */}
      <span className="size-12 shrink-0 rounded-lg bg-gray-20" />
      <div className="flex w-full flex-col gap-2">
        <p className="text-sm leading-[14px] font-bold text-blue-50">
          {period}
        </p>
        <p className="text-base font-semibold whitespace-nowrap text-black">
          {title}
        </p>
      </div>
    </button>
  );
};

export default ReportCard;
