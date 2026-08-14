import { useParams } from "react-router-dom";

import MyPageHeader from "../../components/My/MyPageHeader";
import { REPORTS } from "../../constants/report";

function AnalysisReport() {
  const { type } = useParams();
  const report = REPORTS[type] ?? REPORTS.monthly;

  const handleSave = () => {
    // TODO: 리포트 저장 API 연동
  };

  return (
    <div className="min-h-full w-full bg-white">
      <MyPageHeader
        title={`${report.period} 분석 리포트`}
        actionLabel="저장"
        onAction={handleSave}
      />

      {/* 리포트 본문은 아직 디자인이 비어 있어 구현하지 않았다. */}
    </div>
  );
}

export default AnalysisReport;
