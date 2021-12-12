import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  ["@media (max-width:780px)"]: {
    padding: 0,
  },
  "& .MuiTextField-root": { mb: 1 },
};

const FormStyle = {
  padding: "1rem",
};

export default function Login() {
  const LOGIN_ROUTE = `${process.env.API_ROUTE}/api/auth/`;
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit() {
    axios.post(LOGIN_ROUTE, values);
  }
  return (
    <Grid container sx={commonStyles}>
      <Paper sx={FormStyle} xs={12} sm={8} md={5} xl={3}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>

        <Form onSubmit={handleSubmit}>
          <Grid>
            <TextField
              onChange={handleChange}
              label={"Email"}
              id="email"
              value={values.email}
              fullWidth
            ></TextField>
          </Grid>
          <Grid>
            <TextField
              onChange={handleChange}
              label={"Password"}
              id="password"
              value={values.password}
              type="password"
              fullWidth
            ></TextField>
          </Grid>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            fullWidth
            sx={{ mb: 1 }}
            type="submit"
          >
            Login
          </Button>
          <Typography variant="body1">
            You don't have an account yet? &nbsp;
            <MuiLink sx={{ mb: 1 }}>
              <Link to="/signup">Sign up</Link>
            </MuiLink>
          </Typography>
        </Form>
      </Paper>
    </Grid>
  );
}
