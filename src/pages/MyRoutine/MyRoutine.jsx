import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ROUTINE_BRIEFING_DATA,
  SAVED_ROUTINE_DATA,
} from "../../mocks/mockData";

import CareCard from "../../components/MyRoutine/CareCard";
import Button from "../../components/Button";
import RoutineScore from "../../components/Analysis/RoutineScore";
import SavedRoutineList from "../../components/MyRoutine/SavedRoutineList";
import RoutineComplete from "../../components/MyRoutine/RoutineComplete";
import NoRoutineCard from "../../components/NoRoutineCard";
import MyCalendar from "../../components/MyRoutine/MyCalendar";

import {
  getDailyRoutine,
  updateStepCompletion,
  completeAllSteps,
  completeToday,
  getRoutineLogs,
} from "../../api/routine";

const MyRoutine = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "데일리 루틴",
  );
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const loadRoutine = async () => {
      try {
        const data = await getDailyRoutine();
        setRoutine(data);
      } catch (err) {
        console.error("루틴 조회 실패:", err);
      }
    };

    loadRoutine();
  }, []);

  useEffect(() => {
    if (routine) {
      const completedIds = routine.steps
        .filter((step) => step.completed)
        .map((step) => step.stepId);
      setCheckedItems(completedIds);
    }
  }, [routine]);

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
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  //
  const handleToggle = async (id) => {
    const nextCompleted = !checkedItems.includes(id);

    // 낙관적 업데이트: 우선 화면부터 바꾸고, 실패하면 되돌린다.
    setCheckedItems((prev) =>
      nextCompleted ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );

    try {
      const data = await updateStepCompletion(id, nextCompleted);
      setRoutine(data);
    } catch (err) {
      console.error("스텝 완료 상태 저장 실패:", err);
      setCheckedItems((prev) =>
        nextCompleted ? prev.filter((itemId) => itemId !== id) : [...prev, id],
      );
    }
  };

  //진행 완료 표시
  const isAllChecked = checkedItems.length === totalSteps;

  const handleCompleteAll = async () => {
    if (isAllChecked) {
      // 전체 취소: 벌크 취소 API가 없어 스텝별로 개별 취소한다.
      const previousCheckedItems = checkedItems;
      setCheckedItems([]);

      try {
        const allIds = routine.steps.map((step) => step.stepId);
        const results = await Promise.all(
          allIds.map((stepId) => updateStepCompletion(stepId, false)),
        );
        setRoutine(results[results.length - 1]);
      } catch (err) {
        console.error("전체 취소 실패:", err);
        setCheckedItems(previousCheckedItems);
      }
      return;
    }

    const allIds = routine.steps.map((step) => step.stepId);
    setCheckedItems(allIds);

    try {
      const data = await completeAllSteps();
      setRoutine(data);
    } catch (err) {
      console.error("전체 완료 처리 실패:", err);
      setCheckedItems([]);
    }
  };

  const handleSubmitRoutine = async () => {
    try {
      const data = await completeToday();
      setRoutine(data);
    } catch (err) {
      console.error("루틴 완료 처리 실패:", err);
    }
  };

  // 달력에서 선택한 날짜(기본 : 오늘)
  const [selectedDate, setSelectedDate] = useState("2026-08-20");
  const [currentMonth, setCurrentMonth] = useState({ year: 2026, month: 8 });

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

              {!routine ? (
                <div className="mb-[68px]">
                  <NoRoutineCard onClick={() => navigate("/RoutineAnalysis")} />
                </div>
              ) : routine.completed ? (
                <div className="w-full overflow-clip rounded-2xl border border-gray-10 shadow-card mb-10">
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
                    {routine.steps.map((step) => (
                      <CareCard
                        key={step.stepId}
                        step={{
                          id: step.stepId,
                          title: step.productName,
                          description: `${step.brand} · ${step.category}`,
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
                      onClick={isAllChecked ? handleSubmitRoutine : undefined}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-[16px]">
                <h3 className="text-black text-[18px] font-bold">
                  오늘의 맞춤 케어 브리핑
                </h3>
                <div>
                  <RoutineScore
                    data={ROUTINE_BRIEFING_DATA[0]}
                    isDetailPage={true}
                    isRoutine={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "내 루틴 보관함" && (
          <div className="mt-7">
            <SavedRoutineList
              data={SAVED_ROUTINE_DATA}
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
