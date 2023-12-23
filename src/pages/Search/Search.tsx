import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api, setAuthToken } from "src/utils/setAuthToken";
import { tokenState } from "src/recoil/initState";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
interface ListSearch {
  fullName: string;
  userId: string;
  image: string;
  id: string;
}

interface ResponseData {
  data: ListSearch[];
  success: boolean;
  message: string;
}
const Search = () => {
  const navigate = useNavigate();
  const [dataS, setDataS] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const { nameSearch } = useParams();
  const token = useRecoilValue(tokenState);

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
  const idx = idToken.payload.id;

  const [lengthU, setLengthU] = useState(0);
  //
  const fetchData = async () => {
    setAuthToken(token);
    try {
      const fullName = nameSearch;
      const responseInfo = await api.get<ResponseData>(
        "http://www.socialnetwork.somee.com/api/infor/searchuser",
        {
          params: { fullname: fullName }, // Use params to send data in the query string
        }
      );

      setDataS(responseInfo.data);

      setLengthU(responseInfo.data.data.length);
    } catch (error) {
      console.error("Get post failed", error);
    }
  };

  // Handle Lấy request Friend
  useEffect(() => {
    fetchData();
  }, []);
  console.log(idx);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div
        className="w-[800px]  h-[500px] ml-[200px] rounded-xl  overflow-y-auto"
        style={{ border: "1px solid #eeeeee" }}
      >
        <div
          className="w-full h-[30px]  flex "
          style={{
            borderBottom: "1px solid #eeeeee",
            position: "sticky",
            top: "0px",
          }}
        >
          <div
            className={`w-[100%]  font-bold cursor-pointer rounded-tl-xl`}
            style={{ borderRight: "1px solid #eeeeee" }}
          >
            <p>Danh sách người cần tìm</p>
          </div>
        </div>

        {lengthU == 0 ? (
          <div>Không ai tên {nameSearch}</div>
        ) : (
          <>
            {dataS.data.map((item, index) => (
              <>
                {idx == item.userId ? (
                  <></>
                ) : (
                  <div
                    className="w-full h-[50px]  flex justify-center mt-2"
                    style={{ borderBottom: "1px solid #eeeeee" }}
                  >
                    <img
                      src={item.image}
                      style={{ height: 40, width: 40, borderRadius: "50%" }}
                      onClick={() => {
                        navigate(`/info-friend/${item.userId}`);
                      }}
                    />
                    <div
                      className="flex items-center"
                      onClick={() => {
                        navigate(`/info-friend/${item.userId}`);
                      }}
                    >
                      <p
                        style={{
                          fontSize: 12,
                          color: "black",
                          fontStyle: "bold",
                        }}
                      >
                        <span className="font-bold ml-2">{item.fullName}</span>
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
