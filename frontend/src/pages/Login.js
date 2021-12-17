import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { emailValidator } from "../utils/validators";

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
  const history = useHistory();
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (emailValidator(values.email)) {
      setValidForm(true);
    }
    if (values.password.length >= 4) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [values]);
  const [formValid, setValidForm] = useState(false);
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(LOGIN_ROUTE, values)
      .catch((e) => {
        throw e;
      })

      .then(() => history.push("/"));
  };
  return (
    <Grid container sx={commonStyles}>
      <Paper sx={FormStyle} xs={12} sm={8} md={5} xl={3}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid>
            <TextField
              onChange={handleChange}
              label={"Email"}
              id="email"
              value={values.email}
              fullWidth
              required
              type="email"
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
              required
              minLength="4"
            />
          </Grid>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mb: 1 }}
            disabled={!formValid}
            onClick={handleSubmit}
          >
            Login
          </Button>
          {/* this button is only to make a fake submit button
            so form validation and the button disabling works
            */}
          <Button type="submit" sx={{ display: "none" }}></Button>
        </form>
        <Typography variant="body1">
          You don't have an account yet? &nbsp;
          <MuiLink sx={{ mb: 1 }} component={Link} to="/signup">
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Grid>
  );
}
