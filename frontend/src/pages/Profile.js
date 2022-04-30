import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Box } from "@mui/material";
import Avatar from "../components/utils/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import UpdatePictureModal from "../components/profile/UpdatePictureModal";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [biography, setBiography] = useState("");
  const CDN_URL = process.env.CDN_URL;
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (user) {
      const pfp = `${CDN_URL}/${user.profile.profile_picture}`;
      console.log(pfp);
      setProfilePicture(pfp);
      setCurrentUser(user);
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

  const handleFileChange = (e) => {
    const reader = new FileReader();

    const thumbnail = e.target.files[0];
    const url = reader.readAsDataURL(thumbnail);
    reader.onloadend = (e) => setThumbnailPath(reader.result);
    setValues({ ...values, thumbnail });
  };

  const openEditModal = () => setModalOpened(true);
  const closeEditModal = () => setModalOpened(false);

  return (
    <Box display="flex" justifyContent="center" sx={{ p: 3 }}>
      {modalOpened && (
        <UpdatePictureModal
          open={modalOpened}
          handleClose={closeEditModal}
          picture={profilePicture}
          setUpdated={setProfilePicture}
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
          xl={1}
        >
          <Grid sx={{ position: "relative" }}>
            <Avatar src={profilePicture} sx={{ width: 110, height: 110 }} />
            <EditIcon
              onClick={openEditModal}
              type="file"
              sx={{ position: "absolute", top: 0, right: 0 }}
            ></EditIcon>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3} md={3} sx={{}}>
          <Typography variant="h3" sx={{ width: "100%", textAlign: "center" }}>
            {currentUser.username}
          </Typography>
          <Grid item xs={12}>
            {biography ? (
              <Typography>biography</Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                Add a biography <EditIcon />
              </Typography>
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
