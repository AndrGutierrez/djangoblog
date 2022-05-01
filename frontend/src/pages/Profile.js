import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Box, Button, TextField } from "@mui/material";
import Avatar from "../components/utils/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import UpdatePictureModal from "../components/profile/UpdatePictureModal";
import axios from "axios";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [values, setValues] = useState({});
  const [editEnabled, setEditEnabled] = useState(false);
  const [biography, setBiography] = useState("");
  const CDN_URL = process.env.CDN_URL;
  const PROFILE_PATH =
    user && `${process.env.API_ROUTE}/api/profile/${user.profile.id}`;
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (user) {
      const pfp = `${CDN_URL}/${user.profile.profile_picture}`;
      setProfilePicture(pfp);
      setCurrentUser(user);
      setValues({
        biography: user.profile.biography,
      });
    }
  }, [user]);

  useEffect(
    () => currentUser && setUserProfile(currentUser.profile),
    [currentUser]
  );

  useEffect(
    () => userProfile && setBiography(userProfile.biography),
    [userProfile]
  );

  const openEditModal = () => setModalOpened(true);
  const closeEditModal = () => setModalOpened(false);
  const enableEdit = () => setEditEnabled(true);

  const handleUpdate = () => {
    // const newUser = {...user, newProfilePicture: setPicturePath}

    axios({
      method: "patch",
      url: PROFILE_PATH,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    })
      .catch((e) => {
        console.log(e.response);
      })
      .then(() => {
        setEditEnabled(false);
        // handleClose();
      });
  };

  const handleChange = (e) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <Box display="flex" justifyContent="center" sx={{ p: 3 }}>
      {modalOpened && (
        <UpdatePictureModal
          open={modalOpened}
          handleClose={closeEditModal}
          picture={profilePicture}
          setUpdated={setProfilePicture}
          user={user}
        ></UpdatePictureModal>
      )}
      <Paper
        component={Grid}
        item
        xs={12}
        sm={10}
        md={8}
        lg={7}
        container
        spacing={2}
        sx={{ p: 3 }}
      >
        <Grid
          sx={{ display: "flex" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          item
          xs={12}
          sm={3}
          lg={2}
          xl={2}
        >
          <Grid sx={{ position: "relative" }}>
            <Avatar src={profilePicture} sx={{ width: 110, height: 110 }} />
            <EditIcon
              onClick={openEditModal}
              type="file"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "background.paper",
                border: "1px solid black",
                borderRadius: "50%",
                width: 36,
                height: 36,
              }}
            ></EditIcon>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} md={8} sx={{}}>
          <Typography variant="h3">{currentUser.username}</Typography>
          <Grid item xs={12}>
            {!editEnabled &&
              (biography ? (
                <>
                  <Typography>{values.biography}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Edit biography
                    <EditIcon onClick={enableEdit} />
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Add a biography{" "}
                  </Typography>
                </>
              ))}
            {editEnabled && (
              <>
                <TextField
                  multiline
                  name="biography"
                  rows={2}
                  maxRows={4}
                  value={values.biography}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
                <Grid sx={{ p: 3 }} container spacing={2}>
                  <Grid
                    onClick={() => {
                      setEditEnabled(false);
                    }}
                    component={Button}
                    item
                  >
                    Cancel
                  </Grid>
                  <Grid
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    component={Button}
                    item
                  >
                    Update
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
