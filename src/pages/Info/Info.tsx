// Import các hàm và hook cần thiết từ thư viện React
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { PiMapPinLight } from "react-icons/pi";
import axios from "axios";
import { api, setAuthToken } from "src/utils/setAuthToken";
import API from "src/services/API";
import { useParams, useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import type { RadioChangeEvent, DatePickerProps } from "antd";
import { Radio } from "antd";
import { tokenState, Email, Password } from "src/recoil/initState";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useRecoilState, useRecoilValue } from "recoil";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "src/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const Info = () => {
  // Sử dụng useForm hook từ thư viện react-hook-form để quản lý form
  const { addressId } = useParams(); // Lấy giá trị từ URL
  const history = useNavigate(); // Sử dụng hook để điều hướng

  // Các state để lưu trữ thông tin địa chỉ và dữ liệu từ API
  const [provide, setProvide] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provide1, setProvide1] = useState("1");
  const [selectedCity, setSelectedCity] = useState("");

  const [FullName, setFullName] = useState("");
  const [WorkPlace, setWorkPlace] = useState("");
  const [Gender, setGender] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [File, setSelectedFile] = useState<File | null>(null);
  const [Address, setAddress] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmailRecoil] = useRecoilState(Email);
  const [password, setPasswordRecoil] = useRecoilState(Password);
  //

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
  const UserId = idToken.payload.id;
  //
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  //
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateOfBirth(dateString);
    console.log(date, dateString);
  };
  const [value, setValue] = useState(false);

  const onChangeR = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setGender(e.target.value);
    setValue(e.target.value);
  };
  const token = useRecoilValue(tokenState);
  // Hàm xử lý cập nhật địa chỉ
  const handleLUpdate = async () => {
    setAuthToken(token);
    try {
      if (File) {
        // Tạo formData để chứa dữ liệu và file
        const File1 = new FormData();
        File1.append("File", File);
        const res = await api.post(
          API.POST_INFO,
          {
            UserId,
            FullName,
            WorkPlace,
            Gender,
            PhoneNumber,
            File,
            Address,
            DateOfBirth,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        setPasswordRecoil("123456");
        //Firebase register
        const res1 = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const displayName = FullName;
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        await uploadBytesResumable(storageRef, File).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res1.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res1.user.uid), {
                uid: res1.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res1.user.uid), {});
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
      history("/");
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  //

  return (
    <div className=" border-[2px] border-[#f0f0f0] border-solid w-[40%] h-[90%] mt-6 mx-auto rounded-[15px]">
      <div className="h-[20%] w-full  py-2 border-b-[2px] bg-[#f7d456] border-solid rounded-t-[15px] text-white">
        <p className="pl-6 font-bold">Thêm thông tin người dùng</p>
      </div>
      <div className="h-[80%] w-full ">
        <div className="w-full h-full px-5 py-7">
          <label className="flex  items-center mb-1">
            <AiOutlineUser />
            <p className="text-[14px] font-semibold ml-1"> Họ và tên</p>
          </label>

          <input
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3 rounded-[8px]"
            placeholder="Nguyễn Phước Công"
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="flex  items-center mb-1">
            <AiOutlineMail />
            <p className="text-[14px] font-semibold ml-1">WorkPlace</p>
          </label>
          <input
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3 rounded-[8px]"
            placeholder="Hồ Chí Minh"
            onChange={(e) => setWorkPlace(e.target.value)}
          />
          <label className="flex  items-center mb-1">
            <AiOutlineMail />
            <p className="text-[14px] font-semibold ml-1">Phone</p>
          </label>
          <input
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3 rounded-[8px]"
            placeholder="0123456789"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Space
            direction="horizontal"
            className="my-4 w-[100%] flex justify-around"
          >
            <Radio.Group
              onChange={onChangeR}
              value={value}
              className="border-solid border-[1px] border-[#b8b8b8] p-2 rounded-[10px] flex"
            >
              <Radio value={false}>Nam</Radio>
              <Radio value={true}>Nữ</Radio>
            </Radio.Group>
            <input type="file" onChange={handleFileChange} />
            <DatePicker onChange={onChange} placeholder="Birth Day" />
          </Space>
          {/* <Dragger {...props} onChange={handleFileChange} className="mb-2">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger> */}
          <label className="flex  items-center mb-1">
            <PiMapPinLight />
            <p className="text-[14px] font-semibold ml-1">Địa chỉ cụ thể</p>
          </label>

          <input
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3 rounded-[8px]"
            placeholder="Số 1 Võ Văn Ngân Hồ Chí Minh"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <button
            className="bg-[#f7d456] text-black px-3 py-2 rounded-[5px] mt-5 text-white"
            onClick={handleLUpdate}
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
