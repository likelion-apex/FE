import { useState } from "react";

const MERIDIEMS = ["오전", "오후"];
const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
// 분은 5분 단위로만 고를 수 있다
const MINUTES = Array.from({ length: 12 }, (_, index) => index * 5);

// 위/아래 칸을 누르면 해당 열의 값이 한 칸씩 순환한다
const cycle = (options, value, offset) => {
  const index = options.indexOf(value);

  return options[(index + offset + options.length) % options.length];
};

const ROW_OFFSETS = [-1, 0, 1];

// 루틴 알림 시간 선택 바텀시트 (오전·오후 / 시 / 분 휠)
const TimePickerModal = ({ title, time, onClose, onSave }) => {
  const [meridiem, setMeridiem] = useState(time.meridiem);
  const [hour, setHour] = useState(time.hour);
  const [minute, setMinute] = useState(time.minute);

  const columns = [
    {
      key: "meridiem",
      label: "오전 오후",
      widthClass: "w-9",
      options: MERIDIEMS,
      value: meridiem,
      onChange: setMeridiem,
      format: (value) => value,
      // 오전/오후는 두 개뿐이라 위아래 칸이 같은 값이 된다. 아래 칸은 자리만 남긴다.
      hideOffset: 1,
    },
    {
      key: "hour",
      label: "시",
      widthClass: "w-8",
      options: HOURS,
      value: hour,
      onChange: setHour,
      format: (value) => `${value}`,
    },
    {
      key: "minute",
      label: "분",
      widthClass: "w-8",
      options: MINUTES,
      value: minute,
      onChange: setMinute,
      format: (value) => `${value}`.padStart(2, "0"),
    },
  ];

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[999] flex w-full max-w-[402px] -translate-x-1/2 flex-col justify-end bg-black/60 no-scrollbar"
      onClick={onClose}
    >
      <div
        className="flex w-full flex-col rounded-t-[20px] bg-white px-[21px] py-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4">
            <p className="text-center text-xl leading-7 font-bold text-black">
              {title}
            </p>

            <div className="flex w-full flex-col">
              {ROW_OFFSETS.map((offset) => (
                <div
                  key={offset}
                  className={`flex w-full items-center justify-center gap-20 rounded-xl py-4 ${
                    offset === 0 ? "bg-blue-05" : ""
                  }`}
                >
                  {columns.map((column) => {
                    const rowValue = cycle(
                      column.options,
                      column.value,
                      offset,
                    );

                    if (offset === 0) {
                      return (
                        <p
                          key={column.key}
                          className={`${column.widthClass} shrink-0 text-center leading-7 font-bold ${
                            column.key === "meridiem"
                              ? "text-xl text-blue-50"
                              : "text-[22px] text-black"
                          }`}
                        >
                          {column.format(rowValue)}
                        </p>
                      );
                    }

                    const isHidden = column.hideOffset === offset;

                    return (
                      <button
                        key={column.key}
                        type="button"
                        aria-label={`${column.label} ${column.format(rowValue)}`}
                        aria-hidden={isHidden}
                        tabIndex={isHidden ? -1 : undefined}
                        onClick={() => column.onChange(rowValue)}
                        className={`${column.widthClass} h-7 shrink-0 cursor-pointer text-center text-base leading-7 font-bold text-gray-40 ${
                          isHidden ? "pointer-events-none opacity-0" : ""
                        }`}
                      >
                        {column.format(rowValue)}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSave({ meridiem, hour, minute })}
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-lg leading-[30px] font-bold text-white"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
