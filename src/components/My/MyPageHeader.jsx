import { useNavigate } from "react-router-dom";

import backIcon from "../../assets/icons/vector.svg";

// 마이페이지 하위 화면 상단바 (뒤로가기 + 가운데 제목 + 오른쪽 액션)
const MyPageHeader = ({ title, actionLabel, onAction }) => {
  const navigate = useNavigate();

  return (
    <header className="relative flex h-8 items-center justify-center pt-[47px]">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="absolute left-[25px] flex h-8 w-4 cursor-pointer items-center justify-center"
      >
        <img src={backIcon} alt="" className="h-[17px] w-[10px]" />
      </button>

      <p className="text-base leading-7 font-semibold text-black">{title}</p>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="absolute right-[25px] cursor-pointer text-base leading-7 font-semibold text-blue-50"
        >
          {actionLabel}
        </button>
      )}
    </header>
  );
};

export default MyPageHeader;
