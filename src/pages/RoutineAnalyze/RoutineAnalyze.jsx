import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import more_arrow from "../../assets/routine-analyze/more_arrow.svg";
import RecentRoutineItem from "../../components/RecentRoutineItem";
import AnalysisProcessCard from "../../components/AnalysisProcessCard";

//받는거에 따라 다르겟지만 매칭 개수 / 며칠전인지 / 어떤 루틴인지 요약
//로그인시 받아올 데이터
const RECENT_ROUTINES = [
  {
    title: "환절기 수부지 진정 케어",
    day: 2,
    matchCount: 3,
  },
  {
    title: "뷰티 유튜버 A의 나이트 루틴",
    day: 5,
    matchCount: 1,
  },
  {
    title: "민감 홍조피부 스킨케어 루틴",
    day: 7,
    matchCount: 3,
  },
  {
    title: "속건조 잡는 꿀광 보습 루틴",
    day: 10,
    matchCount: 4,
  },
  {
    title: "여드름 피부 딥클렌징 케어",
    day: 14,
    matchCount: 2,
  },
];

const RoutineAnalyze = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // 클립보드 접근 불가 시 무시
    }
  };

  //AI 분석 요청하기 클릭 시 실행되는 함수
  const handleAnalyzeRequest = async () => {
    //1. 요청 시작
    setIsLoading(true);

    try {
      //2. 백엔드 API 로 데이터 전송
      console.log("백엔드로 보낼 URL", url);

      // 임시 딜레이 (실제 백엔드 연결 전 테스트용)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/RoutineAnalyze/Smartloading");
    } catch (error) {
      console.error(error);
    } finally {
      //3. 요청 완료
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col text-black">
      <div className="flex-1 pb-6 mt-[100px]">
        {/* 제목 */}
        <section className="px-[39px]">
          <h2 className="text-[20px] font-semibold leading-7">
            영상 속 스킨케어 루틴,
            <br />내 피부에도 잘 맞을까요?
          </h2>
          <p className="mt-2 text-[14px] leading-7 text-gray-60">
            유튜브 쇼츠 링크를 붙여넣어 보세요.
          </p>
        </section>

        {/* 비디오리스트, 아직 안정해짐, 목데이터 첨부 */}
        <section className="mt-6 flex gap-4 overflow-x-auto px-5 no-scrollbar">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[186px] w-[116px] shrink-0 rounded-xl bg-gray-10"
            />
          ))}
        </section>

        {/* URL 입력칸, 받은 URL를 백으로 보내야됨 */}
        {/* 백한테 */}
        <section className="mt-6 px-[11px]">
          <div className="rounded-[20px] border border-gray-10 bg-white p-[13px]">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="영상의 URL을 입력하세요"
                className="h-12 w-full rounded border border-gray-20 px-[10px] text-[16px] text-black placeholder:text-gray-60 outline-none"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gray-40 px-2 py-2 text-[12px] font-bold text-white"
              >
                붙여넣기
              </button>
            </div>
            <button
              type="button"
              disabled={!url.trim() || isLoading} //url이 없거나, 로딩 중이면 비활성화
              onClick={handleAnalyzeRequest}
              className="mt-2 flex w-full items-center justify-center rounded-[20px] bg-gray-20 px-2 py-4 text-[16px] font-medium text-white disabled:cursor-not-allowed enabled:bg-primary-10"
            >
              {isLoading ? "요청 중..." : "AI 분석 요청하기"}
            </button>
          </div>
          <div className="mt-1 rounded-xl bg-gray-05 p-[18px] text-center text-[12px] font-semibold leading-normal text-[#4a5568]">
            <p>최대 5분 이내 영상만 분석할 수 있어요.</p>
            <p>영상 길이에 따라 분석에 많은 시간이 걸릴 수 있어요.</p>
          </div>
        </section>

        {/* 분석 과정 */}
        <section className="mt-8 px-5">
          <h3 className="mb-6 text-[18px] font-semibold leading-7">
            AI 분석, 이렇게 진행돼요
          </h3>
          <AnalysisProcessCard />
        </section>

        {/* 최근 분석한 루틴 컴포넌트(임시 목데이터 설정) */}
        <section className="mt-8 px-[31px]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold leading-7">
              최근 분석한 루틴
            </h3>
            <button
              type="button"
              className="flex items-end gap-1 text-[12px] text-gray-60"
            >
              전체보기
              <img src={more_arrow} alt="" className="h-4 w-2" />
            </button>
          </div>
          <div className="flex flex-col gap-2 flex-nowrap pb-2 no-scrollbar overflow-x-auto max-h-[200px]">
            {RECENT_ROUTINES.map((routine) => (
              <div key={routine.title} className="w-full">
                <RecentRoutineItem
                  title={routine.title}
                  day={routine.day}
                  matchCount={routine.matchCount}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoutineAnalyze;
