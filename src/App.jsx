import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Onboarding from "./pages/Onboarding";
import KakaoCallback from "./pages/KakaoCallback";
import RoutineAnalyze from "./pages/RoutineAnalyze";

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
            <Route path="/RoutineAnalyze" element={<RoutineAnalyze />} />
            <Route path="*" element={<RoutineAnalyze />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
