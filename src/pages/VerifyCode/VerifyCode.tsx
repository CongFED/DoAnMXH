import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import axios from "axios";
import toast from "react-hot-toast";
import API from "src/services/API";
// Import Recoil atom
import { tokenState } from "src/recoil/initState";
import "./style.css";
import { EmailRegis } from "src/recoil/initState";
interface Props {}

const VerifyCode: FC<Props> = () => {
  const history = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const navigate = useNavigate();
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  // const [pin, setPin] = useState("0");
  const [emailRegisRecoil, setEmailRegisRecoil] = useRecoilState(EmailRegis);
  const [, setToken] = useRecoilState(tokenState);

  const handlePin = async () => {
    const pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
    console.log(pin); // Hiển thị kiểu dữ liệu "string"
    const email = emailRegisRecoil;

    try {
      const response = await axios.post(API.VERIFY_PIN, {
        email,
        pin,
      });
      // const token = response.data.data.token;
      console.log(response);
      // Save token to localStorage
      if (response.data.data == "Xác thực thành công") {
        toast.success("Xác thực thành công");
        navigate("/login");
      } else {
        toast.error("Xác thực thất bại");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  //
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col ">
      <div className="container flex justify-center items-center">
        <div>
          <h1 className="title text-white">Nhập OTP</h1>
          <form id="otp-form">
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="1"
              onChange={(e) => setPin1(e.target.value)}
            />
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="2"
              onChange={(e) => setPin2(e.target.value)}
            />
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="3"
              onChange={(e) => setPin3(e.target.value)}
            />
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="4"
              onChange={(e) => setPin4(e.target.value)}
            />
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="5"
              onChange={(e) => setPin5(e.target.value)}
            />
            <input
              type="text"
              className="otp-input"
              maxLength={1}
              placeholder="6"
              onChange={(e) => setPin6(e.target.value)}
            />
          </form>
          <button id="verify-btn" onClick={handlePin}>
            Xác nhận OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
