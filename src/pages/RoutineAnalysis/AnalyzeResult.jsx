import { useState, useEffect } from "react";
import {
  Link,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";
import IngredientCard from "../../components/Analysis/IngredientCard";
import TopNavbar from "../../components/layouts/TopNavbar";
import BottomNavbar from "../../components/layouts/BottomNavbar";
import useUserStore from "../../store/userStore";
import IngredientModal from "../../components/Analysis/IngredientModal";
import RoutineScore from "../../components/Analysis/RoutineScore";
import axios from "axios";
import useAuthStore from "../../store/authStore";

const AnalyzeResult = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = true;
  const isDetailPage = false;
  const analysisId = location.state?.analysisId;

  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = useAuthStore((state) => state.accessToken);
  const nickname = useUserStore((state) => state.nickname);

  //루틴 분석 결과 조회
  useEffect(() => {
    if (!analysisId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }

    const fetchAnalysisResult = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses/${analysisId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(
          "백엔드에서 가져온 분석 결과 : ",
          response.data.data.result,
        );
        setResultData(response.data.data.result);
      } catch (error) {
        console.error("분석 결과를 불러오는 데 실패했습니다:", error);
        alert("결과를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisResult();
  }, [analysisId, accessToken, navigate]);

  //최적화된 페이지로 이동
  const handleOptimize = () => {
    navigate("/RoutineAnalysis/OptimizedRoutine", { state: { analysisId } });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-5 pb-20">
        <div className="mb-6 size-12 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
        <h3 className="mb-2 text-[18px] font-bold text-black text-center">
          AI가 루틴 분석 데이터를 불러오고 있어요
        </h3>
      </div>
    );
  }

  // 데이터 로드 실패 시 화면
  if (!resultData) {
    return <div className="p-5 text-center">데이터가 없습니다.</div>;
  }
  const realSteps = resultData.steps || [];
  const leftColumnData = realSteps.filter((_, index) => index % 2 === 0);
  const rightColumnData = realSteps.filter((_, index) => index % 2 !== 0);

  // 뒤로가기 버튼을 눌렀을 때 실행될 함수
  const handleBackClick = () => {
    const isConfirm = window.confirm("결과 화면을 나가시겠습니까?");
    if (!isConfirm) return;

    navigate("/RoutineAnalysis", { replace: true });
  };

  return (
    <div className="mb-6 flex flex-col text-black px-[20px]">
      <TopNavbar
        step={2}
        totalSteps={4}
        stepName={""}
        onBack={handleBackClick}
      />
      <div className="mt-7 flex flex-col">
        <div className="flex-col gap-3 mb-6">
          <h3 className="text-[20px] font-semibold leading-7 mb-[8px]">
            {nickname}님이 공유하신 영상에서 <br />
            핵심 루틴만 AI가 쏙 뽑아왔어요
          </h3>
          <span className="text-gray-60 text-[14px] leading-7">
            단계별 성분이 내 피부에 맞는지 미리 체크해 보세요.
          </span>
        </div>
        <div className="mb-5">
          <RoutineScore
            data={resultData}
            isDetailPage={isDetailPage}
            isRoutine={true}
          />
        </div>

        {/* 성분 분석 그리드 */}
        <section>
          <h3 className="mb-4 text-[16px] font-semibold">
            영상 속 {realSteps.length}단계 루틴 성분 분석
          </h3>
          <div className="flex items-start gap-2 ">
            {/* 왼쪽(홀수) 열*/}
            <div className="flex flex-1 flex-col gap-2">
              {leftColumnData.map((step) => (
                <IngredientCard
                  key={step.resultId}
                  step={step}
                  onClick={() => setSelectedStep(step)}
                />
              ))}
            </div>

            {/* 오른쪽(짝수) 열 */}
            <div className="flex flex-1 flex-col gap-2">
              {rightColumnData.map((step) => (
                <IngredientCard
                  key={step.resultId}
                  step={step}
                  onClick={() => setSelectedStep(step)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      {selectedStep && (
        <div
          className="fixed inset-0 z-50 mx-auto flex w-full max-w-[402px] items-end justify-center bg-black/60"
          onClick={() => setSelectedStep(null)}
        >
          <IngredientModal
            stepData={selectedStep}
            isModal={isModal}
            onClose={() => setSelectedStep(null)}
            analysisId={analysisId}
            nickname={nickname}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 items-center justify-center w-full mt-5">
        <p className="text-[12px] font-semibold text-blue-50">
          이제 {nickname}님의 인벤토리와 성분 충돌이 없는지 알아볼까요?
        </p>
        <div>
          <button
            type="button"
            className="flex w-full h-[56px] items-center justify-center rounded-[10px] bg-blue-50 px-10 py-2 text-[18px] font-medium text-white cursor-pointer"
            onClick={handleOptimize}
          >
            인벤토리 제품과 성분 궁합 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResult;
