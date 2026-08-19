import React from "react";
import plusIconBlue from "../assets/icons/plusIcon_blue.svg";

const NoRoutineCard = ({ onClick }) => {
  return (
    <div className="border-1 border-dashed border-gray-20 rounded-[20px] px-[60px] py-[36px]">
      <h3 className="flex flex-col items-center justify-center text-blue-50 text-[16px] font-semibold">
        {" "}
        루틴 등록이 필요해요{" "}
      </h3>
      <p className="flex flex-col items-center justify-center text-gray-60 text-[14px]">
        {" "}
        나만의 맞춤 스킨케어를 시작해보세요{" "}
      </p>
      <div className="flex flex-col items-center justify-center pt-[36px]">
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
