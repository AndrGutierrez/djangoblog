import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { logout, login } from "../store/userSlice";
import { setProgress } from "../store/progressSlice";
import { createWithMedia } from "../utils/ApiUtils";
import LinearProgress from "@mui/material/LinearProgress";

import {
  AppBar,
  Typography,
  Toolbar,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const listStyles = {
  display: "flex",
  justifyContent: "space-between",
};

function Header({ progress, type, user, post, logout, login, setProgress }) {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("++++", process.env.API_ROUTE);
  const LOGOUT_ROUTE = `${process.env.API_ROUTE}/api/logout`;
  const LOGIN_ROUTE = `${process.env.API_ROUTE}/api/auth`;
  const POST_ROUTE = `${process.env.API_ROUTE}/api/posts/`;
  const [currentUser, setCurrentUser] = useState(user);
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  const fakeUser = { data: null };

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

    const progressAction = (prog) => dispatch(setProgress(prog));

    createWithMedia(POST_ROUTE, data, setProgress)
      .catch((e) => {
        throw e;
      })
      .then(() => history.push("/"));
  };

  useEffect(() => user !== null && setCurrentUser(user), [user]);

  useEffect(() => {
    axios
      .get(LOGIN_ROUTE)
      .catch(() => fakeUser)
      .then(({ data }) => dispatch(login({ user: data })));
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
      <Grid container display="block">
        {progress > 0 ||
          (progress >= 100 && (
            <LinearProgress
              variant="determinate"
              value={progress}
              color="secondary"
            />
          ))}
      </Grid>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.post,
  progress: state.progress,
});
const mapDispatchToProps = {
  logout,
  login,
  setProgress,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
