import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";
import {
  getInventoryDetail,
  getInventoryIngredients,
  updateFavorite,
  deleteInventoryItem,
  addInventoryItem,
} from "../../api/inventory";

import IngredientModal from "../../components/Analysis/IngredientModal";
import { m } from "framer-motion";

const ItemDetail = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const nickname = useUserStore((state) => state.nickname);

  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInInventory, setIsInInventory] = useState(true); //인벤 상태 관리
  const [currentId, setCurrentId] = useState(inventoryId); // 추가/삭제를 반복할 경우 id가 달라지므로 이를 관리해야됨

  //수정
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const [aiData, ingData] = await Promise.all([
          getInventoryDetail(inventoryId),
          getInventoryIngredients(inventoryId),
        ]);

        console.log("AI 분석:", aiData, "성분 리스트:", ingData);

        // API에서 가져온 데이터를 IngredientModal 구조에 맞게 조립
        const mappedData = {
          modalDetails: {
            inventoryId: inventoryId,

            displayBrand: "내 화장대 제품", // 브랜드
            displayProductName: aiData.productName,
            ingredientMarketOrVariant: "", //용량
            category: "",
            matchScore: aiData.score,
            matchTitle: `${nickname || "고객"}님 맞춤 분석 결과`,
            nickname: nickname,
            brand: ingData.brand,
            isFavorite: aiData.isFavorite,
            imageUrl: aiData.imageUrl,

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
              lowRiskCount: ingData.riskDistribution.low,
              moderateRiskCount: ingData.riskDistribution.medium,
              highRiskCount: ingData.riskDistribution.high,
              unknownRiskCount: 0,
              caution20Count: ingData.caution20Count,
              allergenCount: ingData.allergyCount,
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

        console.log("필드명 매핑", mappedData);
        setItemData(mappedData);
      } catch (error) {
        console.error("제품 상세 정보를 불러오지 못했습니다.", error);
        alert("정보를 불러올 수 없습니다.");
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    if (inventoryId) {
      fetchItemDetails();
    } else {
      console.error("URL에서 inventoryId를 찾을 수 없습니다.");
      setIsLoading(false);
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, [inventoryId, accessToken, nickname, navigate]);

  // 즐겨찾기 추가/삭제
  const handleToggleFavorite = async () => {
    if (!itemData?.modalDetails) return;

    try {
      // modalDetails 안쪽의 isFavorite 값을 반전
      const newStatus = !itemData.modalDetails.isFavorite;
      await updateFavorite(currentId, newStatus);

      setItemData((prev) => ({
        ...prev,
        modalDetails: {
          ...prev.modalDetails,
          isFavorite: newStatus,
        },
      }));
    } catch (error) {
      console.error("즐겨찾기 상태 변경에 실패했습니다.", error);
      alert("변경에 실패했습니다. 다시 시도해주세요!");
    }
  };

  // 인벤토리 삭제 로직
  const handleToggleInventory = async () => {
    const confirmDelete = window.confirm(
      "이 제품을 인벤토리에서 삭제하시겠습니까?",
    );
    if (!confirmDelete) return;

    try {
      await deleteInventoryItem(inventoryId);

      navigate(-1);
    } catch (error) {
      console.error("인벤토리 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-5 pb-20">
        <div className="mb-6 size-12 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
        <h3 className="mb-2 text-[18px] font-bold text-black text-center">
          제품 상세 정보를 불러오고 있어요. <br /> 잠시만 기다려주세요!
        </h3>
      </div>
    );
  }

  if (!itemData) {
    return <div className="p-10 text-center">데이터가 없습니다.</div>;
  }

  return (
    <div>
      <IngredientModal
        stepData={itemData}
        isModal={false}
        nickname={nickname}
        ToggleFavorite={handleToggleFavorite}
        isInInventory={isInInventory}
        onToggleInventory={handleToggleInventory}
      />
    </div>
  );
};

export default ItemDetail;
