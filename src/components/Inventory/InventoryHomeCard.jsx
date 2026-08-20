import arrowRightIcon from "../../assets/icons/arrowRight.svg";
import plusIcon from "../../assets/icons/plusIcon_blue.svg";
import InventoryItemCard from "../../components/Inventory/InventoryItemCard";
import { useState } from "react";
import NewItemSearchModal from "./NewItemSearchModal";

//카테고리 섹션 (제목 + 전체보기 + 제품 카드 목록)
const InventoryHomeCard = ({
  title,
  items = [],
  onViewAll,
  onItemClick,
  isStarItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 items-start w-full ">
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
            <img src={arrowRightIcon} alt="" className="size-2" />
          </span>
        </button>
      </div>

      <div className="flex gap-2 items-stretch w-full overflow-x-auto no-scrollbar">
        {isStarItem === false ? (
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="shrink-0 w-[142px] flex flex-col items-center justify-center p-3 bg-white border border-dashed border-gray-20 rounded-2xl shadow-card"
          >
            <div className="flex flex-col gap-5 items-center w-[113px]">
              <span className="size-14 flex items-center justify-center rounded-full bg-blue-05 overflow-clip">
                <img src={plusIcon} alt="" className="size-6" />
              </span>
              <span className="text-base leading-[22px] font-semibold text-gray-40 text-center">
                새 제품 등록하기
              </span>
            </div>
          </button>
        ) : (
          ""
        )}

        {items.map((item) => (
          <InventoryItemCard
            ket={item.inventoryId}
            item={item}
            onClick={() => onItemClick?.(item.inventoryId)}
          />
        ))}
      </div>
      {isModalOpen && (
        <NewItemSearchModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InventoryHomeCard;
