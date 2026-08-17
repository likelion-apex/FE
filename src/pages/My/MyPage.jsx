import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyProfile } from "../../api/member";
import { SKIN_TYPES, SKIN_CONCERNS } from "../../constants/skin";

import BottomNavbar from "../../components/layouts/BottomNavbar";
import SectionHeader from "../../components/Home/SectionHeader";
import ProfileSummary from "../../components/My/ProfileSummary";
import SummaryCard from "../../components/My/SummaryCard";
import MenuSection from "../../components/My/MenuSection";
import { MY_ICONS } from "../../constants/myIcons";

const MONTH_SUMMARY = [
  {
    label: "컨디션 기록",
    value: 7,
    unit: "회",
    icon: MY_ICONS.penWriting,
  },
  {
    label: "루틴 완수율",
    value: 62,
    unit: "%",
    icon: MY_ICONS.incompleteCircle,
  },
];

function MyPage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [skinTypeId, setSkinTypeId] = useState(null);
  const [concernIds, setConcernIds] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // 앱 알림 설정 화면은 아직 라우트가 없어 핸들러를 비워둔다
  const settingItems = [
    {
      label: "루틴 알림 설정",
      icon: MY_ICONS.routine,
      onClick: () => navigate("/my/alarm/routine"),
    },
    { label: "앱 알림 설정", icon: MY_ICONS.alert },
    {
      label: "계정 관리",
      icon: MY_ICONS.userId,
      onClick: () => navigate("/my/account"),
    },
  ];

  const supportItems = [{ label: "앱 정보", icon: MY_ICONS.information }];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();

        setNickname(profile.nickname ?? "");
        setSkinTypeId(
          SKIN_TYPES.find((type) => type.name === profile.skinType)?.id || null,
        );
        setConcernIds(
          (profile.skinConcerns ?? [])
            .map(
              (concern) =>
                SKIN_CONCERNS.find((item) => item.name === concern)?.id,
            )
            .filter(Boolean),

            setProfileImageUrl(profile.profileImageUrl ?? "")

        );
      } catch (error) {
        console.error("프로필 조회 실패", error);
      }
    };

    loadProfile();
  }, []);

  const user = {
    imageUrl: profileImageUrl?? "",
    name: nickname,
    skinType: SKIN_TYPES.find((type) => type.id === skinTypeId)?.name ?? "",
    concerns: concernIds
      .map((id) => SKIN_CONCERNS.find((concern) => concern.id === id)?.name)
      .filter(Boolean),
  };

  return (
    <div className="flex min-h-full flex-col bg-white text-black">
      <div className="flex-1 pb-6">
        {/* 프로필 */}
        <section className="px-5 pt-[81px]">
          <ProfileSummary
            user={user}
            onManageProfile={() => navigate("/my/profile")}
          />
        </section>

        {/* 이번 달 요약 */}
        <section className="mt-[44px] flex flex-col gap-[23px] px-5">
          <SectionHeader
            title="이번 달 요약"
            actionLabel="기록보기"
            onClick={() => navigate("/MyRoutine")}
          />
          <SummaryCard stats={MONTH_SUMMARY} />
        </section>

        {/* 설정 및 계정 관리 */}
        <section className="mt-[45px] px-5">
          <MenuSection title="설정 및 계정 관리" items={settingItems} />
        </section>

        {/* 고객 지원 및 앱 정보 */}
        <section className="mt-[38px] px-5">
          <MenuSection title="고객 지원 및 앱 정보" items={supportItems} />
        </section>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default MyPage;
