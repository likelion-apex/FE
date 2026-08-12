import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import InventoryHomeCard from "../../components/Inventory/InventoryHomeCard";
import { USER_NAME } from "../../mocks/mockData";
import plusIcon from "../../assets/icons/plusIcon.svg";

//임시 데이터 (인벤토리 API 연동 전)
const FAVORITE_ITEMS = [
  { id: 1, name: "어성초 진정 패드", tag: "결 정돈" },
  { id: 2, name: "비타민 C 앰플", tag: "항산화/미백" },
  { id: 3, name: "시카 장벽 크림", tag: "장벽 보호" },
  { id: 4, name: "레티놀 크림", tag: "나이트 케어" },
  { id: 5, name: "히알루론 에센스", tag: "속건조 해결" },
  { id: 6, name: "무기자차 선크림", tag: "자외선 차단" },
];

const CATEGORIES = [
  {
    id: "toner",
    title: "스킨/토너",
    items: [
      { id: 1, name: "어성초 진정 패드", tag: "결 정돈" },
      { id: 2, name: "비타민 C 앰플", tag: "항산화/미백" },
      { id: 3, name: "시카 장벽 크림", tag: "장벽 보호" },
    ],
  },
  {
    id: "lotion",
    title: "로션/에멀전",
    items: [
      { id: 4, name: "어성초 진정 패드", tag: "결 정돈" },
      { id: 5, name: "비타민 C 앰플", tag: "항산화/미백" },
      { id: 6, name: "시카 장벽 크림", tag: "장벽 보호" },
    ],
  },
  {
    id: "essence",
    title: "에센스/앰플/세럼",
    items: [
      { id: 7, name: "어성초 진정 패드", tag: "결 정돈" },
      { id: 8, name: "비타민 C 앰플", tag: "항산화/미백" },
      { id: 9, name: "시카 장벽 크림", tag: "장벽 보호" },
      { id: 10, name: "레티놀 크림", tag: "나이트 케어" },
    ],
  },
];

const InventoryHome = () => {
  const navigate = useNavigate();

  const totalCount = CATEGORIES.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "인벤토리",
      rightAction: {
        content: "편집",
      },
    });
  }, [setNavProps]);

  //제품 등록은 검색 기반 플로우로 진입
  const goToRegister = () => navigate("/inventory/search");
  const goToItemDetail = (item) => navigate(`/inventory/item-detail/${item.id}`);

  return (
    <div className="flex flex-col gap-6 px-[25px] pt-6 pb-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl leading-7 font-semibold text-black">
          {USER_NAME}님의 화장대에는
          <br />
          <span className="text-blue-50">{totalCount}개</span>의 제품이 있어요
        </h2>

        <button
          type="button"
          onClick={goToRegister}
          className="flex flex-col items-start gap-1"
        >
          <img src={plusIcon} alt="" className="size-10" />
          <span className="text-sm leading-7 text-gray-60">
            새로운 제품 등록하기
          </span>
        </button>
      </div>

      <div className="rounded-[20px] border border-gray-20 bg-white p-5">
        <InventoryHomeCard
          title="즐겨찾는 화장품"
          items={FAVORITE_ITEMS}
          showAddCard={false}
          onViewAll={() => navigate("/inventory/star")}
          onItemClick={goToItemDetail}
        />
      </div>

      {CATEGORIES.map((category) => (
        <InventoryHomeCard
          key={category.id}
          title={category.title}
          items={category.items}
          onViewAll={() => navigate("/inventory/library")}
          onAddClick={goToRegister}
          onItemClick={goToItemDetail}
        />
      ))}
    </div>
  );
};

export default InventoryHome;
