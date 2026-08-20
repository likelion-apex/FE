import aiOrb from "../../assets/home/ai-orb.png";

// AI 루틴분석 요청 카드
const AiAnalysisCard = ({ url, onUrlChange, onSubmit }) => {
  return (
    <div className="flex w-full flex-col items-center gap-5 overflow-clip rounded-[20px] border border-gray-10 bg-blue-05 p-3 shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col items-center gap-2">
        <img
          src={aiOrb}
          alt=""
          className="size-12 rounded-full shadow-[0px_20px_120px_60px_#03c1fb]"
        />
        <p className="text-base leading-7 font-bold text-white">
          AI 분석 요청하기
        </p>
        <p className="text-center text-xs leading-4 font-medium text-gray-80 pt-[10px] pb-[5px]">
          오늘의 루틴을 만들어보세요. 내 피부에 진짜 필요한
          <br />
          제품인지, 집에 있는 화장품으로 대신할 수 있는지 AI가
          <br />
          분석해 드릴게요.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="flex w-full flex-col gap-2"
      >
        <button
          type="submit"
          className="w-full cursor-pointer rounded-[20px] bg-blue-50 px-2 py-4 text-base leading-[14px] font-medium text-white"
        >
          AI 분석 요청하기
        </button>
      </form>
    </div>
  );
};

export default AiAnalysisCard;
