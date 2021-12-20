import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";

export default function Posts() {
  const POSTS_ROUTES = `${process.env.API_ROUTE}/api/posts`;
  const config = { withCredentials: true };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(POSTS_ROUTES, config);
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard>{post}</PostCard>
      ))}
    </>
  );
}
