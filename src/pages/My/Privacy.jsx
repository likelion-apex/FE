import LegalDocument from "../../components/My/LegalDocument";
import { PRIVACY } from "../../constants/legal";

function Privacy() {
  return (
    <LegalDocument
      title="개인정보 처리방침"
      effectiveDate={PRIVACY.effectiveDate}
      intro={PRIVACY.intro}
      sections={PRIVACY.sections}
    />
  );
}

export default Privacy;
