// 배지 크기. 메뉴/요약 카드는 24px, 알림 시간 설정은 36px를 쓴다.
const BADGE_SIZE_CLASS = {
  sm: "size-6",
  md: "size-9",
};

// 마이페이지의 파란 사각 배지 아이콘 (요약 카드 / 메뉴 목록 공용)
const IconBadge = ({ icon, size = "sm" }) => {
  return (
    <span
      className={`flex ${BADGE_SIZE_CLASS[size]} shrink-0 items-center justify-center rounded-lg bg-blue-50`}
    >
      <img src={icon.src} alt="" className={`shrink-0 ${icon.sizeClass}`} />
    </span>
  );
};

export default IconBadge;
