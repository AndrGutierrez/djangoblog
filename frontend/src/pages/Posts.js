import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Grid, Modal, Typography, Box } from "@mui/material";
import axios from "axios";
import GeneralModal from "../components/GeneralModal";
import { deleteModel } from "../utils/ApiUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Posts() {
  const POSTS_ROUTE = `${process.env.API_ROUTE}/api/posts`;
  const config = { withCredentials: true };
  const [posts, setPosts] = useState([]);
  const [deletedItem, setDeletedItem] = useState({});
  const [item, setItem] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    axios
      .get(POSTS_ROUTE, config)
      .then((response) => setPosts(response.data.body));
  }, [deletedItem]);
  useEffect(() => {}, [posts]);
  const modalData = {
    title: "Are you sure you want to delete this post?",
    description: "You won't be able to recover it",
  };

  const handleOpenModal = (itm) => {
    setItem(itm);
    setModalOpened(true);
  };

  const handleDelete = () => {
    deleteModel(POSTS_ROUTE, item.id).then(() => setDeletedItem({}));
    handleCloseModal();
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
