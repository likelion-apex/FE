import React from "react";
import SolventItem from "./SolventItem";
import Information from "../../assets/routine-analyze/Information.svg";
import dangerIcon from "../../assets/routine-analyze/dangerIcon.svg";

const IngredientInfo = ({ data }) => {
  // 💡 데이터가 아예 없을 경우를 대비한 최강의 방어 코드
  if (!data) return null;

  const stats = data?.ingredientStats || {};
  const ingredientsList = data?.ingredients || [];

  const totalCount = stats?.totalCount || ingredientsList.length || 0;

  const lowCount = stats?.lowRiskCount || 0;
  const moderateCount = stats?.moderateRiskCount || 0;
  const highCount = stats?.highRiskCount || 0;
  const unknownRiskCount = stats?.unknownRiskCount || 0;

  const caution20Count = stats?.caution20Count || 0;
  const allergenCount = stats?.allergenCount || 0;

  // 그래프 퍼센티지 계산
  const lowPercent = totalCount > 0 ? (lowCount / totalCount) * 100 : 0;
  const mediumPercent = totalCount > 0 ? (moderateCount / totalCount) * 100 : 0;
  const highPercent = totalCount > 0 ? (highCount / totalCount) * 100 : 0;
  const unknownRiskPercent =
    totalCount > 0 ? (unknownRiskCount / totalCount) * 100 : 0;

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h3 className="mb-4 text-[15px] font-bold text-black">성분 구성</h3>
        <div className="mb-2 flex items-center gap-3 text-[12px] text-gray-500">
          {lowCount > 0 && (
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-50" /> 1-2 낮은 위험
            </span>
          )}
          {moderateCount > 0 && (
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-yellow-50a" /> 3-6 중간
              위험
            </span>
          )}
          {highCount > 0 && (
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-40" /> 7-10 높은 위험
            </span>
          )}
          {unknownRiskCount > 0 && (
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-gray-30" /> 정보 없음
            </span>
          )}
        </div>
        {/* 막대 그래프 바 */}
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-10">
          <div
            style={{ width: `${lowPercent}%` }}
            className="bg-blue-50 transition-all duration-500"
          />
          <div
            style={{ width: `${mediumPercent}%` }}
            className="bg-yellow-50a transition-all duration-500"
          />
          <div
            style={{ width: `${highPercent}%` }}
            className="bg-red-40 transition-all duration-500"
          />
          <div
            style={{ width: `${unknownRiskPercent}%` }}
            className="bg-gray-20 transition-all duration-500"
          />
        </div>
      </div>

      {/* 2️⃣ 요약 리스트 */}
      <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-6 text-[14px]">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-medium text-gray-60">전체 성분</span>
          <span className="font-bold text-gray-60">{totalCount}개</span>
        </div>
        <div className="flex items-center justify-between text-gray-30">
          <span className="flex items-center gap-2.5">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-red-40">
              <img
                src={dangerIcon}
                alt="경고"
                className="size-3 object-contain"
              />
            </div>
            20가지 주의성분
          </span>
          <span>{caution20Count}개</span>
        </div>
        <div className="flex items-center justify-between text-gray-30">
          <span className="flex items-center gap-2.5">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-yellow-50a">
              <img
                src={dangerIcon}
                alt="경고"
                className="size-3 object-contain"
              />
            </div>
            알레르기 주의성분
          </span>
          <span>{allergenCount}개</span>
        </div>
      </div>

      {/* 3️⃣ 전성분 상세 리스트 */}
      <div>
        <div className="mb-4 flex items-end justify-between pb-2">
          <span className="text-[14px] font-bold text-gray-900">
            전성분 <span className="text-blue-50">{totalCount}개</span>
          </span>
          <div className="flex items-center gap-1 text-[12px] text-gray-40">
            <img src={Information} alt="info" />
            <p>함량이 높은 순서로 보여집니다</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-3">
          {/* 💡 배열 렌더링. key는 고유한 order 값 사용 */}
          {ingredientsList.map((ing) => (
            <SolventItem key={ing.order} ing={ing} />
          ))}
        </div>
      </div>

      {/* 4️⃣ 하단 고지사항 */}
      <div className="whitespace-pre-line break-keep rounded-xl bg-gray-05 p-4 text-[12px] leading-relaxed text-gray-40">
        구매 전 제조·판매업자가 표기한 전성분 표를 한 번 더 확인하시길
        권장드립니다.
        <br />
        제품허위 정보를 허가 없이 상업적으로 활용할 경우, 법적 조치를 받을 수
        있습니다.
        <br />
        성분별 해당 제품 내 배합 비율은 브랜드사에서 제공한 정보로 모든 책임은
        브랜드사에 있습니다.
      </div>
    </div>
  );
};

export default IngredientInfo;
