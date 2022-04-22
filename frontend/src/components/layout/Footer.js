import React from "react";
import { Typography, Grid, Avatar, Paper } from "@mui/material";

export default function Footer() {
  const url =
    "https://media-exp1.licdn.com/dms/image/C4D03AQG1QTR6icbJ5Q/profile-displayphoto-shrink_800_800/0/1643571640385?e=1651708800&v=beta&t=JRxU_S22NzmYunvS2pCVhdwdyoaY6Rjgj4atWfzCbKA";

  return (
    <Grid sx={{ backgroundColor: "primary.main", p: 3 }} color="primary">
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
