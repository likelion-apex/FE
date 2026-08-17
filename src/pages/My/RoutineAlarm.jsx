import { useState } from "react";

import MyPageHeader from "../../components/My/MyPageHeader";
import IconBadge from "../../components/My/IconBadge";
import ToggleSwitch from "../../components/My/ToggleSwitch";
import { MY_ICONS } from "../../constants/myIcons";

// 알림 시간. 추후 백엔드 응답으로 교체
const ALARM_TIMES = [
  {
    id: "morning",
    label: "아침 루틴",
    time: "매일 오전 7:30",
    icon: MY_ICONS.clearDay,
  },
  {
    id: "night",
    label: "저녁 루틴",
    time: "매일 오후 10:00",
    icon: MY_ICONS.modeNight,
  },
];

// 상세 설정 항목. 추후 백엔드 응답으로 교체
const DETAIL_SETTINGS = [
  {
    id: "incomplete",
    label: "루틴 미완료 리마인드",
    description: "알림 후 30분 동안 미완료 시 다시 알려드려요.",
    isOn: true,
  },
  {
    id: "condition",
    label: "피부 컨디션 체크 리마인드",
    description: "매일 저녁 피부 상태 기록을 리마인드 해드려요.",
    isOn: false,
  },
];

function RoutineAlarm() {
  const [isRoutineAlarmOn, setIsRoutineAlarmOn] = useState(true);
  const [detailSettings, setDetailSettings] = useState(() =>
    Object.fromEntries(DETAIL_SETTINGS.map(({ id, isOn }) => [id, isOn])),
  );

  const toggleDetailSetting = (id) =>
    setDetailSettings((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-full w-full bg-gray-05 pb-10">
      <MyPageHeader title="루틴 알림 설정" />

      {/* 스킨케어 루틴 알림 on/off */}
      <section className="mt-[84px] flex flex-col gap-1 px-5">
        <div className="flex w-full items-start justify-between rounded-lg bg-white px-[15px] py-5">
          <p className="text-base leading-5 font-bold text-black">
            스킨케어 루틴 알림
          </p>
          <ToggleSwitch
            isOn={isRoutineAlarmOn}
            onToggle={() => setIsRoutineAlarmOn((prev) => !prev)}
            label="스킨케어 루틴 알림"
          />
        </div>

        <p className="text-xs leading-5 text-gray-60">
          설정한 시간에 루틴을 잊지 않도록 알려드릴게요.
        </p>
      </section>

      {/* 알림 시간 설정 */}
      <section className="mt-9 flex flex-col gap-4 px-5">
        <h2 className="text-[13px] font-bold text-gray-60">알림 시간 설정</h2>

        <div className="flex flex-col gap-2">
          {ALARM_TIMES.map((alarm) => (
            <div
              key={alarm.id}
              className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <IconBadge icon={alarm.icon} size="md" />
                <div className="flex flex-col gap-1">
                  <p className="text-base leading-5 font-bold text-black">
                    {alarm.label}
                  </p>
                  <p className="text-sm leading-5 text-gray-60">{alarm.time}</p>
                </div>
              </div>

              {/* 시간 변경 화면은 아직 라우트가 없어 핸들러를 비워둔다 */}
              <button
                type="button"
                className="cursor-pointer text-xs leading-4 font-bold text-blue-50"
              >
                변경
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 상세 설정 */}
      <section className="mt-12 flex flex-col gap-4 px-5">
        <h2 className="text-[13px] font-bold text-gray-60">상세 설정</h2>

        <div className="flex flex-col divide-y divide-gray-20 rounded-lg bg-white">
          {DETAIL_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="flex h-[68px] w-full items-center justify-between px-[19px]"
            >
              <div className="flex flex-col gap-1">
                <p className="text-base leading-5 font-bold text-black">
                  {setting.label}
                </p>
                <p className="text-xs leading-5 text-gray-60">
                  {setting.description}
                </p>
              </div>

              <ToggleSwitch
                isOn={detailSettings[setting.id]}
                onToggle={() => toggleDetailSetting(setting.id)}
                label={setting.label}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RoutineAlarm;
