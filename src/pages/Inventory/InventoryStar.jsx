import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";


const InventoryStar = () => {

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "즐겨찾기",
    });
  }, [setNavProps]);

  return (
    <div>
      
    </div>
  );
};

export default InventoryStar;
