const Item = ({ data }) => {
  if (!data) return null;
  return (
    <div>
      <span className="text-[12px] font-medium text-gray-60">
        {data.displayBrand}
      </span>
      <h2 className="mt-1 text-[16px] font-bold text-black">
        {data.displayProductName}
      </h2>
      <div className="mt-2 flex gap-1">
        {data.ingredientMarketOrVariant ? (
          <span className="rounded bg-gray-10 px-2.5 py-1 text-[10px] font-bold text-gray-60">
            {data.ingredientMarketOrVariant}
          </span>
        ) : (
          ""
        )}

        <span className="rounded bg-gray-10 px-2.5 py-1 text-[10px] font-bold text-gray-60">
          {data.category}
        </span>
      </div>
    </div>
  );
};

export default Item;
