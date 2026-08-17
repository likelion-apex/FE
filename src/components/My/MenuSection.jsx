import arrowRightIcon from "../../assets/icons/arrowRight.svg";
import IconBadge from "./IconBadge";

// 마이페이지 하단 메뉴 목록 (설정 및 계정 관리 / 고객 지원 및 앱 정보)
const MenuSection = ({ title, items }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-sm font-bold text-gray-60">{title}</p>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={item.onClick}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <IconBadge icon={item.icon} />
                <span className="text-sm font-medium text-black">
                  {item.label}
                </span>
              </span>
              <img src={arrowRightIcon} alt="" className="h-6 w-3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;
