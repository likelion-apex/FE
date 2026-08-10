// SVG를 마스크로 사용해 선택 상태에 따라 색을 바꾸는 아이콘.
// 색은 className의 bg-* 유틸리티로 지정한다.
const MaskIcon = ({ src, className = "" }) => (
  <span
    aria-hidden
    className={className}
    style={{
      // 따옴표 필수: Vite가 인라인한 data URI에 작은따옴표가 들어 있어
      // url(...)로 감싸지 않으면 CSS 파서가 선언 전체를 버린다.
      maskImage: `url("${src}")`,
      maskSize: "100% 100%",
      maskRepeat: "no-repeat",
      WebkitMaskImage: `url("${src}")`,
      WebkitMaskSize: "100% 100%",
      WebkitMaskRepeat: "no-repeat",
    }}
  />
);

export default MaskIcon;
