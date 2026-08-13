import React from "react";

const ItemScore = ({ data }) => {
  return (
    <div className="rounded-2xl bg-gray-05 p-5">
      {/* 타이틀 및 매칭 점수 뱃지 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-black">
          {data.targetProduct}
        </h3>
        <span className="rounded-full bg-blue-05 px-2 py-1 text-[12px] font-bold text-blue-50">
          AI 매칭 점수 {data.matchScore}점
        </span>
      </div>

      <p className="mb-4 text-[14px] font-bold text-black">{data.title}</p>

      {/* 분석 리스트*/}
      <div className="mb-5 flex flex-col gap-2 text-[13px]">
        {data.analysisList.map((item) => (
          <div key={item.id} className="flex items-start gap-15">
            <div className="flex gap-2">
              <div className="size-[16px] shrink-0 rounded-sm bg-gray-400"></div>
              <span className="w-10 shrink-0 font-bold text-gray-60">
                {item.type}
              </span>
            </div>

            <span className="font-bold text-black">{item.desc}</span>
          </div>
        ))}
      </div>
      <div className="border border-gray-20 mb-3"></div>
      {/* 하단 요약 텍스트 (줄바꿈 \n 이 먹히도록 whitespace-pre-wrap 추가) */}
      <p className="text-[12px] leading-relaxed text-gray-80 whitespace-pre-wrap">
        {data.finalReview}
      </p>
    </div>
  );
};

export default ItemScore;
