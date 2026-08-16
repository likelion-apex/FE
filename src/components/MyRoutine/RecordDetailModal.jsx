import React from "react";
import checkIcon from "../../assets/routine-analyze/checkIcon.svg";
import troubleIcon from "../../assets/icons/skin-condition/trouble.svg";
import dryIcon from "../../assets/icons/skin-condition/dry.svg";
import normalIcon from "../../assets/icons/skin-condition/normal.svg";
import moistIcon from "../../assets/icons/skin-condition/moist.svg";
import bestIcon from "../../assets/icons/skin-condition/best.svg";
import notIcon from "../../assets/routine-analyze/notIcon_black.svg";
import { useState } from "react";

const SKIN_CONDITIONS = [
  {
    id: "trouble",
    icon: troubleIcon,
    iconClassName: "size-6",
    lines: ["트러블이 있고", "예민해요"],
  },
  {
    id: "dry",
    icon: dryIcon,
    iconClassName: "size-6 rotate-90",
    lines: ["건조하고", "푸석해요"],
  },
  {
    id: "normal",
    icon: normalIcon,
    iconClassName: "size-6",
    lines: ["평범하고", "무난해요"],
  },
  {
    id: "moist",
    icon: moistIcon,
    iconClassName: "size-6",
    lines: ["촉촉하고", "편안해요"],
  },
  {
    id: "best",
    icon: bestIcon,
    iconClassName: "size-6",
    lines: ["컨디션", "최고예요"],
  },
];

const RecordDetailModal = ({ isOpen, onClose, recordData, isToday }) => {
  if (!isOpen || !recordData) return null;

  // 데이터에 있는 conditionId로 해당하는 피부 컨디션 객체를 찾습니다(이거 변경 예정)
  const condition =
    SKIN_CONDITIONS.find((c) => c.id === recordData.conditionId) ||
    SKIN_CONDITIONS[2]; // 기본값: normal

  const [memoInput, setMemoInput] = useState("");

  return (
    // 배경 오버레이 (클릭 시 모달 닫힘)
    <div
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-[430px] items-end justify-center bg-black/60"
      onClick={onClose}
    >
      {/* 모달 본체 (바텀 시트 스타일) */}
      <div
        className="flex h-[70vh] w-full flex-col rounded-t-[20px] bg-white px-5 pt-6 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 모달 헤더 (날짜 & 닫기 버튼) */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-black">
            {recordData.date} 기록
          </h2>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-gray-10 text-gray-50 transition-colors hover:bg-gray-20"
          >
            <img src={notIcon} alt="X" className="size-4" />
          </button>
        </div>

        {/* 2. 피부 컨디션 & 메모 */}
        <div className="mt-8">
          <h3 className="text-[13px] font-semibold text-gray-60">
            피부 컨디션
          </h3>
          <div className="mt-3 flex gap-4">
            {/* 선택된 컨디션 카드 */}
            <div className="flex w-[66px] shrink-0 flex-col items-center justify-center rounded-[12px] border border-blue-50 py-2 px-1 text-black">
              <div className="flex justify-center items-center rounded-full bg-blue-50 size-8">
                <img
                  src={condition.icon}
                  alt={condition.id}
                  className={condition.iconClassName}
                />
              </div>
              <div className="mt-2 text-center text-[10px] font-semibold leading-[14px]">
                {condition.lines[0]}
                <br />
                {condition.lines[1]}
              </div>
            </div>
            <div className=" h-[94px] w-[1px] bg-blue-50 my-auto" />

            {/* 메모 영역 */}
            {isToday ? (
              // 1. 오늘이면 타이핑 칠 수 있도록
              <textarea
                value={memoInput}
                onChange={(e) => setMemoInput(e.target.value)}
                placeholder="오늘의 피부 기록을 남겨보세요!"
                className="flex-1 rounded-xl p-2 text-[14px] leading-[20px] text-black placeholder:text-gray-40  focus:outline-none"
                rows={3}
              />
            ) : recordData.memo ? (
              // 2. 오늘 아니고, 기록이 있다면
              <div className="flex-1 pt-1 text-[14px] leading-[22px] text-black">
                {recordData.memo}
              </div>
            ) : (
              // 3. 오늘이 아니고, 기록도 없다면
              <div className="flex flex-1 items-center justify-center text-[14px] text-gray-40">
                등록된 기록이 없어요
              </div>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-10" />

        {/* 3. 나이트 케어 실천도 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-gray-60">
              나이트 케어 실천도
            </h3>
            <span className="text-[14px] font-bold text-blue-50">
              {recordData.completionRate}%({recordData.completedCount}/
              {recordData.totalCount})
            </span>
          </div>
          {/* 프로그레스 바 */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-10">
            <div
              className="h-full rounded-full bg-blue-50 transition-all duration-500"
              style={{ width: `${recordData.completionRate}%` }}
            />
          </div>
        </div>

        <hr className="my-6 border-gray-10" />

        {/* 4. 진행한 루틴 (타임라인) */}
        <div>
          <h3 className="mb-4 text-[14px] font-semibold text-gray-60">
            진행한 루틴
          </h3>
          <div className="relative pl-1">
            <div className="absolute bottom-4 left-[13px] top-3 w-[2px] bg-blue-50" />

            <ul className="flex flex-col gap-5">
              {recordData.routines.map((routine, idx) => (
                <li key={idx} className="relative z-10 flex items-center gap-3">
                  <div className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <img src={checkIcon} alt="체크" className="size-3" />
                  </div>

                  <div className="size-[30px] shrink-0 rounded-md bg-gray-30" />

                  {/* 단계 및 이름 */}
                  <span className="text-[14px] font-semibold text-blue-50 shrink-0">
                    {idx + 1}단계
                  </span>
                  <span className="truncate text-[14px] text-black">
                    {routine.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetailModal;
