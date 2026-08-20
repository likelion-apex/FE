import React, { useState, useEffect } from "react";
import IngredientReason from "../../components/Analysis/IngredientReason";
import Item from "../../components/Use/Item";
import IngredientInfo from "./IngredientInfo";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import Information from "../../assets/routine-analyze/Information.svg";
import kirakiraIcon from "../../assets/icons/kirakiraIcon.svg";
import ProductImage from "../ProductImage";

import { addInventoryItem } from "../../api/inventory";

const IngredientModal = ({
  onClose,
  stepData,
  isModal,
  analysisId,
  nickname,

  ToggleFavorite,
  onToggleInventory,
  isInInventory = true,
}) => {
  const [activeTab, setActiveTab] = useState("AI 맞춤 분석");
  const [localIsInInventory, setLocalIsInInventory] = useState(false);

  const [detailedData, setDetailedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  // 모달이 열릴 때 상세 API 호출
  useEffect(() => {
    // 숏폼이 아니라 제품 상세 정보일때는 로딩을 false처리 해줘야됨
    if (!analysisId) {
      setDetailedData(stepData?.modalDetails || stepData);
      setIsLoading(false);
      return;
    }

    // 숏폼에서 부른거라면 API 호출
    if (!stepData?.resultId) return;

    const fetchDetailedResult = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}/results/${stepData.resultId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("제품 상세 분석 결과:", response.data.data.result);
        setDetailedData(response.data.data.result);
      } catch (error) {
        console.error("상세 분석 결과를 불러오지 못했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedResult();
  }, [stepData, analysisId, accessToken]);

  //스크롤 방지 로직
  useEffect(() => {
    const scrollBox = document.getElementById("main-scroll-box");
    if (scrollBox && isModal) {
      scrollBox.style.overflow = "hidden";
    }
    return () => {
      if (scrollBox && isModal) {
        scrollBox.style.overflow = "auto";
      }
    };
  }, [isModal]);

  if (isLoading) {
    return (
      <div
        className={`flex w-full flex-col items-center justify-center bg-white ${isModal ? "rounded-t-[24px] h-[85vh]" : "min-h-screen"}`}
      >
        <div className="size-10 animate-spin rounded-full border-4 border-blue-50 border-t-transparent mb-4"></div>
        <p className="text-gray-60 text-[14px]">
          상세 데이터를 분석 중입니다...
        </p>
      </div>
    );
  }

  const data = detailedData;
  if (!data) return null;

  // 모달 전용 인벤토리 추가 로직
  const handleAddInventory = async (e) => {
    e.stopPropagation(); // 버튼 눌렀을 때 엉뚱한 이벤트 발생 방지

    if (localIsInInventory) {
      alert("이미 인벤토리에 등록된 제품입니다.");

      return;
    }

    const confirmAdd = window.confirm("이 제품을 인벤토리에 추가하시겠습니까?");
    if (!confirmAdd) return;

    try {
      await addInventoryItem({
        productName: data.displayProductName || stepData.productName,
      });
      alert("인벤토리에 성공적으로 등록되었습니다!");
      setLocalIsInInventory(true); // 버튼을 파란색(추가 완료)으로 변경
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 인벤토리에 등록되어 있는 제품입니다! 🪞");
        setLocalIsInInventory(true); // 이미 있으니 상태만 완료로 변경
      } else {
        alert("등록 중 오류가 발생했습니다.");
        console.error("인벤토리 등록 실패:", error);
      }
    }
  };

  return (
    <div
      className={`flex w-full flex-col bg-white overflow-hidden ${
        isModal ? "rounded-t-[24px] h-[85vh]" : "pb-[100px]"
      }`}
      onClick={isModal ? (e) => e.stopPropagation() : undefined}
    >
      {isModal ? (
        //모달일때
        <div className="relative flex w-full items-center justify-between px-5 pt-8 pb-6 shrink-0">
          {/* 1. 닫기(X) 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full bg-gray-10 text-[16px] font-bold text-gray-50 cursor-pointer"
          >
            ✕
          </button>

          {/* 2. 제품 썸네일 & 제품 정보 */}
          <div className="flex flex-1 items-center gap-3 pr-2">
            <div className="flex size-[64px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-gray-20 bg-white">
              {/* 유저님이 추가하신 ProductImage 적용! */}
              <ProductImage
                alt="제품 썸네일"
                category={data.category}
                imageUrl={data.imageUrl}
                className="h-full w-full object-cover p-1"
              />
            </div>
            <div className="flex-1">
              <Item data={data} />
            </div>
          </div>
          {/* 3. 인벤토리 버튼 */}
          <button
            onClick={handleAddInventory}
            className={`flex shrink-0 items-center justify-center rounded-[8px] px-3 py-[6px] text-[12px] font-bold transition-colors active:scale-95 z-10 ${
              localIsInInventory
                ? "bg-blue-50 text-white border border-blue-50"
                : "bg-white text-blue-50 border border-blue-50 hover:bg-blue-05"
            }`}
          >
            {localIsInInventory ? "인벤토리" : "+ 인벤토리"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {/* 이미지 삽입 필요 */}
          <div className="flex flex-col px-5 pt-6 pb-2">
            <div className="size-[360px] rounded-xl bg-gray-10 mb-8" />

            <div className="relative w-full">
              <div className="pr-24">
                <Item data={data} />
              </div>

              <div className="absolute right-0 top-[20px] flex items-center gap-2">
                <button
                  onClick={() =>
                    ToggleFavorite && ToggleFavorite(data.id, data.isFavorite)
                  }
                  className="cursor-pointer transition-transform active:scale-95"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={
                      data.isFavorite ? "#FFBB00" : "#CCD1D5"
                    } /* 즐찾 여부에 따라 파란색/회색 전환 */
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </button>

                <button
                  onClick={onToggleInventory}
                  className={`flex items-center justify-center rounded-[6px] px-[10px] py-[4px] text-[12px] font-bold shadow-sm cursor-pointer transition-colors active:scale-95 ${
                    isInInventory
                      ? "bg-blue-50 text-white hover:bg-blue-50"
                      : "bg-white text-blue-50 border border-blue-50 hover:bg-blue-05"
                  }`}
                >
                  {isInInventory ? "인벤토리" : "+ 인벤토리"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col px-5 min-h-0">
        {/* AI 매칭 점수 박스 */}
        <div className="mb-6 mt-2 flex items-center gap-3 rounded-2xl border border-blue-50 bg-blue-05 px-5 py-4 shrink-0">
          <div className="bg-blue-50 size-9 rounded-xl flex items-center justify-center">
            <img src={kirakiraIcon} alt="반짝이" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-50">
              {nickname}님 피부 맞춤
            </span>
            <span className="text-[16px] font-bold text-black">
              AI 매칭 점수 {data.matchScore}점
            </span>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex w-full justify-around border-b border-gray-20 shrink-0">
          {["AI 맞춤 분석", "전체 성분"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[16px] font-bold transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-60 hover:text-black hover:border-b-2 hover:border-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 영역 */}
        <div className="flex flex-1 flex-col pt-4 pb-6 overflow-y-auto no-scrollbar">
          {/* 탭 1. AI 맞춤 분석 */}
          {activeTab === "AI 맞춤 분석" && (
            <div className="flex flex-col">
              <h3 className="mb-4 text-[16px] font-bold text-black">
                이 제품이 {data.matchScore}점인 이유
              </h3>
              <div className="flex flex-col gap-3">
                {data.reasons?.map((reason) => (
                  <IngredientReason key={reason.order} reason={reason} />
                ))}
              </div>
            </div>
          )}

          {/* 탭 2. 전체 성분 */}
          {activeTab === "전체 성분" && <IngredientInfo data={data} />}
        </div>
      </div>
      {activeTab === "AI 맞춤 분석" ? (
        <div className="flex flex-col items-center text-center text-[11px] leading-tight text-gray-40">
          <img src={Information} alt="info" className="mb-1" />
          <p>
            AI가 성분, 프로필 정보를 바탕으로 분석했어요 <br />
            실사용 결과는 보장되지 않으니 제품 정보를 확인해 주세요
          </p>
        </div>
      ) : (
        <div></div>
      )}
      {isModal === true ? (
        <div className="px-5 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-black py-3 text-[18px] font-bold text-white cursor-pointer"
          >
            확인
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default IngredientModal;
