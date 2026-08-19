import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";

import IngredientModal from "../../components/Analysis/IngredientModal";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const nickname = useUserStore((state) => state.nickname);

  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };

        // API 병렬 호출
        const [aiResponse, ingredientsResponse] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/inventory/${id}/ai-analysis`,
            { headers },
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/inventory/${id}/ingredients`,
            { headers },
          ),
        ]);

        const aiData = aiResponse.data.data;
        const ingData = ingredientsResponse.data.data;

        console.log("AI 분석:", aiData, "성분 리스트:", ingData);

        // API에서 가져온 데이터를 IngredientModal 구조에 맞게 조립
        const mappedData = {
          modalDetails: {
            displayBrand: "내 화장대 제품", // 브랜드
            displayProductName: aiData.productName,
            ingredientMarketOrVariant: "", //용량
            category: "",
            matchScore: aiData.score,
            matchTitle: `${nickname || "고객"}님 맞춤 분석 결과`,
            nickname: nickname,

            //AI 분석 데이터 매핑
            reasons: aiData.keywords.map((k, index) => ({
              id: index + 1,
              type: aiData.score >= 70 ? "safe" : "danger", //타입 필요
              title: k.keyword,
              description: k.reason,
            })),

            //전 성분 분석 데이터 매핑
            ingredientStats: {
              totalCount: ingData.ingredients.length,
              // 위험도/알레르기 정보 없음
              lowRiskCount: 0,
              moderateRiskCount: 0,
              highRiskCount: 0,
              unknownRiskCount: ingData.ingredients.length,
              caution20Count: 0,
              allergenCount: 0,
            },

            ingredients: ingData.ingredients.map((ing, index) => ({
              order: index + 1,
              name: ing.ingredientName,

              purposes: ing.purposes || [], //이부분 수정 필요
              risk: "-",
              riskType: "unknown", // 위험도 정보 없음
            })),
          },
        };

        setItemData(mappedData);
      } catch (error) {
        console.error("제품 상세 정보를 불러오지 못했습니다.", error);
        alert("정보를 불러올 수 없습니다.");
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id, accessToken, nickname, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="mb-4 size-10 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
      </div>
    );
  }

  if (!itemData) {
    return <div className="p-10 text-center">데이터가 없습니다.</div>;
  }

  return (
    <div>
      <IngredientModal stepData={itemData} isModal={false} />
    </div>
  );
};

export default ItemDetail;
