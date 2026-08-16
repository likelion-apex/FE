import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon_gray from "../../assets/routine-analyze/searchIcon_gray.svg";
import searchIcon_blue from "../../assets/routine-analyze/searchIcon_blue.svg";
import notIcon from "../../assets/routine-analyze/notIcon_black.svg";
import useAuthStore from "../../store/authStore";

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
        console.log("👉 현재 내 신분증(토큰) 상태:", accessToken);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/products/search`,
          {
            params: { keyword: keyword.trim() },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("현재 받아온 데이터", response.data.data);

        setSearchResults(response.data.data?.items || []);
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
        axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/inventory`,
          {
            // API 명세서 Request body에 맞게 데이터 세팅
            productId: item.productId,
            productName: item.productName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ),
      );

      // 2. Promise.all을 통해 백엔드로 여러 개의 등록 요청을 동시에 보냅니다.
      await Promise.all(addRequests);

      // 3. 모든 등록이 성공하면 모달을 닫고 사용자에게 알려줍니다.
      alert(`${selectedItems.length}개의 제품이 인벤토리에 등록되었습니다!`);
      onClose();

      //여기서 모달이 닫힌 후 바깥쪽(InventoryHome) 화면이 새로고침 되도록
      // 부모 컴포넌트에서 데이터 다시 불러오기(fetch) 함수를 prop으로 넘겨받아 호출해주면 더 완벽합니다!
    } catch (error) {
      console.error("인벤토리 등록에 실패했습니다.", error);
      alert("제품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-[430px] items-end justify-center bg-black/60"
      onClick={onClose}
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
            <svg
              className="size-4 text-gray-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
                <img src={notIcon} alt="X" className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. 검색 결과 영역 */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {keyword && (
            <div className="flex flex-col">
              <p className="mb-3 text-[12px] font-bold text-gray-60">
                추가할 제품({selectedItems.length})
              </p>

              {isLoading ? (
                <div className="py-4 text-center text-[13px] text-gray-50">
                  검색 중입니다...
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {searchResults.map((item) => {
                    // 💡 API 명세서에 맞게 item.productId 로 변경
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
                              {/* 💡 API 명세서에 맞게 item.name -> item.productName 으로 변경 */}
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
            </div>
          )}
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
    </div>
  );
};

export default NewItemSearchModal;
