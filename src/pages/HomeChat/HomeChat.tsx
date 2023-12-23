import React, { useContext } from "react";
import Sidebar from "src/components/Chat/Sidebar";
import { ChatContext } from "src/context/ChatContext";
import SideBar2 from "src/components/Chat2/SideBar2";
import MesageChat from "src/components/Chat2/MesageChat";
import { ChatCheck } from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import Chat from "src/components/Chat2/Chat";
const HomeChat = () => {
  const [chatcheck, setChatCheck] = useRecoilState(ChatCheck);
  const { data } = useContext(ChatContext);
  console.log(data.user?.displayName);
  return (
    <div className="bg-[#a7bcff] w-full h-auto  flex overflow-y-hidden">
      <div className="w-[100%] ml-[17%] bg-black flex overflow-y-hidden">
        {/* <Sidebar />
        <Chat /> */}
        <SideBar2 />
        {/* <Chat /> */}
        {data.user?.displayName == undefined ? <MesageChat /> : <Chat />}
      </div>
    </div>
  );
};

export default HomeChat;
