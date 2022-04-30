import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    width: "80% !important",
    height: "80% !important",
  },
}));
export default StyledAvatar;
