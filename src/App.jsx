import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-10 flex justify-center items-center">
      {/* 아이폰 17 컨테이너*/}
      <main className="w-[402px] h-[874px] bg-white text-black overflow-y-auto relative no-scrollbar"></main>
    </div>
  );
}

export default App;
