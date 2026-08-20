import { useNavigate } from "react-router-dom";

import checkIcon from "../../assets/skin-type/check.svg";
import combinationIcon from "../../assets/skin-type/combination.svg";
import dehydratedOilyIcon from "../../assets/skin-type/dehydrated-oily.svg";
import dryIcon from "../../assets/skin-type/dry.svg";
import normalIcon from "../../assets/skin-type/normal.svg";
import oilyIcon from "../../assets/skin-type/oily.svg";
import MaskIcon from "../../components/MaskIcon";
import NextButton from "../../components/NextButton";
import TopNavbar from "../../components/layouts/TopNavbar";

import { updateSkinType } from "../../api/member"
import useOnboardingStore from "../../store/onboardingStore";

const SKIN_TYPES = [
  {
    id: 1,
    name: "건성",
    description: "세안 후 피부가 자주 당기고 건조해요",
    icon: dryIcon,
  },
  {
    id: 2,
    name: "중성",
    description: "유수분 밸런스가 적당하고 편안해요",
    icon: normalIcon,
  },
  {
    id: 3,
    name: "지성",
    description: "유분기가 많고 금방 번들거려요",
    icon: oilyIcon,
  },
  {
    id: 4,
    name: "복합성",
    description: "T존은 지성, U존은 건성이에요",
    icon: combinationIcon,
  },
  {
    id: 5,
    name: "수부지",
    description: "겉은 번들거리는데 속은 찢어질 듯 당겨요",
    icon: dehydratedOilyIcon,
  },
];

function SkinType() {
  const navigate = useNavigate();
  const selectedId = useOnboardingStore((state) => state.skinTypeId);
  const setSelectedId = useOnboardingStore((state) => state.setSkinTypeId);

  const handleNext = async () => {
    const skinType = SKIN_TYPES.find((type) => type.id === selectedId,)?.name;

    try {
    await updateSkinType(skinType);
    navigate("/onboarding/skin-concern");
  } catch (err) {
    console.error("피부 타입 저장 실패:", err);
  }
  }

  return (
    <div className="relative min-h-full w-full bg-white px-5 pt-[51px] pb-[131px]">
      <TopNavbar step={2} totalSteps={4} />

      <div className="mt-6 flex flex-col gap-9">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-black">
            피부 타입을 선택해주세요
          </h1>
          <p className="text-sm text-gray-60">
            AI가 내 피부에 꼭 맞는 관리를 도와드릴게요.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="px-2 text-xs leading-[26px] font-bold text-blue-50">
            1개만 선택해주세요
          </p>

          <div className="flex flex-col gap-4">
            {SKIN_TYPES.map((skinType) => {
              const isSelected = selectedId === skinType.id;

              return (
                <button
                  type="button"
                  key={skinType.id}
                  onClick={() => setSelectedId(skinType.id)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3 py-4 text-left transition ${
                    isSelected
                      ? "border-blue-50 bg-blue-05"
                      : "border-gray-10 bg-gray-05"
                  }`}
                >
                  <span className="flex items-center gap-5">
                    <MaskIcon
                      src={skinType.icon}
                      className={`size-6 shrink-0 ${
                        isSelected ? "bg-blue-50" : "bg-gray-40"
                      }`}
                    />

                    <span className="flex flex-col gap-1">
                      <span
                        className={`text-base leading-5 font-bold ${
                          isSelected ? "text-blue-50" : "text-black"
                        }`}
                      >
                        {skinType.name}
                      </span>
                      <span
                        className={`text-sm leading-5 ${
                          isSelected ? "text-blue-50" : "text-gray-60"
                        }`}
                      >
                        {skinType.description}
                      </span>
                    </span>
                  </span>

                  {isSelected && (
                    <span className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                      <img
                        src={checkIcon}
                        alt=""
                        className="h-[12px] w-[16px]"
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-[51px] left-5">
        <NextButton
          disabled={selectedId === null}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default SkinType;
