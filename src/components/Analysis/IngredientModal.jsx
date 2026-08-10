import React, { useState, useEffect } from "react";
import IngredientReason from "../../components/Analysis/IngredientReason";
import Information from "../../assets/routine-analyze/Information.svg";
import SolventItem from "./SolventItem";

const AnalyzeModal = ({ onClose, stepData }) => {
  const data = stepData?.modalDetails;
  //탭 두개로 나누기
  const [activeTab, setActiveTab] = useState("AI 맞춤 분석");

  if (!data) return null;

  useEffect(() => {
    const scrollBox = document.getElementById("main-scroll-box");

    if (scrollBox) {
      // 모달이 열리면 이 박스의 스크롤을 막음
      scrollBox.style.overflow = "hidden";
    }

    return () => {
      if (scrollBox) {
        // 모달이 닫히면 다시 스크롤되도록 풀어줌
        scrollBox.style.overflow = "auto";
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 items-center"
      onClick={onClose}
    >
      <div
        className="flex h-[100vh] w-full flex-col rounded-t-[24px] bg-white px-[22px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 헤더 영역 */}
        <div className="flex items-start justify-between py-6">
          <div className="flex gap-4">
            <div className="size-[64px] shrink-0 rounded-xl bg-gray-40" />
            <div className="flex h-[64px] flex-col">
              <span className="text-[12px] font-medium text-gray-60">
                {data.brand}
              </span>
              <h2 className="text-[16px] font-bold text-black">
                {data.productName}
              </h2>
              <div className="flex gap-1 mt-auto">
                <span className="rounded bg-gray-10 px-2 py-1 text-[10px] text-gray-60 font-bold">
                  {data.volume}
                </span>
                <span className="rounded bg-gray-10 px-2 py-1  text-[10px] text-gray-60 font-bold">
                  {data.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-gray-10 text-gray-60 text-[23px] font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* AI 매칭 점수 박스 */}
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-blue-50 bg-blue-05 px-5 py-4">
          <div className="size-9 shrink-0 rounded-lg bg-gray-400" />
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
        <div className="flex border-b border-gray-20 px-10 gap-24">
          {["AI 맞춤 분석", "전체 성분"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-[16px] font-bold ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-60 hover:text-black hover:border-b-2 hover:border-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 💡 탭에 따른 컨텐츠 렌더링 영역 */}
        <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar pt-4">
          {/* 탭 1. AI 맞춤 분석 */}
          {activeTab === "AI 맞춤 분석" && (
            <div className="flex flex-1 flex-col">
              <h3 className="mb-4 text-[16px] font-bold">
                이 제품이 {data.score}점인 이유
              </h3>
              <div className="flex flex-col gap-3">
                {data.reasons.map((reason) => (
                  <IngredientReason key={reason.id} reason={reason} />
                ))}
              </div>

              {/* 💡 mt-auto를 주면 위쪽 내용물이 짧아도 항상 맨 아래로 밀려납니다. 여백(pb-4 등)을 조금 더 주면 예쁩니다. */}
              <div className="mt-auto pb-2 flex flex-col items-center pt-8 text-center text-[11px] leading-tight text-gray-40">
                <img src={Information} alt="info" className="mb-1" />
                <p>
                  AI가 성분, 프로필 정보를 바탕으로 분석했어요 <br />
                  실사용 결과는 보장되지 않으니 제품 정보를 확인해 주세요
                </p>
              </div>
            </div>
          )}

          {/* 탭 2. 전체 성분 */}
          {activeTab === "전체 성분" && data.allIngredients && (
            <div className="flex flex-col">
              {/* 1. 성분 구성 그래프 */}
              <div className="mb-4">
                <h3 className="mb-4 text-[15px] text-black">성분 구성</h3>

                {/* 데이터가 0보다 클 때만 범례 렌더링 */}
                <div className="mb-2 flex items-center gap-3 text-[12px] text-gray-500">
                  {data.allIngredients.composition.low > 0 && (
                    <span className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-50" />
                      1-2 낮은 위험
                    </span>
                  )}
                  {data.allIngredients.composition.medium > 0 && (
                    <span className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-yellow-50a" />
                      3-6 중간 위험
                    </span>
                  )}
                  {data.allIngredients.composition.high > 0 && (
                    <span className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-red-40" />
                      7-10 높은 위험
                    </span>
                  )}
                </div>

                {/* 막대 그래프 바 */}
                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    style={{ width: `${data.allIngredients.composition.low}%` }}
                    className="bg-blue-50"
                  />
                  <div
                    style={{
                      width: `${data.allIngredients.composition.medium}%`,
                    }}
                    className="bg-yellow-50a"
                  />
                  <div
                    style={{
                      width: `${data.allIngredients.composition.high}%`,
                    }}
                    className="bg-red-40"
                  />
                </div>
              </div>

              {/* 2. 요약 리스트 */}
              <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-6 text-[14px]">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-gray-60">전체 성분</span>
                  <span className="font-bold text-gray-60">
                    {data.allIngredients.summary.total}개
                  </span>
                </div>
                <div className="flex items-center justify-between text-[14px] text-gray-30">
                  <span className="flex items-center gap-2.5">
                    <div className="size-5 rounded-[6px] bg-gray-20" />
                    20가지 주의성분
                  </span>
                  <span>{data.allIngredients.summary.caution20}개</span>
                </div>
                <div className="flex items-center justify-between text-[14px] text-gray-30">
                  <span className="flex items-center gap-2.5">
                    <div className="size-5 rounded-[6px] bg-gray-20" />
                    알레르기 주의성분
                  </span>
                  <span>{data.allIngredients.summary.allergy}개</span>
                </div>
              </div>

              {/* 3. 전성분 상세 리스트 */}
              <div>
                <div className="mb-4 flex items-end justify-between pb-2">
                  <span className="text-[14px] font-bold text-gray-900">
                    전성분{" "}
                    <span className="text-[#00C4FE]">
                      {data.allIngredients.summary.total}개
                    </span>
                  </span>
                  <div className="flex items-center gap-1 text-[12px] text-gray-40">
                    <img src={Information} alt="info" />
                    <p>함량이 높은 순서로 보여집니다</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pb-3">
                  {data.allIngredients.list.map((ing) => (
                    <SolventItem key={ing.id} ing={ing} />
                  ))}
                </div>
              </div>

              {/* 하단 고지사항 */}
              <div className="break-keep rounded-xl bg-gray-05 p-4 text-[12px] leading-relaxed text-gray-40 whitespace-pre-line ">
                구매 전 제조·판매업자가 표기한 전성분 표를 한 번 더 확인하시길
                권장드립니다.
                <br />
                제품허위 정보를 허가 없이 상업적으로 활용할 경우, 법적 조치를
                받을 수 있습니다.
                <br />
                성분별 해당 제품 내 배합 비율은 브랜드사에서 제공한 정보로 모든
                책임은 브랜드사에 있습니다.
              </div>
            </div>
          )}
        </div>

        {/* 하단 확인 버튼 */}
        <div className="pt-2 pb-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-black py-3 text-[18px] font-bold text-white cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeModal;
