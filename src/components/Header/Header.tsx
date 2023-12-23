import React, { useState, useContext, useEffect } from "react";
import Logo from "src/assets/LogoMain.png";
import {
  BiSolidHome,
  BiSearchAlt2,
  BiRadar,
  BiChat,
  BiUserCircle,
} from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { CiChat2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import {
  AiOutlineHeart,
  AiOutlinePlusSquare,
  AiOutlineMenu,
  AiOutlineSetting,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsClockHistory, BsBookmark, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "src/firebase";
import { AuthContext } from "src/context/AuthContext";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { tokenState } from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { avatarRC1 } from "src/recoil/initState";
interface Notify {
  fullName: string;
  userId: string;
  image: string;
}

interface ResponseData {
  data: Notify[];
  success: boolean;
  message: string;
}
const Header = () => {
  const [notify, setNotify] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(true);
  const [searchU, setSearchU] = useState("");
  const { currentUser } = useContext(AuthContext);
  const token = useRecoilValue(tokenState);
  const history = useNavigate();
  const [avatarRC2, setAvatarRC] = useRecoilState(avatarRC1);
  const handleLogout = () => {
    localStorage.removeItem("token");
    signOut(auth);
    history("/login");
  };
  const fetchData = async () => {
    setAuthToken(token);
    try {
      console.log(111);
      const responseInfo = await api.get<ResponseData>(
        `http://www.socialnetwork.somee.com/api/Friend/getAllFriendRequest`
      );
      setNotify(responseInfo.data);
      console.log(responseInfo);
    } catch (error) {
      console.error("Get post failed", error);
    }
  };

  // Handle Lấy request Friend
  useEffect(() => {
    fetchData(); // Gọi fetchData khi component được mount

    // Thiết lập interval để gọi fetchData mỗi giây
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clear interval khi component bị unmount để tránh memory leak
    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = async (id: any) => {
    setAuthToken(token);
    return api
      .post(`http://www.socialnetwork.somee.com/api/Friend/accept/${id}`)
      .then((res) => {
        fetchData();
      })
      .catch((err) => console.log(err));
  };
  const handleRefuse = async (id: any) => {
    setAuthToken(token);
    try {
      const response = await api.post(
        `http://www.socialnetwork.somee.com/api/Friend/refuseFriend/${id}`
      );
      console.log(response);
      fetchData();
      // if(response.status == 200) {
      //   const responseInfo = await api.get(
      //     `http://www.socialnetwork.somee.com/api/infor/user/${id}`

      //   );setStatusF(responseInfo.data.data.statusFriend)
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const [sb, setSb] = useState(false);

  return (
    <>
      <div
        className=""
        style={{
          height: "100vh",
          width: "17%",
          borderRight: "1px solid #dbdbdb",
          paddingRight: "30px",
          paddingLeft: "10px",
          position: "fixed",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            height: "15%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="" style={{ height: "300px", width: "100%" }} />
        </div>

        <Link
          to="/"
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <GoHome style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Trang chủ
          </p>
        </Link>
        <div
          onClick={() => {
            setSb(true);
          }}
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <CiSearch style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Tìm kiếm
          </p>
        </div>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
          onClick={() => history("/friend")}
        >
          <div style={{ fontSize: "20px" }}>
            <CiUser style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Bạn bè
          </p>
        </div>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <CiVideoOn style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Reels
          </p>
        </div>
        <Link
          to="/chat"
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <CiChat2 style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Tin nhắn
          </p>
        </Link>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
          onClick={() => setMenu1(!menu1)}
        >
          <div style={{ fontSize: "20px" }}>
            <CiHeart style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Thông báo
          </p>
        </div>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            <CiSquarePlus style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Tạo
          </p>
        </div>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
          onClick={() => history("/inforuser")}
        >
          <div style={{ fontSize: "20px" }}>
            {avatarRC2 === "" ? (
              <BiUserCircle style={{ height: "25px", width: "25px" }} />
            ) : (
              <img
                src={avatarRC2 || ""}
                style={{ height: "25px", width: "25px", borderRadius: "50%" }}
              />
            )}
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Trang cá nhân
          </p>
        </div>
        <div
          className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px] absolute bottom-[10px]"
          style={{
            width: "190px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
          onClick={() => setMenu(!menu)}
        >
          <div style={{ fontSize: "20px" }}>
            <AiOutlineMenu style={{ height: "25px", width: "25px" }} />
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "black",
              fontStyle: "bold",
              marginLeft: "20px",
            }}
          >
            Xem thêm
          </p>
        </div>
        <div>
          {menu1 && <div />}
          {!menu1 && (
            <div className=" absolute z-10 bottom-[90px] left-[200px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[10px] p-[10px] overflow-y-auto h-[400px]">
              {notify.data.map((item: any, index: any) => (
                <div
                  className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                  style={{
                    border: "1px solid #eeeeee",
                    width: 250,
                    height: 80,
                    display: "flex",
                    alignItems: "center",

                    marginBottom: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src={item.image}
                    style={{ height: 40, width: 40, borderRadius: "50%" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "black",
                        fontStyle: "bold",
                      }}
                    >
                      <span className="font-bold">{item.fullName}</span> đã gửi
                      lời mời kết bạn
                    </p>
                    <div className="mt-2">
                      <button
                        className="bg-[#febd66] px-2 py-1 text-white rounded-[8px] text-[12px]"
                        onClick={() => handleAccept(item.userId)}
                      >
                        Chấp nhận
                      </button>
                      <button
                        className="bg-[#fc0000] px-2 py-1 text-white rounded-[8px] text-[12px] ml-2"
                        onClick={() => handleRefuse(item.userId)}
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",

                  justifyContent: "space-evenly",
                }}
              >
                Không có thông báo nào
              </div>
            </div>
          )}
        </div>
        <div>
          {menu && <div />}
          {!menu && (
            <div className=" absolute z-10 bottom-[90px] left-[20px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[10px] p-[10px]">
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <AiOutlineSetting style={{ height: 25, width: 25 }} />
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Cài đặt
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <BsClockHistory style={{ height: 25, width: 25 }} />
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Hoạt động của bạn
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <BsBookmark style={{ height: 25, width: 25 }} />
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Đã lưu
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <BsSun style={{ height: 25, width: 25 }} />
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Chuyển chế độ
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <AiOutlineWarning style={{ height: 25, width: 25 }} />
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Báo cáo sự cố
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px] justify-start"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Chuyển tài khoản
                </p>
              </div>
              <div
                className="cursor-pointer hover:bg-[#f2f2f2] mx-auto rounded-[10px]"
                style={{
                  width: 250,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                  marginBottom: 10,
                }}
                onClick={handleLogout}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: "black",
                    fontStyle: "bold",
                    marginLeft: 20,
                  }}
                >
                  Đăng xuất
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {sb && (
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
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "60%",
              marginTop: "80px",
            }}
          >
            <div className="mb-4 flex justify-end">
              <MdOutlineCancel
                size={20}
                className="cursor-pointer"
                onClick={() => {
                  setSb(false);
                }}
              />
            </div>
            {/* Nội dung form đặt lịch */}
            <div className="flex items-center">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 21"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setSearchU(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ff6d45]"
                  placeholder="Search Users..."
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => {
                  history(`/search/${searchU}`), setSb(false);
                }}
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
