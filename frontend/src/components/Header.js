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
  Item,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
const listStyles = {
  display: "flex",
  justifyContent: "space-between",
};
const buttonStyles = {
  width: "100%",
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
          <List className="" sx={listStyles}>
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Grid container spacing={1} md={2}>
            <Grid item xs={6}>
              <Link to="/Login">
                <Button color="secondary" variant="outlined" sx={buttonStyles}>
                  Login
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/signup">
                <Button color="secondary" variant="contained" sx={buttonStyles}>
                  Signup
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
