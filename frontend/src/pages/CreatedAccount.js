import React from "react";
import { Grid, Paper, Link as MuiLink, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useParams } from "react-router-dom";

const FormStyle = {
  padding: "1rem",
  justifyContent: "center",
  display: "flex",
};
export default function CreatedAccount() {
  const { username } = useParams();

  return (
    <Grid container sx={{ marginTop: "10px", justifyContent: "center" }}>
      <Paper xs={12} sm={8} md={5} xl={3}>
        <Grid container sx={FormStyle}>
          <Grid item md={3}>
            <CheckCircleIcon
              sx={{ color: "#009DAE", width: "50px", height: "50px" }}
            ></CheckCircleIcon>
          </Grid>
          <Grid item md={12}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Account Created Successfuly <strong>{username}</strong> go to{" "}
              <MuiLink component={Link} to="/login">
                Login
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
