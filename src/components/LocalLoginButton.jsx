import { useNavigate } from "react-router-dom";

const LocalLoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/onboarding/id-login")}
      className="flex h-[68px] w-full cursor-pointer items-center justify-center gap-[50px] rounded-lg border border-white/70 bg-white/90 px-5 py-4"
    >
      <span className="flex size-[35px] shrink-0 items-center justify-center rounded-full bg-blue-05 text-[11px] font-bold text-blue-60">
        ID
      </span>
      <span className="text-[18px] leading-[30px] font-semibold text-blue-60">
        ID/PW로 시작하기
      </span>
      <span aria-hidden className="size-[35px] shrink-0" />
    </button>
  );
};

export default LocalLoginButton;
