import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OptimizedRoutine = () => {
  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 3,
      totalSteps: 4,
      stepName: "",
    });

    //다른 페이지로 넘어갈 때 네비바 초기화
    return () => {
      setNavProps({
        step: 0,
        totalSteps: 0,
        stepName: "",
      });
    };
  }, [setNavProps]);
  return <div> 최적화 페이지</div>;
};

export default OptimizedRoutine;
