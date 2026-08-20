import React, { useState } from "react";
import RecordDetailModal from "./RecordDetailModal";
import useRoutineStore from "../../store/routineStore";

// 서버 일별 상세 응답(untyped)을 모달이 기대하는 형태로 정규화한다.
// 실제 필드명이 다르면 이 함수 한 곳만 고치면 된다. (console.log로 확인)
const normalizeRecord = (raw, dateLabel) => {
  // 아직 안 불러왔거나(빈 배열/undefined) 기록이 없으면 null
  if (!raw || Array.isArray(raw)) return null;

  const steps = raw.steps ?? raw.routines ?? [];
  const completedCount =
    raw.completedCount ?? steps.filter((s) => s.completed).length;
  const totalCount = raw.totalCount ?? steps.length;
  const completionRate =
    raw.completionRate ??
    (totalCount ? Math.round((completedCount / totalCount) * 100) : 0);

  return {
    date: dateLabel, // 화면 표시용 문자열 ("8월 20일 (목)")
    condition: raw.condition, // 서버 한글 문자열 -> 모달에서 아이콘 매핑
    conditionId: raw.conditionId, // 혹시 영어 id로 올 경우 대비
    memo: raw.memo ?? null,
    completionRate,
    completedCount,
    totalCount,
    routines: steps.map((s) => ({
      name: s.productName ?? s.name,
      imageUrl: s.imageUrl ?? s.productImageUrl,
      category: s.category,
      completed: Boolean(s.completed),
    })),
  };
};

// 오늘 모달에는 일별 로그(컨디션/메모) 위에 활성 루틴(store)의 진행 상황을 얹는다.
// 오늘 로그엔 아직 루틴/실천도가 안 담겨오므로 활성 루틴으로 채워준다.
const buildModalRecord = (dailyRaw, dateLabel, isToday, activeRoutine) => {
  const base = normalizeRecord(dailyRaw, dateLabel);

  // 오늘이 아니거나 활성 루틴이 없으면 로그 그대로 사용
  if (!isToday || !activeRoutine) return base;

  // 오늘 모달은 데일리 루틴 화면과 같은 활성 루틴을 기준으로 표시한다.
  // 일별 로그에 이전 단계 목록이 있어도 현재 활성 루틴으로 덮어써서 단계/진행률을 맞춘다.
  const steps = activeRoutine.steps ?? [];
  const completedCount = steps.filter((s) => s.completed).length;
  const totalCount = steps.length;
  const routineInfo = {
    completedCount,
    totalCount,
    completionRate: totalCount
      ? Math.round((completedCount / totalCount) * 100)
      : 0,
    routines: steps.map((s) => ({
      name: s.productName ?? s.name,
      imageUrl: s.imageUrl ?? s.productImageUrl,
      category: s.category,
      completed: Boolean(s.completed),
    })),
  };

  // 컨디션/메모(base)가 있으면 그 위에 루틴 정보만 얹고, 없으면 새로 구성
  return base
    ? { ...base, ...routineInfo }
    : { date: dateLabel, memo: null, ...routineInfo };
};

