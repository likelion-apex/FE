import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import SavedRoutineCard from "./SavedRoutineCard";
import YearModal from "./YearModal";

const SavedRoutineList = ({ onClick }) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [year, setYear] = useState(2026);
  const [sortOption, setSortOption] = useState("최신순");

  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [tempYear, setTempYear] = useState(2026); // 모달 안에서 임시로 선택한 연도
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 화면의 글자를 백엔드 API가 알아듣는 Enum 값으로 변환
  const getSortEnum = (display) => {
    switch (display) {
      case "최신순":
        return "LATEST";
      case "가나다순":
        return "NAME_ASC"; // 백엔드 확인 필요
      case "AI 매칭 점수 순":
        return "SCORE_DESC"; // 백엔드 확인 필요
      case "단계순":
        return "STEP_DESC"; // 백엔드 확인 필요
      default:
        return "LATEST";
    }
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/routines`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              year: year,
              sort: getSortEnum(sortOption),
            },
          },
        );
        console.log("보관함 목록:", response.data.data);
        setRoutines(response.data.data.routines || []);
      } catch (error) {
        console.error("보관함 목록을 불러오지 못했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutines();
  }, [year, sortOption, accessToken]);

  const handleDelete = async () => {
    // 1. 실수로 누를 수 있으니 확인창 띄우기
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

  const handleYearConfirm = () => {
    setYear(tempYear);
    setIsYearModalOpen(false);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  // 연도 선택용 배열 생성 (2022 ~ 2029)
  const yearList = Array.from({ length: 8 }, (_, i) => 2022 + i);
  const sortOptionsList = ["최신순", "가나다순", "AI 매칭 점수 순", "단계순"];

  return (
    <div className="mx-auto flex w-full flex-col relative">
      {/* 상단 타이틀 및 필터 영역 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">
          보관된 루틴 ({routines.length})
        </h2>

        <div className="flex items-center gap-4 text-[14px] font-medium text-black">
          {/* 연도 선택 버튼 */}
          <button
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              setTempYear(year);
              setIsYearModalOpen(true);
            }}
          >
            {year}년
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1L5 5L9 1"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 정렬 선택 버튼 & 커스텀 드롭다운 */}
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {sortOption}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 정렬 드롭다운 메뉴 (시안 적용) */}
            {isSortOpen && (
              <div className="absolute right-0 top-6 z-10 w-[130px] rounded-lg bg-white shadow-lg border border-gray-100 flex flex-col py-1 overflow-hidden">
                {sortOptionsList.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSortSelect(option)}
                    className="px-4 py-2.5 text-center text-[13px] text-gray-500 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 리스트 렌더링 영역 */}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="py-10 text-center text-[13px] text-gray-400">
            목록을 불러오는 중입니다...
          </div>
        ) : routines.length > 0 ? (
          routines.map((routine) => (
            <SavedRoutineCard
              key={routine.routineId}
              data={routine}
              onClick={() => onClick(routine.routineId)}
            />
          ))
        ) : (
          <div className="py-10 text-center text-[13px] text-gray-400">
            최근 3개월 내 분석한 루틴이 없어요.
          </div>
        )}
      </div>

      {isYearModalOpen && (
        <YearModal
          yearList={yearList}
          tempYear={tempYear}
          setTempYear={setTempYear}
          setIsYearModalOpen={setIsYearModalOpen}
          handleYearConfirm={handleYearConfirm}
        />
      )}
    </div>
  );
};

export default SavedRoutineList;
