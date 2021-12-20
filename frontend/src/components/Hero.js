import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const heroStyles = {
  padding: "20px",
  ["@media (max-width:768px)"]: {
    bgcolor: "primary.main",
  },
};
export default function Hero() {
  return (
    <div className="hero-container">
      <Box className="hero" sx={heroStyles}>
        <Box className="hero-content">
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
        </Box>
        <div className="hero-image"></div>
      </Box>
    </div>
  );
}
