import React from "react";
import Logo from "src/assets/LogoSN.png";
import Logo2 from "src/assets/Logo2.png";
import {
  BiSolidHome,
  BiSearchAlt2,
  BiRadar,
  BiChat,
  BiUserCircle,
} from "react-icons/bi";
import { GoVideo } from "react-icons/go";
import {
  AiOutlineHeart,
  AiOutlinePlusSquare,
  AiOutlineMenu,
  AiOutlineSetting,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsClockHistory, BsBookmark, BsSun } from "react-icons/bs";
import { toggleOpition } from "src/redux/opitionpostSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/store";
const Opitionpost = () => {
  const opitionpost = useSelector((state: RootState) => state.opition.mode);
  return (
    <div>
      {opitionpost && <div />}
      {!opitionpost && (
        <div className=" absolute z-10 bottom-[200px]  left-[600px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[10px] p-[10px]">
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
            style={{
              width: 450,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              marginBottom: 10,
              paddingRight: 20,
            }}
          >
            <p
              className="mx-auto  center"
              style={{
                fontSize: 15,
                color: "black",
                fontStyle: "bold",
                marginLeft: 20,
              }}
            >
              Cài đặt
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opitionpost;
