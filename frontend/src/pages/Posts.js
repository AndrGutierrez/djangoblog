import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Grid } from "@mui/material";
import GeneralModal from "../components/GeneralModal";
import { deleteModel, listModel } from "../utils/ApiUtils";
import { setProgress } from "../store/progressSlice";
import { useDispatch, connect } from "react-redux";

function Posts({ setProgress, progress }) {
  const POSTS_ROUTE = `${process.env.API_ROUTE}/api/posts`;
  const [posts, setPosts] = useState([]);
  const [deletedItem, setDeletedItem] = useState({});
  const [item, setItem] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const progressAction = (progress) => dispatch(setProgress(progress));

  const modalData = {
    title: "Are you sure you want to delete this post?",
    description: "You won't be able to recover it",
  };

  useEffect(async () => {
    await listModel(POSTS_ROUTE, progressAction, progress).then(({ body }) => {
      setPosts(body);
    });
  }, [deletedItem]);

  const handleOpenModal = (itm) => {
    setItem(itm);
    setModalOpened(true);
  };

  const handleDelete = async () => {
    handleCloseModal();
    await deleteModel(POSTS_ROUTE, item.id)
      .catch(() => {
        alert("You are not the owner of this post");
        throw e;
      })
      .then(() => setDeletedItem({}));
  };

  const handleCloseModal = () => setModalOpened(false);
  return (
    <Grid item container xs={12} justifyContent="center" direction="column">
      <GeneralModal
        opened={modalOpened}
        handleClose={handleCloseModal}
        data={modalData}
        item={item}
        action={() => handleDelete()}
      ></GeneralModal>
      <Grid
        container
        item
        spacing={2}
        sx={{
          marginTop: "10px",
          p: 3,
        }}
        xs={12}
        sm={11}
        md={10}
      >
        {posts.map((post) => (
          <PostCard
            post={post}
            key={`${post.title}-${post.id}`}
            handleOpenModal={handleOpenModal}
          ></PostCard>
        ))}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  progress: state.progress,
});
const mapDispatchToProps = {
  setProgress,
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
