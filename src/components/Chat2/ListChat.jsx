import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "src/firebase";
import { AuthContext } from "src/context/AuthContext";
import UserImg from "src/assets/bob.png";
import { ChatContext } from "src/context/ChatContext";
import { Input } from "antd";
import { ChatCheck } from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
const { Search } = Input;
const ListChat = () => {
  const [chatcheck, setChatCheck] = useRecoilState(ChatCheck);
  const hanldeCheck = () => {
    setChatCheck(true);
  };
  // Xu ly list user
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  console.log(currentUser);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect1 = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // Xu ly phan search
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <div className="overflow-y-hidden">
      <div className="search">
        <div className="w-[100%] flex items-center justify-center">
          <Search
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-[80%]"
          />
        </div>
        {err && <span>User not found!</span>}
        {user && (
          <div
            className="w-full bg-yellow flex justify-start items-center cursor-pointer hover:bg-[#f5eeeefb] pl-3 delay-100 py-1 mt-2"
            onClick={handleSelect}
          >
            <img
              src={user.photoURL}
              alt="User"
              className="w-[50px] h-[50px] rounded-[50%] mr-[20px]"
            />
            <p className="">{user.displayName}</p>
          </div>
        )}
      </div>
      <div className="w-full h-[60px] bg-yellow flex justify-between items-center px-3">
        <p className="font-semibold">Tin nhắn</p>
        <p className="text-[#045b62]">Request</p>
      </div>
    
      <div className="w-full h-[530px] overflow-x-hidden overflow-y-hidden flex-col flex relative flex-grow">
        <div className="overflow-x-hidden min-h-0 min-w-0 overflow-y-hidden flex-shrink flex-col flex-basis-auto box-border flex items-stretch relative flex-grow z-0">
          <div className="overflow-x-hidden overflow-y-hidden flex-col flex flex-grow">
            <div className="w-[100%] overflow-x-hidden overflow-y-scroll flex-shrink flex-col flex overflow-anchor-none  relative flex-grow ">
              <div className="block ">
                <div className="relative block">
                  {Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                      <div
                        className="w-full bg-yellow flex justify-start items-center cursor-pointer hover:bg-[#f5eeeefb] pl-3 delay-100 py-3"
                        key={chat[0]}
                        onClick={() => {
                          handleSelect1(chat[1].userInfo);
                        }}
                      >
                        <img
                          src={chat[1].userInfo.photoURL}
                          alt="User"
                          className="w-[50px] h-[50px] rounded-[50%] mr-[20px] border-[1px] p-1"
                        />
                        <div className="userChatInfo flex flex-col justify-start items-start">
                          <span className="text-bold text-[16px]  ">
                            {chat[1].userInfo.displayName}
                          </span>
                          <p className="text-[#c6c4c4]">{chat[1].lastMessage?.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListChat;
