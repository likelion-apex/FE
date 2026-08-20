import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import TopNavbar from "../../components/layouts/TopNavbar";
import BottomNavbar from "../../components/layouts/BottomNavbar";

import more_arrow from "../../assets/routine-analyze/more_arrow.svg";
import RecentRoutineItem from "../../components/Analysis/RecentRoutineItem";
import AnalysisProcessCard from "../../components/Analysis/AnalysisProcessCard";
import SelectModal from "../../components/Analysis/SelectModal";

import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";

import thumbnail1 from "../../assets/routine-analyze/thumbnail/thumbnail1.png";
import thumbnail2 from "../../assets/routine-analyze/thumbnail/thumbnail2.png";
import thumbnail3 from "../../assets/routine-analyze/thumbnail/thumbnail3.png";

const THUMBNAILS = [thumbnail1, thumbnail2, thumbnail3];

const RoutineAnalyze = () => {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null); //영상 데이터를 담음
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [recentRoutines, setRecentRoutines] = useState([]);

  const accessToken = useAuthStore((state) => state.accessToken);

  //영상 정보 요청
  useEffect(() => {
    if (!url) {
      setVideoData(null);
      return;
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const fetchVideoPreview = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shortform-analyses/preview`,
            {
              videoUrl: url,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, // (필요 시) 토큰 추가
              },
            },
          );

          const data = response.data.data;
          console.log("영상 세부사항 : ", data);
          if (data && data.duration) {
            let totalSeconds = 0;
            const durationStr = String(data.duration).trim();

            if (durationStr.includes(":")) {
              const parts = durationStr.split(":").map(Number);

              if (parts.length === 2) {
                totalSeconds = parts[0] * 60 + parts[1];
              } else if (parts.length === 3) {
                totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
              }
            } else if (!isNaN(durationStr) && durationStr !== "") {
              totalSeconds = parseInt(durationStr, 10);
            }

            if (totalSeconds > 120) {
              alert(
                "영상의 길이가 2분을 초과합니다. 2분 이내의 쇼츠(Shorts) URL을 입력해주세요.",
              );
              setUrl("");
              setVideoData(null);
              return;
            }
          } else {
            // 백엔드에서 시간 데이터를 안 줬을 때 방어
            alert(
              "영상의 길이를 확인할 수 없습니다. 다른 영상으로 다시 시도해주세요.",
            );
            setUrl("");
            setVideoData(null);
            return;
          }
          setVideoData(data);
        } catch (error) {
          console.error(
            "유트브 영상 미리보기 정보를 불러오는 데 실패했습니다",
            error,
          );
          if (error.response && error.response.status === 400) {
            alert(
              "분석할 수 없는 영상입니다! 2분 이내의 쇼츠(Shorts) 링크가 맞는지 확인해주세요.",
            );
          } else {
            alert("영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
          }

          setUrl(""); // 에러가 나면 얄짤없이 입력창 초기화!
          setVideoData(null);
        }
      };
      fetchVideoPreview();
    }
  }, [url]);

  //최근 분석한 루틴 조회
  useEffect(() => {
    const fetchRecentRoutines = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("백엔드에서 받아온 최근 분석한 루틴 :", response.data.data);
        setRecentRoutines(response.data.data.items);
      } catch (error) {
        console.error("최근 분석한 루틴을 불러오는 데 실패했습니다.", error);
      }
    };
    if (accessToken) {
      fetchRecentRoutines();
    }
  }, [accessToken]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // 클립보드 접근 불가 시 무시
    }
  };

  // X 버튼을 누르면 링크와 카드 초기화
  const handleClear = () => {
    setUrl("");
    setVideoData(null);
  };

  //AI 분석 요청하기 클릭 시 실행되는 함수
  const handleAnalyzeRequest = async () => {
    setIsLoading(true);
    try {
      console.log("백엔드로 보낼 URL", url);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/RoutineAnalysis/Smartloading");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //분석 요청 보내기
  const handleOptionClick = async (type) => {
    if (type === "routine") {
      if (isLoading) return;
      setIsLoading(true);

      try {
        console.log("서버로 보내는 Request Body:", { videoUrl: url });
        console.log("사용 중인 토큰:", accessToken);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/shortform-analyses`,
          {
            videoUrl: url,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const analysisId = response.data.data.analysisId;

        navigate("/RoutineAnalysis/Smartloading", {
          state: { type: "routine", analysisId: analysisId },
        });
      } catch (error) {
        console.error("전체 루틴 분석 요청 실패:", error);

        const errorMessage = error.response?.data?.message;
        const errorCode = error.response?.data?.code;

        if (errorCode === "ANALYSIS-005") {
          // 피부 타입 미등록 에러인 경우
          alert("피부 타입을 먼저 등록해 주세요! 마이페이지로 이동합니다.");
          // 필요하다면 피부 타입 설정 페이지로 이동: navigate("/mypage/profile");
        } else if (errorMessage) {
          // 백엔드가 준 다른 에러 메시지가 있다면 그걸 띄워줌
          alert(errorMessage);
        } else {
          // 아예 통신이 끊겼거나 원인을 모를 때
          alert("분석 요청에 실패했습니다. 다시 시도해 주세요.");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (type === "item") {
      navigate("/RoutineAnalysis/Smartloading", {
        state: { type: "item" },
      });
    }
  };

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "AI 루틴 분석",
    });

    return () => {
      setNavProps({
        step: 0,
        totalSteps: 0,
        stepName: "",
      });
    };
  }, [setNavProps]);

  return (
    <div className="flex min-h-full flex-col text-black mt-[24px]  px-[20px]">
      <div className="flex-1 pb-6 ">
        {/* 제목 */}
        <section>
          <h2 className="text-[20px] font-semibold leading-7">
            영상 속 스킨케어 루틴,
            <br />내 피부에도 잘 맞을까요?
          </h2>
          <p className="mt-2 text-[14px] leading-7 text-gray-60">
            유튜브 쇼츠 링크를 붙여넣어 보세요.
          </p>
        </section>

        <section className="mt-6">
          {videoData ? (
            <div className="relative mx-auto flex w-full w-[370px] h-[184px] items-center  rounded-2xl bg-white border border-gray-05 transition-all overflow-hidden ">
              {/* 닫기(X) 버튼 */}
              <button
                onClick={handleClear}
                className="absolute right-3 top-3 text-gray-40 text-[14px] font-bold hover:text-gray-60"
              >
                ✕
              </button>
              <div className="flex justify-between gap-5 h-full">
                {/* 썸네일 플레이스홀더 (기획서와 비슷하게 크기 조정) */}
                <img
                  src={videoData.thumbnailUrl} // 명세서에 있는 썸네일 URL 데이터
                  alt="유튜브 썸네일"
                  className="w-[116px] h-full object-cover rounded-2xl bg-gray-10"
                />
                {/* 텍스트 콘텐츠 영역 */}
                <div className="flex flex-col justify-center gap-8">
                  <h4 className="text-[16px] font-bold leading-snug text-black pr-8 line-clamp-2">
                    {videoData.title}
                  </h4>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] font-semibold text-black">
                      {videoData.publisher}
                    </p>
                    <div className=" flex items-center gap-3">
                      <span className="text-[10px] text-gray-60 font-regular">
                        길이 {videoData.duration} • 조회수 {videoData.viewCount}
                      </span>
                      <span className="rounded bg-red-05 px-2 py-1 text-[12px] font-bold text-red-40">
                        Shorts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {THUMBNAILS.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`이미지 ${index + 1}`}
                  className="h-[184px] w-[116px] shrink-0 rounded-xl bg-gray-10 object-cover"
                />
              ))}
            </div>
          )}
        </section>

        {/* URL 입력창 */}
        <section className="mt-8  w-full">
          <div className="rounded-[20px] border border-gray-10 bg-white p-[13px]">
            <div className="relative mb-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="영상의 URL을 입력하세요"
                className="h-12 w-full rounded border border-gray-20 px-[10px] pr-[80px] text-[14px] text-blue-50 placeholder:text-blue-50 outline-none"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white px-3 py-[6px] text-[12px] font-bold text-blue-50 transition-colors border border-blue-50 hover:bg-gray-60"
              >
                붙여넣기
              </button>
            </div>

            {/* 분석 요청 버튼 */}
            <button
              type="button"
              disabled={!videoData || isLoading}
              onClick={() => handleOptionClick("routine")}
              className="flex w-full items-center justify-center rounded-3xl bg-blue-05 px-2 py-4 text-[16px] font-medium text-gray-40 disabled:cursor-not-allowed enabled:bg-blue-50 enabled:text-white"
            >
              {isLoading ? "요청 중..." : "AI 분석 요청하기"}
            </button>
          </div>

          {/* 안내 문구 */}
          <div className=" text-center mt-3 rounded-xl bg-blue-05 py-[10px] text-[11px] font-semibold leading-normal text-gray-60">
            <p>최대 2분 이내 영상만 분석할 수 있어요.</p>
            <p>영상 길이에 따라 분석에 많은 시간이 걸릴 수 있어요.</p>
          </div>
        </section>

        {/* 분석 과정 */}
        <section className="mt-10 px-5">
          <h3 className="mb-6 text-[18px] font-semibold leading-7">
            AI 분석, 이렇게 진행돼요
          </h3>
          <AnalysisProcessCard />
        </section>

        {/* 최근 분석한 루틴 컴포넌트 */}
        <section className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold leading-7">
              최근 분석한 루틴
            </h3>
          </div>
          <div className="flex flex-col gap-2 flex-nowrap pb-2 no-scrollbar overflow-x-auto max-h-[200px]">
            {recentRoutines.map((routine) => (
              <div key={routine.analysisId} className="w-full">
                <RecentRoutineItem
                  thumbnailUrl={routine.thumbnailUrl}
                  title={routine.title}
                  day={routine.createdAt}
                  score={routine.overallScore}
                  status={routine.status}
                  stepCount={routine.stepCount}
                  onClick={() => {
                    console.log(
                      "클릭한 루틴 상태:",
                      routine.status,
                      "ID:",
                      routine.analysisId,
                    );

                    if (routine.status !== "COMPLETED") return;

                    navigate(
                      `/RoutineAnalysis/AnalyzeResult/${routine.analysisId}`,
                    );
                  }}
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
