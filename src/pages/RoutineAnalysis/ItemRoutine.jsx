import React from "react";
import ItemScore from "../../components/Analysis/ItemScore";
import RoutineItemCard from "../../components/Analysis/RoutineItemCard";
import { useState, useEffect } from "react";
import {
  PRODUCT_DATA,
  OPTIMIZE_SUMMARY_DATA,
  USER_NAME,
} from "../../mocks/mockData";
import TopNavbar from "../../components/layouts/TopNavbar";
import FinishModal from "../../components/Analysis/FinishModal";

const ItemRoutine = () => {
  // 탭 상태 관리 (0: 핵심 제품, 1: 대체품 탭)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // PRODUCT_DATA 안에서 대체품(replacement)을 가지고 있는 아이템만 필터링
  const alternatives = PRODUCT_DATA.filter((item) => item.replacement);

  //화면에 그릴 루틴 리스트를 결정하는 함수
  const getDisplayRoutine = () => {
    return PRODUCT_DATA.map((item) => {
      // 선택된 탭이 핵심 제품이 아니고(0보다 크고)), 이 아이템에 대체품 데이터가 존재한다면?
      if (selectedIndex > 0 && item.replacement) {
        // 기존 카드의 틀을 유지하면서, replacement 안의 내용물로 교체해서 반환
        return {
          ...item, // 기존 id, type(앰플 등)은 그대로 유지
          name: item.replacement.productName.replace(" ", "\n"), // "메디힐 수분 앰플" -> 줄바꿈 적용
          status: item.replacement.badgeType, // "replace"
          statusTitle: item.replacement.badgeText, // "대체 제품"
          statusDesc: item.replacement.reasonDesc, // 대체 상세 이유
        };
      }
      // 핵심 제품 탭이거나, 대체품이 없는 아이템은 원본 그대로 반환
      return item;
    });
  };

  const displayRoutine = getDisplayRoutine();

  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <TopNavbar step={3} totalSteps={4} stepName={""} />
      {/* 헤더 & 제목 부분 */}
      <header className="mb-6 mt-7">
        <h2 className="mb-2 text-[20px] font-semibold leading-snug">
          {USER_NAME}님의 인벤토리 제품을 참고해
          <br />
          안전하게 루틴을 구성했어요
        </h2>
        <p className="text-[14px] text-gray-60">
          자극적인 성분은 빼고, 찰떡궁합 시너지는 올리고!
        </p>
      </header>
      <div className="mb-7">
        <ItemScore data={OPTIMIZE_SUMMARY_DATA} />
      </div>
      <div className="flex flex-col">
        <div className="mb-5 text-black text-[16px] font-semibold">
          오늘 밤을 위한 안전한 {PRODUCT_DATA.length}단계 루틴
        </div>
        {/* 💡 4. 루틴 네비게이션 (대체품 개수에 맞춰 자동 생성) */}
        <div className="mb-5 flex items-end gap-8 border-b border-gray-100 pb-4">
          {/*  핵심 제품 탭 */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[12px] font-bold text-black">핵심 제품</span>
            <button
              onClick={() => setSelectedIndex(0)}
              className={`relative size-16 rounded-lg border-2 bg-gray-10 transition-all ${
                selectedIndex === 0
                  ? "border-violet-45"
                  : "border-gray-200 border"
              }`}
            >
              {selectedIndex === 0 && (
                <div className="absolute -bottom-[8px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-violet-45"></div>
              )}
            </button>
          </div>

          {/* 오른쪽: 대체품 탭 리스트 (alternatives 배열 길이만큼 자동 생성됨) */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-gray-60">
              대체 가능한 내 인벤토리 속 제품 ({alternatives.length})
            </span>
            <div className="flex gap-2">
              {alternatives.map((_, index) => {
                const altIndex = index + 1; // 핵심 제품이 0이므로, 대체품은 1번부터 시작
                //지금 택한 인덱스가 대체품이라면 true
                const isActive = selectedIndex === altIndex;

                return (
                  <button
                    key={altIndex}
                    onClick={() => setSelectedIndex(altIndex)}
                    className={`relative flex size-16 flex-col items-center justify-center rounded-lg border-2 bg-gray-10 transition-all ${
                      isActive ? "border-blue-50" : "border-gray-200 border"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -bottom-[8px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-blue-50"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 루틴 카드 리스트 (원본 or 교체된 데이터로 렌더링) */}
        <div className="flex flex-col gap-3">
          {/* displayRoutine */}
          {displayRoutine.map((item, index) => (
            <RoutineItemCard
              key={`${item.id}-${selectedIndex}`}
              // 탭이 바뀔 때 애니메이션이 부드럽도록 key값 변경(키 값만 바뀌면 택스트만 바뀌니까, 키값이 달라지는 듯이 인식되도록)
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* 5. 하단 고정 버튼 영역 */}
      <div className="flex flex-col gap-2 items-center justify-center w-full mb-5 mt-3">
        <button
          type="button"
          className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          이 안전한 루틴으로 오늘 케어하기
        </button>
      </div>

      {isModalOpen && (
        <FinishModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ItemRoutine;
