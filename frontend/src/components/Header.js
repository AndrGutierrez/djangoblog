import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { logout, login } from "../store/userSlice";

import {
  AppBar,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const listStyles = {
  display: "flex",
  justifyContent: "space-between",
};

function Header({ type, user, post, logout, login }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const LOGOUT_ROUTE = `${process.env.API_ROUTE}/api/logout`;
  const LOGIN_ROUTE = `${process.env.API_ROUTE}/api/auth`;
  const POST_ROUTE = `${process.env.API_ROUTE}/api/posts/`;
  const [currentUser, setCurrentUser] = useState(user);
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;

  const handleLogout = () =>
    axios.get(LOGOUT_ROUTE).then(() => {
      setCurrentUser(user);
      logout();
      history.push("/");
    });

  const handleSubmit = () => {
    const data = new FormData();
    Object.keys(post).forEach((key) => {
      data.append(key, post[key]);
    });

    axios({
      method: "post",
      url: POST_ROUTE,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .catch((e) => {
        throw e;
      })
      .then((response) => {
        history.push("/");
      });
  };

  useEffect(() => {
    if (user !== null) setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    axios
      .get(LOGIN_ROUTE)
      .then((response) => dispatch(login({ user: response.data })));
  }, []);
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense" className="" sx={listStyles}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItem item md={6} lg={8} xl={9} component={Grid}>
            <Typography
              component={Link}
              to="/"
              variant="h5"
              sx={{ fontFamily: "PT Sans Narrow", height: "100%" }}
            >
              Djangoblog
            </Typography>
          </ListItem>

          <Grid
            display={{ xs: "none", md: "flex" }}
            container
            item
            md={6}
            lg={4}
          >
            <ListItem component={Grid} item md={3} lg={2} xl={1}>
              <Link to="/">
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            {currentUser ? (
              <ListItem component={Grid} container item md={4} xl={3}>
                <Grid item>
                  <Link to="/user/profile">
                    <Avatar
                      src={`${
                        user.profile ? user.profile.profile_picture : ""
                      }`}
                      sx={{ width: 24, height: 24 }}
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/user/profile">
                    <ListItemText primary={`${user.username}`} />
                  </Link>
                </Grid>
              </ListItem>
            ) : (
              <ListItem component={Grid} container item md={8} spacing={2}>
                <Grid item xs={6}>
                  <Link to="/login">
                    <Button color="secondary" variant="outlined" fullWidth>
                      Login
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/signup">
                    <Button color="secondary" variant="contained" fullWidth>
                      Sign up
                    </Button>
                  </Link>
                </Grid>
              </ListItem>
            )}
            {currentUser && type === "post" && (
              <ListItem
                component={Grid}
                xs={6}
                md={5}
                lg={6}
                item
                sx={{ justifyContent: "flex-end", display: "flex" }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </ListItem>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.post,
});
const mapDispatchToProps = {
  logout,
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
