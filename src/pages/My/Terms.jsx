import LegalDocument from "../../components/My/LegalDocument";
import { TERMS } from "../../constants/legal";

function Terms() {
  return (
    <LegalDocument
      title="서비스 이용약관"
      effectiveDate={TERMS.effectiveDate}
      sections={TERMS.sections}
    />
  );
}

export default Terms;
