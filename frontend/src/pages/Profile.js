import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Avatar, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [biography, setBiography] = useState("");
  const PROFILE_PATH = `${process.env.API_ROUTE}/api/users`;

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (currentUser) setUserProfile(currentUser.profile);
  }, [currentUser]);

  useEffect(() => {
    if (userProfile) setBiography(userProfile.biography);
  }, [userProfile]);

  const handleFileChange = (e) => {
    const thumbnail = e.target.files[0];
    setValues({ ...values, thumbnail });
  };

  const updateProfilePicture = () => {
    const data = new FormData();
    Object.keys(post).forEach((key) => {
      data.append(key, post[key]);
    });

    axios({
      method: "patch",
      url: PROFILE_PATH,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
  };

  return (
    <Box display="flex" justifyContent="center">
      <Paper
        component={Grid}
        item
        xs={12}
        sm={10}
        md={8}
        lg={7}
        container
        spacing={2}
      >
        <Grid
          sx={{ display: "flex" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          item
          xs={12}
          md={4}
        >
          <Grid sx={{ position: "relative" }}>
            <Avatar
              src={userProfile ? userProfile.profile_picture : ""}
              sx={{ width: 110, height: 110 }}
            />
            <EditIcon sx={{ position: "absolute", top: 0, right: 0 }} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" align="center">
            {currentUser.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {biography ? (
            <Typography>biography</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center">
              Add a biography <EditIcon />
            </Typography>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
