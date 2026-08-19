import React from "react";
import plusIconBlue from "../assets/icons/plusIcon_blue.svg";

const NoRoutineCard = ({ title = "현재 등록된 루틴이 없어요.", onClick }) => {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-[20px] border border-dashed border-gray-20 px-[60px] py-[36px]">
      <div className="flex w-full flex-col items-center gap-[36px]">
        <div className="flex w-full flex-col items-center">
          <p className="text-center text-[16px] leading-[28px] font-semibold text-blue-50">
            {title}
          </p>
          <p className="text-center text-[14px] leading-[18px] whitespace-nowrap text-gray-60">
            나만의 맞춤 스킨케어를 시작해 보세요.
          </p>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="flex cursor-pointer flex-col items-center gap-[20px]"
        >
          <div className="flex size-[56px] items-center justify-center rounded-full bg-blue-05">
            <img src={plusIconBlue} alt="" className="size-[28px]" />
          </div>
          <span className="text-center text-[16px] leading-[22px] font-semibold text-black">
            나의 루틴 만들기
          </span>
        </button>
      </div>
    </div>
  );
};

export default NoRoutineCard;
