import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import React, { useEffect, useRef, useState, memo, ReactNode } from "react";
const ChatBody = () => {
  return (
    <div className="main__chatbody h-[100vh]">
      <ChatList />
      <ChatContent />
      <UserProfile />
    </div>
  );
};

export default ChatBody;
