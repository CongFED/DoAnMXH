import React, { lazy, Suspense } from "react";
import { FaRegUser } from "react-icons/fa6";
import ImgAv from "src/assets/i.png";
import MyPostWidget from "src/components/CreatePost/MyPostWidget";
import { api, setAuthToken } from "src/utils/setAuthToken";
import axios from "axios";
import API from "src/services/API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  tokenState,
  Email,
  Password,
  Reload,
  ReloadLike,
} from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from 'react-router-dom';
const ItemPost = lazy(() => import("src/pages/Home/ItemPosts/ItemPost"));

interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: number;
  islike: boolean;
}

interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}

const InfoFriend: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const [cmt, setCmt] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const { idfriend } = useParams();

  const reload = useRecoilValue(Reload);
  const reloadLike = useRecoilValue(ReloadLike);
  const [uName, setUName] = useState("");
  const [uImg, setUImg] = useState("");
  const [total, setTotal] = useState(0);
  const [statusF, setStatusF] = useState("");
  console.log(idfriend)
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const id = idfriend;
        const response = await api.get<ResponseData>(
          `http://www.socialnetwork.somee.com/api/post/user/${id}`
        );
        console.log(response);
        setTotal(response.data.data.length);
        setCmt(response.data);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [reload, reloadLike]);
  useEffect(() => {
    // Hàm fetchData
    const fetchData = async () => {
      try {
        const id = idfriend;
        console.log(id);
        const responseInfo = await api.get(
          `http://www.socialnetwork.somee.com/api/infor/user/${id}`
        );

        console.log(responseInfo);
        setUName(responseInfo.data.data.fullName);
        setUImg(responseInfo.data.data.image);
        setStatusF(responseInfo.data.data.statusFriend);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    // Gọi fetchData khi component được mount
    fetchData();

    // Thiết lập interval để gọi fetchData mỗi giây khi token thay đổi
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clear interval khi component bị unmount để tránh memory leak
    return () => clearInterval(intervalId);
  }, [ idfriend]); // Thêm idfriend vào dependencies để trigger khi idfriend thay đổi


  const handleAddF = async () => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post( `http://www.socialnetwork.somee.com/api/Friend/send/${id}`);
      console.log(response)
      // if(response.status == 200) {
      //   const responseInfo = await api.get(
      //     `http://www.socialnetwork.somee.com/api/infor/user/${id}`

      //   );setStatusF(responseInfo.data.data.statusFriend)
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  const [sb, setSb] = useState(false);
  const handleConfirm = async () => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.delete( `http://www.socialnetwork.somee.com/api/Friend/unfriend/${id}`);
      console.log(response)
      // if(response.status == 200) {
      //   const responseInfo = await api.get(
      //     `http://www.socialnetwork.somee.com/api/infor/user/${id}`

      //   );setStatusF(responseInfo.data.data.statusFriend)
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
    // Xử lý khi nhấn xác nhận
    setSb(false);


  };

  const handleCancel = () => {
    // Xử lý khi nhấn hủy
    setSb(false);
  };
  return (
    <>
      <div className="w-full h-auto flex mb-[200px]">
      <div className="w-[73%] mb-[100px]">
        {/* <Story /> */}
        <div className="h-[100px] w-[100%] ml-[25%] my-[50px]">
          <div className="w-[60%]  mx-auto flex justify-between items-center ">
            <div className="flex justify-start items-center">
              <img
                src={uImg}
                alt=""
                className="h-[130px] w-[130px] rounded-full cursor-pointer"
              />
              <div className=" cursor-pointer ml-[100px]">
                <div className="flex items-center justify-between">
                  <p>{uName}</p>
                  {
  statusF === "Thêm bạn bè" ? (
    <button
      onClick={handleAddF}
      className="bg-[#612cf6] w-[150px] text-white rounded-[10px] px-2 py-1 font-bold ml-2"
    >
      Thêm bạn bè
    </button>
  ) : statusF === "Hủy lời mời" ? (
    <button
      onClick={handleAddF}
      className="bg-[#612cf6] w-[150px] text-white rounded-[10px] px-2 py-1 font-bold ml-2"
    >
      Hủy lời mời
    </button>
  ) : (
    <button
      onClick={() => {
        setSb(true);
      }}
      className="bg-[#612cf6] w-[100px] text-white rounded-[10px] px-2 py-1 font-bold ml-2 flex items-center justify-center"
    >
      <FaRegUser /> <span className="ml-2">Bạn bè</span>
    </button>
  )
}




                </div>
                <div className="flex justify-between mt-2">
                  <p>{total} bài viết</p>
                  <p>0 người theo dõi</p>

                  <p>0 theo dõi ai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[20%]">
          <Suspense fallback={<div>Loading...</div>}>
            {cmt.data.map((item: Comment, index: number) => (
              <ItemPost
                key={index}
                content1={item.content}
                imgg={item.images[0].linkImage}
                id={item.userId}
                idPost={item.id}
                countLike={item.countLike}
                islike={item.islike}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div> {sb && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "25px 20px",
                borderRadius: "16px",
                textAlign: "center",
                width: "20%",
              }}
            >
              {/* Nội dung form đặt lịch */}
              <h2
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "25.2px",
                  textAlign: "center",
                  color: "#111111",
                }}
              >
                Xác nhận hủy kết bạn
              </h2>
              <p
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#78828A",
                }}
              >
                Bạn có muốn chắc chắn hủy kết bạn?
              </p>
              <div
                style={{
                  marginTop: "20px",
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-around",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <button
                  onClick={handleCancel}
                  style={{
                    marginBottom: "0",
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "17.64px",
                    textAlign: "center",
                    color: "#71DBB8",
                    border: "0",
                    background: "transparent ",
                  }}
                >
                  Hủy
                </button>{" "}
                <button
                  onClick={handleConfirm}
                  style={{
                    borderRadius: "20px",
                    padding: "12px 24px 12px 24px",
                    border: 0,
                    background: "#71DBB8",
                    color: "#FEFEFE",
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "17.64px",
                    textAlign: "center",
                  }}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default InfoFriend;
