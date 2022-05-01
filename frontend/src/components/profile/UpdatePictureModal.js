import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Grid, Fade, Typography } from "@mui/material";
import Avatar from "../utils/Avatar";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const acceptedFiles = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
export default function UpdatePictureModal({
  open,
  handleClose,
  picture,
  setUpdated,
  user,
}) {
  const PROFILE_PATH =
    user && `${process.env.API_ROUTE}/api/profile/${user.profile.id}`;
  const [picturePath, setPicturePath] = useState(picture);
  const [profilePicture, setProfilePicture] = useState("");
  const handleChangeFile = (files) => {
    if (files.length > 0) {
      const reader = new FileReader();
      const profilePicture = files[0];
      reader.readAsDataURL(profilePicture);
      reader.onloadend = (e) => setPicturePath(reader.result);
      setProfilePicture(profilePicture);
    }
  };
  const updateProfilePicture = () => {
    const data = new FormData();
    data.append("profile_picture", profilePicture);
    // const newUser = {...user, newProfilePicture: setPicturePath}

    axios({
      method: "patch",
      url: PROFILE_PATH,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .catch((e) => {
        // console.log(e.response);
      })
      .then(() => {
        setUpdated(picturePath);
        handleClose();
      });
  };

  useEffect(() => console.log(picturePath), [picturePath]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style} component={Grid} container>
          <Avatar sx={{ width: 256, height: 256 }} src={picturePath}></Avatar>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Update your profile picture
          </Typography>
          <DropzoneArea
            onChange={handleChangeFile}
            acceptedFiles={acceptedFiles}
            filesLimit={1}
            showPreviews={false}
            showPreviewsInDropzone={false}
            showAlerts={["error"]}
          ></DropzoneArea>
          <Button
            xs={12}
            color="secondary"
            variant="contained"
            onClick={updateProfilePicture}
            size="large"
          >
            Submit
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
