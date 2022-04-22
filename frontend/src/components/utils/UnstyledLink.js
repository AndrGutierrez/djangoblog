import { Link } from "react-router-dom";
import { styled } from "@mui/system";

export const UnstyledLink = styled(Link)(({ theme }) => ({
  color: "unset",
  textDecoration: "none",
}));
