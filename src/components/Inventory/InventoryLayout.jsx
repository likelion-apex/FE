import { useState } from "react";
import { Outlet } from "react-router-dom";

import InventoryNavbar from "./InventoryNavbar";
import TopNavbar from "../layouts/TopNavbar";

const InventoryLayout = () => {
  //네브바 프롭스
  const [navProps, setNavProps] = useState({
    step: 0,
    totalStpes: 0,
    stepName: "",
    rightAction: null,
    showBackButton: false,
  });

  //Outlet 부분에 id 를 달아 스크롤 고정
  return (
    <div className="w-full h-full flex flex-col bg-white text-black overflow-hidden relative no-scrollbar">
      <TopNavbar
        step={navProps.step}
        totalSteps={navProps.totalSteps}
        stepName={navProps.stepName}
        rightAction={navProps.rightAction}
        showBackButton={navProps.showBackButton}
      />
      <div id="main-scroll-box" className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet context={{ setNavProps }} />
      </div>
      <InventoryNavbar />
    </div>
  );
};

export default InventoryLayout;
