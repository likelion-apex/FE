import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BrandItemCard from "../../components/Inventory/BrandItemCard";
import axios from "axios";
import useInventoryStore from "../../store/inventoryStore";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";

const CATEGORIES = [
  { id: "ALL", name: "전체 화장품" },
  { id: "SKIN_TONER", name: "스킨/토너" },
  { id: "LOTION_EMULSION", name: "로션/에멀전" },
  { id: "ESSENCE_SERUM", name: "에센스/앰플/세럼" },
  { id: "FACE_OIL", name: "페이스 오일" },
  { id: "CREAM", name: "크림" },
  { id: "EYE_CARE", name: "아이케어" },
  { id: "MIST_GEL", name: "미스트·젤" },
  { id: "TONER_PAD", name: "스킨/토너 패드" },
  { id: "ETC", name: "기타" },
];

const InventoryStar = () => {
  const { setNavProps } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nickname = useUserStore((state) => state.nickname);
  const inventoryList = useInventoryStore((state) => state.inventoryList);
  const fetchInventoryList = useInventoryStore(
    (state) => state.fetchInventoryList,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // 페이지네이션을 위한 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // 한 페이지당 보여줄 개수

  //드래그 & 스와이프를 위한 상태 추가
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const accessToken = useAuthStore((state) => state.accessToken);

  //즐찾 추가/삭제
  const toggleFavorite = async (inventoryId, currentStatus) => {
    const newFavoriteStatus = !currentStatus;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory/${inventoryId}/favorite`,
        { isFavorite: newFavoriteStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      //스토어 새로고침
      fetchInventoryList();
    } catch (error) {
      console.error("즐겨찾기 상태 변경에 실패했습니다.", error);
    }
  };

  // 인벤토리 삭제 함수
  const handleDeleteItem = async (item) => {
    if (!window.confirm(`${item.productName}을(를) 정말 삭제하시겠습니까?`))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory/${item.inventoryId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      fetchInventoryList();
    } catch (error) {
      console.error("삭제에 실패했습니다.", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "라이브러리",
      rightAction: {
        content: isEditing ? "완료" : "편집",
        onClick: () => setIsEditing((prev) => !prev),
        textColor: isEditing ? "text-red-40" : "text-blue-50",
      },
    });
  }, [setNavProps, isEditing]);

  const items = Array.isArray(inventoryList)
    ? inventoryList
    : inventoryList?.items || inventoryList?.data?.items || [];

  const filteredList =
    selectedCategory.id === "ALL"
      ? items
      : items.filter((item) => item.category === selectedCategory.id);

  // 현재 페이지에 보여줄 4개의 아이템만 잘라내기 로직
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // 전체 필터링된 리스트에서 현재 페이지의 4개면 빼오기
  const currentItems = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  //빈 페이지(추가할 카드 생성)
  const emptyCardCount = ITEMS_PER_PAGE - currentItems.length;
  const emptyCards = Array.from({
    length: emptyCardCount > 0 ? emptyCardCount : 0,
  });

  // 카테고리 선택 시 실행되는 함수
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  // 💡 공통 드래그 로직 (마우스와 터치 모두 여기서 처리)
  const onDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setEndX(clientX);
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    setEndX(clientX);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const distance = startX - endX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1); // 다음 페이지
    } else if (distance < -minSwipeDistance) {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1); // 이전 페이지
    }
  };

  return (
    <div className="flex flex-col px-[20px] pt-15 pb-20">
      {/* 💡 헤더 영역 (드롭다운 트리거) */}
      <div className="relative z-20 mb-4">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 text-[18px] font-bold text-black"
        >
          {selectedCategory.name}
          {/* 꺾쇠 화살표 아이콘*/}
          <svg
            className={`size-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* 드롭다운 메뉴 추가 */}
        {isDropdownOpen && (
          <div className="absolute left-0 top-[120%] w-[160px] bg-transparent py-2 ">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`w-full px-4 py-2 text-left text-[14px] transition-colors border border-gray-20 rounded-sm bg-white/70 shadow-card tracking-wide hover:bg-gray-05 ${
                  selectedCategory.id === cat.id
                    ? "font-bold text-blue-50"
                    : "font-medium text-gray-60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd} // 드래그하다가 밖으로 나가버렸을 때 처리
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
        // select-none: 마우스로 드래그할 때 텍스트나 이미지가 선택되는 것을 방지
        // cursor-grab, active:cursor-grabbing: 마우스 커서가 '잡는 손' 모양으로 바뀜
        className="flex-1 select-none cursor-grab active:cursor-grabbing"
      >
        {/* 카드의 클릭(이동/추가)이 드래그를 방해하지 않도록 pointer-events-none을 줍니다 */}
        <div className="grid grid-cols-2 gap-4 pointer-events-none">
          {/* 실제 데이터 카드 */}
          {currentItems.map((item) => (
            <div key={item.productId} className="pointer-events-auto">
              <BrandItemCard item={item} onToggleFavorite={toggleFavorite} />
            </div>
          ))}

          {/* 남은 빈 칸 개수만큼 추가 카드 그리기 */}
          {emptyCards.map((_, index) => (
            <div key={`empty-${index}`} className="pointer-events-auto">
              <BrandItemCard
                isAddCard={true}
                isEditing={isEditing}
                onAddClick={() => setIsModalOpen(true)}
                onDelete={handleDeleteItem}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 💡 4. 페이지네이션 버튼 UI 추가 (총 페이지가 1보다 클 때만 보여줌) */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {/* 전체 페이지 수만큼 배열을 만들어서 점(Dot)을 그려줍니다. */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              aria-label={`${index + 1}페이지로 이동`}
              className={`size-2 rounded-full transition-colors duration-200 cursor-pointer ${
                currentPage === index + 1
                  ? "bg-blue-50"
                  : "bg-gray-20 hover:bg-gray-30"
              }`}
            />
          ))}
        </div>
      )}
      {isModalOpen && (
        <NewItemSearchModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InventoryStar;
