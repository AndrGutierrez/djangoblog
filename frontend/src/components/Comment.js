import React, { useEffect, useState } from "react";
import { Card, Grid, Avatar, Divider, Typography } from "@mui/material";
import { getModel } from "../utils/ApiUtils";

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);
  const [profilepic, setProfilepic] = useState("");
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;

  useEffect(async () => {
    setUser(await getModel(USER_PATH, comment.user));
  }, []);

  useEffect(() => {
    if (user) {
      setProfilepic(user.profile.profile_picture);
    }
  }, [user]);
  return (
    <Card sx={{ p: 3 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          {profilepic !== "" && <Avatar src={profilepic}></Avatar>}
        </Grid>
        <Grid justifyContent="left" item>
          {user && (
            <Typography variant="h6" style={{ margin: 0, alignText: "left" }}>
              {user.username}
            </Typography>
          )}
          <Typography style={{ textAlign: "left" }}>
            {comment.content}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
