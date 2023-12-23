import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import API from "src/services/API";
import styled from "styled-components";
import { toast } from "react-toastify";
// Import Recoil atom
import { tokenState, Email, Password, EmailRegis } from "src/recoil/initState";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase";
export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

export const SignUpContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 `
      : null}
`;

export const SignInContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div<{ signinIn: boolean }>`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)<{ signinIn: boolean }>`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)<{ signinIn: boolean }>`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
interface MyAxiosRequestConfig {
  withCredentials: boolean;
  credentials: "include";
}
const Login = () => {
  const history = useNavigate();
  const [signIn, toggle] = React.useState(true);
  const [emailRecoil, setEmailRecoil] = useRecoilState(Email);
  const [emailRegisRecoil, setEmailRegisRecoil] = useRecoilState(EmailRegis);
  const [passwordRecoil, setPasswordRecoil] = useRecoilState(Password);
  useEffect(() => {
    const user = localStorage.getItem("token");

    if (user) history("/");
  }, [history]);

  // Register
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [comFirmPassword, setComFirmPassword] = useState("");
  const [, setToken] = useRecoilState(tokenState);
  const token1 = useRecoilValue(tokenState);
  const handleRegister = async () => {
    try {
      if (password1 === comFirmPassword) {
        const data = {
          email: email,
          password: password1,
        };

        fetch(API.REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Đặt cookie vào header
            // Cookie: cookieJar.getCookieStringSync(API.REGISTER),
          },
          body: JSON.stringify(data),

          credentials: "include",
        })
          .then((response) => {
            // Xử lý cookie từ response nếu cần thiết
            console.log(response);
            const cookies = response.headers.get("set-cookie");

            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            // Xử lý lỗi ở đâ
          });
        setEmailRegisRecoil(email);
        navigate("/verify");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  // Login

  const [emailLogin, setEmailLgoin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleLogin = async () => {
    try {
      const data = {
        email: email,
        password: password1,
      };

      const response = await axios.post(API.LOGIN, data);

      setEmailRecoil(email);
      setPasswordRecoil(password1);
      const token = response.data.data.data.jwtToken;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Update Recoil atom with token
      setToken(token);

      //
      const base64UrlDecode = (base64Url: any) => {
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return atob(base64);
      };

      const decodeToken = (token: any) => {
        const [header, payload, signature] = token.split(".");
        const decodedHeader = JSON.parse(base64UrlDecode(header));
        const decodedPayload = JSON.parse(base64UrlDecode(payload));

        return {
          header: decodedHeader,
          payload: decodedPayload,
          signature: signature,
        };
      };
      const tokenDecode = localStorage.getItem("token");
      const idToken = decodeToken(tokenDecode);
      const id = idToken.payload.id;
      console.log(id);

      if (response.data.data.data.hasInfor === false) {
        navigate("/info");
      } else {
        const password = "123456";
        // Hàm callback sẽ được gọi sau khi setPassword hoàn tất
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
      // try {
      //   const responseInfo = await api.get(
      //     `http://www.socialnetwork.somee.com/api/infor/user/${id}`
      //   );
      //   // Nếu không có lỗi, chuyển hướng đến "/"
      //   console.log(responseInfo);
      //   await signInWithEmailAndPassword(auth, email, password);
      //   navigate("/");
      // } catch (error: any) {
      //   // Xử lý lỗi
      //   console.error(error);

      //   // Kiểm tra nếu là lỗi 500 (Internal Server Error), chuyển hướng đến "/info"
      //   if (error.response && error.response.status === 500) {
      //     navigate("/info");
      //   }
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form>
            <Title>Create Account</Title>
            {/* <Input type="text" placeholder="Name" /> */}
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Comfirm Password"
              onChange={(e) => setComFirmPassword(e.target.value)}
            />
            {/* border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  } */}
            <button
              onClick={handleRegister}
              className="py-3 px-10 rounded-[20px] border-[1px] border-solid border-[#ff4b2b] bg-[#ff4b2b] text-[white] text-[12px] font-bold uppercase"
            >
              Sign Up
            </button>
          </Form>
        </SignUpContainer>

        <SignInContainer signinIn={signIn}>
          <Form>
            <Title>Sign in</Title>
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => navigate("/fgpw")}>Forgot your password?</span>
            <button
              onClick={handleLogin}
              className="py-3 px-10 rounded-[20px] border-[1px] border-solid border-[#ff4b2b] bg-[#ff4b2b] text-[white] text-[12px] font-bold uppercase"
            >
              Sigin In
            </button>
          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={signIn}>
          <Overlay signinIn={signIn}>
            <LeftOverlayPanel signinIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                20110447 - Nguyễn Phước Công
                <br /> 20110590 - Trần Nguyễn Huy Trường 20110502 - Phan Duy
                Khánh
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signinIn={signIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                20110447 - Nguyễn Phước Công
                <br /> 20110590 - Trần Nguyễn Huy Trường 20110502 - Phan Duy
                Khánh
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sigin Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </div>
  );
};

export default Login;
