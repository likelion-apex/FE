export const USER_NAME = "윤지";

export const RECENT_ROUTINES = [
  {
    title: "환절기 수부지 진정 케어",
    day: 2,
    matchCount: 3,
  },
  {
    title: "뷰티 유튜버 A의 나이트 루틴",
    day: 5,
    matchCount: 1,
  },
  {
    title: "민감 홍조피부 스킨케어 루틴",
    day: 7,
    matchCount: 3,
  },
  {
    title: "속건조 잡는 꿀광 보습 루틴",
    day: 10,
    matchCount: 4,
  },
  {
    title: "여드름 피부 딥클렌징 케어",
    day: 14,
    matchCount: 2,
  },
];

export const MOCK_YOUTUBE_DATA = {
  title: "올리브영 추천템으로 완성하는\n수부지 나이트 루틴 🌙",
  channel: "@뷰티크리에이터_윤지짱",
  duration: "0:58",
  views: "12만",
  type: "Shorts",
};

export const ROUTINE_BRIEFING_DATA = [
  {
    id: 1,
    title: "속건조 타파 루틴",
    tag: "여름철 수부지 맞춤",
    score: 88,
    matchDetails: [
      "수부지 맞춤 보습 성분 12개 매칭",
      `${USER_NAME}님 피부 알레르기 유발 성분 0개`,
    ],
    coreGoal: "속건조 해결 & 장벽 재생",
    synergy: "히알루론산 + 고함량 판테놀",
    description:
      "수분 공급(자작나무 앰플)과 장벽 보호(판테놀 크림)의 시너지가 돋보이는 4단계 루틴입니다. 다만, 각질 제거 성분(HATCHING EX-07)이 포함된 토너가 있어 민감성 피부는 매일 사용하기보다 주 2~3회로 조절하는 것을 권장합니다.",
  },
];

export const MATCHING_REPORT_DATA = {
  id: 1,
  keepCount: 3,
  replacedCount: 1,
  replacedDetail: "(토너→진정 패드)",
  description: `각질 제거 성분이 있는 원본 토너를 보유하신 '셀퓨전씨 패드'로 안전하게 교체했습니다. 내 인벤토리를 100% 활용해 ${USER_NAME}님만을 위한 맞춤 루틴을 설정해드릴게요!`,
};

