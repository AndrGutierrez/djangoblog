import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import Avatar from "../utils/Avatar";

export default function Footer() {
  const url =
    "https://pbs.twimg.com/profile_images/1487873796124168198/OdKXbCmI_400x400.jpg";

  return (
    <Grid
      sx={{ backgroundColor: "primary.main", p: 3, visibility: "hidden" }}
      color="primary"
    >
      <Grid
        component={Paper}
        sx={{ display: "flex", alignItems: "center", p: 1 }}
        item
        xs={11}
        sm={4}
        md={3}
      >
        <Avatar src={url} sx={{ width: 56, height: 56 }}></Avatar>
        <Grid sx={{ p: 2 }}>
          <Typography variant="h6">Andres Gutierrez</Typography>
          <Typography color="text.secondary">Full stack dev</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
