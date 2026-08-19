import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/layouts/BottomNavbar";
import MaskIcon from "../components/MaskIcon";
import SectionHeader from "../components/Home/SectionHeader";
import SkinConditionCard from "../components/Home/SkinConditionCard";
import NightCareCard from "../components/Home/NightCareCard";
import AiAnalysisCard from "../components/Home/AiAnalysisCard";
import FavoriteProducts from "../components/Home/FavoriteProducts";
import NoRoutineCard from "../components/NoRoutineCard";
import NoFavoriteCard from "../components/Home/NoFavoriteCard";

import menuIcon from "../assets/icons/menu.svg";
import soakMark from "../assets/logo/soak-mark.png";
import soakWordmark from "../assets/logo/soak-wordmark.svg";

import { getSummary, updateCondition } from "../api/Home";

// SkinConditionCard의 id -> 서버가 받는 한글 컨디션 라벨
const CONDITION_LABELS = {
  trouble: "트러블있고예민해요",
  dry: "건조하고푸석해요",
  normal: "평범하고무난해요",
  moist: "촉촉하고편안해요",
  best: "컨디션최고예요",
};

function Main() {
  const navigate = useNavigate();

  const [selectedCondition, setSelectedCondition] = useState(null);
  const [memo, setMemo] = useState("");
  const [isMemoSaved, setIsMemoSaved] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [url, setUrl] = useState("");

  const [summary, setSummary] = useState(null);

  const toggleStep = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const loadSummary = async () => {
    const data = await getSummary();
    setSummary(data);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleMemoSubmit = () => {
    const condition = CONDITION_LABELS[selectedCondition] ?? null;

    updateCondition(condition, memo).then(() => {
      setIsMemoSaved(memo.trim().length > 0);
    });
  };

  const mappedSteps = (summary?.todayRoutine?.steps ?? []).map((step) => ({
    id: step.inventoryId ?? step.productId,
    name: step.productName,
    imageUrl: step.imageUrl,
  }));

  const mappedFavorites = (summary?.favoriteInventory?.items ?? []).map(
    (item) => ({
      id: item.inventoryId ?? item.productId,
      name: item.productName,
      imageUrl: item.imageUrl,
    }),
  );

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
            onMemoSubmit={handleMemoSubmit}
            isMemoSaved={isMemoSaved}
          />
        </section>

        {/* 오늘의 나이트 케어 */}
        <section className="mt-[60px] flex flex-col gap-5 px-5">
          <SectionHeader
            title="오늘의 나이트 케어"
            onAction={() => navigate("/MyRoutine")}
          />
          {summary?.todayRoutine ? (
            <NightCareCard
              tip="확실한 안티에이징을 위한 최적의 액티브 조합이예요."
              steps={mappedSteps}
              checkedIds={checkedIds}
              onToggleStep={toggleStep}
              onRestart={() => setCheckedIds([])}
            />
          ) : (
            <NoRoutineCard onClick={()=>navigate("/RoutineAnalysis")}/>
          )}
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
        <section className="mt-[60px] flex flex-col gap-5 px-5">
          <div className="px-5">
            <SectionHeader
              title="즐겨찾는 화장품"
              actionLabel="전체보기"
              onAction={() => navigate("/inventory/star")}
            />
          </div>
          {mappedFavorites.length > 0 ? (
            <FavoriteProducts
              products={mappedFavorites}
              onProductClick={(product) =>
                navigate(`/inventory/item-detail/${product.id}`)
              }
            />
          ) : (
            <NoFavoriteCard />
          )}
        </section>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Main;
