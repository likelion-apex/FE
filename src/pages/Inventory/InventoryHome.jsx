import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import InventoryHomeCard from "../../components/Inventory/InventoryHomeCard";
import plusIcon from "../../assets/icons/plusIcon.svg";
import soakImage from "../../assets/logo/soakImage.png";

import useAuthStore from "../../store/authStore";
import axios from "axios";
import useInventoryStore from "../../store/inventoryStore";
import useUserStore from "../../store/userStore";
import { getMyInventory } from "../../api/inventory";

//카테고리 명 사전
const CATEGORY_NAME_MAP = {
  ALL: "전체 화장품",
  SKIN_TONER: "스킨/토너",
  LOTION: "로션/에멀전",
  ESSENCE_SERUM: "에센스/앰플/세럼",
  FACEOIL: "페이스 오일",
  CREAM: "크림",
  EYECARE: "아이케어",
  MIST: "미스트/젤",
  SKIN_TONERPAD: "스킨/토너 패드",
  BAM: "밤/멀티밤",
  ETC: "기타",
};

const InventoryHome = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //zustand에서 리스트 및 저장함수 꺼내오기
  const inventoryList = useInventoryStore((state) => state.inventoryList);
  const setInventoryList = useInventoryStore((state) => state.setInventoryList);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const accessToken = useAuthStore((state) => state.accessToken);

  // 화면 렌더링 시 내 인벤토리 목록 전부 불러옴
  useEffect(() => {
    const fetchMyInventory = async () => {
      setIsLoading(true);
      try {
        const data = await getMyInventory();
        console.log("내 인벤토리 목록:", data);

        setInventoryList(data?.items || []); //인벤토리 아이템들 저장
        setTotalCount(data?.totalCount || 0); //전체 개수 저장
      } catch (error) {
        console.error("내 인벤토리 목록을 불러오는 데 실패했습니다.", error);
        setInventoryList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyInventory();
  }, [accessToken, setInventoryList]);

  const { setNavProps } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "인벤토리",
      rightAction: {
        content: isEditing ? "완료" : "편집",
        onClick: () => setIsEditing((prev) => !prev),

        textColor: isEditing ? "text-red-40" : "text-blue-50",
      },
    });
  }, [setNavProps, isEditing]);

  const favoriteItems = inventoryList.filter((item) => item.isFavorite);

  //제품 등록은 검색 기반 플로우로 진입

  const goToItemDetail = (inventoryId) => {
    navigate(`/inventory/item-detail/${inventoryId}`);
  };

  const categorizedList = Object.entries(
    inventoryList.reduce((acc, item) => {
      const categoryKey = item.category || "ETC";

      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(item);

      return acc;
    }, {}),
  ).map(([key, items]) => ({
    title: CATEGORY_NAME_MAP[key] || "기타", // CATEGORY_NAME_MAP["ESSENCE_SERUM"] -> "에센스/앰플/세럼"
    items: items,
  }));

  return (
    <div className="flex flex-col gap-6 px-[25px] pt-6 pb-6">
      <div className="flex flex-col gap-5 rounded-[20px] bg-gradient-to-br from-blue-50/60 to-white p-5 shadow-sm">
        {/* 상단 영역: 로고 + 텍스트 */}
        <div className="flex items-start gap-4">
          <img
            src={soakImage}
            alt="로고"
            className="size-[72px] shrink-0 object-contain"
          />

          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold  text-black">
              {nickname}님의 화장대에는
              <br />
              <span className="text-blue-50">{totalCount}개</span>의 제품이
              있어요
            </h2>

            <p className="mt-2 break-keep text-[12px] leading-[1.5] text-gray-80">
              새로운 제품이 있거나, 궁금한 제품은 언제든 인벤토리에 등록해서
              AI맞춤 정보를 확인해보세요.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-full bg-blue-50 py-4 text-[16px] text-white transition-colors hover:brightness-95 active:brightness-90"
        >
          새로운 제품 등록하기
        </button>
      </div>

      <div className="rounded-[20px] border border-gray-20 bg-white p-5 shadow-card">
        <InventoryHomeCard
          title="즐겨찾는 화장품"
          items={favoriteItems}
          showAddCard={false}
          onViewAll={() => navigate("/inventory/star")}
          onItemClick={goToItemDetail}
          isStarItem={true}
        />
      </div>

      {categorizedList.map((category) => (
        <InventoryHomeCard
          key={category.title}
          title={category.title}
          items={category.items}
          onViewAll={() => navigate("/inventory/library")}
          onItemClick={goToItemDetail}
          isStarItem={false}
        />
      ))}
      {isModalOpen && (
        <NewItemSearchModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InventoryHome;
