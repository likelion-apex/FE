import MaskIcon from "../MaskIcon";
import checkIcon from "../../assets/icons/check.svg";
import productPlaceholder from "../../assets/home/product-placeholder.png";
import completeImage from "../../assets/home/routine-complete.png";

// 루틴을 모두 완료했을 때 보여주는 카드 내용
const CompletedState = () => (
  <div className="flex w-full flex-col items-center px-3 pt-[34px] pb-[34px]">
    <img src={completeImage} alt="" className="size-[124px]" />
    <p className="mt-5 text-center text-xl leading-7 font-semibold text-blue-50">
      오늘의 루틴을 모두 완료했어요
    </p>
    <p className="mt-2 text-center text-xs leading-[18px] text-gray-60">
      꾸준한 케어로 빛나는 피부를 만들어가세요!
      <br />
      오늘 하루도 수고 많으셨습니다.
    </p>
  </div>
);

// 오늘의 나이트 케어 카드. 전 단계 완료 시 완료 화면으로 전환된다.
const NightCareCard = ({ tip, steps, checkedIds, onToggleStep }) => {
  const totalSteps = steps.length;
  const doneCount = checkedIds.length;
  const donePercent =
    totalSteps === 0 ? 0 : Math.round((doneCount / totalSteps) * 100);
  const isAllDone = totalSteps > 0 && doneCount === totalSteps;

  return (
    <div className="w-full overflow-clip rounded-[20px] border border-gray-10 bg-white shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      {isAllDone ? (
        <CompletedState />
      ) : (
        <div className="flex flex-col gap-3 px-5 py-9">
          {/* 오늘 루틴 한 줄 요약 */}
          <p className="rounded-lg bg-white px-2 py-1 text-center text-xs text-gray-60 drop-shadow-[0px_20px_60px_#03c1fb]">
            {tip}
          </p>

          <ul className="mt-3 flex flex-col gap-2">
            {steps.map((step) => {
              const isChecked = checkedIds.includes(step.id);

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => onToggleStep?.(step.id)}
                    aria-pressed={isChecked}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white p-3 text-left ${
                      isChecked ? "border-blue-50" : "border-gray-20"
                    }`}
                  >
                    <span className="flex items-end gap-4">
                      <img
                        src={step.imageUrl || productPlaceholder}
                        alt=""
                        className="size-10 shrink-0 rounded-lg object-cover"
                      />
                      <span className="flex h-10 flex-col justify-center gap-1">
                        <span
                          className={`text-sm leading-[14px] font-semibold ${
                            isChecked ? "text-blue-50" : "text-black"
                          }`}
                        >
                          {step.name}
                        </span>
                      </span>
                    </span>

                    <span
                      className={`flex size-7 shrink-0 items-center justify-center overflow-clip rounded-full ${
                        isChecked ? "bg-blue-50" : "border border-gray-20"
                      }`}
                    >
                      {isChecked && (
                        <MaskIcon src={checkIcon} className="size-6 bg-white" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* 진행률 */}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-50">
              <span>
                {doneCount} / {totalSteps} 완료
              </span>
              <span>{donePercent}%</span>
            </div>
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-blue-05">
              <div
                className="h-full rounded-full bg-blue-50 transition-[width] duration-300"
                style={{ width: `${donePercent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NightCareCard;
