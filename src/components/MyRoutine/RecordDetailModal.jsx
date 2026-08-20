import React, { useEffect, useState } from "react";

import checkIcon from "../../assets/routine-analyze/checkIcon.svg";
import troubleIcon from "../../assets/icons/skin-condition/trouble.svg";
import dryIcon from "../../assets/icons/skin-condition/dry.svg";
import normalIcon from "../../assets/icons/skin-condition/normal.svg";
import moistIcon from "../../assets/icons/skin-condition/moist.svg";
import bestIcon from "../../assets/icons/skin-condition/best.svg";
import notIcon from "../../assets/routine-analyze/notIcon_black.svg";
import ProductImage from "../ProductImage";

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

const CONDITION_LABEL_TO_ID = {
  트러블있고예민해요: "trouble",
  건조하고푸석해요: "dry",
  평범하고무난해요: "normal",
  촉촉하고편안해요: "moist",
  컨디션최고예요: "best",
};

const RecordDetailModal = ({ isOpen, onClose, recordData, isToday }) => {
  const [memoInput, setMemoInput] = useState("");

  useEffect(() => {
    if (isOpen) setMemoInput(recordData?.memo ?? "");
  }, [isOpen, recordData?.memo]);

  if (!isOpen || !recordData) return null;

  const conditionId =
    CONDITION_LABEL_TO_ID[(recordData.condition || "").replace(/\s/g, "")] ??
    recordData.conditionId;
  const condition =
    SKIN_CONDITIONS.find((item) => item.id === conditionId) ||
    SKIN_CONDITIONS[2];

  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-[430px] items-end justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="flex h-[70vh] w-full flex-col rounded-t-[20px] bg-white px-5 pt-6 pb-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-black">
            {recordData.date} 기록
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-gray-10 text-gray-50 transition-colors hover:bg-gray-20"
          >
            <img src={notIcon} alt="닫기" className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1 no-scrollbar">
          <section className="mt-8">
            <h3 className="text-[13px] font-semibold text-gray-60">
              피부 컨디션
            </h3>
            <div className="mt-3 flex gap-4">
              <div className="flex w-[66px] shrink-0 flex-col items-center justify-center rounded-[12px] border border-blue-50 px-1 py-2 text-black">
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-50">
                  <img
                    src={condition.icon}
                    alt={condition.id}
                    className={condition.iconClassName}
                  />
                </div>
                <div className="mt-2 text-center text-[10px] leading-[14px] font-semibold">
                  {condition.lines[0]}
                  <br />
                  {condition.lines[1]}
                </div>
              </div>
              <div className="my-auto h-[94px] w-px bg-blue-50" />

              {isToday ? (
                <textarea
                  value={memoInput}
                  onChange={(event) => setMemoInput(event.target.value)}
                  placeholder="오늘의 피부 기록을 남겨보세요!"
                  className="flex-1 rounded-xl p-2 text-[14px] leading-[20px] text-black placeholder:text-gray-40 focus:outline-none"
                  rows={3}
                />
              ) : recordData.memo ? (
                <div className="flex-1 pt-1 text-[14px] leading-[22px] text-black">
                  {recordData.memo}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center text-[14px] text-gray-40">
                  등록된 기록이 없어요
                </div>
              )}
            </div>
          </section>

          <hr className="my-6 border-gray-10" />

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-gray-60">
                나이트 케어 실천도
              </h3>
              <span className="text-[14px] font-bold text-blue-50">
                {recordData.completionRate}%({recordData.completedCount}/
                {recordData.totalCount})
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-10">
              <div
                className="h-full rounded-full bg-blue-50 transition-all duration-500"
                style={{ width: `${recordData.completionRate}%` }}
              />
            </div>
          </section>

          <hr className="my-6 border-gray-10" />

          <section className="pb-2">
            <h3 className="mb-4 text-[14px] font-semibold text-gray-60">
              진행한 루틴
            </h3>
            <div className="relative pl-1">
              <div className="absolute top-3 bottom-4 left-[13px] w-[2px] bg-blue-50" />

              <ul className="flex flex-col gap-5">
                {(recordData.routines || []).map((routine, index) => (
                  <li
                    key={`${routine.name}-${index}`}
                    className="relative z-10 flex items-center gap-3"
                  >
                    <div
                      className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border ${
                        routine.completed
                          ? "border-blue-50 bg-blue-50"
                          : "border-gray-20 bg-white"
                      }`}
                    >
                      {routine.completed && (
                        <img src={checkIcon} alt="완료" className="size-3" />
                      )}
                    </div>

                    <ProductImage
                      alt=""
                      category={routine.category}
                      className="size-[30px] shrink-0 rounded-md object-cover"
                    />

                    <span
                      className={`shrink-0 text-[14px] font-semibold ${
                        routine.completed ? "text-blue-50" : "text-gray-40"
                      }`}
                    >
                      {routine.order ?? index + 1}단계
                    </span>
                    <span className="truncate text-[14px] text-black">
                      {routine.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecordDetailModal;
