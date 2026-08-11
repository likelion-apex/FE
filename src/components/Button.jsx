const Button = ({ item, bgColor, textColor, borderColor, onClick }) => {
  return (
    <button
      type="button"
      className={`flex w-full h-[56px] items-center justify-center font-bold rounded-[10px] bg-${bgColor} px-10 py-2 text-[18px] font-medium text-${textColor} cursor-pointer border ${borderColor}`}
      onClick={onClick}
    >
      {item}
    </button>
  );
};

export default Button;
