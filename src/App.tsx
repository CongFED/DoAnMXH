import "./App.css";
import React, { Fragment, useMemo, useEffect, useState, useRef } from "react";
import { RingLoader } from "react-spinners";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { publicRoutes } from "./routes";
import Logo from "../src/assets/LogoSN.png";
import Logo2 from "../src/assets/Logo2.png";
import Login from "src/pages/Login/Login";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ChatBody from "src/components/chatBody/ChatBody";
import { RouteProps } from "react-router-dom";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  tokenState,
  Email,
  Password,
  Reload,
  ReloadLike,
} from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { ZIM } from "zego-zim-web";
import Info from "./pages/Info/Info";
import ForgotPassword from "src/pages/ForgotPW/ForgotPW";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import VerifyCode1 from "./pages/VerifyCode1/VerifyCode1";
import ChangePW from "./pages/ChangePW/ChangePW";
function App() {
  const mode = "light";
  const [loading, setLoading] = useState(true); // State để kiểm soát trạng thái loading
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  useEffect(() => {
    // Giả lập một thời gian tải, bạn có thể thay đổi giá trị 2000 thành thời gian tải thực tế
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 3000);
  }, []);
  const token = useRecoilValue(tokenState);
  const [name2, setName2] = useState("");
  useEffect(() => {
    const fetchData1 = async () => {
      setAuthToken(token);
      try {
        const responseInfo = await api.get(
          "http://www.socialnetwork.somee.com/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 5));
        console.log(name2);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const initChat = async () => {
      await fetchData1();
      await init();
    };

    initChat();
  }, []);
  useEffect(() => {
    if (name2) {
      init();
    }
  }, [name2]);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userId = name2;
    const userName = "user_" + userId;

    const appID = 4106559; // fill your appID here
    const serverSecret = "a8a7d91a7a9870bfd52d871b99cdbaf2"; // fill your serverSecret here
    console.log(appID, serverSecret, userId, userName);
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    console.log(KitToken);
    // add plugin
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current.addPlugins({ ZIM });
    } else {
      console.error("zeroCloudInstance.current is null or undefined");
    }
  }
  const user = true;
  // const [theme, setTheme] = useState(null);
  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // }, []);
  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);
  return (
    <>
      {loading ? (
        <div
          className="duration-700 transition-all fixed w-full bottom-0 overflow-hidden z-[9999999]"
          style={{
            height: "100vh",
            width: "100vw",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} style={{ height: "100px", width: "100px" }} alt="" />
          <img
            src={Logo2}
            style={{
              position: "absolute",
              height: "150px",
              width: "150px",
              bottom: "20px",
            }}
            alt=""
          />
        </div>
      ) : (
        <>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<VerifyCode />} />
                <Route path="/verify1" element={<VerifyCode1 />} />
                <Route path="/changepw" element={<ChangePW />} />
                {/* <Route path="/chat" element={<ChatBody />} /> */}
                <Route path="/info" element={<Info />} />
                {/* <Route path="emulator/action" element={<PasswordReset />} /> */}
                <Route path="/fgpw" element={<ForgotPassword />} />
                {publicRoutes.map((publicRoute, index) => {
                  let Layout = publicRoute.layout;
                  let Page;

                  Page = publicRoute.component;

                  return (
                    <Route
                      key={index}
                      path={publicRoute.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>{" "}
            </div>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
