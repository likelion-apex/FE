import { NavLink, useNavigate } from "react-router-dom";

import MaskIcon from "../MaskIcon";
import backArrowIcon from "../../assets/icons/backArrow.svg";
import inventoryIcon from "../../assets/icons/InventoryNav/inventory.svg";
import favoriteIcon from "../../assets/icons/InventoryNav/favorite.svg";
import libraryIcon from "../../assets/icons/InventoryNav/library.svg";
import searchIcon from "../../assets/icons/InventoryNav/search.svg";

const NAV_ITEMS = [
  { label: "인벤토리", icon: inventoryIcon, to: "/inventory", end: true },
  { label: "즐겨찾기", icon: favoriteIcon, to: "/inventory/star" },
  { label: "라이브러리", icon: libraryIcon, to: "/inventory/library" },
  { label: "검색", icon: searchIcon, to: "/inventory/search" },
];

const InventoryNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="shrink-0 flex justify-center px-4 pb-4">
      {/* 홈으로 버튼은 아이콘이 작아 다른 항목과 아래쪽 기준으로 맞춘다 */}
      <nav className="flex items-end gap-4 rounded-[36px] border border-gray-20 bg-white px-[9px] py-[13px]">
        <button
          type="button"
          onClick={() => navigate("/main")}
          className="flex w-[46px] shrink-0 cursor-pointer flex-col items-center gap-1 pb-1 pl-["
        >
          <span className="flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full bg-gray-10">
            <img
              src={backArrowIcon}
              alt=""
              className="h-[17px] w-3 -rotate-90"
            />
          </span>
          <span className="text-center text-xs leading-4 font-medium whitespace-nowrap text-gray-30">
            홈으로
          </span>
        </button>

        <div className="flex items-end gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex w-[46px] shrink-0 flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <MaskIcon
                    src={item.icon}
                    className={`size-8 ${isActive ? "bg-blue-50" : "bg-gray-30"}`}
                  />
                  <span
                    className={`text-center text-sm font-medium whitespace-nowrap ${
                      isActive ? "text-blue-50" : "text-gray-30"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default InventoryNavbar;
