import React, { lazy, Suspense, useRef } from "react";
import Story from "./Story/Story";
import BodyRight from "./BodyRight/BodyRight";
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
import { avatarRC1 } from "src/recoil/initState";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const ItemPost = lazy(() => import("./ItemPosts/ItemPost"));

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
interface Comment1 {
  xid?: string;
  fullName?: string;
  image?: string;
}

interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface ResponseData1 {
  data: Comment1[];
  success: boolean;
  message: string;
}
const Home: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const [cmt, setCmt] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const [friend, setFriend] = useState<ResponseData1>({
    data: [],
    success: false,
    message: "",
  });
  const reload = useRecoilValue(Reload);
  const reloadLike = useRecoilValue(ReloadLike);
  const [uName, setUName] = useState("");
  const [, setAvatarRC] = useRecoilState(avatarRC1);
  const [uImg, setUImg] = useState("");
  const [seke, setSeke] = useState(false);
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const response = await api.get<ResponseData>(API.GET_ALL_POST);
        console.log(response);

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
        const response = await api.get<ResponseData>(API.GET_ALL_POST);
        console.log(response);

        setCmt(response.data);
        setSeke(true);
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
        const response = await api.get(API.GET_ALL_FRIEND);
        console.log(response);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, []);
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
        setAvatarRC(responseInfo.data.data.image);
        setUImg(responseInfo.data.data.image);
        console.log(responseInfo);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [token]);
  const [name2, setName2] = useState("");
  useEffect(() => {
    const fetchData1 = async () => {
      setAuthToken(token);
      try {
        const responseInfo = await api.get(
          "http://www.socialnetwork.somee.com/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 5));
        console.log(name2);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    const fetchDataF = async () => {
      setAuthToken(token);
      try {
        const responseInfo = await api.get<ResponseData1>(
          "http://www.socialnetwork.somee.com/api/Friend/getAllNotFriend"
        );
        setFriend(responseInfo.data);
        console.log(friend);
        console.log(responseInfo.data);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    const initChat = async () => {
      await fetchData1();
      await fetchDataF();
      await init();
    };

    initChat();
  }, []);
  useEffect(() => {
    if (name2) {
      init();
    }
  }, [name2]);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userId = name2;
    const userName = "user_" + userId;

    const appID = 4106559; // fill your appID here
    const serverSecret = "a8a7d91a7a9870bfd52d871b99cdbaf2"; // fill your serverSecret here
    console.log(appID, serverSecret, userId, userName);
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    console.log(KitToken);
    // add plugin
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current.addPlugins({ ZIM });
    } else {
      console.error("zeroCloudInstance.current is null or undefined");
    }
  }

  return (
    <div className="w-full h-auto flex">
      <div className="w-[73%] mb-[100px]">
        {/* <Story /> */}
        <MyPostWidget img={uImg} />
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

      <div className="w-[23%] mt-10">
        <div className="rounded-[15px] border-[1px] border-solid border-[#eeeeee] mb-3 px-3 sticky top-10">
          <BodyRight img={uImg} fullName={uName} SpecialName="fed.NPC" sub="" />
        </div>
        <div className="w-[100%] h-[fit-content] rounded-[15px] border-[1px] border-solid border-[#eeeeee] px-3 py-3 sticky top-[133px]">
          <div className="flex justify-between">
            <p className="text-[#8c8c8c] text-[13px]">Gợi ý cho bạn</p>
            <p className="text-[13px] text-black font-extralight cursor-pointer">
              Xem tất cả
            </p>
          </div>
          <div className="mt-2">
            {friend.data.slice(0, 4).map((item: Comment1, i: number) => (
              <BodyRight
                img={item.image || ""}
                fullName={item.fullName || ""}
                SpecialName=""
                sub={item.userId}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[15px] text-left mb-3 px-3 sticky top-[433px] flex flex-col">
          <span className="text-[#cdcdcd] text-[12px]">
            Giới thiệu - Trợ giúp - Báo chí - API - Việc làm Quyền riêng tư Điều
            khoản Vị trí Ngôn ngữ Meta đã xác minh
          </span>
          <span className="text-[#cdcdcd] text-[12px] mt-3">
            © 2023 INSTAGRAM FROM META
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
