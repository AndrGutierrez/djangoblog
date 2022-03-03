import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Avatar,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { getModel } from "../utils/ApiUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;
export default function Comment({ comment, handleOpenModal }) {
  const [user, setUser] = useState(null);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilepic, setProfilepic] = useState("");
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;

  const options = [
    { action: () => handleOpenModal(comment), name: "edit" },
    { action: () => handleOpenModal(comment), name: "delete" },
  ];

  useEffect(async () => {
    setUser(await getModel(USER_PATH, comment.user));
  }, []);

  useEffect(() => {
    if (user) {
      setProfilepic(user.profile.profile_picture);
    }
  }, [user]);

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
    <Card sx={{ mt: 3, py: 3, px: 1 }}>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        sx={{ position: "relative", px: 2 }}
      >
        <IconButton
          onClick={handleClick}
          sx={{ position: "absolute", top: 0, right: 0, color: "gray" }}
        >
          <MoreVertIcon />
        </IconButton>
        <Grid item>
          <Avatar src={profilepic || ""}></Avatar>
        </Grid>
        <Grid justifyContent="left" item>
          {user && (
            <Typography variant="h6" style={{ margin: 0, alignText: "left" }}>
              {user.username}
            </Typography>
          )}
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

          <Typography style={{ textAlign: "left" }}>
            {comment.content}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
