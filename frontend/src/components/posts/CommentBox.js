import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import Comment from "./Comment";
import GeneralModal from "../utils/GeneralModal";
import { deleteModel } from "../../utils/ApiUtils";

function CommentBox(props) {
  const { comments, post, user } = props;
  const [values, setValues] = useState({
    post: null,
    user: null,
  });
  const [modalOpened, setModalOpened] = useState(false);
  const [commentsList, setCommentsList] = useState(comments);
  const [commentValid, setCommentValid] = useState(false);
  const [item, setItem] = useState({});
  const [deletedItem, setDeletedItem] = useState(null);
  const COMMENT_PATH = `${process.env.API_ROUTE}/api/comments/`;
  const modalData = {
    title: "Are you sure you want to delete this post?",
    description: "You won't be able to recover it",
  };

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

  useEffect(() => values.content && setCommentValid(true), [values]);

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

  useEffect(() => {
    if (comments) {
      setCommentsList(comments.filter(({ id }) => id !== deletedItem.id));
    }
  }, [deletedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValid)
      axios.post(COMMENT_PATH, values).then((response) => {
        setCommentsList([...commentsList, response.data]);
        setValues({ content: "" });
      });
  };

  const handleOpenModal = (itm) => {
    setItem(itm);
    setModalOpened(true);
  };

  const handleDelete = async () => {
    await deleteModel(COMMENT_PATH, item.id)
      .catch((e) => {
        alert("you are not the owner of this comment");
        throw e;
      })
      .then(() => setDeletedItem({ id: item.id }));
    handleCloseModal();
  };

  const handleCloseModal = () => setModalOpened(false);

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} sx={{ py: 2 }} justifyContent="center">
        <GeneralModal
          opened={modalOpened}
          handleClose={handleCloseModal}
          data={modalData}
          item={item}
          action={() => handleDelete()}
        ></GeneralModal>
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
              <Comment
                key={comment.id}
                comment={comment}
                handleOpenModal={handleOpenModal}
              />
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
