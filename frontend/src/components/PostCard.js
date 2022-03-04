import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { blue, red, purple, pink, green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";

const colors = [
  red[500],
  blue[500],
  red[500],
  purple[500],
  pink[500],
  green[500],
];

const imageStyles = {
  height: "125px",
  width: "100%",
};
const ITEM_HEIGHT = 48;
export default function PostCard({ post, handleOpenModal }) {
  const [user, setUser] = useState({});
  const [styles, setStyles] = useState(imageStyles);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [postThumbnail, setPostThumbnail] = useState("");
  const CDN_URL = process.env.CDN_URL;
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;
  const created = new Date(post.created).toLocaleDateString();
  const handleOpen = () => handleOpenModal(post);
  const options = [
    { action: handleOpen, name: "edit" },
    { action: handleOpen, name: "delete" },
  ];

  const generateRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  useEffect(async () => {
    setUser(await getModel(USER_PATH, post.user));
    setStyles({ ...styles, backgroundColor: generateRandomColor() });
  }, []);

  useEffect(
    () => post && setPostThumbnail(`${CDN_URL}/${post.thumbnail}`),
    [post]
  );

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setOpenedMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedMenu(false);
  };
  const handleAction = (event, action) => {
    event.preventDefault();
    handleClose();
    action();
  };

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Link to={`/posts/${user.username}/${post.slug}`}>
        <Card elevation={2}>
          {postThumbnail && (
            <CardMedia
              component={"img"}
              sx={styles}
              src={postThumbnail}
            ></CardMedia>
          )}
          {!postThumbnail && <Box sx={styles}></Box>}

          <CardContent sx={{ position: "relative" }}>
            <Box sx={{ position: "absolute", right: 5, top: 5 }}>
              <IconButton onClick={handleClick}>
                <MoreVertIcon color="action" fontSize="small" />
              </IconButton>
              <Menu
                id="long-menu"
                open={openedMenu}
                onClose={() => handleClose()}
                onClick={(e) => e.preventDefault()}
                anchorEl={anchorEl}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.name}
                    onClick={(e) => handleAction(e, option.action)}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6">{post.title}</Typography>

            <Typography variant="body2" color="text.secondary">
              {post.content ? post.content.substring(0, 150) : ""}
            </Typography>
            <Grid sx={{ display: "flex" }}>
              <Avatar
                src={`${user ? user.profile_picture : ""}`}
                sx={{ width: 24, height: 24 }}
              />
              <Grid container sx={{ px: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ width: "100%", fontWeight: 500 }}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ width: "100%" }}
                >
                  {created}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
