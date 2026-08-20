import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import LoginPage from "./pages/Onboarding/LoginPage";

import Layout from "./components/layouts/Layout";
import RoutineAnalysis from "./pages/RoutineAnalysis/RoutineAnalysis";
import SmartLoding from "./pages/RoutineAnalysis/SmartLoading";
import AnalyzeResult from "./pages/RoutineAnalysis/AnalyzeResult";
import OptimizedRoutine from "./pages/RoutineAnalysis/OptimizedRoutine";
import SearchItem from "./pages/RoutineAnalysis/SearchItem";
import ItemRoutine from "./pages/RoutineAnalysis/ItemRoutine";

import Onboarding from "./pages/Onboarding/Onboarding";
import KakaoCallback from "./pages/Onboarding/KakaoCallback";
import SkinType from "./pages/Onboarding/SkinType";
import SkinConcern from "./pages/Onboarding/SkinConcern";
import UsingSkincare from "./pages/Onboarding/UsingSkincare";
import Nickname from "./pages/Onboarding/Nickname";

import MyRoutine from "./pages/MyRoutine/MyRoutine";
import RoutineDetail from "./pages/MyRoutine/RoutineDetail";

import MyPage from "./pages/My/MyPage";
import ProfileManage from "./pages/My/ProfileManage";
import AccountManage from "./pages/My/AccountManage";
import AnalysisReport from "./pages/My/AnalysisReport";
import RoutineAlarm from "./pages/My/RoutineAlarm";
import Withdraw from "./pages/My/Withdraw";
import AppInfo from "./pages/My/AppInfo";
import Terms from "./pages/My/Terms";
import Privacy from "./pages/My/Privacy";
import License from "./pages/My/License";

import InventoryItemDetail from "./pages/Inventory/InventoryItemDetail";
import InventoryLayout from "./components/Inventory/InventoryLayout";
import InventoryHome from "./pages/Inventory/InventoryHome";
import InventoryStar from "./pages/Inventory/InventoryStar";
import InventorySearch from "./pages/Inventory/InventorySearch";
import InventoryLibrary from "./pages/Inventory/InventoryLibrary";

import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import useUserStore from "./store/userStore";

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);

  useEffect(() => {
    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken, fetchUserInfo]);

  return (
    <div className="min-h-screen bg-gray-10 flex justify-center items-center">
      {/* 아이폰 17 컨테이너*/}
      <main className="w-[402px] h-[874px] bg-white text-black overflow-y-auto relative no-scrollbar">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/onboarding/*" element={<Onboarding />} />
            <Route path="/onboarding/LoginPage" element={<LoginPage />} />
            <Route path="/onboarding/kakao" element={<KakaoCallback />} />
            <Route path="/onboarding/skin-type" element={<SkinType />} />
            <Route path="/onboarding/skin-concern" element={<SkinConcern />} />
            <Route path="/onboarding/skincare" element={<UsingSkincare />} />
            <Route path="/onboarding/nickname" element={<Nickname />} />
            <Route path="/main" element={<Main />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/my/profile" element={<ProfileManage />} />
            <Route path="/my/account" element={<AccountManage />} />
            <Route path="/my/report/:type" element={<AnalysisReport />} />
            <Route path="/my/alarm/routine" element={<RoutineAlarm />} />
            <Route path="/my/withdraw" element={<Withdraw />} />
            <Route path="/my/app-info" element={<AppInfo />} />
            <Route path="/my/terms" element={<Terms />} />
            <Route path="/my/privacy" element={<Privacy />} />
            <Route path="/my/license" element={<License />} />
            <Route
              path="/RoutineAnalysis/Smartloading"
              element={<SmartLoding />}
            />
            <Route
              path="/MyRoutine/RoutineDetail/:id"
              element={<RoutineDetail />}
            />
            <Route
              path="/RoutineAnalysis/AnalyzeResult"
              element={<AnalyzeResult />}
            />
            <Route
              path="/RoutineAnalysis/AnalyzeResult/:analysisId"
              element={<AnalyzeResult />}
            />
            <Route
              path="/RoutineAnalysis/OptimizedRoutine"
              element={<OptimizedRoutine />}
            />{" "}
            <Route
              path="/RoutineAnalysis/SearchItem"
              element={<SearchItem />}
            />
            <Route
              path="/RoutineAnalysis/ItemRoutine"
              element={<ItemRoutine />}
            />
            <Route element={<Layout />}>
              <Route path="/RoutineAnalysis" element={<RoutineAnalysis />} />
              <Route
                path="/RoutineAnalysis/AnalyzeResult/:analysisId"
                element={<AnalyzeResult />}
              />
              <Route path="/MyRoutine" element={<MyRoutine />} />
            </Route>
            <Route path="/inventory" element={<InventoryLayout />}>
              <Route index element={<InventoryHome />} />
              <Route path="item-detail" element={<InventoryItemDetail />} />
              <Route path="star" element={<InventoryStar />} />
              <Route path="library" element={<InventoryLibrary />} />
            </Route>
            <Route
              path="/inventory/item-detail/:inventoryId"
              element={<InventoryItemDetail />}
            />
            <Route path="/inventory/search" element={<InventorySearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
