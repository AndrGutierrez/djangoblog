import React, { useMemo, forwardRef } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
const listStyles = {
  display: "flex",
  justifyContent: "space-between",
};
import { Link } from "react-router-dom";

export default function Header({ theme }) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense" className="" sx={listStyles}>
          <Typography
            className=""
            variant="h5"
            component={Link}
            to="/"
            className="link"
          >
            Djangoblog
          </Typography>
          <List className="">
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Grid container spacing={1} xs={6} md={3} xl={4}>
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
    </ThemeProvider>
  );
}
