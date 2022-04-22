import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemIcon,
  Divider,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/userSlice";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

const paperStyles = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

function UserMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ROOT = process.env.API_ROUTE;
  const LOGOUT_ROUTE = `${ROOT}/api/logout`;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleLogout = () => {
    axios.get(LOGOUT_ROUTE).then(() => {
      dispatch(logout());
      history.push("/");
    });
  };

  const options = [
    {
      id: "profile",
      name: "Profile",
      action: () => history.push("/user/profile"),
    },
  ];
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!user) return "";
  return (
    <>
      <Tooltip title="profile">
        <Grid
          onClick={handleClick}
          size="small"
          sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
          container
          spacing={2}
        >
          <Grid item>
            <Avatar
              src={`${user.profile ? user.profile.profile_picture : ""}`}
              sx={{ width: 24, height: 24 }}
            />
          </Grid>
          <Grid item>
            <Typography color="white">{user.username}</Typography>
          </Grid>
        </Grid>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperStyles}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map(({ id, name, action }) => (
          <MenuItem onClick={() => action()} key={id}>
            {name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {/* <MenuItem> */}
        {/*   <ListItemIcon> */}
        {/*     <Settings fontSize="small" /> */}
        {/*   </ListItemIcon> */}
        {/*   Settings */}
        {/* </MenuItem> */}
        {/* <MenuItem> */}
        {/*   <ListItemIcon> */}
        {/*     <Logout fontSize="small" /> */}
        {/*   </ListItemIcon> */}
        {/*   Logout */}
        {/* </MenuItem> */}
      </Menu>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
