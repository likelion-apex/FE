//자식 라우트가 들어갈 자리를 비워두는 중첩 라우팅
import { useState } from "react";
import { Outlet } from "react-router-dom";

import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";

const Layout = () => {
  //네브바 프롭스
  const [navProps, setNavProps] = useState({
    step: 0,
    totalStpes: 0,
    stepName: "",
  });

  return (
    <div className="w-full h-full flex flex-col bg-white text-black overflow-hidden relative no-scrollbar">
      <TopNavbar
        step={navProps.step}
        totalSteps={navProps.totalSteps}
        stepName={navProps.stepName}
      />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet context={{ setNavProps }} />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
