import React from "react";
import CreateRoutineButton from "./CreateRoutineButton";

const EmptyRoutineCard = ({ onClick }) => {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-[20px] border border-dashed border-gray-20 px-[60px] py-[36px]">
      <div className="flex w-full flex-col items-center gap-[36px]">
        <div className="flex w-full flex-col items-center">
          <p className="text-center text-[16px] leading-[28px] font-semibold text-blue-50">
            루틴 등록이 필요해요.
          </p>
          <p className="text-center text-[14px] leading-[18px] whitespace-nowrap text-gray-60">
            나만의 맞춤 스킨케어를 시작해 보세요.
          </p>
        </div>

        <CreateRoutineButton onClick={onClick} />
      </div>
    </div>
  );
};

export default EmptyRoutineCard;
