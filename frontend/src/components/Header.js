import React, { useMemo, forwardRef } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" className="">
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
          <ListItem component={Link} to="/login" button>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
