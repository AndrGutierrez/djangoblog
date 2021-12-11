import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Grid } from "@mui/material";
import axios from "axios";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  ["@media (max-width:780px)"]: {
    padding: 0,
  },
};

const FormStyle = {
  padding: "1rem",
};

export default function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
  });
  const SIGNUP_ROUTE = `${process.env.API_ROUTE}/api/users`;
  useEffect(async () => {
    const a = axios
      .get(SIGNUP_ROUTE)
      .then((response) => response.json())
      .then((response) => response);
    console.log(a);
  }, []);

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }
  return (
    <Grid sx={commonStyles}>
      <Grid xs={12} sm={6} md={4} xl={3}>
        <Paper sx={FormStyle}>
          <Typography variant="h6">Signup</Typography>
          <TextField
            onChange={handleChange}
            label={"Username"}
            id="username"
            value={values.username}
            fullWidth
          ></TextField>
        </Paper>
      </Grid>
    </Grid>
  );
}
