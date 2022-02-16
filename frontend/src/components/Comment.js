import React, { useEffect, useState } from "react";
import { Card, Grid, Avatar, Divider, Typography } from "@mui/material";
import { getModel } from "../utils/ApiUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);
  const [profilepic, setProfilepic] = useState("");
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;
  const COMMENT_PATH = `${process.env.API_ROUTE}/api/comments`;

  useEffect(async () => {
    setUser(await getModel(USER_PATH, comment.user));
  }, []);

  useEffect(() => {
    if (user) {
      setProfilepic(user.profile.profile_picture);
    }
  }, [user]);

  const handleOpenMenu = (e) => {};

  const handleDelete = () => {
    axios.delete(COMMENT_PATH);
  };
  return (
    <Card sx={{ mt: 3, py: 3, px: 1 }}>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        sx={{ position: "relative", px: 2 }}
      >
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
        <MoreVertIcon
          sx={{ position: "absolute", top: 0, right: 0, color: "gray" }}
          onClick={handleOpenMenu}
        />{" "}
      </Grid>
    </Card>
  );
}
