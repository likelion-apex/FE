import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BrandItemCard from "../../components/Inventory/BrandItemCard";
import axios from "axios";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import useAuthStore from "../../store/authStore";
// 인벤토리 조회 API 응답 목데이터

const InventoryStar = () => {
  const { setNavProps } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 페이지네이션을 위한 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // 한 페이지당 보여줄 개수

  //드래그 & 스와이프를 위한 상태 추가
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const [items, setItems] = useState([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  //즐찾 아이템 들고오기(토글 후 다시 불러오기 위해 useEffect 를 아래로내림)
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory/favorites`,
        {
          //조회개수 기본 20개
          params: { limit: 20 },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      setItems(response.data.data?.items || []);
    } catch (error) {
      console.error("즐겨찾기 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (accessToken) fetchFavorites();
  }, [accessToken]);

  //즐찾 추가/삭제
  const toggleFavorite = async (inventoryId, currentStatus) => {
    const newFavoriteStatus = !currentStatus;

    if (newFavoriteStatus === false) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.inventoryId !== inventoryId),
      );
    }

    try {
      // 💡 3. 명세서대로 확실한 데이터를 담아 백엔드에 요청합니다.
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory/${inventoryId}/favorite`,
        { isFavorite: newFavoriteStatus }, // 명세서 정답!
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      // 성공 시 이미 화면에서 지웠으므로 아무것도 안 해도 됩니다!
    } catch (error) {
      console.error("즐겨찾기 상태 변경에 실패했습니다.", error);
      // 🚨 만약 서버 오류로 실패했다면? 지웠던 카드를 다시 부활시킵니다.
      fetchFavorites();
    }
  };

  // 인벤토리 삭제 함수
  const handleDeleteItem = async (item) => {
    // 삭제 여부 확인
    if (!window.confirm(`${item.productName}을(를) 정말 삭제하시겠습니까?`))
      return;

    // 즉각 삭제
    setItems((prevItems) =>
      prevItems.filter((i) => i.inventoryId !== item.inventoryId),
    );

    try {
      // 2. 백엔드에 진짜 삭제 요청 보내기
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/inventory/${item.inventoryId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      // 성공하면 이미 화면에서 지웠으니 끝!
    } catch (error) {
      console.error("삭제에 실패했습니다.", error);
      alert("삭제 중 오류가 발생했습니다.");
      // 실패하면 몰래 지웠던 걸 다시 부활시킵니다.
      fetchFavorites();
    }
  };

  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "즐겨찾기",
      rightAction: {
        content: isEditing ? "완료" : "편집",
        onClick: () => setIsEditing((prev) => !prev),
        textColor: isEditing ? "text-red-40" : "text-blue-50",
      },
    });
  }, [setNavProps, isEditing]);

  // 현재 페이지에 보여줄 4개의 아이템만 잘라내기 로직
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // 전체 필터링된 리스트에서 현재 페이지의 4개면 빼오기
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  //빈 페이지(추가할 카드 생성)
  const emptyCardCount = ITEMS_PER_PAGE - currentItems.length;
  const emptyCards = Array.from({
    length: emptyCardCount > 0 ? emptyCardCount : 0,
  });

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
      <h3 className="mb-4 text-[18px] font-bold text-black">즐겨찾는 화장품</h3>

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
        {/* 💡 카드의 클릭(이동/추가)이 드래그를 방해하지 않도록 pointer-events-none을 줍니다 */}
        <div className="grid grid-cols-2 gap-4 pointer-events-none">
          {/* 1. 실제 데이터가 있는 화장품 카드 먼저 그리기 */}
          {currentItems.map((item) => (
            <div key={item.productId} className="pointer-events-auto">
              <BrandItemCard
                item={item}
                isEditing={isEditing}
                onToggleFavorite={toggleFavorite}
                onDelete={handleDeleteItem}
              />
            </div>
          ))}

          {/* 2. 남은 빈 칸 개수만큼 '추가하기' 카드 그리기 */}
          {emptyCards.map((_, index) => (
            <div key={`empty-${index}`} className="pointer-events-auto">
              <BrandItemCard
                isAddCard={true}
                onAddClick={() => setIsModalOpen(true)}
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
