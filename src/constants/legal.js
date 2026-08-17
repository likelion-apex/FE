// 앱 정보 / 약관 화면에 쓰는 정적 문서. 추후 백엔드나 CMS로 옮길 수 있다.

export const APP_INFO = {
  name: "SOAK",
  version: "2.1.0",
  copyright: "ⓒ 2026 SOAK Corp. All rights reserved.",
};

export const TERMS = {
  effectiveDate: "시행일자 : 2026년 8월 15일",
  sections: [
    {
      title: "제 1 조 (목적)",
      paragraphs: [
        '본 약관은 SOAK Corp.(이하 "회사"라 합니다)가 제공하는 맞춤형 뷰티 및 스킨케어 관련 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.',
      ],
    },
    {
      title: "제 2 조 (용어의 정의)",
      paragraphs: [
        '① "회원"이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.',
        '② "인벤토리"란 회원이 보유한 화장품 정보를 등록하고 관리할 수 있는 앱 내 가상의 공간을 의미합니다.',
      ],
    },
    {
      title: "제 3 조 (약관의 효력 및 변경)",
      paragraphs: [
        "① 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면이나 링크를 통해 게시합니다.",
        "② 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 공지합니다.",
      ],
    },
    {
      title: "제 4 조 (서비스의 제공 및 변경)",
      paragraphs: [
        "① 회사는 회원에게 피부 타입에 따른 맞춤형 화장품 추천 및 스킨케어 루틴 관리 서비스를 제공합니다.",
        "② 회사는 경영상, 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를 변경할 수 있으며, 이 경우 사전에 공지합니다.",
      ],
    },
  ],
};

export const PRIVACY = {
  effectiveDate: "시행일자 : 2026년 8월 15일",
  intro:
    "SOAK Corp.(이하 \"회사\")는 사용자의 개인정보를 소중하게 생각하며, '개인정보보호법' 등 관련 법령을 준수하고 있습니다.",
  sections: [
    {
      title: "1. 개인정보의 수집 및 이용 목적",
      paragraphs: [
        "회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.",
        "",
        "-맞춤형 스킨케어 루틴 및 화장품 추천 서비스 제공",
        "-인벤토리(화장대) 제품 관리 및 AI 분석 리포트 제공",
        "-고객 문의 응대 및 서비스 개선",
      ],
    },
    {
      title: "2. 수집하는 개인정보의 항목",
      paragraphs: [
        "회사는 회원가입 및 원활한 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.",
      ],
      subsections: [
        {
          title: "[필수 수집 항목]",
          paragraphs: [
            "-로그인 정보 (카카오/애플 연동 이메일, 식별자)",
            "-피부 타입 및 고민 (수부지, 건성, 트러블 등)",
            "-등록한 화장품 정보 및 사용 기록",
          ],
        },
      ],
    },
    {
      title: "3. 개인정보의 보유 및 이용 기간",
      paragraphs: [
        "회사는 원칙적으로 회원의 회원 탈퇴 시 수집된 개인정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보존하며, 보존 목적이 달성되거나 보존 기간이 경과하면 해당 정보를 복구할 수 없는 방법으로 안전하게 파기합니다.",
      ],
    },
  ],
};

export const OPEN_SOURCE_INTRO =
  "SOAK 앱은 아래와 같은 오픈소스 소프트웨어를 사용하여 개발되었습니다.";

export const OPEN_SOURCE_LICENSES = [
  {
    name: "React / React DOM",
    license: "MIT License",
    notices: [
      "Copyright (c) Meta Platforms, Inc. and affiliates.",
    ],
  },
  {
    name: "React Router DOM",
    license: "MIT License",
    notices: [
      "Copyright (c) Remix Software, Inc.",
    ],
  },
  {
    name: "axios",
    license: "MIT License",
    notices: [
      "Copyright (c) 2014-present Matt Zabriskie",
      'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
    ],
  },
  {
     name: "Zustand",
    license: "MIT License",
    notices: [
      "Copyright (c) Paul Henschel",
    ]
  }
];
