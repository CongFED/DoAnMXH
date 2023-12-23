import React, { lazy, Suspense } from "react";

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

const ItemPost = lazy(() => import("src/pages/Home/ItemPosts/ItemPost"));

interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
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

const InfoUser: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const [cmt, setCmt] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });

  const reload = useRecoilValue(Reload);
  const reloadLike = useRecoilValue(ReloadLike);
  const [uName, setUName] = useState("");
  const [uImg, setUImg] = useState("");
  const [total, setTotal] = useState(0);
  console.log(reload);
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const base64UrlDecode = (base64Url: any) => {
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          return atob(base64);
        };

        const decodeToken = (token: any) => {
          const [header, payload, signature] = token.split(".");
          const decodedHeader = JSON.parse(base64UrlDecode(header));
          const decodedPayload = JSON.parse(base64UrlDecode(payload));

          return {
            header: decodedHeader,
            payload: decodedPayload,
            signature: signature,
          };
        };
        const tokenDecode = localStorage.getItem("token");
        const idToken = decodeToken(tokenDecode);
        const id = idToken.payload.id;
        const response = await api.get<ResponseData>(
          `http://www.socialnetwork.somee.com/api/post/user/${id}`
        );
        console.log(response.data.data.length);
        setTotal(response.data.data.length);
        setCmt(response.data);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [reload, reloadLike]);
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const base64UrlDecode = (base64Url: any) => {
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          return atob(base64);
        };

        const decodeToken = (token: any) => {
          const [header, payload, signature] = token.split(".");
          const decodedHeader = JSON.parse(base64UrlDecode(header));
          const decodedPayload = JSON.parse(base64UrlDecode(payload));

          return {
            header: decodedHeader,
            payload: decodedPayload,
            signature: signature,
          };
        };
        const tokenDecode = localStorage.getItem("token");
        const idToken = decodeToken(tokenDecode);
        const id = idToken.payload.id;
        const responseInfo = await api.get(
          `http://www.socialnetwork.somee.com/api/infor/user/${id}`
        );
        setUName(responseInfo.data.data.fullName);
        setUImg(responseInfo.data.data.image);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [token]);
  return (
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
                  <button className="bg-[#dbdbdb] w-[300px] rounded-[10px] p-2 font-bold ml-2">
                    Chỉnh sửa trang cá nhân
                  </button>
                  <button className="bg-[#dbdbdb] w-[200px] rounded-[10px] p-2 font-bold ml-2">
                    Xem kho lưu trữ
                  </button>
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
        <div className="mx-auto w-full flex ml-[18%]">
          <MyPostWidget img={uImg} />
        </div>
        <div className="ml-[20%]">
          <Suspense fallback={<div>Loading...</div>}>
            {cmt.data.map((item: Comment, index: number) => (
              <ItemPost
                key={index}
                content1={item.content}
                imgg={
                  item.images && item.images.length > 0
                    ? item.images[0].linkImage
                    : ""
                }
                id={item.userId}
                idPost={item.id}
                countLike={item.countLike}
                islike={item.islike}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
