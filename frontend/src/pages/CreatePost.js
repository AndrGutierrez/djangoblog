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
  const handleSubmit = () => {};
  useEffect(() => {
    if (user) {
      const submitData = {
        ...values,
        user: user.id,
      };
      dispatch(setData({ values: submitData }));
    }
  }, [values]);
  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <Grid sx={{ display: "flex" }}>
            <Grid
              container
              item
              xs={12}
              md={9}
              sx={{ position: "relative", height: "calc(100% - 80px)" }}
            >
              <Input
                placeholder="title"
                name="title"
                onChange={handleChange}
                inputProps={{
                  style: { height: "40px", fontSize: "1.75rem" },
                }}
                variant="standard"
                fullWidth
                required
                id="title"
                value={values.title}
              />
              <Input
                multiline
                name="content"
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  height: "100%",
                }}
                inputProps={{
                  style: { height: "100%" },
                }}
                rows={40}
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
        </form>
      )}
      {!user && <div>Log in to create post</div>}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  setData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatedPost);
