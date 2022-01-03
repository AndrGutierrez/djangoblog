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
    <Grid item xs={6}>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {posts.map((post) => (
          <PostCard post={post} key={`${post.title}-${post.id}`}></PostCard>
        ))}
      </Grid>
    </Grid>
  );
}
