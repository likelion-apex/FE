import ProductImage from "../ProductImage";

const InvertoryItemCard = ({ item, onClick }) => {
  return (
    <div
      key={item.productId}
      onClick={() => onClick?.(item)}
      className="shrink-0 flex cursor-pointer flex-col gap-2 items-start p-3 bg-white border border-gray-20 rounded-2xl shadow-card transition-transform active:scale-95"
    >
      {/* 이미지 영역 (가로 116px) */}
      <div className="size-[116px] rounded-[20px] bg-gray-40 overflow-clip shrink-0">
        <ProductImage
          alt={item.productName}
          category={item.category}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 items-start w-[116px] overflow-hidden">
        <p className="w-full text-left text-[14px] font-semibold text-black truncate">
          {item.productName}
        </p>
      </div>
    </div>
  );
};

export default InvertoryItemCard;
