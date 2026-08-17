import MyPageHeader from "./MyPageHeader";

// 본문 한 줄. 빈 문자열은 디자인의 빈 줄을 그대로 재현한다.
const Paragraph = ({ text }) => (
  <p className="text-xs leading-5 text-gray-80">{text === "" ? " " : text}</p>
);

const Section = ({ title, paragraphs }) => (
  <div className="flex w-full flex-col gap-3">
    <h2 className="text-sm leading-5 font-bold text-black">{title}</h2>
    <div className="flex w-full flex-col">
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index} text={paragraph} />
      ))}
    </div>
  </div>
);

// 약관 / 개인정보 처리방침처럼 제목 + 본문 문단으로만 이뤄진 문서 화면
const LegalDocument = ({ title, effectiveDate, intro, sections }) => {
  return (
    <div className="min-h-full w-full bg-gray-05">
      <MyPageHeader title={title} />

      <div className="mt-[38px] flex flex-col gap-[26px] p-10">
        <p className="text-xs leading-5 font-medium text-gray-40">
          {effectiveDate}
        </p>

        {intro && <Paragraph text={intro} />}

        {sections.map((section) => (
          <div key={section.title} className="flex w-full flex-col gap-2">
            <Section title={section.title} paragraphs={section.paragraphs} />

            {section.subsections?.map((subsection) => (
              <Section
                key={subsection.title}
                title={subsection.title}
                paragraphs={subsection.paragraphs}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalDocument;
