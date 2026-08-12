//자식 라우트가 들어갈 자리를 비워두는 중첩 라우팅
import { useState } from "react";
import { Outlet } from "react-router-dom";

import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";

const Layout = () => {
  //네브바 프롭스
  const [navProps, setNavProps] = useState({
    step: 0,
    totalSteps: 0,
    stepName: "",
    rightAction: null,
  });

  //Outlet 부분에 id 를 달아 스크롤 고정
  return (
    <div className="w-full h-full flex flex-col bg-white text-black overflow-hidden relative no-scrollbar">
      <TopNavbar
        {...navProps}
      />
      <div id="main-scroll-box" className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet context={{ setNavProps }} />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
