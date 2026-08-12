import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const InventorySearch = () => {
  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "검색",
    });
  }, [setNavProps]);

  return <div></div>;
};

export default InventorySearch;
