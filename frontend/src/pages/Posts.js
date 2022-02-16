import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Grid } from "@mui/material";
import axios from "axios";

export default function Posts() {
  const POSTS_ROUTES = `${process.env.API_ROUTE}/api/posts`;
  const config = { withCredentials: true };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(POSTS_ROUTES, config)
      .then((response) => setPosts(response.data.body));
  }, []);
  useEffect(() => {}, [posts]);

  return (
    <Grid item container xs={12} justifyContent="center" direction="column">
      <Grid
        container
        item
        spacing={2}
        sx={{
          marginTop: "10px",
          p: 3,
          px: 9,
        }}
      >
        {posts.map((post) => (
          <PostCard post={post} key={`${post.title}-${post.id}`}></PostCard>
        ))}
      </Grid>
    </Grid>
  );
}
