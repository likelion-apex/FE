import completeImage from "../../assets/logo/routine-complete-nbg.svg";

const RoutineComplete = () => {
  return (
    <div className="flex w-full flex-col items-center px-4 pt-11 pb-[34px] bg-blue-05 ">
      <img src={completeImage} alt="완료 로고" className="size-[124px]" />
      <p className="mt-5 text-center text-[20px] leading-7 font-semibold text-blue-50">
        오늘의 루틴을 모두 완료했어요
      </p>
      <p className="mt-2 text-center text-[14px] leading-[18px] text-gray-60">
        꾸준한 케어로 빛나는 피부를 만들어가세요!
        <br />
        오늘 하루도 수고 많으셨습니다.
      </p>
    </div>
  );
};

export default RoutineComplete;
