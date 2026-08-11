import React, { useState, useMemo } from "react";
import SavedRoutineCard from "./SavedRoutineCard";

const SavedRoutineList = ({ data }) => {
  // 현재 선택된 옵션 상태
  const [period, setPeriod] = useState("3개월"); //기본 : 최근 3개월
  const [sortOrder, setSortOrder] = useState("최신순"); // 기본 : 최신순

  // 필터링 및 정렬된 데이터 계산
  const filteredAndSortedData = useMemo(() => {
    const today = new Date();

    // 1. 기간에 맞춰서 걸러내기
    let result = data.filter((item) => {
      //시기가 전체라면 -> 전부다
      if (period === "전체") return true;

      //데이터 속 날짜를 날짜형태로 변환(원래:2026-12-12)
      const itemDate = new Date(item.savedDate);
      // 오늘과 저장된 날짜의 개월 수 차이 계산
      const monthsDiff =
        (today.getFullYear() - itemDate.getFullYear()) * 12 +
        (today.getMonth() - itemDate.getMonth());

      if (period === "1개월") return monthsDiff <= 1;
      if (period === "3개월") return monthsDiff <= 3;
      if (period === "6개월") return monthsDiff <= 6;
      return true;
    });

    // 2. 걸러진 데이터를 기준에 맞춰 정렬하기
    result.sort((a, b) => {
      const dateA = new Date(a.savedDate).getTime();
      const dateB = new Date(b.savedDate).getTime();

      if (sortOrder === "최신순") return dateB - dateA; // 날짜 내림차순
      if (sortOrder === "오래된순") return dateA - dateB; // 날짜 오름차순
      if (sortOrder === "점수순") return b.score - a.score; // 점수 내림차순 (선택사항)
      return 0;
    });

    return result;
  }, [period, sortOrder]); // period나 sortOrder가 바뀔 때마다 이 로직이 재실행

  return (
    <div className="mx-auto flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">
          보관된 루틴 ({filteredAndSortedData.length})
        </h2>

        <div className="flex items-center gap-4 text-[14px] font-bold text-black">
          {/*기간 필터*/}
          <div className="relative flex items-center">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none pr-4 outline-none cursor-pointer"
            >
              <option value="1개월">최근 1개월</option>
              <option value="3개월">최근 3개월</option>
              <option value="6개월">최근 6개월</option>
              <option value="전체">전체</option>
            </select>
            <div className="absolute right-0 pointer-events-none flex items-center justify-center text-gray-500">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 정렬 필터 */}
          <div className="relative flex items-center">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none pr-3 outline-none cursor-pointer"
            >
              <option value="최신순">최신순</option>
              <option value="오래된순">오래된순</option>
              <option value="점수순">점수순</option>
            </select>
            <div className="absolute right-0 pointer-events-none flex items-center justify-center text-gray-500">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 리스트 렌더링 영역 */}
      <div className="flex flex-col gap-3">
        {filteredAndSortedData.length > 0 ? (
          filteredAndSortedData.map((routine) => (
            <SavedRoutineCard
              key={routine.id}
              data={routine}
              onClick={() => console.log(`${routine.title} 클릭!`)}
            />
          ))
        ) : (
          <div className="py-10 text-center text-[13px] text-gray-400">
            해당 조건에 맞는 루틴이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRoutineList;
