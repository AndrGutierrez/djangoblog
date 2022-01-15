import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";
import { Typography, Grid, Avatar } from "@mui/material";
import CommentBox from "../components/CommentBox";
export default function Post() {
  const { pathname } = useLocation();
  const PATH_VALUES = pathname.split("/").filter((value) => value !== "");
  const POST_PATH = `${process.env.API_ROUTE}/api/posts`;
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;
  const POST_SLUG = PATH_VALUES[PATH_VALUES.length - 1];
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(async () => {
    setPost(await getModel(POST_PATH, POST_SLUG));
  }, []);

  useEffect(async () => {
    if (post.user) {
      setUser(await getModel(USER_PATH, post.user));
    }
  }, [post]);

  useEffect(() => {
    if (user.profile) {
      setProfilePicture(user.profile.profile_picture);
    }
  }, [user]);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} xl={4}>
        <Grid>{user.username}</Grid>
        {profilePicture && <Avatar src={profilePicture} alt="" />}
        <Grid item xs={12}>
          <Typography variant="postTitle">{post.title}</Typography>
          <Typography>{post.content}</Typography>
        </Grid>
        <CommentBox comments={post.comments} />
      </Grid>
    </Grid>
  );
}
