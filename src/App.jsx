import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/layouts/Layout";
import NotFound from "./pages/NotFound";
import RoutineAnalysis from "./pages/RoutineAnalysis/RoutineAnalysis";
import SmartLoding from "./pages/RoutineAnalysis/SmartLoading";
import AnalyzeResult from "./pages/RoutineAnalysis/AnalyzeResult";
import OptimizedRoutine from "./pages/RoutineAnalysis/OptimizedRoutine";
import Onboarding from "./pages/Onboarding/Onboarding";
import KakaoCallback from "./pages/Onboarding/KakaoCallback";
import SkinType from "./pages/Onboarding/SkinType";
import SkinConcern from "./pages/Onboarding/SkinConcern";
import UsingSkincare from "./pages/Onboarding/UsingSkincare";
import Nickname from "./pages/Onboarding/Nickname";
import Main from "./pages/Main";
import MyRoutinePage from "./pages/MyRoutine/MyRoutinePage";
//수정필요
import ItemDetail from "./pages/ItemDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-10 flex justify-center items-center">
      {/* 아이폰 17 컨테이너*/}
      <main className="w-[402px] h-[874px] bg-white text-black overflow-y-auto relative no-scrollbar">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
            <Route path="/onboarding/*" element={<Onboarding />} />
            <Route path="/onboarding/skin-type" element={<SkinType />} />
            <Route path="/onboarding/skin-concern" element={<SkinConcern />} />
            <Route path="/onboarding/skincare" element={<UsingSkincare />} />
            <Route path="/onboarding/nickname" element={<Nickname />} />
            <Route path="/main" element={<Main />} />
            <Route path="/ItemDetail" element={<ItemDetail />} />

            <Route element={<Layout />}>
              <Route path="/RoutineAnalysis" element={<RoutineAnalysis />} />
              <Route
                path="/RoutineAnalysis/Smartloading"
                element={<SmartLoding />}
              />
              <Route
                path="/RoutineAnalysis/AnalyzeResult"
                element={<AnalyzeResult />}
              />
              <Route
                path="/RoutineAnalysis/OptimizedRoutine"
                element={<OptimizedRoutine />}
              />
              <Route path="/MyRoutinePage" element={<MyRoutinePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
