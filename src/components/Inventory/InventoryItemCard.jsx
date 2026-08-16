const InvertoryItemCard = ({ item, onClick }) => {
  return (
    <button
      key={item.productId}
      type="button"
      onClick={() => onItemClick?.(item)}
      className="shrink-0 flex flex-col gap-2 items-start p-3 bg-white border border-gray-20 rounded-2xl shadow-card"
    >
      <div className="size-[116px] rounded-[20px] bg-gray-40 overflow-clip">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-[92px]">
        <p className="text-[14px] font-semibold text-black whitespace-nowrap">
          {item.productName}
        </p>
        <p className="text-[12px] font-medium text-gray-60 whitespace-nowrap">
          {item.tag}
        </p>
      </div>
    </button>
  );
};

export default InvertoryItemCard;
