import React from "react";
import ImgStory from "src/assets/i.png";
const ItemStory = () => {
  return (
    <div className=" w-[80px] flex items-center justify-center">
      <div>
        <img
          src={ImgStory}
          alt=""
          className="h-[70px] w-[70px] border-solid border-[#eeeeee] border-[1px] rounded-full p-1"
        />
        <p>NPC</p>{" "}
      </div>
    </div>
  );
};

export default ItemStory;
