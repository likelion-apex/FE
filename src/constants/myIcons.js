import alert from "../assets/icons/my/alert.svg";
import incompleteCircle from "../assets/icons/my/incomplete-circle.svg";
import information from "../assets/icons/my/information.svg";
import logout from "../assets/icons/my/logout.svg";
import penWriting from "../assets/icons/my/pen-writing.svg";
import routine from "../assets/icons/my/routine.svg";
import userId from "../assets/icons/my/user-id.svg";

// 마이페이지 배지 아이콘. sizeClass는 Figma에서 내려받은 SVG의 실제 크기라
// 24px 배지 안에서 아이콘마다 조금씩 다르게 잡힌다.
export const MY_ICONS = {
  penWriting: { src: penWriting, sizeClass: "h-[17.76px] w-[17.78px]" },
  incompleteCircle: { src: incompleteCircle, sizeClass: "size-[16.67px]" },
  routine: { src: routine, sizeClass: "size-5" },
  alert: { src: alert, sizeClass: "h-[17.5px] w-[16.67px]" },
  userId: { src: userId, sizeClass: "h-[13.33px] w-[16.67px]" },
  information: { src: information, sizeClass: "size-[16.67px]" },
  logout: { src: logout, sizeClass: "h-[15px] w-[16.67px]" },
};
