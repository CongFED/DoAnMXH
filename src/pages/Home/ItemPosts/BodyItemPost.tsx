import React from "react";
import Post from "src/assets/post1.jpg";
interface Props {
  img: any;
}
const BodyItemPost = ({ img }: Props) => {
  return (
    <div className=" h-[70%] w-full mt-4">
      <img src={img} alt="" className="h-full w-full rounded-[15px]" />
    </div>
  );
};

export default BodyItemPost;
