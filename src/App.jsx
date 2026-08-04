import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
