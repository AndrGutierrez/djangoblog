import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009DAE",
    },
    secondary: {
      main: "#FFE652",
    },
    neutral: {
      main: "#ffffff",
    },
  },
  typography: {
    postTitle: {
      fontFamily: "Luxurious Roman",
      fontSize: "5rem",
    },
  },
});
export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
