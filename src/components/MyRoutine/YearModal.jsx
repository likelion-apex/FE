import React from "react";

const YearModal = ({
  yearList,
  tempYear,
  setTempYear,
  setIsYearModalOpen,
  handleYearConfirm,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
      onClick={() => setIsYearModalOpen(false)}
    >
      <div
        className="flex w-full max-w-[320px] flex-col items-center rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-6 text-[18px] font-bold text-black">
          원하시는 연도를 선택하세요
        </h3>

        {/* 연도 그리드 (2열) */}
        <div className="grid w-full grid-cols-2 gap-y-6 text-center text-[14px] font-medium text-gray-60 mb-8">
          {yearList.map((year) => (
            <div
              key={year}
              className="flex justify-center cursor-pointer"
              onClick={() => setTempYear(year)}
            >
              <span
                className={`px-4 py-1.5 rounded-full transition-colors ${
                  tempYear === year ? "bg-blue-50 text-white font-bold" : ""
                }`}
              >
                {year}
              </span>
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="flex w-full justify-end gap-6 text-[16px] font-semibold text-gray-60 pr-2">
          <button onClick={() => setIsYearModalOpen(false)}>취소</button>
          <button onClick={handleYearConfirm} className="text-blue-50">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearModal;
