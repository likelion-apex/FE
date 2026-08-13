import ScoreGoal from "../Use/ScoreGoal";
import Item from "../Use/Item";

const SearchItemCard = ({ Detail }) => {
  return (
    <div className="p-5 border border-blue-50 rounded-lg">
      <div className="flex flex-col  gap-3">
        <div className="flex gap-10 items-center ">
          <div className="flex gap-4">
            <div className="size-16 rounded-xl bg-gray-40" />
            <Item data={Detail} />
          </div>
          <div className="flex itmes-center text-center px-2 py-1 rounded-lg bg-gray-10 text-gray-60 text-[10px] font-bold ">
            제품 상세{" "}
          </div>
        </div>
        <ScoreGoal data={Detail} isRoutine={false} />
      </div>
    </div>
  );
};

export default SearchItemCard;
