import {
  BiSolidHome,
  BiSearchAlt2,
  BiRadar,
  BiChat,
  BiUserCircle,
} from "react-icons/bi";
import { GoVideo } from "react-icons/go";
import { AiOutlineHeart, AiOutlinePlusSquare } from "react-icons/ai";

const dataHeader = [
  {
    id: 1,
    text: "Trang chủ",
    icon: <BiSolidHome />,
  },
  {
    id: 2,
    text: "Tìm kiếm",
    icon: <BiSearchAlt2 />,
  },
  {
    id: 3,
    text: "Khám phá",
    icon: <BiRadar />,
  },
  {
    id: 4,
    text: "Reels",
    icon: "GoVideo",
  },
  {
    id: 5,
    text: "Tin nhắn",
    icon: "BiChat",
  },
  {
    id: 6,
    text: "Thông báo",
    icon: "AiOutlineHeart",
  },
  {
    id: 7,
    text: "Tạo",
    icon: "AiOutlinePlusSquare",
  },
  {
    id: 8,
    text: "Trang cá nhân",
    icon: "BiUserCircle",
  },
];
export default dataHeader;
