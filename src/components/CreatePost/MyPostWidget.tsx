import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import picturePath from "src/assets/Logo2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { api, setAuthToken } from "src/utils/setAuthToken";
import API from "src/services/API";
import { tokenState, Email, Password, Reload } from "src/recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
interface Props {
  img: any;
}
const MyPostWidget = ({ img }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState(false);
  const [File, setSelectedFile] = useState<File | null>(null);
  const [Content, setContent] = useState("");
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = "#858585";
  const medium = "#A3A3A3";
  // const handleFileChange = (acceptedFiles: File[]) => {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     setSelectedImage(acceptedFiles[0]);
  //   }
  // };
  const token = useRecoilValue(tokenState);
  const [reload, setReload] = useRecoilState(Reload);
  const [VideoFile, setVideoFile] = useState<File | null>(null);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("Content", Content);

      if (File) {
        formData.append("File", File);
      }

      if (VideoFile) {
        formData.append("VideoFile", VideoFile, VideoFile.name); // Ensure the file name is provided
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await api
        .post("http://www.socialnetwork.somee.com/api/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setReload(reload + 1);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      setReload(reload + 1);
    }
  };

  return (
    <div className=" w-[55%]  ml-[35%] mt-[20px] mb-[30px]  rounded-[15px] border-solid border-[1px] border-[#eeeeee]">
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={img} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setContent(e.target.value)}
            value={Content}
            sx={{
              width: "100%",
              backgroundColor: "#faf7f7",
              borderRadius: "2rem",
              padding: "10px 2rem",
            }}
          />
        </FlexBetween>

        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles: any) => {
                const file = acceptedFiles[0];
                if (file.type.startsWith("image/")) {
                  setSelectedFile(file); // Handle image files
                  setVideoFile(null);
                } else if (file.type.startsWith("video/")) {
                  setVideoFile(file); // Handle video files
                  setSelectedFile(null);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!File && !VideoFile ? (
                      <p>Add Image or Video Here</p>
                    ) : (
                      <FlexBetween>
                        {File && (
                          <>
                            <img
                              src={URL.createObjectURL(File)}
                              alt="Uploaded Image"
                              width="100"
                            />
                            <Typography>{File.name}</Typography>
                          </>
                        )}
                        {VideoFile && (
                          <>
                            <video width="100" controls>
                              <source
                                src={URL.createObjectURL(VideoFile)}
                                type={VideoFile.type}
                              />
                            </video>
                            <Typography>{VideoFile.name}</Typography>
                          </>
                        )}
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {(File || VideoFile) && (
                    <IconButton
                      onClick={() => {
                        setSelectedFile(null);
                        setVideoFile(null);
                      }}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>

              <FlexBetween gap="0.25rem">
                <AttachFileOutlined
                  sx={{ color: mediumMain }}
                  onClick={handlePost}
                />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>

              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}

          <Button
            //  disabled={!content}
            onClick={handlePost}
            sx={{
              color: palette.background.paper,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    </div>
  );
};

export default MyPostWidget;
