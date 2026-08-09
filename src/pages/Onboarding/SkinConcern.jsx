import { useState } from "react";
import { useNavigate } from "react-router-dom";

import acneIcon from "../../assets/skin-concern/acne.svg";
import atopyIcon from "../../assets/skin-concern/atopy.svg";
import brighteningIcon from "../../assets/skin-concern/brightening.svg";
import darkCircleIcon from "../../assets/skin-concern/dark-circle.svg";
import drynessIcon from "../../assets/skin-concern/dryness.svg";
import rednessIcon from "../../assets/skin-concern/redness.svg";
import sebumIcon from "../../assets/skin-concern/sebum.svg";
import sensitiveIcon from "../../assets/skin-concern/sensitive.svg";
import wrinkleIcon from "../../assets/skin-concern/wrinkle.svg";
import MaskIcon from "../../components/MaskIcon";
import NextButton from "../../components/NextButton";
import TopNavbar from "../../components/layouts/TopNavbar";

const SKIN_CONCERNS = [
  { id: 1, name: "속건조", icon: drynessIcon },
  { id: 2, name: "여드름", icon: acneIcon },
  { id: 3, name: "민감성", icon: sensitiveIcon },
  { id: 4, name: "미백/잡티", icon: brighteningIcon },
  { id: 5, name: "다크서클", icon: darkCircleIcon },
  { id: 6, name: "주름/탄력", icon: wrinkleIcon },
  { id: 7, name: "피지/블랙헤드", icon: sebumIcon },
  { id: 8, name: "홍조", icon: rednessIcon },
  { id: 9, name: "아토피", icon: atopyIcon },
];

function SkinConcern() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);

  const toggle = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id],
    );

  return (
    <div className="relative min-h-full w-full bg-white px-5 pt-[51px] pb-[131px]">
      <TopNavbar step={3} totalSteps={4} />

      <div className="mt-6 flex flex-col gap-9">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-black">
            어떤 피부 고민이 있으신가요?
          </h1>
          <p className="text-sm leading-5 text-gray-60">
            고민을 알려주시면 AI가 가장 효과적인
            <br />
            해결책을 찾아드려요.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="px-2 text-xs leading-[26px] font-semibold text-blue-50">
            중복 선택 가능
          </p>

          <div className="flex flex-wrap gap-2">
            {SKIN_CONCERNS.map((concern) => {
              const isSelected = selectedIds.includes(concern.id);

              return (
                <button
                  type="button"
                  key={concern.id}
                  aria-pressed={isSelected}
                  onClick={() => toggle(concern.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-3xl border p-4 transition ${
                    isSelected
                      ? "border-blue-50 bg-blue-05"
                      : "border-gray-20 bg-gray-05"
                  }`}
                >
                  <MaskIcon
                    src={concern.icon}
                    className={`size-4 shrink-0 ${
                      isSelected ? "bg-blue-50" : "bg-gray-40"
                    }`}
                  />
                  <span
                    className={`text-sm whitespace-nowrap ${
                      isSelected ? "font-bold text-blue-50" : "text-gray-60"
                    }`}
                  >
                    {concern.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-[51px] left-5">
        <NextButton
          disabled={selectedIds.length === 0}
          onClick={() => navigate("/onboarding/skincare")}
        />
      </div>
    </div>
  );
}

export default SkinConcern;
