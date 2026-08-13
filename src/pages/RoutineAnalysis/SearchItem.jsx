import SearchItemCard from "../../components/Analysis/SearchItemCard";
import { PRODUCT_DATA, USER_NAME } from "../../mocks/mockData";
import TopNavbar from "../../components/layouts/TopNavbar";

const SearchItem = () => {
  const handleProduceRoutine = () => {
    navigate("/RoutineAnalysis/OptimizedRoutine");
  };

  return (
    <div className="mb-6 flex flex-col text-black px-[20px]">
      <TopNavbar step={2} totalSteps={4} stepName={""} />
      <div className="mt-7 flex flex-col">
        <div className="flex-col gap-3 mb-20">
          <h3 className="text-[20px] font-semibold leading-7 mb-2">
            영상에서{" "}
            <span className="text-blue-50">{PRODUCT_DATA.length}개</span>의
            제품을 찾았어요
          </h3>
          <span className="text-gray-60 text-[14px] leading-7">
            영상 속 핵심 제품을 {USER_NAME}님 피부에 맞춰 분석해드릴게요
          </span>
        </div>
        <div className="flex flex-col gap-4 mb-20">
          {PRODUCT_DATA.map((data) => (
            <SearchItemCard key={data.id} Detail={data?.modalDetails} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-full mt-5">
        <p className="text-[12px] font-semibold text-blue-50">
          이제 {USER_NAME}님의 인벤토리와 성분 충돌이 없는지 알아볼까요?
        </p>
        <div>
          <button
            type="button"
            className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
            onClick={handleProduceRoutine}
          >
            인벤토리 제품과 성분 궁합 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