export const ROUTINE_STEPS = [
  {
    id: 1,
    steps: [
      {
        id: 1,
        type: "클렌징",
        name: "초미세먼지\n세정 클렌저",
        desc: "뛰어난 세정력과 촉촉한 마무리감",
        status: "safe",
        statusTitle: "피부 안전도 평가",
        statusDesc: "세정력이 강하지만 자극이 적어 민감성 피부도 안심이에요.",
        modalDetails: {
          brand: "라운드랩",
          productName: "초미세먼지 세정 클렌저",
          volume: "150ml",
          category: "클렌징폼",
          score: 92,
          matchTitle: `${USER_NAME}님(수부지) 피부 맞춤`,
          reasons: [
            {
              id: 1,
              type: "safe",
              title: "자극 없는 순한 세정력",
              desc: "미세먼지 세정력이 뛰어나면서도 약산성 포뮬러로 세안 후 당김이 없어요.",
            },
          ],
          allIngredients: {
            composition: { low: 90, medium: 10, high: 0 },
            summary: { total: 25, caution20: 0, allergy: 0 },
            list: [
              {
                id: 1,
                risk: "1",
                riskType: "low",
                name: "정제수",
                purpose: "용제, 피부컨디셔닝제",
                effects: [],
              },
              {
                id: 2,
                risk: "1",
                riskType: "low",
                name: "소듐코코일이세티오네이트",
                purpose: "계면활성제, 세정제",
                effects: ["노폐물 제거"],
              },
              {
                id: 3,
                risk: "3",
                riskType: "medium",
                name: "코코-베타인",
                purpose: "계면활성제, 점증제",
                effects: [],
              },
            ],
          },
        },
        replacement: {
          productName: "초미세먼지 세정 클렌저",
          originalProduct: "인벤토리 미등록 · 영상속 루틴",
          badgeText: "대체품 없음",
          badgeType: "none",
          reasonTitle: "대체품 없음",
          reasonDesc: "인벤토리에 클렌저가 아직 등록되지 않았어요.",
          actionText: "제품 등록하기 >",
        },
      },
      {
        id: 2,
        type: "토너 (주의)",
        name: "라운드랩 1025\n독도 토너",
        desc: "수분 공급 및 피지·각질 제거",
        status: "warning",
        statusTitle: "AI 경고",
        statusDesc: `${USER_NAME}님은 민감성이라 매일 쓰면 자극이 될 수 있어요. 주 2~3회만 사용하거나 부드러운 패드로 닦아내세요.`,
        modalDetails: {
          brand: "라운드랩",
          productName: "1025 독도 토너",
          volume: "200ml",
          category: "토너",
          score: 75,
          matchTitle: `${USER_NAME}님(민감성) 주의 필요`,
          reasons: [
            {
              id: 1,
              type: "danger",
              title: "민감성 피부, 각질 제거 성분 주의",
              desc: "HATCHING EX-07 성분이 포함되어 있어 매일 사용 시 피부 장벽이 얇아질 수 있어요.",
            },
          ],
          allIngredients: {
            composition: { low: 85, medium: 10, high: 5 },
            summary: { total: 18, caution20: 0, allergy: 0 },
            list: [
              {
                id: 1,
                risk: "1",
                riskType: "low",
                name: "정제수",
                purpose: "용제, 피부컨디셔닝제",
                effects: ["피부 보습"],
              },
              {
                id: 2,
                risk: "8",
                riskType: "high",
                name: "프로테아제",
                purpose: "피부컨디셔닝제, 각질제거제",
                effects: ["각질 제거", "피지 조절"],
              },
              {
                id: 3,
                risk: "1-2",
                riskType: "low",
                name: "부틸렌글라이콜",
                purpose: "피부컨디셔닝제, 용제",
                effects: ["강력 보습"],
              },
            ],
          },
        },
        replacement: {
          productName: "셀퓨전씨 쿨링 패드",
          originalProduct: "영상속 루틴: 라운드랩 1025 독도 토너",
          badgeText: "대체",
          badgeType: "replace",
          reasonTitle: "AI 대체 이유",
          reasonDesc: `원본의 각질 제거 성분은 ${USER_NAME}님 피부에 자극적이에요. 대신 보유하신 패드로 부드럽게 결 정리를 해보세요!`,
          actionText: null,
        },
      },
      {
        id: 3,
        type: "앰플",
        name: "라운드랩\n자작나무 수분 앰플",
        desc: "산뜻하고 쫀쫀한 속건조 케어",
        status: "safe",
        statusTitle: "피부 안전도 평가",
        statusDesc: "자작나무 수액과 히알루론산이 수부지 피부에 찰떡이에요.",
        modalDetails: {
          brand: "라운드랩",
          productName: "자작나무 수분 앰플",
          volume: "50ml",
          category: "에센스",
          score: 88,
          matchTitle: `${USER_NAME}님(수부지) 피부 맞춤`,
          reasons: [
            {
              id: 1,
              type: "excellent",
              title: "압도적인 수분 공급력 (보습 성분 32개)",
              desc: "정제수 다음으로 부틸렌글라이콜 등 강력한 보습 성분이 가득해 수부지의 고질적인 속건조를 완벽히 잡아줘요.",
            },
            {
              id: 2,
              type: "safe",
              title: "주의 성분 ZERO, 완벽한 안전성",
              desc: "20가지 주의 성분과 알레르기 유발 성분이 단 1개도 없어 민감한 피부 상태에서도 안심하고 바를 수 있어요.",
            },
            {
              id: 3,
              type: "warning",
              title: "수분 증발 차단은 조금 아쉬워요",
              desc: "수분을 가두는 성분이 1개뿐이라, 이 앰플을 바른 후 판테놀 등 보습막을 씌워줄 크림 마무리를 추천해요.",
            },
          ],
          allIngredients: {
            composition: { low: 80, medium: 10, high: 10 },
            summary: { total: 40, caution20: 5, allergy: 5 },
            list: [
              {
                id: 1,
                risk: "1",
                riskType: "low",
                name: "정제수",
                purpose: "용제, 피부컨디셔닝제",
                effects: ["피부 보습"],
              },
              {
                id: 2,
                risk: "1-2",
                riskType: "low",
                name: "글리세린",
                purpose: "변성제, 피부보호제, 헤어컨디셔닝제",
                effects: ["피부 보습", "피부 보호"],
              },
              {
                id: 3,
                risk: "3",
                riskType: "medium",
                name: "T-부틸알코올",
                purpose: "용제, 변성제, 향료",
                effects: [],
              },
            ],
          },
        },
        replacement: {
          productName: "메디힐 수분 앰플",
          originalProduct: "영상속 루틴: 라운드랩 자작나무 수분 앰플",
          badgeText: "호환",
          badgeType: "compatible",
          reasonTitle: "AI 대체 이유",
          reasonDesc:
            "동일한 히알루론산 기반이라 새로 살 필요 없이 인벤토리의 메디힐 앰플로도 충분히 속건조가 잡혀요.",
          actionText: null,
        },
      },
      {
        id: 4,
        type: "크림",
        name: "고함량 판테놀\n10% 재생 크림",
        desc: "피부 장벽 회복 및 재생",
        status: "safe",
        statusTitle: "피부 안전도 평가",
        statusDesc: "판테놀이 약해진 민감성 피부 장벽을 튼튼하게 재생해 줘요.",
        modalDetails: {
          brand: "보타닉힐보",
          productName: "판테놀 10% 크림",
          volume: "50ml",
          category: "크림",
          score: 95,
          matchTitle: `${USER_NAME}님(수부지) 피부 맞춤`,
          reasons: [
            {
              id: 1,
              type: "excellent",
              title: "손상된 장벽 완벽 복구",
              desc: "고함량 판테놀이 피부 장벽을 튼튼하게 만들어 앞선 단계의 수분이 날아가지 않게 꽉 잡아줍니다.",
            },
          ],
          allIngredients: {
            composition: { low: 100, medium: 0, high: 0 },
            summary: { total: 35, caution20: 0, allergy: 0 },
            list: [
              {
                id: 1,
                risk: "1",
                riskType: "low",
                name: "정제수",
                purpose: "용제, 피부컨디셔닝제",
                effects: ["피부 보습"],
              },
              {
                id: 2,
                risk: "1",
                riskType: "low",
                name: "판테놀 (10%)",
                purpose: "피부보습제, 피부컨디셔닝제",
                effects: ["장벽 강화", "피부 진정"],
              },
              {
                id: 3,
                risk: "1",
                riskType: "low",
                name: "세테아릴알코올",
                purpose: "유화안정제, 점증제",
                effects: ["보습막 형성"],
              },
            ],
          },
        },
        replacement: {
          productName: "에스트라 아토베리어 로션",
          originalProduct: "영상속 루틴: 아토팜 고함량 판테놀 크림",
          badgeText: "호환",
          badgeType: "compatible",
          reasonTitle: "AI 대체 이유",
          reasonDesc:
            "원본 크림과 동일하게 손상된 장벽을 튼튼하게 재생해주는 에스트라 로션으로 민감해진 피부를 보호할 수 있어요.",
          actionText: null,
        },
      },
    ],
  },
];

