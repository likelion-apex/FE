import { useNavigate } from "react-router-dom";

import backIcon from "../assets/icons/vector.svg";

const TopNavbar = ({ step, totalSteps, stepName }) => {
  const navigate = useNavigate();
  const progress = Math.min((step / totalSteps) * 100, 100);

  return (
    <nav aria-label="온보딩 진행 상황" className="flex flex-col gap-6">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="flex h-8 w-4 cursor-pointer items-center justify-center"
      >
        <img src={backIcon} alt="" className="h-[17px] w-[10px]" />
      </button>
      <div>
        {stepName ? (
          <p className="text-sm font-bold text-gray-60">{stepName}</p>
        ) : null}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-10">
        <div
          className="h-full rounded-full bg-blue-50 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
};

export default TopNavbar;
