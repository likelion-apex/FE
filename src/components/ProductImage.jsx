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

// 서버 제품 사진 대신 카테고리에 맞는 프로젝트 기본 아이콘을 표시한다.
const ProductImage = ({ alt = "", category, className = "" }) => (
  <img src={getProductIcon(category)} alt={alt} className={className} />
);

export default ProductImage;
