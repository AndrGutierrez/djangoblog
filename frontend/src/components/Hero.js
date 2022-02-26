import React from "react";
import { Typography, Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const heroStyles = {
  padding: "20px",
  ["@media (max-width:768px)"]: {
    bgcolor: "primary.main",
  },
  bgcolor: "primary.main",
  display: "flex",
  justifyContent: "space-between",
};
export default function Hero() {
  return (
    <Grid container item xs={12} className="hero-container">
      <Grid className="hero" container sx={heroStyles}>
        <Grid className="hero-content" item md={5}>
          <Typography
            variant="h3"
            className="hero__title page_title"
            sx={{ color: "white" }}
          >
            Django Blog <br />
            an unique experience
          </Typography>
          <Typography sx={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </Typography>
          <Link to="/posts">
            <Button color="neutral" variant="outlined">
              Let's start
            </Button>
          </Link>
        </Grid>
        <Grid item md={6}>
          <Paper
            sx={{
              height: "100%",
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              className="hero-image"
              component="img"
              src="https://images3.alphacoders.com/836/thumb-1920-836705.jpg"
              sx={{ width: "200px", marginLeft: "-50px", borderRadius: 2 }}
            />
            <Grid sx={{ height: "100%", padding: 2 }} item md={10}>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Luxurious Roman", pb: 2 }}
              >
                Express yourself
              </Typography>
              <Skeleton animation={false} width={"70%"} />
              <Skeleton animation={false} />
              <Skeleton animation={false} width={"65%"} />
              <Skeleton animation={false} width={"90%"} />
              <Skeleton animation={false} width={"85%"} />
              <Skeleton animation={false} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
