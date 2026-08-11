import IngredientModal from "../components/Analysis/IngredientModal";
import { ROUTINE_BRIEFING_DATA, USER_NAME } from "../mocks/mockData";

//임시(목데이터 긁어옴)
const stepData = {
  modalDetails: {
    brand: "라운드랩",
    productName: "1025 독도 토너",
    volume: "200ml",
    category: "토너",
    score: 75,
    matchTitle: `${USER_NAME}님(민감성) 주의 필요`,
    reasons: [
      {
        id: 1,
        type: "danger",
        title: "민감성 피부, 각질 제거 성분 주의",
        desc: "HATCHING EX-07 성분이 포함되어 있어 매일 사용 시 피부 장벽이 얇아질 수 있어요.",
      },
    ],
    allIngredients: {
      composition: { low: 85, medium: 10, high: 5 },
      summary: { total: 18, caution20: 0, allergy: 0 },
      list: [
        {
          id: 1,
          risk: "1",
          riskType: "low",
          name: "정제수",
          purpose: "용제, 피부컨디셔닝제",
          effects: ["피부 보습"],
        },
        {
          id: 2,
          risk: "8",
          riskType: "high",
          name: "프로테아제",
          purpose: "피부컨디셔닝제, 각질제거제",
          effects: ["각질 제거", "피지 조절"],
        },
        {
          id: 3,
          risk: "1-2",
          riskType: "low",
          name: "부틸렌글라이콜",
          purpose: "피부컨디셔닝제, 용제",
          effects: ["강력 보습"],
        },
      ],
    },
  },
};

//여기로 누른 화장품의 데이터 보내주기(목데이터 파일 참고)
const ItemDetail = () => {
  const isModal = false;
  return (
    <div>
      <IngredientModal stepData={stepData} isModal={isModal} />
    </div>
  );
};

export default ItemDetail;
