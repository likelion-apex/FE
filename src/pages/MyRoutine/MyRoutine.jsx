import MyCalendar from "../../components/MyRoutine/MyCalendar";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TODAY_ROUTINE_DATA } from "../../mocks/mockData";
import { toFormData } from "axios";
import CareCard from "../../components/MyRoutine/CareCard";
import Button from "../../components/Button";
import RoutineScore from "../../components/Analysis/RoutineScore";
import {
  ROUTINE_BRIEFING_DATA,
  SAVED_ROUTINE_DATA,
} from "../../mocks/mockData";
import SavedRoutineList from "../../components/MyRoutine/SavedRoutineList";

const MyRoutine = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "데일리 루틴",
  );
  const [checkedItems, setCheckedItems] = useState([]);
  const isDetailPage = false;
  const navigate = useNavigate();

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
  const totalSteps = TODAY_ROUTINE_DATA.length;
  //완료된 단계 수
  const completedSteps = checkedItems.length;
  // 소수점이 나오지 않게 Math.round로 반올림 처리
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  //
  const handleToggle = (id) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  //진행 완료 표시
  const isAllChecked = checkedItems.length === totalSteps;

  return (
    <div className="relative flex h-full flex-col px-[20px]">
      <div className="flex-1 overflow-y-auto pb-[100px] pt-6 ">
        <div className="bg-gray-10 w-full h-[40px] rounded-3xl flex justify-between p-0.5">
          {/*나중에 옆으로 넘어가는 모션 넣으면 좋을듯*/}
          {["데일리 루틴", "내 루틴 보관함"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-1 items-center justify-center rounded-full text-[15px] font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-blue-50" // 활성화 탭 (하얀 배경 + 그림자)
                  : "text-gray-60 hover:text-black" // 비활성화 탭
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "데일리 루틴" && (
          <div className="mt-12">
            <div className="mb-7">
              <MyCalendar />
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black font-semibold text-[18px]">
                  오늘의 나이트 케어
                </h3>
                <button className="bg-gray-05 text-gray-60 text-[12px] rounded-[12px] p-2">
                  루틴 편집
                </button>
              </div>
              <div>
                {/* 퍼센트 표시 */}
                <div
                  className="mb-5 flex h-[20px] w-full items-center justify-start rounded-[12px] px-[10px] text-[12px] fontsemi-bold text-white transition-all duration-300 ease-in-out"
                  style={{
                    background: `linear-gradient(to right, #03c1fb ${progressPercentage}%, #E5E7EB ${progressPercentage}%)`,
                  }}
                >
                  {progressPercentage}%
                </div>
                <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar mb-6">
                  {TODAY_ROUTINE_DATA.map((step) => (
                    <CareCard
                      key={step.id}
                      step={step}
                      isChecked={checkedItems.includes(step.id)}
                      onClick={() => handleToggle(step.id)}
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
                      isAllChecked ? () => console.log("루틴 완료!") : undefined
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-black text-[18px] font-bold">
                  {" "}
                  오늘의 맞춤 케어 브리핑
                </h3>
                <div>
                  <RoutineScore
                    data={ROUTINE_BRIEFING_DATA[0]}
                    isDetailPage={isDetailPage}
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
