import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { ChatContext } from "src/context/ChatContext";
import { getDownloadURL, ref } from "firebase/storage";
// ở đầu file Message.js
import { storage } from "src/firebase";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const [fileDownloadURL, setFileDownloadURL] = useState(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    // Nếu tin nhắn có đính kèm file, lấy đường dẫn tải file từ Storage
    if (message.file) {
      const fileRef = ref(storage, message.file.url);
      getDownloadURL(fileRef).then((downloadURL) => {
        setFileDownloadURL(downloadURL);
      });
    }
  }, [message.file]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        flexDirection:
          message.senderId === currentUser.uid ? "row-reverse" : "row",
      }}
    >
      <div
        className="messageInfo"
        style={{
          display: "flex",
          flexDirection: "column",
          color: "gray",
          fontWeight: "300",
          alignItems: message.senderId === currentUser.uid ? "flex-end" : "",
        }}
      >
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        
      </div>
      <div className="flex flex-row-reverse">
        {" "}
        <div
          className="messageContent"
          style={{
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          { message.text == "" ? <></> : <p
          style={{
            backgroundColor:
              message.senderId === currentUser.uid ? "#8da4f1" : "#8da4f1",
            padding: "10px 20px",
            borderRadius: "0px 10px 10px 10px",
            maxWidth: "max-content",
            color: "white",
          }}
        >
          {message.text}
        </p>}
          {message.img && (
            <img src={message.img} alt="" style={{ width: "50%" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
