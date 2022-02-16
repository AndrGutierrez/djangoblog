import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Avatar, Typography } from "@mui/material";
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
    <Paper>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid sx={{ position: "relative" }}>
            <Avatar
              src={userProfile ? userProfile.profile_picture : ""}
              sx={{ width: 110, height: 110 }}
            />
            <EditIcon sx={{ position: "absolute", top: 0, right: 0 }} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
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
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
