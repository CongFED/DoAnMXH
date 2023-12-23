import React from "react";
import HeaderChat from "./HeaderChat";
import ListChat from "./ListChat";
const SideBar2 = () => {
  return (
    <div
      className="w-[20%] bg-white  "
      style={{ borderRight: "1px solid #dbdbdb" }}
    >
      <HeaderChat />
      <ListChat />
    </div>
  );
};

export default SideBar2;