export const TODAY_ROUTINE_DATA = [
  {
    id: 1,
    title: "초미세먼지 세정 클렌저",
    description:
      "모공 속 노폐물을 비워내고 스킨케어 흡수율을 높여주는 첫 단계예요.",
    badge: null,
  },
  {
    id: 2,
    title: "셀퓨전씨 쿨링 패드",
    description:
      "자극받은 피부 온도를 시원하게 낮추고 다음 단계의 수분길을 활짝 열어줍니다.",
    badge: "AI 대체",
  },
  {
    id: 3,
    title: "자작나무 수분 앰플",
    description:
      "고농축 수분으로 피부 깊숙한 곳의 속건조를 확실하고 쫀쫀하게 잡아줘요.",
    badge: null,
  },
  {
    id: 4,
    title: "고함량 판테놀 재생 크림",
    description:
      "충전된 수분이 날아가지 않게 강력한 판테놀 보습막을 씌워 장벽을 보호해요.",
    badge: null,
  },
];

export const SAVED_ROUTINE_DATA = [
  {
    id: 1,
    title: "속건조 타파 루틴",
    steps: 4,
    score: 92,
    savedDate: "2026-08-10",
  },
  {
    id: 2,
    title: "민감성 진정 3단계 시카 루틴",
    steps: 3,
    score: 88,
    savedDate: "2026-08-01",
  },
  {
    id: 3,
    title: "여드름 흉터 지우는 레티놀 조합",
    steps: 5,
    score: 75,
    savedDate: "2026-07-25",
  },
  {
    id: 4,
    title: "겨울철 극건성 보습 장벽 루틴",
    steps: 4,
    score: 62,
    savedDate: "2026-07-11",
  },
  {
    id: 5,
    title: "피부 톤업 비타민C 집중 루틴",
    steps: 3,
    score: 85,
    savedDate: "2026-06-20",
  },
  {
    id: 6,
    title: "여름철 피지 조절 루틴",
    steps: 4,
    score: 78,
    savedDate: "2026-06-05",
  },
];

