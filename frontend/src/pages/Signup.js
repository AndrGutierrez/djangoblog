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

export default function Signup() {
  const SIGNUP_ROUTE = `${process.env.API_ROUTE}/api/users/`;
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
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
    axios.post(SIGNUP_ROUTE, values);
  }
  return (
    <Grid container sx={commonStyles}>
      <Paper sx={FormStyle} xs={12} sm={8} md={5} xl={3}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Signup
        </Typography>

        <Grid>
          <TextField
            onChange={handleChange}
            label={"Email"}
            id="email"
            value={values.email}
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            label={"Username"}
            id="username"
            value={values.username}
            fullWidth
          ></TextField>
        </Grid>

        <Grid container columnSpacing={1}>
          <Grid xs={12} sm={6} md={6} item>
            <TextField
              onChange={handleChange}
              label={"First Name"}
              id="first_name"
              value={values.first_name}
              fullWidth
            ></TextField>
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <TextField
              onChange={handleChange}
              label={"Last Name"}
              id="last_name"
              value={values.last_name}
              fullWidth
            ></TextField>
          </Grid>
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
        <Grid>
          <TextField
            onChange={handleChange}
            label={"Password Confirmation"}
            id="password_confirmation"
            value={values.password_confirmation}
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
        >
          Sign up
        </Button>
        <Typography variant="body1">
          Already have an account? &nbsp;
          <MuiLink sx={{ mb: 1 }}>
            <Link to="/login">Login</Link>
          </MuiLink>
        </Typography>
      </Paper>
    </Grid>
  );
}
