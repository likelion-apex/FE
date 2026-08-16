import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const InventoryStar = () => {
  const { setNavProps } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "즐겨찾기",
      rightAction: {
        content: isEditing ? "완료" : "편집",
        onClick: () => setIsEditing((prev) => !prev),

        textColor: isEditing ? "text-red-40" : "text-blue-50",
      },
    });
  }, [setNavProps, isEditing]);

  return <div></div>;
};

export default InventoryStar;
