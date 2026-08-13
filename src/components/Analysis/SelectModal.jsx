import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 상위 컴포넌트에서 모달을 닫기 위해 onClose 프롭스를 받습니다.
const AnalyzeOptionModal = ({ onClose }) => {
  const navigate = useNavigate();

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

  // 리스트 항목 클릭 시 실행되는 함수
  const handleOptionClick = (type) => {
    if (type === full) {
      navigate("/RoutineAnalysis/Smartloading");
    }
  };

  return (
    // 뒷배경 (클릭 시 모달 닫힘)
    <div
      className="fixed inset-y-0 left-1/2 z-[999] flex w-full max-w-[402px] -translate-x-1/2 flex-col justify-end bg-black/60 no-scrollbar"
      onClick={onClose}
    >
      {/* 모달 본문 (이곳을 클릭해도 모달이 닫히지 않도록 이벤트 전파 중단) */}
      <div
        className="relative flex w-full flex-col rounded-t-[24px] bg-white px-6 pb-[40px] pt-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 우측 상단 X(닫기) 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-80 transition-colors hover:bg-gray-200"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 헤더 텍스트 영역 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[14px] font-bold text-blue-50 mb-3">
            루틴 분석할 준비 완료!
          </span>
          <h2 className=" text-[20px] font-bold text-black mb-2">
            어떤 방식으로 분석할까요?
          </h2>
          <p className="text-[14px] text-gray-80">
            영상 내용에 맞는 분석 방식을 선택해 주세요.
          </p>
        </div>

        {/* 선택 리스트 영역 */}
        <div className="mt-10 flex flex-col">
          {/* 옵션 1: 전체 스킨케어 루틴 분석 */}
          <div
            className="flex cursor-pointer items-center gap-4 pb-4 transition-colors "
            onClick={() => handleOptionClick("full")}
          >
            {/* 회색 네모 아이콘 영역 (디자인 시안 컬러 적용) */}
            <div className="h-[52px] w-[52px] shrink-0 rounded-xl bg-gray-40"></div>

            <div className="flex flex-1  flex-col">
              <span className="text-[16px] font-bold text-black">
                전체 스킨케어 루틴 분석
              </span>
              <span className="mt-1 text-[12px] text-gray-80 leading-snug">
                영상 속 4단계 루틴 전체를 내 피부에 맞춰 분석해요.
              </span>
            </div>

            {/* 우측 화살표 아이콘 */}
            <svg
              className="h-5 w-5 shrink-0 text-gray-40 hover:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* 리스트 사이 구분선 */}
          <div className="my-1 h-[1px] w-full bg-gray-200"></div>

          {/* 핵심 제품 분석 */}
          <div
            className="flex cursor-pointer items-center gap-4 py-4 transition-colors "
            onClick={() => handleOptionClick("core")}
          >
            {/* 회색 네모 아이콘 영역 */}
            <div className="h-[52px] w-[52px] shrink-0 rounded-xl bg-gray-40"></div>

            <div className="flex flex-1 flex-col">
              <span className="text-[16px] font-bold text-black ">
                핵심 제품 분석
              </span>
              <span className="mt-1 text-[12px] text-gray-80 leading-snug">
                영상 속 핵심 제품을 내 화장대와 조합해요.
              </span>
            </div>

            {/* 우측 화살표 아이콘 */}
            <svg
              className="h-5 w-5 shrink-0 text-gray-40 hover:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeOptionModal;