export const PRODUCT_DATA = [
  {
    id: 1,
    type: "클렌저",
    name: "초미세먼지\n세정 클렌저",
    desc: "모공 속 노폐물을 비워내고 스킨케어 흡수율을 높여주는 첫 단계예요.",
    status: "owned",
    statusTitle: "보유 제품",
    statusDesc: `${USER_NAME}님이 이미 보유하신 제품으로 안전하게 세안을 시작해요.`,
    modalDetails: {
      brand: "라운드랩",
      productName: "초미세먼지 세정 클렌저",
      volume: "150ml",
      category: "클렌징",
      score: 95,
      matchTitle: `${USER_NAME}님(민감성) 안심 사용 가능`,
      // 💡 추가된 필드들
      matchDetails: [
        "모공 청소 및 진정 성분 8개 매칭",
        `${USER_NAME}님 피부 알레르기 유발 성분 0개`,
      ],
      coreGoal: "노폐물 세정 & 수분 손실 방어",
      synergy: "약산성 포뮬러 + 자연유래 계면활성제",
      // --------------
      reasons: [
        {
          id: 1,
          type: "safe",
          title: "저자극 세정 성분",
          desc: "약산성 포뮬러로 세안 후에도 피부 당김 없이 촉촉함을 유지해 줘요.",
        },
      ],
      allIngredients: {
        composition: { low: 95, medium: 5, high: 0 },
        summary: { total: 15, caution20: 0, allergy: 0 },
        list: [
          {
            id: 1,
            risk: "1",
            riskType: "low",
            name: "정제수",
            purpose: "용제",
            effects: ["피부 보습"],
          },
        ],
      },
    },
    replacement: null,
  },
  {
    id: 2,
    type: "패드",
    name: "셀퓨전씨\n쿨링 패드",
    desc: "자극받은 피부 온도를 시원하게 낮추고 다음 단계의 수분길을 활짝 열어줍니다.",
    status: "owned",
    statusTitle: "보유 제품",
    statusDesc: `기존 영상의 각질 제거 토너 대신, ${USER_NAME}님이 보유하신 진정 패드로 부드럽게 결을 정리해요.`,
    modalDetails: {
      brand: "셀퓨전씨",
      productName: "포스트 알파 쿨링 패드",
      volume: "70매",
      category: "토너 패드",
      score: 90,
      matchTitle: `${USER_NAME}님(민감성) 진정 케어 적합`,
      // 💡 추가된 필드들
      matchDetails: [
        "민감성 맞춤 쿨링 진정 성분 10개 매칭",
        `${USER_NAME}님 피부 알레르기 유발 성분 0개`,
      ],
      coreGoal: "피부 열감 하락 & 수분길 오픈",
      synergy: "빙하수 + 글리세린",
      // --------------
      reasons: [
        {
          id: 1,
          type: "synergy",
          title: "열감 쿨링 및 장벽 진정",
          desc: "빙하수 성분이 즉각적으로 피부 열을 내려주고 붉은기를 완화해 줘요.",
        },
      ],
      allIngredients: {
        composition: { low: 90, medium: 10, high: 0 },
        summary: { total: 20, caution20: 0, allergy: 0 },
        list: [
          {
            id: 1,
            risk: "1",
            riskType: "low",
            name: "글리세린",
            purpose: "보습제",
            effects: ["강력 보습"],
          },
        ],
      },
    },
    replacement: null,
  },
  {
    id: 3,
    type: "앰플",
    name: "라운드랩\n자작나무 수분 앰플",
    desc: "고농축 수분으로 피부 깊숙한 곳의 속건조를 확실하고 쫀쫀하게 잡아줘요.",
    status: "new",
    statusTitle: "AI 제품 평가",
    statusDesc:
      "원본 앰플과 동일하게 속건조를 꽉 잡아주며, 다음 단계의 로션과 찰떡궁합이에요.",
    modalDetails: {
      brand: "라운드랩",
      productName: "자작나무 수분 앰플",
      volume: "50ml",
      category: "에센스",
      score: 88,
      matchTitle: `수부지 맞춤 보습 찰떡템`,
      // 💡 요청하신 내용 그대로 추가된 필드들!
      matchDetails: [
        "수부지 맞춤 보습 성분 12개 매칭",
        `${USER_NAME}님 피부 알레르기 유발 성분 0개`,
      ],
      coreGoal: "속건조 해결 & 장벽 재생",
      synergy: "히알루론산 + 고함량 판테놀",
      // --------------
      reasons: [
        {
          id: 1,
          type: "synergy",
          title: "속건조 해결 & 장벽 재생",
          desc: "히알루론산과 고함량 판테놀이 배합되어 보습 시너지가 발생해요.",
        },
      ],
      allIngredients: {
        composition: { low: 100, medium: 0, high: 0 },
        summary: { total: 22, caution20: 0, allergy: 0 },
        list: [
          {
            id: 1,
            risk: "1",
            riskType: "low",
            name: "자작나무수액",
            purpose: "피부컨디셔닝제",
            effects: ["피부 보습", "진정"],
          },
        ],
      },
    },
    replacement: {
      productName: "메디힐 수분 앰플",
      originalProduct: "영상속 루틴: 라운드랩 자작나무 수분 앰플",
      badgeText: "대체 제품",
      badgeType: "replace",
      reasonTitle: "AI 대체 이유",
      reasonDesc: `원본 앰플과 역할이 겹쳐요. 이미 보유하고 계신 메디힐 수분 앰플로 충분히 속건조를 잡을 수 있어요!`,
      actionText: "이 제품으로 대체하기",
    },
  },
  {
    id: 4,
    type: "로션",
    name: "에스트라\n아토베리어 로션",
    desc: "충전된 수분이 날아가지 않게 강력한 판테놀 보습막을 씌워 장벽을 보호해요.",
    status: "synergy",
    statusTitle: "AI 시너지 팁",
    statusDesc:
      "이전 단계의 앰플 수분이 날아가지 않게 가둬두고, 민감해진 피부 장벽을 튼튼하게 재생해 줘요.",
    modalDetails: {
      brand: "에스트라",
      productName: "아토베리어 365 로션",
      volume: "150ml",
      category: "로션",
      score: 98,
      matchTitle: `${USER_NAME}님(민감성) 장벽 강화 필수템`,
      // 💡 추가된 필드들
      matchDetails: [
        "손상 장벽 강화 성분 15개 매칭",
        `${USER_NAME}님 피부 알레르기 유발 성분 0개`,
      ],
      coreGoal: "강력한 보습막 형성 & 장벽 보호",
      synergy: "세라마이드 + 판테놀",
      // --------------
      reasons: [
        {
          id: 1,
          type: "synergy",
          title: "세라마이드 복합체 시너지",
          desc: "피부 지질 구조와 유사한 성분이 손상된 장벽을 완벽하게 보호해 줘요.",
        },
      ],
      allIngredients: {
        composition: { low: 90, medium: 10, high: 0 },
        summary: { total: 25, caution20: 0, allergy: 0 },
        list: [
          {
            id: 1,
            risk: "1",
            riskType: "low",
            name: "세라마이드엔피",
            purpose: "피부교질화제",
            effects: ["장벽 강화", "수분 유지"],
          },
        ],
      },
    },
    replacement: null,
  },
];
