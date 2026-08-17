// 마이페이지의 파란 사각 배지 아이콘 (요약 카드 / 메뉴 목록 공용)
const IconBadge = ({ icon }) => {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue-50">
      <img src={icon.src} alt="" className={`shrink-0 ${icon.sizeClass}`} />
    </span>
  );
};

export default IconBadge;
