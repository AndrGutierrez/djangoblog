import React from "react";
import Posts from "../components/posts/Posts.js";
import { Grid } from "@mui/material";

export default function ListPosts() {
  return (
    <Grid sx={{ p: 3 }}>
      <Posts></Posts>
    </Grid>
  );
}
