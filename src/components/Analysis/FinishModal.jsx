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

  const handleSaveRoutine = async (saveType) => {
    if (!analysisId) {
      alert("분석 ID를 찾을 수 없습니다.");
      return;
    }
    if (isSaving) return;
    setIsSaving(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}/apply`,
        {
          saveType: saveType,
          routineType: "NIGHT",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("저장 성공", response.data);

      if (saveType === "TODAY") {
        navigate("/MyRoutine", { state: { activeTab: "데일리 루틴" } });
      } else {
        navigate("/MyRoutine", { state: { activeTab: "내 루틴 보관함" } });
      }
    } catch (error) {
      console.error("루틴 저장 실패:", error);
      alert("루틴을 저장하는 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };
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
          <p className="font-bold">내 화장대 기반 맞춤 최적화 완료</p>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] font-semibold text-black">
              이 안전한 루틴으로 오늘 케어할까요?
            </p>
            <p className="text-[14px]  text-gray-80">
              저장 시 홈 화면의 '오늘의 데일리 루틴'에 바로 추가돼요.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-[20px]">
          <Button
            item={"이 루틴으로 오늘 시작하기"}
            bgColor={"blue-50"}
            textColor={"white"}
            borderColor={"border-blue-50"}
            onClick={() => handleSaveRoutine("TODAY")}
          />
          <Button
            item={"나의 루틴 보관함에 저장"}
            bgColor={"white"}
            textColor={"gray-60"}
            borderColor={"border-gray-20"}
            onClick={() => handleSaveRoutine("STORAGE")}
          />
        </div>
      </div>
    </div>
  );
};

export default FinishModal;
