import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NotFound from "./pages/NotFound";
import RoutineAnalyze from "./pages/RoutineAnalyze/RoutineAnalyze";
import SmartLoding from "./pages/RoutineAnalyze/SmartLoading";
import AnalyzeResult from "./pages/RoutineAnalyze/AnalyzeResult";
import Onboarding from "./pages/Onboarding/Onboarding";
import KakaoCallback from "./pages/Onboarding/KakaoCallback";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-10 flex justify-center items-center">
      {/* 아이폰 17 컨테이너*/}
      <main className="w-[402px] h-[874px] bg-white text-black overflow-y-auto relative no-scrollbar">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
            <Route path="/onboarding/*" element={<Onboarding />} />
            <Route path="/RoutineAnalyze">
              <Route index element={<RoutineAnalyze />} />
              <Route path="Smartloading" element={<SmartLoding />} />
              <Route path="AnalyzeResult" element={<AnalyzeResult />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
