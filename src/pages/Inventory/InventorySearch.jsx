import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notIcon from "../../assets/routine-analyze/notIcon_black.svg";
import searchIcon_gray from "../../assets/routine-analyze/searchIcon_gray.svg";
import searchIcon_blue from "../../assets/routine-analyze/searchIcon_blue.svg";
import rightArrowIcon_blue from "../../assets/icons/rightArrowIcon_blue.svg";
import axios from "axios";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import useAuthStore from "../../store/authStore";
import InventoryNavbar from "../../components/Inventory/InventoryNavbar";
import useInventoryStore from "../../store/inventoryStore";
import BrandItemCard from "../../components/Inventory/BrandItemCard";

const InventorySearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const [searchResults, setSearchResults] = useState([]); // 필터링 된 리스트
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inventoryList = useInventoryStore((state) => state.inventoryList);

  const goToItemDetail = (item) =>
    navigate(`/inventory/item-detail/${item.inventoryId}`);

  // 검색어 하이라이트 처리 함수
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-blue-50">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  //keyword 변경 시 필터링
  useEffect(() => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    // 브랜드 명 및 이름으로 검색 가능
    const filtered = inventoryList.filter(
      (item) =>
        item.productName?.includes(keyword.trim()) ||
        item.brand?.includes(keyword.trim()),
    );

    setSearchResults(filtered);
  }, [keyword, inventoryList]);

  return (
    <div className="flex h-full flex-col bg-gray-05 px-[20px] pt-5">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`flex flex-1 items-center rounded-2xl border bg-gray-05 px-5 py-[10px] transition-colors ${
            keyword ? "border-blue-50" : "border-gray-20"
          }`}
        >
          <img
            src={keyword ? searchIcon_blue : searchIcon_gray}
            alt="search"
            className="pr-2"
          />

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제품명을 입력하세요"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-40"
          />

          {keyword && (
            <button
              onClick={() => setKeyword("")}
              className="text-gray-30 hover:text-gray-50"
            >
              <img src={notIcon} alt="X" />
            </button>
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 text-[15px] font-medium text-black"
        >
          취소
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {!keyword ? (
          <div className="flex h-full flex-col items-center justify-center pb-32">
            <p className="text-[14px] text-gray-50">
              인벤토리에 있는 화장품을 검색해보세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h3 className="text-[13px] font-bold text-gray-60">
              내 화장대 검색 결과 ({searchResults.length})
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((item) => (
                <BrandItemCard
                  key={item.ProductId}
                  item={item}
                  onItemClick={goToItemDetail}
                />
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="mt-10 text-center text-gray-50 text-[14px]">
                일치하는 화장품이 없습니다.
              </div>
            )}

            <div className="mt-10 flex flex-col items-center justify-center gap-1 pb-10">
              <span className="text-[14px] text-gray-60">
                찾으시는 제품이 내 화장대에 없나요?
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center text-[14px] font-bold text-blue-50"
              >
                새로운 화장품으로 검색 및 추가하기
                <img
                  src={rightArrowIcon_blue}
                  alt="화살표"
                  className="pl-1 size-3"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewItemSearchModal onClose={() => setIsModalOpen(false)} />
      )}
      <InventoryNavbar />
    </div>
  );
};

export default InventorySearch;
