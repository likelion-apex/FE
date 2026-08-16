import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewItemSearchModal from "../../components/Inventory/NewItemSearchModal";
import InventoryHomeCard from "../../components/Inventory/InventoryHomeCard";
import { USER_NAME } from "../../mocks/mockData";
import plusIcon from "../../assets/icons/plusIcon.svg";
import soakImage from "../../assets/logo/soakImage.png";

//임시 데이터 (인벤토리 API 연동 전)
const FAVORITE_ITEMS = [
  { productId: 1, productName: "어성초 진정 패드", tag: "결 정돈" },
  { productId: 2, productName: "비타민 C 앰플", tag: "항산화/미백" },
  { productId: 3, productName: "시카 장벽 크림", tag: "장벽 보호" },
  { productId: 4, productName: "레티놀 크림", tag: "나이트 케어" },
  { productId: 5, productName: "히알루론 에센스", tag: "속건조 해결" },
  { productId: 6, productName: "무기자차 선크림", tag: "자외선 차단" },
];

const CATEGORIES = [
  {
    Id: "toner",
    title: "스킨/토너",
    items: [
      { productId: 1, productName: "어성초 진정 패드", tag: "결 정돈" },
      { productId: 2, productName: "비타민 C 앰플", tag: "항산화/미백" },
      { productId: 3, productName: "시카 장벽 크림", tag: "장벽 보호" },
    ],
  },
  {
    Id: "lotion",
    title: "로션/에멀전",
    items: [
      { productId: 4, productName: "어성초 진정 패드", tag: "결 정돈" },
      { productId: 5, productName: "비타민 C 앰플", tag: "항산화/미백" },
      { productId: 6, productName: "시카 장벽 크림", tag: "장벽 보호" },
    ],
  },
  {
    Id: "essence",
    title: "에센스/앰플/세럼",
    items: [
      { productId: 7, productName: "어성초 진정 패드", tag: "결 정돈" },
      { productId: 8, productName: "비타민 C 앰플", tag: "항산화/미백" },
      { productId: 9, productName: "시카 장벽 크림", tag: "장벽 보호" },
      { productId: 10, productName: "레티놀 크림", tag: "나이트 케어" },
    ],
  },
];

const InventoryHome = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCount = CATEGORIES.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepproductName: "인벤토리",
      rightAction: {
        content: "편집",
      },
    });
  }, [setNavProps]);

  //제품 등록은 검색 기반 플로우로 진입

  const goToItemDetail = (item) =>
    navigate(`/inventory/item-detail/${item.productId}`);

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

        {/* 하단 영역: 꽉 차는 둥근 버튼 */}
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
          items={FAVORITE_ITEMS}
          showAddCard={false}
          onViewAll={() => navigate("/inventory/star")}
          onItemClick={goToItemDetail}
          isStarItem={true}
        />
      </div>

      {CATEGORIES.map((category) => (
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
