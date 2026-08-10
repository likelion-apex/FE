const Button = ({ item, bgColor, textColor, borderColor }) => {
  return (
    <button
      type="button"
      className={`flex w-full h-[56px] items-center justify-center font-bold rounded-[10px] bg-${bgColor} px-10 py-2 text-[18px] font-medium text-${textColor} cursor-pointer border ${borderColor}`}
    >
      {item}
    </button>
  );
};

export default Button;
