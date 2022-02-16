import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import Comment from "./Comment";

function CommentBox(props) {
  const { comments, post, user } = props;
  const [values, setValues] = useState({
    post: null,
    user: null,
  });
  const [commentsList, setCommentsList] = useState(comments);
  const [commentValid, setCommentValid] = useState(false);
  const COMMENT_PATH = `${process.env.API_ROUTE}/api/comments/`;
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    const name = e.target.name;
    setValues((values) => ({
      ...values,
      [name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (values.content) {
      setCommentValid(true);
    }
  }, [values]);

  useEffect(() => {
    if (post && user) {
      setValues({
        post: post.id,
        user: user.id,
      });
    }
    if (comments) {
      setCommentsList(comments);
    }
  }, [props]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValid)
      axios.post(COMMENT_PATH, values).then((response) => {
        setCommentsList([...commentsList, response.data]);
        console.log(response.data, comments);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} sx={{ py: 2 }} justifyContent="center">
        <TextField
          label="Add a public comment"
          variant="standard"
          multiline
          rows={4}
          fullWidth
          onChange={handleChange}
          name="content"
        />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" disabled={!commentValid}>
            Submit
          </Button>
        </Grid>
        <Grid>
          {commentsList &&
            commentsList.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(CommentBox);
