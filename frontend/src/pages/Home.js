import React from "react";
import Hero from "../components/home/Hero";
import { Grid } from "@mui/material";
import Posts from "./Posts";

export default function Home() {
  return (
    <Grid container>
      <Hero></Hero>
      <Posts></Posts>
    </Grid>
  );
}
