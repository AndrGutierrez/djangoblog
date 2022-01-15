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

function Header({ user, logout, login }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const LOGOUT_ROUTE = `${process.env.API_ROUTE}/api/logout`;
  const LOGIN_ROUTE = `${process.env.API_ROUTE}/api/auth`;
  const [currentUser, setCurrentUser] = useState(user);

  const handleLogout = () =>
    axios.get(LOGOUT_ROUTE).then(() => {
      setCurrentUser(user);
      logout();
      history.push("/");
    }, [user]);

  useEffect(() => {
    console.log(user);
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    axios
      .get(LOGIN_ROUTE, { withCredentials: true })
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
          <Grid container item spacing={1} xs={7} md={3} xl={4}>
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
        {currentUser && (
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  logout,
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
