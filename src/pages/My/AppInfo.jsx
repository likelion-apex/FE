import { useNavigate } from "react-router-dom";

import MyPageHeader from "../../components/My/MyPageHeader";
import { APP_INFO } from "../../constants/legal";
import soakMark from "../../assets/logo/soak-mark.png";
import arrowRightIcon from "../../assets/icons/arrowRight.svg";

function AppInfo() {
  const navigate = useNavigate();

  const guideItems = [
    { label: "서비스 이용약관", path: "/my/terms" },
    { label: "개인정보 처리방침", path: "/my/privacy" },
    { label: "오픈소스 라이선스", path: "/my/license" },
  ];

  return (
    <div className="flex min-h-full w-full flex-col bg-gray-05 pb-10">
      <MyPageHeader title="앱 정보" />

      <div className="mt-[85px] flex flex-col gap-10 px-[21px]">
        {/* 앱 아이콘 + 버전 */}
        <div className="flex flex-col items-center gap-4">
          <span className="size-20 shrink-0 overflow-clip rounded-lg border border-gray-20 bg-white">
            <img src={soakMark} alt="" className="size-full object-cover" />
          </span>

          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <p className="text-base leading-5 font-bold text-black">
                {APP_INFO.name}
              </p>
              <p className="text-xs leading-4 text-gray-60">
                현재 버전 {APP_INFO.version}
              </p>
            </div>

            <div className="flex items-center justify-center rounded-[20px] border border-green-50 bg-green-05 px-3 py-1">
              <p className="text-xs leading-4 font-semibold whitespace-nowrap text-gray-60">
                최신 버전입니다
              </p>
            </div>
          </div>
        </div>

        {/* 이용 안내 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[13px] font-bold text-gray-60">이용 안내</h2>

          <div className="flex flex-col divide-y divide-gray-20 rounded-lg bg-white">
            {guideItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="flex w-full cursor-pointer items-center justify-between p-4"
              >
                <span className="text-base leading-5 font-medium text-black">
                  {item.label}
                </span>
                <img src={arrowRightIcon} alt="" className="h-6 w-3" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <p className="text-center text-xs leading-5 text-gray-60">
        {APP_INFO.copyright}
      </p>
    </div>
  );
}

export default AppInfo;
