import React from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
const MesageChat = () => {
  return (
    <div className="w-[80%] h-[vh] bg-white flex justify-center items-center">
      <div className="h-auto w-[40%] text-center ">
        <div className="mx-auto text-[150px] w-[50%] rounded-[50%] text-[#ff7f50] border-[#ff7f50] border-[2px] border-solid p-7 flex justify-center items-center">
          <BiMessageRoundedDots />
        </div>
        <h1 className="text-[20px] my-3"> Tin nhắn riêng của bạn</h1>
        <p className="text-[#939393] my-3">
          Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
        </p>
        <button className="bg-[#1877f2] text-white py-2 px-5 rounded-xl">
          Gửi tin nhắn
        </button>
      </div>
    </div>
  );
};

export default MesageChat;
