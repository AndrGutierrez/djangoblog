import React from "react";
import { Typography, Grid, Link, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { UnstyledLink } from "../utils/UnstyledLink";

export default function LoginWarning() {
  return (
    <Grid containers sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Grid
        container
        item
        xs={12}
        md={6}
        xl={4}
        sx={{ p: 3 }}
        component={Paper}
      >
        <UnstyledLink target="__blank" to="/signup" component={RouterLink}>
          <Typography variant="h3">Create an account</Typography>
        </UnstyledLink>
        <Typography variant="body1">
          You need to{" "}
          <Link to="/signup" component={RouterLink}>
            create an account{" "}
          </Link>
          , or{" "}
          <Link to="/login" component={RouterLink}>
            Log in{" "}
          </Link>
          if you already have one
        </Typography>
      </Grid>
    </Grid>
  );
}
