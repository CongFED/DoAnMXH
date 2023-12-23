import Input from "../Chat/Input";
import { ChatContext } from "src/context/ChatContext";
import Call from "src/assets/call.png";
import Cam from "src/assets/cam.png";
import Add from "src/assets/add.png";
import More from "src/assets/more.png";
import Messages from "src/components/Chat/Messages";
import React, { useState, useContext, useEffect, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { tokenState } from "src/recoil/initState";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const { data } = useContext(ChatContext);

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [name2, setName2] = useState("");
  const [username2, setUserName2] = useState("");
  console.log(data);
  const token = useRecoilValue(tokenState);

  // Handle Lấy request Friend
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);
      try {
        const fullName = data.user?.displayName;
        const responseInfo = await api.get(
          "http://www.socialnetwork.somee.com/api/infor/searchuser",
          {
            params: { fullname: fullName },
          }
        );
        console.log(responseInfo.data.data?.[0].userId);
        setName(responseInfo.data.data?.[0]?.userId.slice(0, 5));
        setUserName(responseInfo.data.data?.[0]?.fullName);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const fetchData1 = async () => {
      setAuthToken(token);
      try {
        const responseInfo = await api.get(
          "http://www.socialnetwork.somee.com/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 10));
        setUserName2(responseInfo.data.data.fullName);
        console.log(name2);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const initChat = async () => {
      await fetchData();
      await fetchData1();
      await init();
    };

    initChat();
  }, []);
  useEffect(() => {
    if (name && name2) {
      init();
    }
  }, [name, name2]);
  ///

  // const [calleeId, setCalleeId] = useState(name);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userId = username2 + "_" + name2;
    const userName = username2;

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

  const handleSend = (callType: any) => {
    const callee = name;
    const usercallee = username;
    console.log(callee);
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }
    console.log(callee);
    // send call invitation
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current
        .sendCallInvitation({
          callees: [{ userID: callee, userName: usercallee }],
          callType: callType,
          timeout: 60,
        })
        .then((res) => {
          console.warn(res);
          if (res.errorInvitees.length) {
            alert("The user dose not exist or is offline.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Handle the case when zeroCloudInstance.current is null
      console.error("zeroCloudInstance.current is null");
    }
  };
  return (
    <div className="w-[80%] h-[100vh] bg-white flex flex-col justify-between">
      <div
        className=""
        style={{
          height: "50px",
          backgroundColor: "",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          color: "lightgray",
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <span className="text-black">{data.user?.displayName}</span>
        <div
          className=""
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {/* <img src={Call} alt="" style={{ height: "24px", cursor: "pointer" }}
           onClick={() => {
          handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
        }}/> */}
          <img
            src={Cam}
            alt=""
            style={{ height: "24px", cursor: "pointer" }}
            onClick={() => {
              handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
            }}
          />
          <img src={Add} alt="" style={{ height: "24px", cursor: "pointer" }} />
          <img
            src={More}
            alt=""
            style={{ height: "24px", cursor: "pointer" }}
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
