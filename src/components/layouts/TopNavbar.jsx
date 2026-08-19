import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backIcon from "../../assets/icons/vector.svg";

let lastProgress = 0;

const TopNavbar = ({
  step,
  totalSteps,
  stepName,
  rightAction,
  showBackButton = true,
  onBack,
}) => {
  const navigate = useNavigate();
  const progress = Math.min((step / totalSteps) * 100, 100);

  // 직전 위치로 먼저 그린 뒤, 페인트가 끝나고 목표 너비로 바꿔야 transition이 재생된다.
  const [width, setWidth] = useState(lastProgress);

  useEffect(() => {
    lastProgress = progress;

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setWidth(progress));
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [progress]);

  const handleGoBack = () => {
    if (onBack) {
      onBack(); // 만약 부모가 넘겨준 특별한 기능(취소 등)이 있다면 그걸 실행!
    } else {
      navigate(-1); // 따로 넘겨준 게 없으면 그냥 평범하게 뒤로 가기
    }
  };

  return (
    <nav aria-label="온보딩 진행 상황" className="flex flex-col gap-6 ">
      <div className="pt-[53px]">
        <div className="relative flex h-[32px] items-center justify-center">
          {showBackButton && (
            <button
              type="button"
              aria-label="뒤로 가기"
              onClick={handleGoBack}
              className="absolute left-[25px] flex h-8 w-4 cursor-pointer items-center justify-center"
            >
              <img src={backIcon} alt="" className="h-[17px] w-[10px]" />
            </button>
          )}
          <div>
            {stepName ? (
              <p className="text-lg font-semibold text-black">{stepName}</p>
            ) : null}
          </div>

          {rightAction && (
            <button
              type="button"
              onClick={rightAction.onClick}
              className={`absolute right-[25px] flex h-8 items-center justify-end text-[16px] font-medium cursor-pointer ${
                rightAction.textColor || "text-black"
              }`}
            >
              {rightAction.content}
            </button>
          )}
        </div>
      </div>
      {progress > 0 && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-10 ">
          <div
            className="h-full rounded-full bg-blue-50 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${width}%` }}
          />
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
