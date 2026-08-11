import React, { useState } from "react";
import more_arrow from "../../assets/routine-analyze/more_arrow.svg";

const MyCalendar = () => {
  // 오늘 날짜 기준 이번달 정보 자동 계산
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // 루틴 완료한 날짜(백엔드가 보내줌(마이데이터))
  const completedDays = [2, 3, 4, 5, 6, 7, 8];

  // 진행도 변수 (퍼센트)
  const totalSteps = 4;
  const currentStep = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // 요일 배열
  const weekDays = [
    { day: "일", color: "text-red-70" },
    { day: "월", color: "text-gray-500" },
    { day: "화", color: "text-gray-500" },
    { day: "수", color: "text-gray-500" },
    { day: "목", color: "text-gray-500" },
    { day: "금", color: "text-gray-500" },
    { day: "토", color: "text-blue-60" },
  ];

  //화살표 클릭시 다음달/이전달로 넘어가도록 하는 함수
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="mx-auto w-[362px] rounded-[20px] border border-gray-20 bg-white p-4">
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
          <div key={idx} className={`text-[13px] font-bold ${item.color}`}>
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

              //진행도 테두리가 있는 원 (오늘))
              if (isToday) {
                return (
                  // 바깥쪽 래퍼 (크기 32px) : 그리드의 칸 틀어짐을 막고 테두리 두께를 만듭니다.
                  <div
                    key={dayNum}
                    className="relative flex size-[32px] items-center justify-center rounded-full"
                    style={{
                      // conic-gradient: 진행률만큼 색 채우기
                      background: `conic-gradient(#03c1fb ${progressPercentage}%, #f7f7f8 ${progressPercentage}%)`,
                    }}
                  >
                    {/* 안쪽 원 : 바깥쪽 그라데이션이 테두리로 보이도록 하기 */}
                    <div className="flex size-[28px] items-center justify-center rounded-full bg-gray-05 text-[14px] font-medium text-black">
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
                  className="flex size-[32px] items-center justify-center"
                >
                  <div className="flex size-[28px] items-center justify-center rounded-full bg-gray-05 text-[14px] font-medium text-black">
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

      <div className="mt-6 flex w-full items-center justify-center rounded-xl bg-gray-05 py-2 text-[12px] text-gray-50 font-semibold">
        이번 달은 총{" "}
        <span className="mx-1 text-blue-50">{completedDays.length}일</span>{" "}
        루틴을 완수했어요!
      </div>
    </div>
  );
};

export default MyCalendar;
