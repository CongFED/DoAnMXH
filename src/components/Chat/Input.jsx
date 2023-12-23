import React, { useContext, useState } from "react";
import Img from "src/img/img.png";
import Attach from "src/img/attach.png";
import { AuthContext } from "src/context/AuthContext";
import { ChatContext } from "src/context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "src/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FiSend } from "react-icons/fi";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div
      className="border-[#dbdbdb] border-solid border-[1px] rounded-[20px] mx-auto"
      style={{
        height: "40px",
        backgroundColor: "white",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        width: "95%",
      }}
    >
      <input
        type="text"
        className="px-2"
        placeholder="Nhắn tin..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          color: "#2f2d52",
          fontSize: "15px",
        }}
      />
      <div
        className="send"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={Attach}
          alt="img"
          style={{ height: "24px", cursor: "pointer" }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src={Img}
            alt=""
            style={{ height: "20px", width: "40px", cursor: "pointer" }}
          />
        </label>
        <button
          onClick={handleSend}
          style={{
            border: "none",
            padding: "11px 20px 11px 0px",

            cursor: "pointer",
          }}
          className="rounded-r-[20px] relative right-[-10px] hover:bg-[#8da4f1] hover:text-white border-l-[1px] border-black border-solid delay-150 text-[#8da4f1]"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
