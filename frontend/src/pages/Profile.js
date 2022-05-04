import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Box, Button, TextField } from "@mui/material";
import Avatar from "../components/utils/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import UpdatePictureModal from "../components/profile/UpdatePictureModal";
import Posts from "../components/posts/Posts";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [values, setValues] = useState({});
  const [editEnabled, setEditEnabled] = useState(false);
  const CDN_URL = process.env.CDN_URL;
  const PROFILE_PATH =
    user && `${process.env.API_ROUTE}/api/profile/${user.profile.id}`;
  const [profilePicture, setProfilePicture] = useState("");
  const theme = useTheme();
  const screenIsSM = useMediaQuery(theme.breakpoints.up("sm"));

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
    () =>
      userProfile && setValues({ ...values, biography: userProfile.biography }),
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
    <Box display="flex" justifyContent="center" sx={{ py: 3 }}>
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
        md={9}
        lg={8}
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
              color="action"
              fontSize="small"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "background.paper",
                border: "1px solid #f2f2f2",
                borderRadius: "50%",
                padding: "5px",
              }}
            ></EditIcon>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          sx={{ textAlign: !screenIsSM && "center" }}
        >
          <Typography variant="h3">{currentUser.username}</Typography>
          <Grid item xs={12}>
            {!editEnabled &&
              (values.biography ? (
                <>
                  <Typography>{values.biography}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Edit biography
                    <EditIcon onClick={enableEdit} fontSize="small" />
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Add a biography <EditIcon onClick={enableEdit} />
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
        <Grid xs={12} sx={{ pb: 4, pt: 2, py: 2 }}>
          <Typography variant="h5" component={Grid} sx={{ py: 3 }}>
            Your posts
          </Typography>
          <Posts user={currentUser}></Posts>
        </Grid>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
