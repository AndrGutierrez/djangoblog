import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";
import { Typography, Grid, Avatar, Box } from "@mui/material";
import CommentBox from "../components/CommentBox";

const centerVertically = { display: "flex", alignItems: "center" };
export default function Post() {
  const { postslug } = useParams();
  const POST_PATH = `${process.env.API_ROUTE}/api/posts`;
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;
  const formatDate = (date) => {
    const jsDate = new Date(date);
    return Intl.DateTimeFormat("en-US").format(jsDate);
  };

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(async () => setPost(await getModel(POST_PATH, postslug)), []);

  useEffect(
    async () => post.user && setUser(await getModel(USER_PATH, post.user)),
    [post]
  );

  useEffect(
    () => user.profile && setProfilePicture(user.profile.profile_picture),
    [user]
  );
  return (
    <Grid container justifyContent="center" sx={{ pt: 3 }}>
      <Grid item xs={12} md={6} xl={4}>
        <Grid container spacing={2} sx={{ px: 2 }}>
          <Grid item>
            <Avatar src={profilePicture} alt="" />
          </Grid>

          <Grid item container sx={{ px: 2 }} xs={8} spacing={1}>
            <Grid item sx={centerVertically}>
              <Typography variant="h6" sx={{ color: "primary.link" }}>
                {user.username}
              </Typography>
            </Grid>
            <Grid item sx={centerVertically}>
              {post.created && (
                <Typography variant="date">
                  {formatDate(post.created)}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              sx={{ fontFamily: "Luxurious Roman", fontSize: "3rem" }}
            >
              {post.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{post.content}</Typography>
          </Grid>
        </Grid>
        <CommentBox post={post} comments={post.comments} />
      </Grid>
    </Grid>
  );
}
