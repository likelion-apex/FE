import tonerIcon from "../assets/product-icons/toner.png";
import lotionIcon from "../assets/product-icons/lotion.png";
import serumIcon from "../assets/product-icons/serum.png";
import ampouleIcon from "../assets/product-icons/ampoule.png";
import creamIcon from "../assets/product-icons/cream.png";
import cleanserIcon from "../assets/product-icons/cleanser.png";
import mistIcon from "../assets/product-icons/mist.png";
import tonerPadIcon from "../assets/product-icons/toner-pad.png";
import balmIcon from "../assets/product-icons/balm.png";

const getProductIcon = (category = "") => {
  const value = String(category).toUpperCase();

  if (value.includes("TONER_PAD") || value.includes("토너 패드"))
    return tonerPadIcon;
  if (value.includes("TONER") || value.includes("토너")) return tonerIcon;
  if (value.includes("LOTION") || value.includes("로션")) return lotionIcon;
  if (value.includes("AMPOULE") || value.includes("앰플")) return ampouleIcon;
  if (
    value.includes("ESSENCE") ||
    value.includes("SERUM") ||
    value.includes("에센스") ||
    value.includes("세럼")
  )
    return serumIcon;
  if (
    value.includes("CLEANS") ||
    value.includes("OIL") ||
    value.includes("POWDER") ||
    value.includes("클렌징")
  )
    return cleanserIcon;
  if (value.includes("MIST") || value.includes("미스트")) return mistIcon;
  if (
    value.includes("BALM") ||
    value.includes("STICK") ||
    value.includes("밤") ||
    value.includes("스틱")
  )
    return balmIcon;

  return creamIcon;
};

const ProductImage = ({
  alt = "",
  category = "",
  productName = "",
  className = "",
}) => {
  // 카테고리가 비어있을 경우를 대비해, 카테고리와 제품명을 하나의 문장으로 합쳐서 검사합니다.
  // 예: "" + " " + "라운드랩 독도 토너" -> " 라운드랩 독도 토너" (여기서 '토너'를 찾아냄!)
  const combinedText = `${category} ${productName}`;

  return (
    <img
      src={getProductIcon(combinedText)}
      alt={alt || productName || "제품 이미지"}
      className={className}
    />
  );
};
export default ProductImage;
