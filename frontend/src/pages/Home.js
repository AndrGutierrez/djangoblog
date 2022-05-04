import React from "react";
import Hero from "../components/home/Hero";
import { Grid } from "@mui/material";
import Posts from "../components/posts/Posts";

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Hero></Hero>
      </Grid>
      <Grid item sx={{ p: 3 }} xs={12}>
        <Posts></Posts>
      </Grid>
    </Grid>
  );
}
