import { useEffect, useState } from "react";
import { AiOutlineEllipsis, AiOutlineHeart } from "react-icons/ai";
import { BsSave, BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import Opitionpost from "src/components/Header/Opitionpost";
import { ReloadLike, tokenState, Reload } from "src/recoil/initState";
import API from "src/services/API";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { IoIosClose } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { LuSend } from "react-icons/lu";
interface Props {
  content1: string;
  imgg: string;
  id: string;
  idPost: string;
  countLike: any;
  islike: any;
}
interface Comment {
  content: string;
  image: string;
  userHandle: string;
  fullName: string;
  id: string;
  replyContent: string;
  childrenComment: any;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface UserCmt {
  fullName: string;
  image: string;
}
interface ResponseData1 {
  dataUser: UserCmt[];
  success: boolean;
  message: string;
}
const ItemPost = ({
  content1,
  imgg,
  id,
  idPost,
  countLike = 0,
  islike,
}: Props) => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const [imguser, setImgUser] = useState("");
  const [xidCheck, setXidCheck] = useState("");
  const [idfriend, setDdfriend] = useState("");
  const [fName, setFName] = useState("");
  const [content, setContent] = useState("");
  const [like, setLike] = useRecoilState(ReloadLike);
  const [data, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const [dataUser, setDataUser] = useState<ResponseData1>({
    dataUser: [],
    success: false,
    message: "",
  });
  // Lay userId cua user dang nhap
  const [imgS, setImgS] = useState("");
  const [imgS1, setImgS1] = useState(true);
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
        console.log(responseInfo);

        setDdfriend(responseInfo.data.data.userId);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [token]);
  //
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const responseInfo = await api.get(
          `http://www.socialnetwork.somee.com/api/infor/user/${id}`
        );
        console.log(responseInfo);
        setImgUser(responseInfo.data.data.image);
        setFName(responseInfo.data.data.fullName);
        setXidCheck(responseInfo.data.data.userId);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, [token]);
  const handleLike = async () => {
    setAuthToken(token);
    try {
      const id = idPost;
      await api
        .post(`http://www.socialnetwork.somee.com/api/like/${id}`)
        .then((response) => {
          // Cập nhật dữ liệu vào state
          if (response.status === 200) {
            setLike(like + 1);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Login failed", error);
    }
  };
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
          console.log(response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const loadDataUserCmt = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData1>(
        `http://www.socialnetwork.somee.com/api/infor/user/${id}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setDataUser(response.data);
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(id);
  const [reload, setReload] = useRecoilState(Reload);
  const deletePost = async () => {
    setAuthToken(token);
    console.log(id);
    const response = await api.delete(
      `http://www.socialnetwork.somee.com/api/post/${idPost}`
    );
    console.log(response);
    if (response.status === 204) {
      setReload(reload + 1);
    }
  };
  const addCmt = async () => {
    setAuthToken(token);
    const postId = idPost;
    const userId = id;
    setContent("");
    return api
      .post(API.POST_COMMENT, { content, postId, userId })
      .then((res) => {
        if (res.status === 200) {
          loadData();
          loadDataUserCmt();
        }
      })
      .catch((err) => console.log(err));
  };
  const hanldCmtChild = async (pId: string) => {
    setAuthToken(token);
    const postId = idPost;
    const userId = id;
    const parentId = pId;
    return api
      .post(API.POST_COMMENT, { content, postId, userId, parentId })
      .then((res) => {
        if (res.status === 200) {
          loadData();
          loadDataUserCmt();
          setContent("");
        }
      })
      .catch((err) => console.log(err));
  };
  const hanldDltCmtChild = async (pId: string) => {
    setAuthToken(token);
    // const postId = idPost;
    // const userId = id;
    const parentId = pId;
    return api
      .post(
        `http://www.socialnetwork.somee.com/api/cmt/deleteOrUndo/${parentId}`
      )
      .then((res) => {
        if (res.status === 200) {
          loadData();
          loadDataUserCmt();
          setContent("");
        }
      })
      .catch((err) => console.log(err));
  };
  const [visibleComments, setVisibleComments] = useState(2);

  const handleSeeMore = () => {
    setVisibleComments(visibleComments + 2);
  };
  const handleSeeLess = () => {
    setVisibleComments(2);
  };
  useEffect(() => {
    loadData();
    loadDataUserCmt();
  }, []);
  return (
    <>
      <div className="h-[fit-content] w-[55%] pb-3  ml-[35%] mt-[50px] flex justify-center items-center">
        <div className="w-[80%] border-solid border-b-[1px] border-[#cfcfcf] ">
          <div className="h-[10%] flex justify-between  items-center">
            <div
              className="flex justify-center pl-3 items-center"
              onClick={() => {
                xidCheck == idfriend
                  ? navigate("/inforuser")
                  : navigate(`/info-friend/${xidCheck}`);
              }}
            >
              <img
                src={imguser}
                className="h-10 w-10 cursor-pointer rounded-full"
                alt=""
              />
              <div className="ml-3 cursor-pointer">
                <div className="flex flex-col justify-start items-start">
                  <p className="text-[16px]">{fName}</p>
                  <p className="text-[#a3a3a3] text-[13px] ">2 day</p>
                </div>
              </div>
            </div>
            <p
              className="text-[20px] font-semibold pr-3 cursor-pointer"
              onClick={deletePost}
            >
              <IoIosClose />
            </p>
          </div>
          <div className=" h-[70%] w-full mt-4">
            <img
              src={imgg}
              alt=""
              className="h-full w-full rounded-[15px]"
              onClick={() => {
                setImgS(imgg), setImgS1(false);
              }}
            />
          </div>
          <div className="h-[20%] w-full mb-2">
            <div className="w-full flex justify-between">
              <div className="flex pt-3">
                <div
                  className="text-[22px] mx-2 cursor-pointer hover:text-[#a3a3a3]"
                  onClick={handleLike}
                >
                  {islike == false ? (
                    <AiOutlineHeart color="black" />
                  ) : (
                    <IoIosHeart color="pink" />
                  )}
                </div>
                <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
                  {" "}
                  <FaRegComment />{" "}
                </div>
                <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
                  {" "}
                  <LuSend />
                </div>
              </div>
              {/* <div className="pt-3">
              <div className="text-[20px] mx-2 cursor-pointer hover:text-[#a3a3a3]">
                {" "}
                <BsSave />{" "}
              </div>
            </div> */}
            </div>
            <div className="flex justify-start my-2 ml-1">
              <p className="text-[15px] font-bold">{countLike} lượt thích</p>
            </div>
            <div className="flex justify-start my-2 ml-1 items-center">
              {/* <p className="text-[16px] font-bold">{fName}: </p> */}
              <p className="text-[20px] ml-1"> {content1}</p>
            </div>

            <div className="flex mb-6">
              <input
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                type="text"
                placeholder="Thêm bình luận..."
                className=" w-[90%] h-[80%] pl-2 text-[19px] outline-none"
              />
              {content === "" ? (
                <></>
              ) : (
                <div className="cursor-pointer ml-2" onClick={addCmt}>
                  <FiSend color={"#ff7f50"} />
                </div>
              )}
            </div>
            <div className="block">
              {data.data.map((item: Comment, index: number) => (
                <div className="flex items-start mb-4" key={index}>
                  {/* Avatar and user information */}
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={item.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>

                  {/* User information and comment */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <p className="text-[18px] text-black font-semibold mb-0 mr-1">
                          {item.fullName}
                        </p>
                        <span className="text-[12px] text-gray-500">
                          {item.userHandle}
                        </span>
                        {/* User's comment */}
                        <p className="text-[18px] text-black cursor-pointer">
                          {item.content}
                        </p>
                      </div>
                      <div>
                        <span
                          className="text-[12px] text-black cursor-pointer"
                          onClick={() => hanldCmtChild(item.id)}
                        >
                          Phản hồi
                        </span>
                        <span
                          className="text-[12px] text-black cursor-pointer ml-2"
                          onClick={() => hanldDltCmtChild(item.id)}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>

                    {/* Reply link */}
                    <div className="flex justify-end">
                      <p className="text-[20px] text-black cursor-pointer">
                        {item.replyContent}
                      </p>
                    </div>

                    {/* Children comments */}
                    <div className="flex flex-col">
                      {item.childrenComment
                        .slice(0, visibleComments)
                        .map((childComment: any, index1: any) => (
                          <div
                            key={index1}
                            className="flex justify-between mb-2 border-solid border-l-[1px] border-[#cfcfcf] "
                            style={{ height: "auto" }}
                          >
                            {/* Avatar */}
                            <div className="flex h-auto">
                              {" "}
                              <img
                                src={childComment.image}
                                alt="User Avatar"
                                className="w-6 h-6 rounded-full mr-2 ml-2"
                              />
                              <div className="flex items-center mb-1">
                                <span className="text-[15px] text-black font-semibold mr-2">
                                  {childComment.fullName}
                                </span>
                                <span
                                  className="text-[15px] text-black flex-grow"
                                  style={{ maxWidth: "100px" }}
                                >
                                  {childComment.content + ""}
                                </span>
                              </div>
                            </div>
                            {/* Comment content and user information */}
                            <div className="flex justify-between items-center">
                              <span
                                className="text-[12px] text-black cursor-pointer"
                                onClick={() => hanldCmtChild(item.id)}
                              >
                                Phản hồi
                              </span>
                              <span
                                className="text-[12px] text-black cursor-pointer ml-2"
                                onClick={() =>
                                  hanldDltCmtChild(childComment.id)
                                }
                              >
                                Xóa
                              </span>
                            </div>
                          </div>
                        ))}

                      {item.childrenComment.length > visibleComments && (
                        <div
                          className="text-[12px] text-black cursor-pointer"
                          onClick={handleSeeMore}
                        >
                          Xem thêm
                        </div>
                      )}
                      {item.childrenComment.length < visibleComments &&
                        visibleComments > 2 && (
                          <div
                            className="text-[12px] text-black cursor-pointer"
                            onClick={handleSeeLess}
                          >
                            Ẩn đi
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Opitionpost />
        </div>
      </div>
      {!imgS1 && (
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
          <img src={imgS} alt="" className="h-[70vh]" />
          <div className="absolute top-5 right-5 text-[30px] cursor-pointer">
            <IoIosClose
              onClick={() => {
                setImgS1(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ItemPost;
