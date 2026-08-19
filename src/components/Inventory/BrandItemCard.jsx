import plusIcon from "../../assets/icons/plusIcon_blue.svg";
import NewItemSearchModal from "./NewItemSearchModal";

const BrandItemCard = ({
  item,
  isEditing,
  onClick,
  onDelete,

  isAddCard,
  onAddClick,

  onToggleFavorite,
}) => {
  if (isAddCard) {
    return (
      <div
        onClick={onAddClick}
        className="flex h-[254px] w-full shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-20 bg-white p-2 transition-transform active:scale-95"
      >
        <div className="flex size-14 bg-blue-05 items-center justify-center rounded-full text-blue-50">
          <img src={plusIcon} alt="추가" className="size-7" />
        </div>
        <span className="text-[13px] text-gray-50">새 제품 등록하기</span>
      </div>
    );
  }
  return (
    <div
      //편집 모드가 아닐 때만 상세 페이지로 이동하도록 막아둠
      onClick={() => !isEditing && onClick?.(item)}
      className={`flex flex-col w-full shrink-0 gap-2 rounded-sm bg-white p-2 shadow-card border border-gray-20 h-[254px] ${
        !isEditing ? "cursor-pointer transition-transform active:scale-95" : ""
      }`}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-square rounded-sm border border-gray-20 bg-gray-10 overflow-hidden">
        {/* 편집 상태에 따라 보여주는 버튼 다름 */}
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); // 카드 전체 클릭 방지
              onDelete?.(item);
            }}
            className="absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-full bg-red-40"
          >
            <div className="h-[2px] w-[10px] rounded-full bg-white" />
          </button>
        ) : (
          <>
            <div className="absolute left-2 top-2 z-10 flex items-center justify-center rounded-lg bg-blue-50 px-2 py-1 text-[12px] font-bold text-white">
              {item.score || "94"}점
            </div>
            <div
              className="absolute right-2 top-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(item.inventoryId, item.isFavorite);
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={item.isFavorite === true ? "#FFC107" : "#CCD1D5"}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </>
        )}

        {/* 제품 이미지 */}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col px-1 pb-1">
        <span className="text-[12px] font-medium text-gray-60 truncate">
          {item.brand}
        </span>
        <p className="mt-1 break-keep text-[16px] font-bold leading-[1.3] text-black line-clamp-2">
          {item.productName}
        </p>
      </div>
    </div>
  );
};

export default BrandItemCard;
