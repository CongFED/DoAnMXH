import React from "react";
import ImgAv from "src/assets/i.png";
import { useNavigate } from "react-router-dom";
interface Props {
  img: string;
  fullName: string;
  SpecialName: string;
  sub?: string;
}
const BodyRight = ({ img, fullName, SpecialName, sub }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="h-[10%] w-[100%] my-1">
      <div className="w-full  flex justify-between items-center">
        <div
          className="flex justify-start items-center"
          onClick={() => {
            navigate(`/info-friend/${sub}`);
          }}
        >
          <img
            src={img}
            alt=""
            className="h-[50px] w-[50px] rounded-full cursor-pointer"
          />
          <div className=" cursor-pointer ml-2">
            <div className="flex">
              <p className="text-black">{fullName}</p>
            </div>
            <div className="flex justify-start">
              {" "}
              <p className="text-[13px] text-[#dfdfdf]">{SpecialName}</p>
            </div>
          </div>
        </div>
        <div>
          {sub != "" ? (
            <p className="text-[#199ff7] text-[12px] hover:text-[#597d9f] cursor-pointer">
              Thêm bạn bè
            </p>
          ) : (
            <p className="text-[#199ff7] text-[12px] hover:text-[#597d9f] cursor-pointer">
              Chuyển
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyRight;
