import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import useRoutineStore from "../../store/routineStore";
import { applyRoutineToToday } from "../../api/routine";

import RoutineScore from "../../components/Analysis/RoutineScore";
import RoutineAccordionItem from "../../components/Analysis/RoutineAccordionItem";
import Button from "../../components/Button";
import TopNavbar from "../../components/layouts/TopNavbar";
import MatchingCard from "../../components/Analysis/MatchingCard";
import ScoreGoal from "../../components/Use/ScoreGoal";

import trashboxIcon from "../../assets/icons/trashboxIcon.svg";

const RoutineDetail = () => {
  const { id } = useParams(); // URL에서 routineId 가져오기
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoutineDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/routines/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("루틴 상세 정보:", response.data.data);
        setRoutineData(response.data.data);
      } catch (error) {
        console.error("루틴 상세 정보를 불러오는 데 실패했습니다.", error);
        alert("루틴 정보를 불러올 수 없습니다.");
        navigate(-1); // 에러 시 이전 페이지로 돌려보냄
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRoutineDetail();
    }
  }, [id, accessToken, navigate]);

  //보관 루틴 삭제
  const handleDelete = async () => {
    // 확인창
    if (!window.confirm("보관함에서 이 루틴을 정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      // 2. DELETE API 호출 (명세서 이미지와 동일하게 구현)
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/routines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("삭제 완료:", response.data);
      alert("루틴이 성공적으로 삭제되었습니다.");

      navigate(-1);
    } catch (error) {
      console.error("루틴 삭제 실패:", error);
      alert("루틴 삭제 중 오류가 발생했습니다.");
    }
  };

  //오늘 루틴 적용
  const handleApplyToday = async () => {
    if (!window.confirm("이 루틴을 오늘의 루틴으로 설정하시겠습니까?")) {
      return;
    }

    try {
      const data = await applyRoutineToToday(id);

      useRoutineStore.getState().setRoutine(data);

      alert("오늘의 루틴으로 적용되었습니다!");
      console.log("적용 결과 데이터", data);
      navigate("/MyRoutine", { state: { activeTab: "데일리 루틴" } });
    } catch (error) {
      console.error("오늘의 루틴 적용 실패:", error);
      alert("루틴 적용 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
        <div className="mb-4 size-10 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
        <p className="text-[14px] text-gray-60">
          루틴 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!routineData) {
    return (
      <div className="p-10 text-center">루틴 정보를 찾을 수 없습니다.</div>
    );
  }

  const isDetailPage = true;
  const routineDeteilData = routineData.aiBriefing;

  console.log("스탭", routineData.steps);
  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <TopNavbar
        step={0}
        totalSteps={0}
        stepName={"루틴 상세"}
        rightAction={{
          content: <img src={trashboxIcon} alt="삭제" className="w-4 h-4" />,
          onClick: handleDelete,
        }}
      />
      <div className="flex-1 overflow-y-auto pb-[100px] pt-6 ">
        <div className="mb-6 flex justify-between px-5">
          <h2 className="text-[20px] font-semibold text-black">
            {routineDeteilData.title}
          </h2>
          <div className="flex items-center rounded-lg bg-blue-50 text-white px-2 py-1 text-[12px] font-bold">
            {routineDeteilData.tag}
          </div>
        </div>

        <div className="mb-8 bg-gray-05 shadow-card rounded-2xl">
          <div className="flex w-full flex-col gap-2 rounded-[24px] px-6 py-4">
            <ScoreGoal data={routineDeteilData} isRoutine={true} />
            <div className="text-[12px] text-gray-80">
              {routineDeteilData.summary}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {routineData.steps.map((step, index) => (
            <RoutineAccordionItem key={step.order} step={step} />
          ))}
        </div>
      </div>

      <div className="mb-5 flex w-full justify-center">
        {/* 하단 고정 버튼 */}
        <Button
          item={"이 루틴으로 시작하기"}
          bgColor={"blue-50"}
          textColor={"white"}
          borderColor={"blue-50"}
          onClick={handleApplyToday}
        />
      </div>
    </div>
  );
};

export default RoutineDetail;
