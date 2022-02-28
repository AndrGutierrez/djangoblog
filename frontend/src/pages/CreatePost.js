import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Grid, Input, Card, Button } from "@mui/material";
import { setData } from "../store/postSlice";

function CreatedPost(props) {
  const dispatch = useDispatch();
  const { user, setData } = props;
  const [values, setValues] = useState({
    title: "",
    content: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    const thumbnail = e.target.files[0];
    setValues({ ...values, thumbnail });
  };

  useEffect(() => {
    if (user) {
      const submitData = {
        ...values,
        user: user.id,
      };
      dispatch(setData({ values: submitData }));
    }
  }, [values]);

  if (!user) return <div>Log in to create post</div>;

  return (
    <Grid sx={{ display: "flex" }}>
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
        />
      </Grid>
      <Grid md={3} item>
        <Card>
          <Button variant="contained" component="label">
            Add Thumbnail
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Card>
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
