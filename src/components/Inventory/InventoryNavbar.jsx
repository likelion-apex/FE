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
      <nav className="flex items-center gap-4 rounded-[36px] border border-gray-20 bg-white px-2 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-10"
        >
          <img src={backArrowIcon} alt="" className="h-[18px] w-3 -rotate-90" />
        </button>

        <div className="flex items-center gap-6 px-5">
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
                    className={`size-8 ${isActive ? "bg-black" : "bg-gray-40"}`}
                  />
                  <span
                    className={`text-center text-sm font-medium whitespace-nowrap ${
                      isActive ? "text-black" : "text-gray-40"
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
