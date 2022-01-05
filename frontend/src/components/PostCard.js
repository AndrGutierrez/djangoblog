import React, { useEffect, useState } from "react";
import { Typography, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";

export default function PostCard({ post }) {
  const [user, setUser] = useState({});
  const USERS_ROUTES = `${process.env.API_ROUTE}/api/users`;

  useEffect(async () => {
    setUser(await getModel(USERS_ROUTES, post.user));
  }, []);
  useEffect(() => {
    console.log(user.username);
  }, [user]);

  return (
    <Grid item xs={12}>
      <Link to={`${user.username}/${post.title}-${post.id}`}>
        <Paper>
          <Typography variant="h5">{post.title}</Typography>
        </Paper>
      </Link>
    </Grid>
  );
}
