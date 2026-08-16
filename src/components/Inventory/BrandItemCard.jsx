const RecommendItemCard = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(item)}

      className="flex cursor-pointer flex-col w-[140px] shrink-0 gap-2 rounded-2xl bg-white p-2 shadow-card transition-transform active:scale-95"
    >
      {/* 1. 이미지 컨테이너 (relative를 주어 내부 뱃지들을 띄울 수 있게 함) */}
      <div className="relative w-full aspect-square rounded-xl border border-gray-20 bg-gray-10 overflow-hidden">
        {/* 좌측 상단: 점수 뱃지 */}
        {item.score && (
          <div className="absolute left-2 top-2 z-10 flex items-center justify-center rounded bg-[#00C9FF] px-1.5 py-0.5 text-[11px] font-bold text-white">
            {item.score}점
          </div>
        )}

        {/* 우측 상단: 별(즐겨찾기) 아이콘 (svg로 직접 구현 또는 보유하신 아이콘 이미지 사용) */}
        {item.isFavorite && (
          <div className="absolute right-2 top-2 z-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFBB00">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        )}

        {/* 실제 화장품 이미지 */}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* 2. 텍스트 컨테이너 */}
      <div className="flex flex-col px-1 pb-1">
        {/* 브랜드명 */}
        <span className="text-[11px] font-medium text-gray-50 truncate">
          {item.brand || "브랜드명"}
        </span>

        {/* 제품명 (break-keep으로 단어 단위 줄바꿈, line-clamp-2로 2줄 넘어가면 ... 처리) */}
        <p className="mt-1 break-keep text-[14px] font-bold leading-[1.3] text-black line-clamp-2">
          {item.productName}
        </p>
      </div>
    </div>
  );
};

export default RecommendItemCard;
