import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { setProgress } from "../store/progressSlice";
import { createWithMedia } from "../utils/ApiUtils";
import LinearProgress from "@mui/material/LinearProgress";
import UserMenu from "../components/UserMenu";

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

function Header({ progress, type, user, post, login, setProgress }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const ROOT = process.env.API_ROUTE;
  const LOGIN_ROUTE = `${ROOT}/api/auth`;
  const POST_ROUTE = `${ROOT}/api/posts/`;
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  const fakeUser = { data: null };

  const handleSubmit = async () => {
    const data = new FormData();
    const progressAction = (prog) => dispatch(setProgress(prog));
    Object.keys(post).forEach((key) => data.append(key, post[key]));

    await createWithMedia(POST_ROUTE, data, progressAction)
      .catch((e) => {
        throw e;
      })
      .then(() => history.push("/"));
  };

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
          <ListItem item md={5} lg={8} xl={9} component={Grid}>
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
            {user ? (
              <ListItem component={Grid} container item md={4} xl={3}>
                <UserMenu user={user}></UserMenu>
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
          </Grid>
          {user && type === "post" && (
            <ListItem
              component={Grid}
              xs={4}
              md={3}
              lg={2}
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
      </Toolbar>
      <Grid container display="block">
        {progress > 0 && progress < 100 && (
          <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
          />
        )}
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
  login,
  setProgress,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
