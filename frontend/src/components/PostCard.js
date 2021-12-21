import React from "react";
import { Typography, Paper } from "@mui/material";

export default function PostCard({ post }) {
  return (
    <Paper>
      <Typography variant="h5">{post.title}</Typography>
    </Paper>
  );
}
