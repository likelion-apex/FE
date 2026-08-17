import soakMark from "../../assets/logo/soak-mark.png";

// 마이페이지 상단 프로필 영역 (프로필 + 피부 타입 + 고민 태그)
const ProfileSummary = ({ user, onManageProfile }) => {
  return (
    <div className="flex w-full flex-col gap-3 border-b border-gray-20 py-5">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          {/* 프로필 이미지. 미설정이면 SOAK 심볼을 기본 이미지로 쓴다 */}
          <span className="size-10 shrink-0 overflow-clip rounded-full bg-blue-05">
            <img
              src={user.imageUrl ?? soakMark}
              alt=""
              className="size-full object-cover"
            />
          </span>
          <div className="flex flex-col">
            <p className="text-xl leading-7 font-semibold text-black">
              {user.name} 님
            </p>
            <p className="text-sm leading-5 font-medium text-blue-50">
              {user.skinType}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onManageProfile}
          className="flex h-[30px] shrink-0 cursor-pointer items-center justify-center rounded-[20px] border border-blue-50 bg-white p-2 text-xs leading-[14px] font-bold whitespace-nowrap text-blue-50"
        >
          프로필 관리
        </button>
      </div>

      <div className="flex items-center gap-2 px-10">
        {user.concerns.map((concern) => (
          <span
            key={concern}
            className="flex h-[30px] items-center justify-center rounded-[20px] bg-blue-05 p-2 text-xs leading-[14px] font-bold whitespace-nowrap text-blue-50"
          >
            #{concern}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileSummary;
