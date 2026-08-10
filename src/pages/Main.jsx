import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/layouts/BottomNavbar";
import MaskIcon from "../components/MaskIcon";
import checkIcon from "../assets/icons/check.svg";
import menuIcon from "../assets/icons/menu.svg";
import moreArrow from "../assets/routine-analyze/more_arrow.svg";

// 피부 컨디션 선택지. 아이콘은 아직 디자인 미확정이라 회색 원 placeholder로 둠
const SKIN_CONDITIONS = [
  { id: 1, label: "트러블이 있고 예민해요" },
  { id: 2, label: "건조하고 푸석해요" },
  { id: 3, label: "평소와 비슷하고 무난해요" },
  { id: 4, label: "촉촉하고 편안해요" },
  { id: 5, label: "컨디션 최고예요" },
];

// 오늘의 루틴. 추후 백엔드 응답으로 교체
const TODAY_ROUTINE = {
  title: "오늘 밤을 위한 4단계 집중 케어",
  tip: "확실한 안티에이징을 위한 최적의 액티브 조합이에요.",
  steps: [
    {
      id: 1,
      name: "1 어성초 진정 패드",
      effect: "결 정돈 및 진정",
      done: true,
    },
    {
      id: 2,
      name: "2. 비타민C 항산화 앰플",
      effect: "강력한 미백 및 안티에이징",
      done: false,
    },
    {
      id: 3,
      name: "3. 세라마이드 캡슐 크림",
      effect: "장벽 보호 및 보습",
      done: false,
    },
    {
      id: 4,
      name: "4. 아이 링클 코어 크림",
      effect: "눈가 주름 집중 케어",
      done: false,
    },
  ],
};

