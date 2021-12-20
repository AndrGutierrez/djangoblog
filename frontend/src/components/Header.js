import React from "react";
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

const listStyles = {
  display: "flex",
  justifyContent: "space-between",
};
import { Link } from "react-router-dom";

export default function Header({ user }) {
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
      </Toolbar>
    </AppBar>
  );
}
