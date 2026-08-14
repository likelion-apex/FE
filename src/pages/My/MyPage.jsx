import { useNavigate } from "react-router-dom";

import BottomNavbar from "../../components/layouts/BottomNavbar";
import SectionHeader from "../../components/Home/SectionHeader";
import ProfileSummary from "../../components/My/ProfileSummary";
import ReportCard from "../../components/My/ReportCard";
import SummaryCard from "../../components/My/SummaryCard";
import MenuSection from "../../components/My/MenuSection";
import { REPORTS } from "../../constants/report";

// 사용자 정보. 추후 백엔드 응답으로 교체
const USER = {
  name: "윤지",
  skinType: "수부지 · 민감성",
  concerns: ["속건조", "트러블"],
};

// 이번 달 요약. 추후 백엔드 응답으로 교체
const MONTH_SUMMARY = [
  { label: "컨디션 기록", value: 7, unit: "회" },
  { label: "루틴 완수율", value: 62, unit: "%" },
];

function MyPage() {
  const navigate = useNavigate();

  // 알림 관련 화면은 아직 디자인이 없어 핸들러를 비워둔다
  const settingItems = [
    { label: "스킨케어 루틴 알림" },
    { label: "앱 알림 설정" },
    { label: "계정 관리", onClick: () => navigate("/my/account") },
  ];

  const supportItems = [
    { label: "공지사항 및 FAQ" },
    { label: "1:1 문의하기" },
    { label: "앱 정보" },
  ];

  return (
    <div className="flex min-h-full flex-col bg-white text-black">
      <div className="flex-1 pb-6">
        {/* 프로필 */}
        <section className="px-5 pt-[81px]">
          <ProfileSummary
            user={USER}
            onManageProfile={() => navigate("/my/profile")}
          />
        </section>

        {/* 분석 리포트 */}
        <section className="mt-[38px] flex gap-2 px-5">
          {Object.entries(REPORTS).map(([type, report]) => (
            <ReportCard
              key={type}
              period={report.period}
              title={report.title}
              onClick={() => navigate(`/my/report/${type}`)}
            />
          ))}
        </section>

        {/* 이번 달 요약 */}
        <section className="mt-[42px] flex flex-col gap-[23px] px-5">
          <SectionHeader title="이번 달 요약" actionLabel="기록보기" />
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
