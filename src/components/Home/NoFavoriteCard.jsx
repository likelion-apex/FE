import React from "react";
import NewItem from "./NewItem";
import { useState } from "react";
import NewItemSearchModal from "../Inventory/NewItemSearchModal";

const NoFavoriteCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border-1 border-dashed border-gray-20 rounded-[20px] px-[24px] py-[24px] w-[360px] h-[305px]">
      <h3 className="flex flex-col items-center justify-center text-blue-50 text-[16px] font-semibold">
        {" "}
        현재 등록된 즐겨찾기가 없어요{" "}
      </h3>
      <p className="flex flex-col items-center justify-center text-gray-60 text-[14px]">
        {" "}
        즐겨찾는 제품을 등록해 손쉽게 확인해보세요{" "}
      </p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pt-[24px]">
        <NewItem onClick={() => setIsModalOpen(true)} />
        <NewItem onClick={() => setIsModalOpen(true)} />
        <NewItem onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <NewItemSearchModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default NoFavoriteCard;