// 즐겨찾는 화장품. 썸네일은 디자인상 아직 placeholder
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
  const [checkedIds, setCheckedIds] = useState(
    TODAY_ROUTINE.steps.filter((step) => step.done).map((step) => step.id),
  );
  const [url, setUrl] = useState("");

  const toggleStep = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const totalSteps = TODAY_ROUTINE.steps.length;
  const doneCount = checkedIds.length;
  const donePercent = Math.round((doneCount / totalSteps) * 100);

  return (
    <div className="flex min-h-full flex-col bg-white text-black">
      <div className="flex-1 pb-6">
        {/* 로고 + 메뉴 */}
        <header className="flex items-center justify-between px-[31px] pt-16">
          <p className="text-base font-semibold">(서비스 로고)</p>
          <button type="button" aria-label="메뉴">
            <MaskIcon src={menuIcon} className="size-6 bg-black" />
          </button>
        </header>

        {/* 인사말 */}
        <section className="mt-[45px] px-[31px]">
          <h1 className="text-xl leading-7 font-semibold">
            오늘 하루도 고생 많았어요.
          </h1>
          <div className="flex items-end justify-between">
            <p className="text-sm leading-7 text-gray-60">
              지금 피부 컨디션은 어떤가요?
            </p>
            <button
              type="button"
              className="flex items-end gap-1 text-xs text-gray-60"
            >
              더보기
              <img src={moreArrow} alt="" className="h-4 w-2" />
            </button>
          </div>
        </section>

        {/* 피부 컨디션 선택 + 한 줄 메모 */}
        <section className="mt-[18px] px-[22px]">
          <div className="rounded-[20px] border border-gray-20 bg-gray-05 px-[13px] py-5">
            <div className="flex items-start">
              {SKIN_CONDITIONS.map((condition) => {
                const isSelected = selectedCondition === condition.id;

                return (
                  <button
                    type="button"
                    key={condition.id}
                    onClick={() => setSelectedCondition(condition.id)}
                    className="flex w-[76px] shrink-0 cursor-pointer flex-col items-center gap-2"
                  >
                    <span
                      className={`size-10 rounded-full ${
                        isSelected ? "bg-blue-50" : "bg-gray-40"
                      }`}
                    />
                    <span
                      className={`text-center text-[10px] leading-[14px] ${
                        isSelected
                          ? "font-semibold text-blue-50"
                          : "text-gray-60"
                      }`}
                    >
                      {condition.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-[25px] flex items-center gap-2 pl-[9px]">
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="한 줄 메모를 남겨보세요"
                className="h-9 w-[260px] rounded border border-gray-20 px-[10px] text-sm text-black outline-none placeholder:text-gray-60"
              />
              <button
                type="button"
                className="rounded bg-gray-40 px-[10px] py-[10px] text-sm text-white"
              >
                작성
              </button>
            </div>
          </div>
        </section>

        {/* 오늘의 루틴 */}
        <section className="mt-[43px] px-[21px]">
          <div className="rounded-[20px] border border-gray-10 px-[18px] pt-[19px] pb-5">
            <div className="flex items-start justify-between">
              <h2 className="text-base leading-7 font-semibold">
                {TODAY_ROUTINE.title}
              </h2>
              <button
                type="button"
                className="mt-2 flex shrink-0 items-end gap-1 text-xs text-gray-60"
              >
                더보기
                <img src={moreArrow} alt="" className="h-4 w-2" />
              </button>
            </div>

            <p className="mt-[20px] rounded bg-gray-05 px-2 py-1 text-center text-xs text-[#4a5568]">
              {TODAY_ROUTINE.tip}
            </p>

            <ul className="mt-[26px] flex flex-col gap-2">
              {TODAY_ROUTINE.steps.map((step) => {
                const isChecked = checkedIds.includes(step.id);

                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-40 p-3 text-left"
                    >
                      <span className="flex items-end gap-4">
                        {/* 제품 썸네일 placeholder */}
                        <span className="size-10 shrink-0 rounded-lg bg-gray-40" />
                        <span className="flex h-10 flex-col justify-center gap-1">
                          <span className="text-sm leading-[14px] font-semibold">
                            {step.name}
                          </span>
                          <span className="text-xs leading-[14px] text-gray-60">
                            {step.effect}
                          </span>
                        </span>
                      </span>

                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                          isChecked
                            ? "bg-gray-40 text-white"
                            : "border border-gray-20"
                        }`}
                      >
                        {isChecked && (
                          <MaskIcon
                            src={checkIcon}
                            className="size-6 bg-white"
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-[22px] px-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#718096]">
                <span>
                  {doneCount} / {totalSteps} 완료
                </span>
                <span>{donePercent}%</span>
              </div>
              <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-gray-10">
                <div
                  className="h-full rounded-full bg-gray-40 transition-[width]"
                  style={{ width: `${donePercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI 루틴분석 */}
        <section className="mt-[43px] px-[22px]">
          <h2 className="text-lg leading-7 font-semibold">AI 루틴분석</h2>

          <div className="mt-2 rounded-[20px] border border-gray-10 bg-white px-[13px] pt-[10px] pb-[13px]">
            <div className="flex flex-col items-center">
              {/* 아이콘 placeholder */}
              <span className="size-10 rounded-full bg-gray-40" />
              <p className="mt-[9px] text-base leading-7 font-semibold">
                AI 분석 요청하기
              </p>
              <p className="mt-2 text-center text-xs leading-4 text-gray-60">
                링크를 붙여넣으세요. 내 피부에 진짜 필요한 제품인지, 집에 있는
                화장품으로 대신할 수 있는지 AI가 분석해 드릴게요.
              </p>
            </div>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="분석하고 싶은 영상의 URL을 입력하세요"
              className="mt-[22px] h-12 w-full rounded border border-gray-20 px-[10px] text-base text-black outline-none placeholder:text-gray-60"
            />
            <button
              type="button"
              onClick={() => navigate("/RoutineAnalyze")}
              className="mt-2 w-full rounded-[20px] bg-gray-40 px-2 py-4 text-base font-medium text-white"
            >
              AI 분석 요청하기
            </button>
          </div>
        </section>

        {/* 즐겨찾는 화장품 */}
        <section className="mt-[43px]">
          <div className="flex items-center justify-between px-5 pr-[56px]">
            <h2 className="text-lg leading-7 font-semibold">즐겨찾는 화장품</h2>
            <button
              type="button"
              className="flex items-end gap-1 text-xs text-gray-60"
            >
              전체보기
              <img src={moreArrow} alt="" className="h-4 w-2" />
            </button>
          </div>

          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5">
            {FAVORITE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="shrink-0 rounded-[20px] border border-gray-20 bg-white p-3"
              >
                {/* 제품 이미지 placeholder */}
                <div className="size-[116px] rounded-[20px] bg-gray-40" />
                <div className="mt-2 flex w-[92px] flex-col gap-1">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs font-medium text-gray-60">
                    {product.effect}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Main;
