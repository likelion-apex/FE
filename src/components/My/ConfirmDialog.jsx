// 마이페이지 확인 다이얼로그 (로그아웃 / 회원탈퇴 공용)
const ConfirmDialog = ({
  title,
  description,
  confirmLabel,
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[999] flex w-full max-w-[402px] -translate-x-1/2 items-center justify-center bg-black/60 px-5 no-scrollbar"
      onClick={onCancel}
    >
      <div
        className="flex w-full items-center overflow-clip rounded-[20px] bg-white px-8 py-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-w-0 flex-1 flex-col items-center gap-6">
          <div className="flex w-full flex-col gap-2">
            <p className="text-center text-xl leading-7 font-semibold text-black">
              {title}
            </p>
            <p className="text-center text-sm leading-5 text-gray-60">
              {description}
            </p>
          </div>

          <div className="flex h-14 w-full items-center gap-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-gray-20 text-lg leading-[30px] font-bold text-white"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-lg leading-[30px] font-bold text-white"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
