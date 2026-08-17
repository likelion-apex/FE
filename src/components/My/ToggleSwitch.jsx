// 알림 설정 화면에서 쓰는 on/off 스위치
const ToggleSwitch = ({ isOn, onToggle, label }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      onClick={onToggle}
      className={`flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-[20px] p-1 transition-colors ${
        isOn ? "justify-end bg-blue-50" : "justify-start bg-gray-20"
      }`}
    >
      <span className="size-4 rounded-full bg-white shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
    </button>
  );
};

export default ToggleSwitch;
