import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009DAE",
    },
    secondary: {
      main: "#FFE652",
    },
  },
});
export default function Layout({ children }) {
  //pass props to children
  const childrenWithTheme = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { theme });
    }
    return child;
  });
  return (
    <>
      <Header theme={theme} />
      {childrenWithTheme}
      <Footer theme={theme} />
    </>
  );
}
