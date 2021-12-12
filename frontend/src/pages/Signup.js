import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link as MuiLink,
} from "@mui/material";

import { emailValidator } from "../utils/validators";
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

  const [formValid, setValidForm] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const blankField = Object.values(values).includes("");
    const validation =
      blankField ||
      !emailValidator(values.email) ||
      values.password != values.password_confirmation ||
      values.password.length < 4;
    if (validation) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [values]);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      axios.post(SIGNUP_ROUTE, values);
    }
  };
  return (
    <Grid container sx={commonStyles}>
      <Paper sx={FormStyle} xs={12} sm={8} md={5} xl={3}>
        <form onSubmit={handleSubmit}>
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
              type="email"
              required
            ></TextField>
            <TextField
              onChange={handleChange}
              label={"Username"}
              id="username"
              value={values.username}
              fullWidth
              required
            ></TextField>
          </Grid>

          <Grid item container columnSpacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                onChange={handleChange}
                label={"First Name"}
                id="first_name"
                value={values.first_name}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                onChange={handleChange}
                label={"Last Name"}
                id="last_name"
                value={values.last_name}
                fullWidth
                required
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
              required
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
              required
            ></TextField>
          </Grid>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mb: 1 }}
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Sign up
          </Button>
          {/* this button is only to make a fake submit button
            so form validation and the button disabling works
            */}
          <Button type="submit"></Button>
        </form>
        <Typography variant="body1">
          Already have an account? &nbsp;
          <MuiLink sx={{ mb: 1 }} component={Link} to="/login">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Grid>
  );
}
