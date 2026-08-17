import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageHeader from "../../components/My/MyPageHeader";
import IconBadge from "../../components/My/IconBadge";
import ConfirmDialog from "../../components/My/ConfirmDialog";
import arrowRightIcon from "../../assets/icons/arrowRight.svg";
import kakaoCircle from "../../assets/kakaoCircle.png";
import { MY_ICONS } from "../../constants/myIcons";

// 연동된 계정 정보. 추후 백엔드 응답으로 교체
const LINKED_ACCOUNT = {
  provider: "카카오톡으로 로그인됨",
  email: "yunji_beauty@kakao.com",
};

function AccountManage() {
  const navigate = useNavigate();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    // TODO: 로그아웃 API 연동
  };

  const handleWithdraw = () => navigate("/my/withdraw");

  return (
    <div className="flex min-h-full w-full flex-col bg-gray-05">
      <MyPageHeader title="계정 관리" />

      <div className="flex-1 px-5">
        <p className="mt-[29px] text-sm leading-[14px] font-bold text-gray-60">
          연동된 계정 정보
        </p>

        {/* 연동 계정 카드 */}
        <div className="mt-4 flex h-[68px] w-full items-center gap-[15px] overflow-clip rounded-lg border border-gray-20 bg-white px-5">
          <img src={kakaoCircle} alt="" className="size-[35px] shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="text-base leading-5 font-bold text-black">
              {LINKED_ACCOUNT.provider}
            </p>
            <p className="text-sm leading-5 text-gray-60">
              {LINKED_ACCOUNT.email}
            </p>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="mt-[25px] border-t border-gray-20">
          <button
            type="button"
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex w-full cursor-pointer items-center justify-between py-5"
          >
            <span className="flex items-center gap-2">
              <IconBadge icon={MY_ICONS.logout} />
              <span className="text-sm font-medium text-black">로그아웃</span>
            </span>
            <img src={arrowRightIcon} alt="" className="h-6 w-3" />
          </button>
        </div>
      </div>

      {/* 회원탈퇴 */}
      <div className="px-5 pb-[73px]">
        <button
          type="button"
          onClick={handleWithdraw}
          className="cursor-pointer text-sm leading-[14px] font-bold text-red-25 underline"
        >
          회원탈퇴
        </button>
      </div>

      {isLogoutDialogOpen && (
        <ConfirmDialog
          title="로그아웃"
          description="로그아웃하면 앱이 재시작됩니다."
          confirmLabel="로그아웃"
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutDialogOpen(false)}
        />
      )}
    </div>
  );
}

export default AccountManage;