const MyCalendar = ({
  progressPercentage,
  monthlyData = [],
  dailyRecord = null,
  onDateSelect,
  onMonthChange,
}) => {
  // 오늘 날짜 기준 이번달 정보 자동 계산
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [isToday, setIsToday] = useState();

  // 오늘 모달에 얹을 활성 루틴 (홈/데일리와 공유하는 store)
  const activeRoutine = useRoutineStore((state) => state.routine);

  const handleDateClick = (dayNum) => {
    // 클릭한 날짜가 오늘인지 판별
    const isClickedToday =
      year === actualYear && month === actualMonth && dayNum === actualDate;

    // 요일 구하는 로직
    const clickedDateObj = new Date(year, month, dayNum);
    const dayOfWeekNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = dayOfWeekNames[clickedDateObj.getDay()];

    setSelectedDateInfo(`${month + 1}월 ${dayNum}일 (${dayOfWeek})`);
    setIsToday(isClickedToday); // 오늘 여부를 상태나 변수로 저장
    setIsModalOpen(true);

    //"YYYY-MM-DD" 형태로 클릭한 날짜를 전달
    if (onDateSelect) {
      const formattedMonth = String(month + 1).padStart(2, "0");
      const formattedDay = String(dayNum).padStart(2, "0");
      onDateSelect(`${year}-${formattedMonth}-${formattedDay}`);
    }
  };

  const year = currentDate.getFullYear();
  // 0부터 시작함 (0 = 1월)
  const month = currentDate.getMonth();

  // 오늘 날짜를 따로 저장
  const actualToday = new Date();
  const actualYear = actualToday.getFullYear();
  const actualMonth = actualToday.getMonth();
  const actualDate = actualToday.getDate();

  // 이번 달 1일 요일 계산
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // 이번 달이 총 며칠인지 계산
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  //배열 관리
  const safeMonthlyData = Array.isArray(monthlyData)
    ? monthlyData
    : monthlyData?.days || [];

  //compelted가 true인 날짜만 추출(루틴을 완료한 날짜)
  const completedDays = safeMonthlyData
    .filter((item) => item.entries?.some((entry) => entry.completed))
    .map((item) => {
      if (item && item.date) {
        // "2026-08-18" -> 18 추출
        return parseInt(item.date.split("-")[2], 10);
      }
      return null;
    })
    .filter((day) => day !== null);

  // 기록이 있는 날짜
  const recordedDays = safeMonthlyData
    .filter((item) => item.entries && item.entries.length > 0)
    .map((item) => (item.date ? parseInt(item.date.split("-")[2], 10) : null))
    .filter(Boolean);

  // 요일 배열
  const weekDays = [
    { day: "일", color: "text-red-70" },
    { day: "월", color: "text-gray-60" },
    { day: "화", color: "text-gray-60" },
    { day: "수", color: "text-gray-60" },
    { day: "목", color: "text-gray-60" },
    { day: "금", color: "text-gray-60" },
    { day: "토", color: "text-blue-60" },
  ];

  //달을 바꾸면 부모 컴포넌트에 연/월을 보내 API 재호출
  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    if (onMonthChange) {
      onMonthChange(newDate.getFullYear(), newDate.getMonth() + 1);
    }
  };

  //화살표 클릭시 다음달/이전달로 넘어가도록 하는 함수
  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    if (onMonthChange) {
      onMonthChange(newDate.getFullYear(), newDate.getMonth() + 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[362px] rounded-[20px] border border-gray-20 bg-white px-[24px] pt-[12px] pb-[16px] shadow-card">
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="text-[16px] font-bold text-black">
          {year}년 {month + 1}월
        </h2>
        <div className="flex gap-4 text-gray-20">
          <button
            onClick={handlePrevMonth}
            className="hover:text-black cursor-pointer"
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 7L7 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleNextMonth}
            className="hover:text-black cursor-pointer"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/*루틴 완료했다는 정보를 백한테 보내고 받아서 완료한 날은 채크표시 되게끔 하는게 좋을거같음 */}
      <div className="mb-2 grid grid-cols-7 place-items-center">
        {weekDays.map((item, idx) => (
          <div key={idx} className={`text-[12px] font-semibold ${item.color}`}>
            {item.day}
          </div>
        ))}
      </div>

      {/* 스크롤 영역 & 하단 페이드 아웃 (Fade-out) 효과 */}
      <div className="relative">
        {/* 스크롤되는 달력 그리드 영역 */}
        <div className="h-[120px] overflow-y-auto pb-8 no-scrollbar">
          <div className="grid grid-cols-7 place-items-center gap-y-3">
            {/* 시작일 이전 빈 칸 */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="size-[28px]" />
            ))}

            {/* 실제 날짜 렌더링 */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;

              const isToday =
                year === actualYear &&
                month === actualMonth &&
                dayNum === actualDate;

              // 루틴 완료 or 기록 가짐 두개로 나뉨
              const isCompleted = completedDays.includes(dayNum);
              const hasRecord = recordedDays.includes(dayNum);

              //진행도 테두리가 있는 원 (오늘))
              if (isToday) {
                return (
                  // 바깥쪽 래퍼 (크기 32px) : 그리드의 칸 틀어짐을 막고 테두리 두께를 만듭니다.
                  <div
                    key={dayNum}
                    onClick={() => handleDateClick(dayNum)}
                    className="relative flex size-[32px] items-center justify-center rounded-full cursor-pointer"
                    style={{
                      // conic-gradient: 진행률만큼 색 채우기
                      background: `conic-gradient(#03c1fb ${progressPercentage}%, #f7f7f8 ${progressPercentage}%)`,
                    }}
                  >
                    {/* 안쪽 원 : 바깥쪽 그라데이션이 테두리로 보이도록 하기 */}
                    <div className="flex size-[28px] items-center justify-center rounded-full bg-blue-05 text-[14px] font-medium text-black">
                      {dayNum}
                    </div>
                  </div>
                );
              }

              // 2. compeleted == true
              if (isCompleted) {
                return (
                  <div
                    key={dayNum}
                    onClick={() => handleDateClick(dayNum)}
                    className="flex size-[32px] items-center justify-center cursor-pointer transition-transform active:scale-95"
                  >
                    <div className="flex size-[28px] items-center justify-center rounded-full bg-gray-10 text-[14px] text-black shadow-sm shadow-card">
                      {dayNum}
                    </div>
                  </div>
                );
              }

              //진행률이 반영되지 않는 일반 원
              return (
                // 여기도 바깥쪽 크기는 32px로 똑같이 맞춰줍니다. (정렬 유지)
                <div
                  key={dayNum}
                  onClick={() =>
                    hasRecord ? handleDateClick(dayNum) : undefined
                  }
                  className={`flex size-[32px] items-center justify-center ${
                    hasRecord
                      ? "cursor-pointer transition-transform active:scale-95"
                      : "cursor-default"
                  }`}
                >
                  <div
                    className={`flex size-[28px] items-center justify-center rounded-full text-[14px] ${
                      hasRecord
                        ? "bg-gray-10 font-semibold text-black" // 정보가 있는 날 (활성화)
                        : "bg-gray-05 font-normal text-black" // 정보가 없는 날 (비활성화)
                    }`}
                  >
                    {dayNum}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 페이드아웃 */}
        {/* absolute를 써서 달력 스크롤 영역 위로 띄웁니다.
            pointer-events-none을 줘서 스크롤을 방해하지 않게 합니다.
            bg-gradient-to-t : 밑에서 위로(하단 흰색 -> 상단 투명) 스르륵 사라지는 효과 반영 */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="mt-6 flex w-full items-center justify-center rounded-[12px] bg-blue-05 p-[8px] text-[12px] font-semibold text-gray-60">
        이번 달은 총{" "}
        <span className="mx-1 text-blue-50">
          {monthlyData?.completedDaysCount ?? completedDays.length}일
        </span>{" "}
        루틴을 완수했어요!
      </div>

      <RecordDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recordData={buildModalRecord(
          dailyRecord,
          selectedDateInfo,
          isToday,
          activeRoutine,
        )}
        isToday={isToday} // 💡 전달 완료!
      />
    </div>
  );
};

export default MyCalendar;
