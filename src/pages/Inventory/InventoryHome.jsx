import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import InventoryHomeCard from "../../components/Inventory/InventoryHomeCard";
import { USER_NAME } from "../../mocks/mockData";
import plusIcon from "../../assets/icons/plusIcon.svg";
import soakImage from "../../assets/logo/soakImage.png";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import useInventoryStore from "../../store/inventoryStore";

//카테고리 명 사전
const CATEGORY_NAME_MAP = {
  SKIN_TONER: "스킨/토너",
  SERUM: "세럼/앰플",
  CREAM: "크림",
  ESSENCE: "에센스",
  LOTION: "로션/에멀전",
  SUNCREAM: "선케어",
  CLEANSER: "클렌징",
  MASK: "마스크/팩",
  ETC: "기타",
};

/*const CATEGORIES = [
  { id: "ALL", name: "전체 화장품" },
  { id: "SKIN_TONER", name: "스킨/토너" },
  { id: "LOTION", name: "로션/에멀전" },
  { id: "ESSENCE", name: "에센스/앰플/세럼" },
  { id: "FACEOIL", name: "페이스 오일" },
  { id: "CREAM", name: "크림" },
  { id: "EYECARD", name: "아이케어" }, // 💡 백엔드 키값이 EYECARD가 맞는지 한번 체크해보시면 좋습니다! (보통 EYECARE를 많이 씁니다)
  { id: "MIST", name: "미스트·젤" },
  { id: "MASK", name: "마스크/팩" },
  { id: "ETC", name: "기타" },
];*/
const InventoryHome = () => {
  const navigate = useNavigate();

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
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/inventory`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("내 인벤토리 목록.", response.data.data);
        const data = response.data.data;

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

  const goToItemDetail = (item) =>
    navigate(`/inventory/item-detail/${item.productId}`);

  const categorizedList = Object.entries(
    inventoryList.reduce((acc, item) => {
      // 백엔드에서 category 값이 안 오면 ETC로 분류
      const categoryKey = item.category || "ETC";

      // 해당 카테고리 내 제품이 없다면 없으면 빈 배열로 만들어줍니다.
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      // 해당 방에 아이템을 쏙 넣어줍니다.
      acc[categoryKey].push(item);

      return acc;
    }, {}),
  ).map(([key, items]) => ({
    //배열 형태로 변환
    title: CATEGORY_NAME_MAP[key] || key, // 한국어로 변환 (사전에 없으면 영문 그대로 노출)
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
              {USER_NAME}님의 화장대에는
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
          key={category.productId}
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
