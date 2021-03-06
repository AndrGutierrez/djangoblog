import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { SpeedDialIcon, SpeedDialAction, SpeedDial, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import { useHistory, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009DAE !important",
      link: "#03a9f4",
    },
    secondary: {
      main: "#FFE652",
    },
    neutral: {
      main: "#ffffff",
    },
  },
  typography: {
    date: {
      fontSize: "10",
      color: "#bdbdbd",
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        height: "100%",
      },
    },
  },
});

export default function Layout({ children }) {
  const history = useHistory();
  const { pathname } = useLocation();
  const [headerType, setHeaderType] = useState();
  const POST_PATH = "/posts/create";
  const actions = [
    {
      name: "Create Post",
      link: POST_PATH,
      icon: <CreateIcon />,
    },
  ];

  useEffect(() => {
    pathname === POST_PATH ? setHeaderType("post") : setHeaderType("home");
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
        <Header type={headerType} />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => history.push(action.link)}
            />
          ))}
        </SpeedDial>
        {children}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
