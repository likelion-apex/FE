import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import useAuthStore from "../../store/authStore";
import axios from "axios";

const FinishModal = ({ onClose, analysisId }) => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isSaving, setIsSaving] = useState(false); // 💡 중복 클릭 방지용 상태

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
      className="fixed inset-y-0 left-1/2 z-[999] flex w-full max-w-[402px] -translate-x-1/2 flex-col justify-end bg-black/60 no-scrollbar"
      onClick={onClose}
    >
      <div
        className="flex h-[35vh] w-full flex-col rounded-t-[24px] bg-white px-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 text-blue-50 items-center mt-6 mb-7 text-[14px]">
          <p className="font-bold">나의 루틴 보관함에 저장 완료!</p>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] font-semibold text-black">
              내 루틴 보관함에서 확인해볼까요?
            </p>
            <p className="text-[14px]  text-gray-80">
              루틴 보관함에서 루틴을 골라 적용할 수 있어요.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-[20px]">
          <Button
            item={"내 루틴 보관함으로 가기"}
            bgColor={"blue-50"}
            textColor={"white"}
            borderColor={"border-blue-50"}
            onClick={() =>
              navigate("/MyRoutine", { state: { activeTab: "내 루틴 보관함" } })
            }
          />
          <Button
            item={"홈 화면으로 이동"}
            bgColor={"white"}
            textColor={"gray-60"}
            borderColor={"border-gray-20"}
            onClick={() => navigate("/main")}
          />
        </div>
      </div>
    </div>
  );
};

export default FinishModal;
