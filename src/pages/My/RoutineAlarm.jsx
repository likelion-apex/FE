import { useState } from "react";

import MyPageHeader from "../../components/My/MyPageHeader";
import IconBadge from "../../components/My/IconBadge";
import ToggleSwitch from "../../components/My/ToggleSwitch";
import TimePickerModal from "../../components/My/TimePickerModal";
import { MY_ICONS } from "../../constants/myIcons";

// 알림 시간. 추후 백엔드 응답으로 교체
const ALARM_TIMES = [
  {
    id: "morning",
    label: "아침 루틴",
    time: { meridiem: "오전", hour: 7, minute: 30 },
    icon: MY_ICONS.clearDay,
  },
  {
    id: "night",
    label: "저녁 루틴",
    time: { meridiem: "오후", hour: 10, minute: 0 },
    icon: MY_ICONS.modeNight,
  },
];

const formatAlarmTime = ({ meridiem, hour, minute }) =>
  `매일 ${meridiem} ${hour}:${`${minute}`.padStart(2, "0")}`;

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
  const [alarmTimes, setAlarmTimes] = useState(() =>
    Object.fromEntries(ALARM_TIMES.map(({ id, time }) => [id, time])),
  );
  // 시간 선택 바텀시트를 띄운 알림의 id
  const [editingAlarmId, setEditingAlarmId] = useState(null);

  const toggleDetailSetting = (id) =>
    setDetailSettings((prev) => ({ ...prev, [id]: !prev[id] }));

  const editingAlarm = ALARM_TIMES.find(({ id }) => id === editingAlarmId);

  const saveAlarmTime = (time) => {
    setAlarmTimes((prev) => ({ ...prev, [editingAlarmId]: time }));
    setEditingAlarmId(null);
  };

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
                  <p className="text-sm leading-5 text-gray-60">
                    {formatAlarmTime(alarmTimes[alarm.id])}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingAlarmId(alarm.id)}
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

      {editingAlarm && (
        <TimePickerModal
          title={`${editingAlarm.label} 시간 설정`}
          time={alarmTimes[editingAlarm.id]}
          onClose={() => setEditingAlarmId(null)}
          onSave={saveAlarmTime}
        />
      )}
    </div>
  );
}

export default RoutineAlarm;
