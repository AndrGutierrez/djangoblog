import React from "react";
import { Grid, TextField } from "@mui/material";
import Comment from "./Comment";

export default function CommentField({ comments }) {
  return (
    <Grid item xs={12}>
      <TextField
        label="Add a public comment"
        variant="standard"
        multiline
        rows={4}
        fullWidth
      />
      <Grid>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </Grid>
    </Grid>
  );
}
