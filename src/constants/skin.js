import combinationIcon from "../assets/skin-type/combination.svg";
import dehydratedOilyIcon from "../assets/skin-type/dehydrated-oily.svg";
import dryIcon from "../assets/skin-type/dry.svg";
import normalIcon from "../assets/skin-type/normal.svg";
import oilyIcon from "../assets/skin-type/oily.svg";

import acneIcon from "../assets/skin-concern/acne.svg";
import atopyIcon from "../assets/skin-concern/atopy.svg";
import brighteningIcon from "../assets/skin-concern/brightening.svg";
import darkCircleIcon from "../assets/skin-concern/dark-circle.svg";
import drynessIcon from "../assets/skin-concern/dryness.svg";
import rednessIcon from "../assets/skin-concern/redness.svg";
import sebumIcon from "../assets/skin-concern/sebum.svg";
import sensitiveIcon from "../assets/skin-concern/sensitive.svg";
import wrinkleIcon from "../assets/skin-concern/wrinkle.svg";

// 온보딩(피부 타입 선택)과 프로필 관리에서 함께 쓰는 선택지.
// 두 화면의 디자인이 동일해 한 곳에서 관리한다.
export const SKIN_TYPES = [
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
    name: "수부지 (수분 부족형 지성)",
    description: "겉은 번들거리는데 속은 찢어질 듯 당겨요",
    icon: dehydratedOilyIcon,
  },
];

export const SKIN_CONCERNS = [
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
