import arrowRightIcon from "../../assets/icons/arrowRight.svg";
import plusIcon from "../../assets/icons/plus.svg";

//카테고리 섹션 (제목 + 전체보기 + 제품 카드 목록)
const InventoryHomeCard = ({
  title,
  items = [],
  showAddCard = true,
  onViewAll,
  onAddClick,
  onItemClick,
}) => {
  return (
    <div className="flex flex-col gap-5 items-start w-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[18px] leading-7 font-semibold text-black">
          {title}
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1"
        >
          <span className="text-xs leading-[14px] text-gray-60">전체보기</span>
          <span className="w-2 h-4 flex items-center justify-center overflow-clip">
            <img src={arrowRightIcon} alt="" className="w-full h-full" />
          </span>
        </button>
      </div>

      <div className="flex gap-2 items-stretch w-full overflow-x-auto no-scrollbar">
        {showAddCard && (
          <button
            type="button"
            onClick={onAddClick}
            className="shrink-0 w-[142px] flex flex-col items-center justify-center p-3 bg-white border border-dashed border-gray-20 rounded-[20px]"
          >
            <div className="flex flex-col gap-5 items-center w-[113px]">
              <span className="size-14 flex items-center justify-center rounded-full bg-gray-05 overflow-clip">
                <img src={plusIcon} alt="" className="size-6" />
              </span>
              <span className="text-base leading-[22px] font-semibold text-gray-40 text-center">
                새 제품 등록하기
              </span>
            </div>
          </button>
        )}

        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick?.(item)}
            className="shrink-0 flex flex-col gap-2 items-start p-3 bg-white border border-gray-20 rounded-[20px]"
          >
            <div className="size-[116px] rounded-[20px] bg-gray-40 overflow-clip">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-1 items-start w-[92px]">
              <p className="text-sm font-semibold text-black whitespace-nowrap">
                {item.name}
              </p>
              <p className="text-xs font-medium text-gray-60 whitespace-nowrap">
                {item.tag}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InventoryHomeCard;
