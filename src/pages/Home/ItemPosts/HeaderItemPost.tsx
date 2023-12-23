import React from "react";
import logoPr from "src/assets/i.png";
import { AiOutlineEllipsis } from "react-icons/ai";
import { toggleOpition } from "src/redux/opitionpostSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/store";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, setAuthToken } from "src/utils/setAuthToken";
interface Props {
  imguser: any;
  fName: any;
  idPost: any;
}
const HeaderItemPost = ({ imguser, fName, idPost }: Props) => {
  // dispatch(toggleOpition(!true));
  // const mode = useSelector((state) => state.);
  // const handleOpitionpost = () => {
  //   dispatch(toggleOpition(!opitionpost));
  // };
  const loadData = async () => {
    // Gọi API để lấy dữ liệu
    const id = idPost;
    await api
      .get<ResponseData>(
        `http://www.socialnetwork.somee.com/api/cmt/getcmtPost/${id}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          console.log(response.data.data[0]);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="h-[10%] flex justify-between  items-center">
      <div className="flex justify-center pl-3">
        <img
          src={imguser}
          className="h-10 w-10 cursor-pointer rounded-full"
          alt=""
        />
        <div className="ml-3 cursor-pointer">
          <div className="flex">
            <p>{fName}</p>
            <p className="text-[#a3a3a3] text-[13px] ml-3">2 day</p>
          </div>
        </div>
      </div>
      <p className="text-[20px] font-semibold pr-3 cursor-pointer">
        <AiOutlineEllipsis />
      </p>
    </div>
  );
};

export default HeaderItemPost;
