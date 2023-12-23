import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { BsShare, BsSave } from "react-icons/bs";
interface Props {
  cmt: any;
}
const FooterItemPost = ({ cmt }: Props) => {
  return (
    <div className="h-[20%] w-full mb-2">
      <div className="w-full flex justify-between">
        <div className="flex pt-3">
          <div className="text-[22px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
            <AiOutlineHeart />
          </div>
          <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
            {" "}
            <FaRegComment />{" "}
          </div>
          <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
            {" "}
            <BsShare />
          </div>
        </div>
        <div className="pt-3">
          <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
            {" "}
            <BsSave />{" "}
          </div>
        </div>
      </div>
      <div className="flex justify-start my-2 ml-1">
        <p className="text-[15px]">160.373 lượt thích</p>
      </div>
      <div className="flex justify-start my-2 ml-1">
        <p className="text-[12px]">{cmt}</p>
      </div>
      <div className="flex justify-start my-2 ml-1">
        <p className="text-[12px] text-[#999898] cursor-pointer">
          Xem tất cả các bình luận
        </p>
      </div>
      <div className="flex ">
        <input
          type="text"
          placeholder="Thêm bình luận"
          className=" w-[90%] h-[80%] pl-2 text-[15px] outline-none"
        />
      </div>
    </div>
  );
};

export default FooterItemPost;
