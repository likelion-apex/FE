import productPlaceholder from "../../assets/home/product-placeholder.png";

// 즐겨찾는 화장품 가로 스크롤 목록
const FavoriteProducts = ({ products = [], onProductClick }) => {
  return (
    <div className="no-scrollbar flex w-full gap-2 overflow-x-auto px-5 pb-3">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onProductClick?.(product)}
          className="flex w-[140px] shrink-0 cursor-pointer flex-col items-start gap-2 rounded-[20px] border border-gray-20 bg-white p-3 text-left drop-shadow-[0px_12px_12px_rgba(0,0,0,0.08)]"
        >
          <img
            src={product.imageUrl || productPlaceholder}
            alt=""
            className="size-[116px] rounded-[20px] object-cover"
          />
          <div className="flex w-full min-w-0 flex-col gap-1">
            <p className="line-clamp-2 break-words text-sm leading-5 font-semibold text-black">
              {product.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FavoriteProducts;
