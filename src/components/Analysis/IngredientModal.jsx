import React, { useState, useEffect } from "react";
import IngredientReason from "../../components/Analysis/IngredientReason";

import TopNavbar from "../layouts/TopNavbar";
import Item from "../../components/Use/Item";
import IngredientInfo from "./IngredientInfo";

const IngredientModal = ({ onClose, stepData, isModal }) => {
  const data = stepData?.modalDetails || stepData;
  const [activeTab, setActiveTab] = useState("AI 맞춤 분석");

  if (!data) return null;

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

  return (
    <div
      className={`flex w-full flex-col bg-white overflow-hidden ${
        isModal ? "rounded-t-[24px] h-[85vh]" : "min-h-screen pb-[100px]"
      }`}
      onClick={isModal ? (e) => e.stopPropagation() : undefined}
    >
      {isModal ? (
        <div className="flex items-start justify-between px-5 py-6 shrink-0">
          <div className="flex gap-4">
            <div className="size-[64px] shrink-0 rounded-xl bg-gray-40" />
            <Item data={data} />
          </div>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-gray-10 text-[23px] font-bold text-gray-60 cursor-pointer"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <TopNavbar step={0} totalSteps={0} stepName={""} />
          <div className="flex flex-col px-5 pt-6 pb-2">
            <div className="size-[360px] rounded-xl bg-gray-10 mb-14" />
            <Item data={data} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col px-5 min-h-0">
        {/* AI 매칭 점수 박스 */}
        <div className="mb-6 mt-2 flex items-center gap-3 rounded-2xl border border-blue-50 bg-blue-05 px-5 py-4 shrink-0">
          <div className="size-9 shrink-0 rounded-lg bg-gray-40" />
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-50">
              {data.matchTitle}
            </span>
            <span className="text-[16px] font-bold text-black">
              AI 매칭 점수 {data.score}점
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
                이 제품이 {data.score}점인 이유
              </h3>
              <div className="flex flex-col gap-3">
                {data.reasons.map((reason) => (
                  <IngredientReason key={reason.id} reason={reason} />
                ))}
              </div>
            </div>
          )}

          {/* 탭 2. 전체 성분 */}
          {activeTab === "전체 성분" && data.allIngredients && (
            <IngredientInfo data={data} />
          )}
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
