//자식 라우트가 들어갈 자리를 비워두는 중첩 라우팅
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";

const Layout = ({}) => {
  return (
    <div className="w-full h-full bg-white text-black overflow-hidden relative no-scrollbar">
      <TopNavbar />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
