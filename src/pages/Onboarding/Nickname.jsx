import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import cancelIcon from "../../assets/icons/cancel.svg";
import NextButton from "../../components/NextButton";
import TopNavbar from "../../components/layouts/TopNavbar";

import { updateNickname } from "../../api/member"

const MAX_LENGTH = 10;

function Nickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || nickname.length > 0;

  const handleNext = async () => {
    try {
      await updateNickname(nickname.trim());
      navigate("/onboarding/skin-type");
    } catch (err) {
      console.error("닉네임 저장 실패:", err)
    }
  }

  return (
    <div className="relative min-h-full w-full bg-white px-5 pt-[51px] pb-[132px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <TopNavbar step={1} totalSteps={4} />

        <div className="mt-6 flex flex-col items-center gap-12">
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl leading-9 font-bold text-black">
              SOAK에서 사용할
              <br />
              닉네임을 입력해주세요
            </h1>
            <p className="w-[243px] text-sm leading-5 text-gray-60">
              나중에 마이페이지에서 변경할 수 있어요.
            </p>
          </div>

          <div className="flex w-[332px] flex-col items-end gap-1">
            <div
              className={`flex h-14 w-full items-center justify-between rounded-2xl border px-5 py-[10px] ${
                isActive
                  ? "border-blue-50 bg-blue-05"
                  : "border-gray-20 bg-gray-05"
              }`}
            >
              <input
                type="text"
                value={nickname}
                maxLength={MAX_LENGTH}
                onChange={(event) => setNickname(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="닉네임 입력 (최대 10자)"
                aria-label="닉네임"
                className="min-w-0 flex-1 bg-transparent text-base leading-[14px] text-black caret-blue-50 outline-none placeholder:text-gray-60"
              />
              <button
                type="button"
                aria-label="닉네임 지우기"
                onClick={() => setNickname("")}
                className="ml-2 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-10"
              >
                <img src={cancelIcon} alt="" className="size-3" />
              </button>
            </div>

            <p className="text-xs leading-5 text-gray-60">
              {nickname.length}/{MAX_LENGTH}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-6 bottom-[52px] left-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <NextButton
            disabled={nickname.trim().length === 0}
            onClick={handleNext}
          ></NextButton>
        </motion.div>
      </div>
    </div>
  );
}

export default Nickname;
