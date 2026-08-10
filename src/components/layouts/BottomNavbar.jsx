import { NavLink } from "react-router-dom";

import MaskIcon from "../MaskIcon";
import homeIcon from "../../assets/icons/nav/home.svg";
import aiAnalyzeIcon from "../../assets/icons/nav/ai-analyze.svg";
import routineIcon from "../../assets/icons/nav/routine.svg";
import inventoryIcon from "../../assets/icons/nav/inventory.svg";
import myIcon from "../../assets/icons/nav/my.svg";

const NAV_ITEMS = [
  { label: "홈", icon: homeIcon, to: "/main" },
  { label: "AI분석", icon: aiAnalyzeIcon, to: "/RoutineAnalyze" },
  { label: "루틴", icon: routineIcon, to: "/routine" },
  { label: "인벤토리", icon: inventoryIcon, to: "/inventory" },
  { label: "My", icon: myIcon, to: "/my" },
];

const BottomNavbar = () => {
  return (
    <nav className="sticky bottom-0 flex items-center gap-8 bg-white px-[22px] py-3">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
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
    </nav>
  );
};

export default BottomNavbar;
