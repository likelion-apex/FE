import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import MyPageHeader from "../../components/My/MyPageHeader";
import MaskIcon from "../../components/MaskIcon";
import { MY_ICONS, MY_MASK_ICONS } from "../../constants/myIcons";

// 탈퇴 시 삭제되는 데이터 목록
const DELETED_DATA = [
  "인벤토리(화장대) 제품 및 루틴 기록",
  "AI 피부 컨디션 분석 및 리포트",
];

function Withdraw() {
  const navigate = useNavigate();
  const nickname = useAuthStore((state) => state.member?.nickname);

  const [isAgreed, setIsAgreed] = useState(false);

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 API 연동
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-gray-05 pb-10">
      <MyPageHeader title="회원탈퇴" />

      {/* 탈퇴 안내 */}
      <div className="mt-[52px] flex flex-col gap-4 rounded-xl border border-red-40 bg-red-02 mx-[39px] p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-[3.718px] bg-red-40">
              <img
                src={MY_ICONS.warning.src}
                alt=""
                className={`shrink-0 ${MY_ICONS.warning.sizeClass}`}
              />
            </span>
            <p className="text-base leading-4 font-semibold text-red-40">
              탈퇴 전 꼭 확인해주세요
            </p>
          </div>

          <p className="text-xs leading-4 text-gray-60">
            탈퇴하시면 {nickname ?? "회원"}님의 소중한 뷰티 데이터가 즉시
            삭제되며, 삭제된 데이터는 다시 복구할 수 없습니다.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {DELETED_DATA.map((data) => (
            <p key={data} className="text-xs leading-4 font-bold text-gray-60">
              {data}
            </p>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* 데이터 삭제 동의 */}
      <div className="flex items-center gap-2 px-5">
        <button
          type="button"
          role="checkbox"
          aria-checked={isAgreed}
          onClick={() => setIsAgreed((prev) => !prev)}
          className={`flex size-6 shrink-0 cursor-pointer items-center justify-center overflow-clip rounded border ${
            isAgreed ? "border-blue-50 bg-blue-50" : "border-gray-20 bg-gray-05"
          }`}
        >
          <MaskIcon
            src={MY_MASK_ICONS.check}
            className={`size-5 ${isAgreed ? "bg-white" : "bg-gray-40"}`}
          />
        </button>

        <p className="text-sm leading-4 font-bold text-gray-60">
          안내 사항을 모두 확인하였으며, 데이터 삭제에 동의합니다.
        </p>
      </div>

      {/* 하단 액션 */}
      <div className="mt-20 flex flex-col items-center gap-3 px-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-lg leading-[30px] font-bold text-white"
        >
          취소하고 계속 이용하기
        </button>

        {/* 안내 사항에 동의해야 탈퇴할 수 있다 */}
        <button
          type="button"
          disabled={!isAgreed}
          onClick={handleWithdraw}
          className="flex h-[30px] cursor-pointer items-center justify-center text-sm leading-[14px] font-bold text-red-25 underline disabled:cursor-not-allowed disabled:opacity-40"
        >
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
}

export default Withdraw;
