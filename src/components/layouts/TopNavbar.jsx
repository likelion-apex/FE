import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import backIcon from "../../assets/icons/vector.svg";

let lastProgress = 0;

const TopNavbar = ({ step, totalSteps, stepName }) => {
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

  return (
    <nav aria-label="온보딩 진행 상황" className="flex flex-col gap-6 ">
      <div className="relative flex items-center justify-center gap-4 pt-[53px]">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="absolute left-[25px] flex h-8 w-4 cursor-pointer items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-[17px] w-[10px]" />
        </button>
        <div>
          {stepName ? (
            <p className="text-lg font-semibold text-black">{stepName}</p>
          ) : null}
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
