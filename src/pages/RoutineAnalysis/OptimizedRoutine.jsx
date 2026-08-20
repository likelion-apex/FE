import { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import RoutineAccordionItem from "../../components/Analysis/RoutineAccordionItem";
import FinishModal from "../../components/Analysis/FinishModal";
import useUserStore from "../../store/userStore";
import TopNavbar from "../../components/layouts/TopNavbar";
import MatchingCard from "../../components/Analysis/MatchingCard";

import axios from "axios";
import useAuthStore from "../../store/authStore";
import { addInventoryItem } from "../../api/inventory";

const OptimizedRoutine = () => {
  const isDetailPage = false;
  const nickname = useUserStore((state) => state.nickname);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const analysisId = location.state?.analysisId;

  // 백엔드에서 받아올 최적화 데이터 상태
  const [optimizedData, setOptimizedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!analysisId) {
      alert("잘못된 접근입니다.");

      navigate(-1);
      return;
    }
    //내 인벤토리 기반 최적화
    const fetchOptimizedRoutine = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}/optimize`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log("최적화 완료 데이터:", response.data.data.result);
        setOptimizedData(response.data.data.result);
      } catch (error) {
        console.error("루틴 최적화 실패:", error);
        alert("루틴 최적화 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptimizedRoutine();
  }, [analysisId, accessToken, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-5 pb-20">
        <div className="mb-6 size-12 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
        <h3 className="mb-2 text-[18px] font-bold text-black text-center">
          AI가 루틴을 최적화하고 있어요
        </h3>
        <p className="text-[14px] text-gray-60 text-center break-keep">
          {nickname}님의 인벤토리 제품과 비교하여
          <br />
          가장 안전한 피부 관리 조합을 찾는 중입니다...
        </p>
      </div>
    );
  }

  if (!optimizedData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <p className="text-[15px] text-gray-60">
          데이터를 불러오지 못했습니다.
        </p>
        <button
          onClick={() => navigate("/RoutineAnalysis")}
          className="mt-4 px-4 py-2 bg-blue-50 text-white rounded-lg"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <TopNavbar step={3} totalSteps={4} stepName={""} />
      <div className="flex-1 overflow-y-auto pb-[100px] mt-7">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="break-keep text-[22px] font-semibold  leading-snug text-black">
            {nickname}님의 인벤토리 제품으로
            <br />
            안전하게 루틴을 재구성했어요
          </h1>
          <p className="text-[13px] text-gray-60">
            자극적인 성분은 빼고, 역할이 같은 제품으로!
          </p>
        </div>

        <MatchingCard data={optimizedData} />

        {/* 아코디언 리스트 섹션 */}
        <div>
          <h2 className="mb-6 text-[16px] font-semibold text-gray-900">
            오늘 밤을 위한 안전한 {optimizedData.steps.length}단계 루틴
          </h2>
          <div className="flex flex-col gap-2">
            {optimizedData.steps.map((step) => (
              <RoutineAccordionItem key={step.order} step={step} />
            ))}
          </div>
        </div>
      </div>

      {/* 5. 하단 고정 버튼 영역 */}
      <div className="flex flex-col gap-2 items-center justify-center w-full mb-5 mt-3">
        <button
          type="button"
          className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          이 안전한 루틴으로 오늘 케어하기
        </button>
      </div>

      {isModalOpen && (
        <FinishModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          analysisId={analysisId}
        />
      )}
    </div>
  );
};

export default OptimizedRoutine;
