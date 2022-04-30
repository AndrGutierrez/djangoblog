import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Alert,
  Link as MuiLink,
} from "@mui/material";

import { emailValidator } from "../utils/validators";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;

  const [formValid, setValidForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
  });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  useEffect(() => {
    const { password, password_confirmation, email } = values;
    const passwordValidator = password != password_confirmation;
    setEmailIsValid(!emailValidator(email) && email != "");
    setPasswordTooShort(
      values.password.length < 4 && values.password.length != 0
    );
    setPasswordsDontMatch(passwordValidator);
  }, [values]);
  useEffect(() => {
    const blankField = Object.values(values).includes("");
    const formIsInvalid =
      blankField || !emailIsValid || passwordsDontMatch || passwordTooShort;
    if (!formIsInvalid) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [emailIsValid, passwordsDontMatch, passwordTooShort]);

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
    setErrors([]);
    if (formValid) {
      axios
        .post(SIGNUP_ROUTE, values)
        .catch((e) => {
          const data = e.response.data;
          const errors = Object.keys(data).map((key) => ({
            value: data[key],
            reason: key,
          }));
          setErrors(errors);
          throw e;
        })
        .then(() => history.push(`/signup/success/${values.username}`));
    }
  };
  return (
    <Grid container sx={commonStyles}>
      <Paper sx={FormStyle} xs={12} sm={8} md={5} xl={3}>
        {errors !== [] &&
          errors.map((error) => (
            <Alert severity="error" key={error.reason}>
              {error.value}
            </Alert>
          ))}

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
              error={emailIsValid}
              helperText={emailIsValid && "Invalid email"}
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
              error={passwordTooShort}
              helperText={passwordTooShort && "Password is too short"}
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
              error={passwordsDontMatch}
              helperText={passwordsDontMatch && "Passwords don't match"}
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
