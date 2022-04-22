import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Grid, Input, Card, Button, Typography } from "@mui/material";
import { setData } from "../store/postSlice";
import LoginWarning from "../components/utils/LoginWarning";

function CreatedPost(props) {
  const dispatch = useDispatch();
  const { user, setData } = props;
  const [values, setValues] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });
  const [thumbnailPath, setThumbnailPath] = useState("");

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();

    const thumbnail = e.target.files[0];
    const url = reader.readAsDataURL(thumbnail);
    reader.onloadend = (e) => setThumbnailPath(reader.result);
    setValues({ ...values, thumbnail });
  };

  useEffect(() => console.log(thumbnailPath), [thumbnailPath]);

  useEffect(() => {
    if (user) {
      const submitData = {
        ...values,
        user: user.id,
      };
      dispatch(setData({ values: submitData }));
    }
  }, [values]);

  if (!user) return <LoginWarning />;

  return (
    <Grid sx={{ flex: "1 1 auto", display: "flex" }}>
      <Grid container item xs={12} md={9}>
        <Input
          placeholder="title"
          name="title"
          onChange={handleChange}
          inputProps={{
            style: { fontSize: "1.75rem", height: "40px" },
          }}
          sx={{ height: "40px" }}
          variant="standard"
          fullWidth
          required
          id="title"
          value={values.title}
        />
        <Input
          multiline
          name="content"
          placeholder="content"
          onChange={handleChange}
          variant="standard"
          fullWidth
          required
          id="content"
          value={values.content}
          sx={{ height: "calc(100% - 40px)" }}
          inputProps={{
            style: { height: "100%", overflow: "scroll" },
          }}
        />
      </Grid>
      <Grid component={Card} container item md={3}>
        <Grid item md={12}>
          <Button component="label" variant="contained">
            Add Thumbnail
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Grid>
        <Grid
          component={Typography}
          variant="subtitle1"
          color="text.secondary"
          item
          md={12}
        >
          {values.thumbnail.name}
        </Grid>
        {thumbnailPath && (
          <Grid
            item
            md={12}
            component="img"
            src={thumbnailPath}
            alt="thumbnail"
          />
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  setData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatedPost);
