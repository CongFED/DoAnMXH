import { TfiWrite } from "react-icons/tfi";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "src/firebase";
import { AuthContext } from "src/context/AuthContext";
const HeaderChat = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="w-full h-[80px] bg-yellow flex justify-between items-center px-3">
      <div className="flex items-center cursor-pointer">
        <img
          src={currentUser.photoURL}
          alt="Avatar"
          className="w-14 h-14 rounded-[50%] border-[1px] p-2 "
        />
        <span className="font-semibold ml-2">{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default HeaderChat;
