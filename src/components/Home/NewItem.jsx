import React from "react";
import plusIconBlue from "../../assets/icons/plusIcon_blue.svg";
import { useState } from "react"

const NewItem = ({ onClick }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className="border-1 border-gray-20 rounded-[20px] px-[12px] py-[12px] w-[142px] h-[185px] shrink-0 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={onClick}
              className="flex cursor-pointer flex-col items-center gap-[20px]"
            >
              <div className="flex size-[56px] items-center justify-center rounded-full bg-blue-05">
                <img src={plusIconBlue} alt="" className="size-[28px]" />
              </div>
              <button onClick={()=> setIsModalOpen(true)}className="text-center text-[16px] leading-[22px] font-semibold text-gray-40">
                새 제품 등록하기
              </button>
            </button>
          </div>
    )
}

export default NewItem;