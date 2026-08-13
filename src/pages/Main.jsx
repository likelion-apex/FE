import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/layouts/BottomNavbar";
import MaskIcon from "../components/MaskIcon";
import SectionHeader from "../components/Home/SectionHeader";
import SkinConditionCard from "../components/Home/SkinConditionCard";
import NightCareCard from "../components/Home/NightCareCard";
import AiAnalysisCard from "../components/Home/AiAnalysisCard";
import FavoriteProducts from "../components/Home/FavoriteProducts";

import menuIcon from "../assets/icons/menu.svg";
import soakMark from "../assets/logo/soak-mark.png";
import soakWordmark from "../assets/logo/soak-wordmark.svg";

// 오늘의 루틴. 추후 백엔드 응답으로 교체
const TODAY_ROUTINE = {
  tip: "확실한 안티에이징을 위한 최적의 액티브 조합이에요.",
  steps: [
    { id: 1, name: "1. 어성초 진정 패드", effect: "결 정돈 및 진정" },
    { id: 2, name: "2. 비타민C 항산화 앰플", effect: "강력한 미백 및 안티에이징" },
    { id: 3, name: "3. 세라마이드 캡슐 크림", effect: "장벽 보호 및 보습" },
    { id: 4, name: "4. 아이 링클 코어 크림", effect: "눈가 주름 집중 케어" },
  ],
};

// 즐겨찾는 화장품. 이미지는 아직 목업 placeholder
const FAVORITE_PRODUCTS = [
  { id: 1, name: "어성초 진정 패드", effect: "결 정돈" },
  { id: 2, name: "비타민 C 앰플", effect: "항산화/미백" },
  { id: 3, name: "시카 장벽 크림", effect: "장벽 보호" },
  { id: 4, name: "레티놀 크림", effect: "나이트 케어" },
  { id: 5, name: "히알루론 에센스", effect: "속건조 해결" },
  { id: 6, name: "무기자차 선크림", effect: "자외선 차단" },
];

function Main() {
  const navigate = useNavigate();

  const [selectedCondition, setSelectedCondition] = useState(null);
  const [memo, setMemo] = useState("");
  const [isMemoSaved, setIsMemoSaved] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [url, setUrl] = useState("");

  const toggleStep = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex min-h-full flex-col bg-white text-black">
      <div className="flex-1 pb-6">
        {/* 로고 + 메뉴 */}
        <header className="flex items-center justify-between px-5 pt-14">
          <div className="flex items-center gap-1">
            <img src={soakMark} alt="" className="size-8" />
            <img src={soakWordmark} alt="SOAK" className="h-[18px] w-[60px]" />
          </div>
          <button type="button" aria-label="메뉴" className="cursor-pointer">
            <MaskIcon src={menuIcon} className="size-6 bg-black" />
          </button>
        </header>

        {/* 인사말 + 피부 컨디션 */}
        <section className="mt-[45px] flex flex-col gap-6 px-5">
          <div>
            <h1 className="text-xl leading-7 font-semibold text-black">
              오늘 하루도 고생 많았어요.
            </h1>
            <p className="text-sm leading-7 text-gray-60">
              지금 피부 컨디션은 어떤가요?
            </p>
          </div>

          <SkinConditionCard
            selectedId={selectedCondition}
            onSelect={setSelectedCondition}
            memo={memo}
            onMemoChange={(value) => {
              setMemo(value);
              setIsMemoSaved(false);
            }}
            onMemoSubmit={() => setIsMemoSaved(memo.trim().length > 0)}
            isMemoSaved={isMemoSaved}
          />
        </section>

        {/* 오늘의 나이트 케어 */}
        <section className="mt-[60px] flex flex-col gap-5 px-5">
          <SectionHeader
            title="오늘의 나이트 케어"
            onAction={() => navigate("/MyRoutine")}
          />
          <NightCareCard
            tip={TODAY_ROUTINE.tip}
            steps={TODAY_ROUTINE.steps}
            checkedIds={checkedIds}
            onToggleStep={toggleStep}
            onRestart={() => setCheckedIds([])}
          />
        </section>

        {/* AI 루틴분석 */}
        <section className="mt-12 flex flex-col gap-2 px-5">
          <h2 className="text-[18px] leading-7 font-semibold text-black">
            AI 루틴분석
          </h2>
          <AiAnalysisCard
            url={url}
            onUrlChange={setUrl}
            onSubmit={() => navigate("/RoutineAnalysis")}
          />
        </section>

        {/* 즐겨찾는 화장품 */}
        <section className="mt-12 flex flex-col gap-5">
          <div className="px-5">
            <SectionHeader
              title="즐겨찾는 화장품"
              actionLabel="전체보기"
              onAction={() => navigate("/inventory/star")}
            />
          </div>
          <FavoriteProducts
            products={FAVORITE_PRODUCTS}
            onProductClick={(product) =>
              navigate(`/inventory/item-detail/${product.id}`)
            }
          />
        </section>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Main;
