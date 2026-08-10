import { motion } from "framer-motion";

// 온보딩 하단 고정 "다음" 버튼
const NextButton = ({ children = "다음", disabled = false, onClick }) => {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.001, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex h-14 w-full items-center justify-center rounded-lg text-[18px] leading-[30px] font-bold text-white transition-shadow duration-200 ${
        disabled
          ? "bg-gray-20 shadow-none"
          : "cursor-pointer bg-blue-50 shadow-sm shadow-blue-50/40 hover:shadow-sm hover:shadow-blue-50/60"
      }`}
    >
      {children}
    </motion.button>
  );
};

export default NextButton;
