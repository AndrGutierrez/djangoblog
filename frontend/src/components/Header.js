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
        console.log("++++", response);
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
        <Typography
          className=""
          variant="h5"
          component={Link}
          to="/"
          className="link"
          sx={{ fontFamily: "PT Sans Narrow" }}
        >
          Djangoblog
        </Typography>
        <Box display={{ xs: "none", lg: "block" }}>
          <List className="">
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Box>
        {!currentUser && (
          <Grid
            container
            item
            sx={{ display: { xs: "none", sm: "flex" } }}
            spacing={1}
            sm={5}
            md={3}
            lg={4}
          >
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
          </Grid>
        )}
        {currentUser && type === "post" && (
          <Grid
            item
            xs={6}
            sx={{ justifyContent: "flex-end", display: "flex" }}
          >
            <Grid item xs={6}>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
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
