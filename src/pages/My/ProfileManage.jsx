import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageHeader from "../../components/My/MyPageHeader";
import SkinTypeOption from "../../components/skin/SkinTypeOption";
import SkinConcernChip from "../../components/skin/SkinConcernChip";
import cancelIcon from "../../assets/icons/cancel.svg";
import { SKIN_TYPES, SKIN_CONCERNS } from "../../constants/skin";

const NICKNAME_MAX_LENGTH = 10;

// 기존 프로필 값. 추후 백엔드 응답으로 교체
const CURRENT_PROFILE = {
  nickname: "김윤지",
  skinTypeId: 1,
  concernIds: [1, 6],
};

function ProfileManage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(CURRENT_PROFILE.nickname);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [skinTypeId, setSkinTypeId] = useState(CURRENT_PROFILE.skinTypeId);
  const [concernIds, setConcernIds] = useState(CURRENT_PROFILE.concernIds);

  const toggleConcern = (id) =>
    setConcernIds((prev) =>
      prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id],
    );

  const isNicknameActive = isNicknameFocused || nickname.length > 0;

  const handleSave = () => {
    // TODO: 프로필 저장 API 연동
    navigate(-1);
  };

  return (
    <div className="min-h-full w-full bg-white pb-[60px]">
      <MyPageHeader
        title="프로필 관리"
        actionLabel="저장"
        onAction={handleSave}
      />

      {/* 닉네임 */}
      <section className="mt-[60px] flex flex-col gap-[5px] px-5">
        <p className="text-sm leading-[14px] font-bold text-gray-60">닉네임</p>

        <div className="flex flex-col items-end gap-1">
          <div
            className={`flex h-14 w-full items-center justify-between rounded-2xl border px-5 py-[10px] transition ${
              isNicknameActive
                ? "border-blue-50 bg-blue-05"
                : "border-gray-20 bg-gray-05"
            }`}
          >
            <input
              type="text"
              value={nickname}
              maxLength={NICKNAME_MAX_LENGTH}
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setIsNicknameFocused(true)}
              onBlur={() => setIsNicknameFocused(false)}
              placeholder="닉네임을 입력하세요"
              className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-gray-60"
            />
            {nickname.length > 0 && (
              <button
                type="button"
                aria-label="닉네임 지우기"
                onClick={() => setNickname("")}
                className="ml-2 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-10"
              >
                <img src={cancelIcon} alt="" className="size-3" />
              </button>
            )}
          </div>

          <p className="text-xs leading-5 text-gray-60">
            {nickname.length}/{NICKNAME_MAX_LENGTH}
          </p>
        </div>
      </section>

      {/* 피부 타입 */}
      <section className="mt-[30px] flex flex-col gap-[15px] px-5">
        <h2 className="text-base font-semibold text-black">피부 타입</h2>

        <div className="flex flex-col gap-3">
          <p className="px-2 text-xs leading-[26px] font-bold text-blue-50">
            1개만 선택해주세요
          </p>

          <div className="flex flex-col gap-4">
            {SKIN_TYPES.map((skinType) => (
              <SkinTypeOption
                key={skinType.id}
                skinType={skinType}
                isSelected={skinTypeId === skinType.id}
                onSelect={setSkinTypeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 피부 고민 */}
      <section className="mt-10 flex flex-col gap-4 px-5">
        <h2 className="text-base font-semibold text-black">피부 고민</h2>

        <div className="flex flex-col gap-3">
          <p className="px-2 text-xs leading-[26px] font-semibold text-blue-50">
            중복 선택 가능
          </p>

          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {SKIN_CONCERNS.map((concern) => (
              <SkinConcernChip
                key={concern.id}
                concern={concern}
                isSelected={concernIds.includes(concern.id)}
                onToggle={toggleConcern}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileManage;
