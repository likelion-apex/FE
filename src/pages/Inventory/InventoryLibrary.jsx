import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const InventoryLibrary = () => {
  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "라이브러리",
    });
  }, [setNavProps]);

  return <div></div>;
};

export default InventoryLibrary;