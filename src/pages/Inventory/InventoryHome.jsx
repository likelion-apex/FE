import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import plusIcon from "../../assets/icons/plusIcon.svg"

const InventoryHome = () => {
  const userName = "윤지";

  const { setNavProps } = useOutletContext();
  useEffect(() => {
    setNavProps({
      step: 0,
      totalSteps: 0,
      stepName: "인벤토리",
      rightAction: {
        content: "편집",
      },
    });
  }, [setNavProps]);

  return (
    <div>
      <div>
        <h2>
          {userName}님의 화장대에는
          <br />
          <span className="text-sky-500">15개</span>의 제품이 있어요
        </h2>
      </div>
      <div>
        <img src={plusIcon} alt="새 제품 등록" />
        <p> 새 제품 등록하기 </p>
      </div>
    </div>
  );
};

export default InventoryHome;
