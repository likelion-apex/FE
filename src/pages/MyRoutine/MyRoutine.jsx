import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CareCard from "../../components/MyRoutine/CareCard";
import Button from "../../components/Button";
import RoutineScore from "../../components/Analysis/RoutineScore";
import SavedRoutineList from "../../components/MyRoutine/SavedRoutineList";
import RoutineComplete from "../../components/MyRoutine/RoutineComplete";
import NoRoutineCard from "../../components/NoRoutineCard";
import MyCalendar from "../../components/MyRoutine/MyCalendar";

import { getRoutineLogs } from "../../api/routine";
import useRoutineStore from "../../store/routineStore";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MyRoutine = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "데일리 루틴",
  );
  const navigate = useNavigate();

  // 데일리 루틴은 store에서 구독한다. (홈 화면과 같은 데이터를 공유)
  const routine = useRoutineStore((state) => state.routine);

  const routineLoaded = useRoutineStore((state) => state.loaded);
  const isCompleting = useRoutineStore((state) => state.isCompleting);
  const loadRoutine = useRoutineStore((state) => state.loadRoutine);
  const toggleStep = useRoutineStore((state) => state.toggleStep);
  const completeAll = useRoutineStore((state) => state.completeAll);
  const submitToday = useRoutineStore((state) => state.completeToday);

  // 체크된 스텝 id는 routine에서 파생한다.
  const checkedItems = (routine?.steps ?? [])
    .filter((step) => step.completed)
    .map((step) => step.stepId);

  useEffect(() => {
    loadRoutine();
  }, [loadRoutine]);

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "루틴",
    });

    //다른 페이지로 넘어갈 때 네비바 초기화
    return () => {
      setNavProps({
        step: 0,
        totalSteps: 0,
        stepName: "",
      });
    };
  }, [setNavProps]);

  //진행률 계산
  //전체 단계수
  const totalSteps = routine?.steps.length ?? 0;
  //완료된 단계 수
  const completedSteps = checkedItems.length;
  // 소수점이 나오지 않게 Math.round로 반올림 처리
  const progressPercentage =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  //진행 완료 표시
  const isAllChecked = totalSteps > 0 && checkedItems.length === totalSteps;

  // 실제 로직은 store가 담당한다. (홈 화면과 상태 공유 + 낙관적 업데이트/롤백)
  const handleToggle = (id) => toggleStep(id);
  const handleCompleteAll = () => completeAll();
  const handleSubmitRoutine = () => submitToday();

  // 달력에서 선택한 날짜(기본 : 오늘)
  const [selectedDate, setSelectedDate] = useState(getToday);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });

  // 루틴 로그 조회 API 로 받아올 데이터
  const [monthlyLogs, setMonthlyLogs] = useState([]); // 달력에 점 찍을 월별 데이터
  const [dailyRoutine, setDailyRoutine] = useState([]); // 하루 루틴 리스트

  // 월(Month)이 바뀔 때마다 달력용 요약 데이터 불러오기
  useEffect(() => {
    const fetchMonthlyLogs = async () => {
      try {
        const data = await getRoutineLogs({
          year: currentMonth.year,
          month: currentMonth.month,
        });
        console.log("월별 데이터:", data);
        setMonthlyLogs(data); // 달력에 넘겨줄 데이터 저장
      } catch (error) {
        console.error("월별 루틴 요약 실패:", error);
      }
    };
    fetchMonthlyLogs();
  }, [currentMonth.year, currentMonth.month]);

  // 날짜를 클릭할 때마다 하단 상세 루틴 데이터 불러오기
  useEffect(() => {
    const fetchDailyRoutine = async () => {
      try {
        const data = await getRoutineLogs({ date: selectedDate });
        setDailyRoutine(data); // 기존 TODAY_ROUTINE_DATA 대신 쓸 실제 데이터!
      } catch (error) {
        console.error("일별 루틴 상세 실패:", error);
      }
    };
    if (selectedDate) fetchDailyRoutine();
  }, [selectedDate]);

  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <div className="flex-1 overflow-y-auto pb-[100px] pt-6 ">
        <div className="flex h-[44px] w-full justify-between rounded-[20px] bg-gray-10 p-[4px]">
          {/*나중에 옆으로 넘어가는 모션 넣으면 좋을듯*/}
          {["데일리 루틴", "내 루틴 보관함"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-1 items-center justify-center rounded-[20px] text-[14px] font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-blue-50 shadow-card" // 활성화 탭 (하얀 배경 + 그림자)
                  : "text-gray-60 hover:text-black" // 비활성화 탭
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "데일리 루틴" && (
          <div className="mt-[42px]">
            <div className="mb-[45px]">
              <MyCalendar
                progressPercentage={progressPercentage}
                monthlyData={monthlyLogs} //달력에 월별 데이터 전달
                dailyRecord={dailyRoutine} //선택한 날짜의 상세 기록(모달용)
                onDateSelect={(date) => setSelectedDate(date)} //날짜 클릭 시 선택된 날짜 변경
                onMonthChange={(year, month) =>
                  setCurrentMonth({ year, month })
                } //달 이동 시 월 변경
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-[26px]">
                <h3 className="text-black font-semibold text-[18px] ">
                  오늘의 나이트 케어
                </h3>
              </div>

              {!routine && !routineLoaded ? (
                <div className="mb-[68px] h-[220px] animate-pulse rounded-[20px] bg-gray-10" />
              ) : !routine ? (
                <div className="mb-[68px]">
                  <NoRoutineCard onClick={() => navigate("/RoutineAnalysis")} />
                </div>
              ) : routine.completed ? (
                <div className="mb-10 w-full overflow-clip rounded-[20px] border border-gray-10 shadow-card">
                  <RoutineComplete />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-[12px]">
                    {/* 퍼센트 표시 */}
                    <div
                      className="flex h-[20px] w-[252px] items-center justify-start rounded-[12px] px-[10px] text-[12px] font-semibold text-white transition-all duration-300 ease-in-out"
                      style={{
                        background: `linear-gradient(to right, #03c1fb ${progressPercentage}%, #E5E7EB ${progressPercentage}%)`,
                      }}
                    >
                      {progressPercentage}%
                    </div>

                    <button
                      onClick={handleCompleteAll}
                      className={`py-1 px-2 rounded-xl text-[13px] font-medium border transition-colors active:scale-95 ${
                        isAllChecked
                          ? "bg-blue-05 text-blue-50 border-blue-50" // 모두 체크되었을 때 스타일
                          : "text-blue-50 border-blue-50 bg-white" // 평상시 스타일
                      }`}
                    >
                      {/* 💡 모두 체크되었을 때는 '전체 취소', 아닐 때는 '전체 완료'로 글씨가 바뀝니다 */}
                      ✓ {isAllChecked ? "전체 취소" : "전체 완료"}
                    </button>
                  </div>

                  <div className="flex flex-col gap-[8px] overflow-y-auto no-scrollbar mb-[48px]">
                    {routine.steps.map((step, index) => (
                      <CareCard
                        key={step.stepId}
                        step={{
                          // stepId는 서버 요청용 식별자이고, 화면에는 루틴 순번을 표시한다.
                          id: index + 1,
                          title: step.productName,
                          description: `${step.brand} · ${step.category}`,
                          imageUrl: step.imageUrl,
                          category: step.category,
                        }}
                        isChecked={checkedItems.includes(step.stepId)}
                        onClick={() => handleToggle(step.stepId)}
                      />
                    ))}
                  </div>
                  <div className="mb-[68px]">
                    <Button
                      item={"루틴 완료하기"}
                      bgColor={isAllChecked ? "blue-50" : "gray-10"}
                      textColor={isAllChecked ? "white" : "gray-40"}
                      borderColor={
                        isAllChecked ? "border-blue-50" : "border-gray-10"
                      }
                      onClick={
                        isAllChecked && !isCompleting
                          ? handleSubmitRoutine
                          : undefined
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="text-black text-[18px] font-bold">
                      오늘의 맞춤 케어 브리핑
                    </h3>
                    <div>
                      <RoutineScore
                        data={routine.aiBriefing}
                        isDetailPage={true}
                        isRoutine={true}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "내 루틴 보관함" && (
          <div className="mt-[23px]">
            <SavedRoutineList
              onClick={(id) => {
                navigate(`/MyRoutine/RoutineDetail/${id}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoutine;
