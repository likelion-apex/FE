import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon_gray from "../../assets/routine-analyze/searchIcon_gray.svg";
import searchIcon_blue from "../../assets/routine-analyze/searchIcon_blue.svg";
import notIcon from "../../assets/routine-analyze/notIcon_black.svg";
import useAuthStore from "../../store/authStore";
import { searchProducts, addInventoryItem } from "../../api/inventory";

import { createPortal } from "react-dom";

const NewItemSearchModal = ({ onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 제품들을 담는 배열
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchProducts(keyword.trim());

        const fetchedItems = data?.items || [];

        const filteredItems = fetchedItems.filter(
          (item) =>
            item.productName?.includes(keyword.trim()) ||
            item.brand?.includes(keyword.trim()),
        );

        setSearchResults(filteredItems);
      } catch (error) {
        console.error("검색 결과를 불러오는 데 실패했습니다.", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const toggleItemSelection = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected.productId === item.productId,
    );
    if (isSelected) {
      // 이미 선택된 제품이면 목록에서 제거
      setSelectedItems(
        selectedItems.filter(
          (selected) => selected.productId !== item.productId,
        ),
      );
    } else {
      // 새로운 제품이면 목록에 추가
      setSelectedItems([...selectedItems, item]);
    }
  };

  // 인벤토리에 최종 등록하기 버튼 클릭
  const handleSubmit = async () => {
    if (selectedItems.length === 0) return;

    try {
      const addRequests = selectedItems.map((item) =>
        addInventoryItem({
          productName: item.productName,
        }),
      );

      // 모든 요청이 끝날 때까지 대기 (일부 실패해도 멈추지 않음)
      const results = await Promise.allSettled(addRequests);

      let successCount = 0;
      let duplicateCount = 0;
      let otherErrorCount = 0;

      results.forEach((res) => {
        if (res.status === "fulfilled") {
          successCount++;
        } else if (res.status === "rejected") {
          if (res.reason?.response?.status === 409) {
            duplicateCount++;
          } else {
            otherErrorCount++;
          }
        }
      });

      // 결과별 알림 처리
      if (otherErrorCount > 0 && successCount === 0) {
        alert("제품 등록 중 오류가 발생했습니다.");
        return;
      }

      if (duplicateCount > 0 && successCount > 0) {
        alert(
          `이미 등록된 ${duplicateCount}개 제품을 제외하고 ${successCount}개 제품이 등록되었습니다.`,
        );
        onClose();
      } else if (duplicateCount > 0 && successCount === 0) {
        alert("선택한 제품이 모두 이미 보관함에 등록되어 있습니다.");
      } else if (successCount > 0) {
        alert(`${successCount}개의 제품이 인벤토리에 등록되었습니다!`);
        onClose();
      }
    } catch (error) {
      console.error("인벤토리 등록 처리 중 오류 발생:", error);
      alert("제품 등록 중 오류가 발생했습니다.");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-[430px] items-end justify-center bg-black/60"
      onClick={onClose}
      //모달 배경에서 슬라이드 등으로 일어나는 이벤트 차단
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <div
        className="flex h-[85vh] w-full flex-col rounded-t-[20px] bg-white px-5 pt-6 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 모달 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-black">새 제품 등록</h2>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-gray-05"
          >
            <img src={notIcon} alt="X" className="size-4" />
          </button>
        </div>

        {/* 2. 검색바 영역 */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-11 flex-1 items-center rounded-xl border bg-white px-4 transition-colors ${
              keyword ? "border-blue-50" : "border-gray-20"
            }`}
          >
            <img
              src={keyword ? searchIcon_blue : searchIcon_gray}
              alt="search"
              className="mr-2 size-5"
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="제품명을 입력하세요"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-40"
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
        </div>

        {/* 3. 검색 결과 및 선택된 제품 영역 */}
        <div className="flex-1 overflow-y-auto no-scrollbar ">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="mb-3 text-[12px] font-bold text-gray-60">
                추가할 제품({selectedItems.length})
              </p>

              {/* 💡 가로로 스크롤되는 선택된 칩(Chip) 리스트 */}
              {selectedItems.length > 0 && (
                <div className=" flex w-full gap-2 overflow-x-auto no-scrollbar pb-2">
                  {selectedItems.map((selected) => (
                    <div
                      key={`badge-${selected.productId}`}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-20 bg-white py-1.5 pl-1.5 pr-3 shadow-sm"
                    >
                      {/* 작은 원형 썸네일 */}
                      <div className="size-6 shrink-0 overflow-hidden rounded-full bg-gray-10">
                        {selected.imageUrl && (
                          <img
                            src={selected.imageUrl}
                            alt={selected.productName}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* 제품명 (너무 길면 말줄임표 처리) */}
                      <span className="max-w-[120px] truncate text-[12px] font-medium text-black">
                        {selected.productName}
                      </span>

                      {/* X 버튼 (누르면 선택 해제) */}
                      <button
                        onClick={() => toggleItemSelection(selected)}
                        className="flex items-center justify-center text-gray-40 transition-colors hover:text-gray-60"
                      >
                        <img src={notIcon} alt="X" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border border-gray-20 my-5" />

            {/* 키워드가 있을 때만 검색 결과 목록 보여주기 */}
            {keyword && (
              <>
                {isLoading ? (
                  <div className="py-4 text-center text-[13px] text-gray-50">
                    검색 중입니다...
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {searchResults.map((item) => {
                      const isSelected = selectedItems.some(
                        (selected) => selected.productId === item.productId,
                      );

                      return (
                        <div
                          key={item.productId}
                          className="flex items-center justify-between border-b border-gray-05 pb-4 last:border-0"
                        >
                          {/* 왼쪽: 이미지 + 제품 정보 */}
                          <div className="flex items-center gap-3">
                            <div className="size-[52px] shrink-0 overflow-hidden rounded-lg bg-gray-10">
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.productName}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[11px] text-gray-40">
                                {item.brand}
                              </span>
                              <span className="break-keep text-[14px] font-bold text-black">
                                {item.productName}
                              </span>
                            </div>
                          </div>

                          {/* 오른쪽: 추가/취소 버튼 */}
                          <button
                            onClick={() => toggleItemSelection(item)}
                            className={`shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                              isSelected
                                ? "border-gray-30 bg-gray-30 text-white"
                                : "border-blue-50 bg-white text-blue-50"
                            }`}
                          >
                            {isSelected ? "취소" : "추가"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!isLoading && searchResults.length === 0 && (
                  <div className="py-4 text-center text-[13px] text-gray-50">
                    검색 결과가 없습니다.
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 4. 하단 고정 등록 버튼 */}
        <div className="mt-4 pt-2">
          <button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            className={`h-[52px] w-full rounded-xl text-[16px] font-bold text-white transition-colors ${
              selectedItems.length > 0
                ? "cursor-pointer bg-blue-50"
                : "cursor-not-allowed bg-gray-30"
            }`}
          >
            {selectedItems.length > 0
              ? `${selectedItems.length}개 제품 인벤토리에 등록하기`
              : "제품을 선택해주세요"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default NewItemSearchModal;
