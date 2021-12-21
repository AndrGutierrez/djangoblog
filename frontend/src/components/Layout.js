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
});
export default function Layout({ children }) {
  //pass props to children
  const [user, setUser] = useState(null);
  const LOGIN_ROUTE = `${process.env.API_ROUTE}/api/auth`;
  useEffect(() => {
    axios
      .get(LOGIN_ROUTE, { withCredentials: true })
      .then((response) => setUser(response.data));
  }, []);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user, theme });
    }
    return child;
  });

  return (
    <ThemeProvider theme={theme}>
      <Header user={user} />
      {childrenWithProps}
      <Footer />
    </ThemeProvider>
  );
}
