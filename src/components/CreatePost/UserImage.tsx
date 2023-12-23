import { Box } from "@mui/material";

interface Props {
  image: any;
}
const UserImage = ({ image }: Props) => {
  return (
    <Box width="60px" height="60px">
      <img
        style={{ borderRadius: "50%" }}
        width="60px"
        height="60px"
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
