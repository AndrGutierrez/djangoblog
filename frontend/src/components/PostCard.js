import React, { useEffect, useState } from "react";
import { Typography, Paper, Grid, Box } from "@mui/material";
import { blue, red, purple, pink, green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";

const colors = [
  red[500],
  blue[500],
  red[500],
  purple[500],
  pink[500],
  green[500],
];

const imageStyles = {
  height: "125px",
  width: "100%",
  // backgroundColor: randomColor,
};
export default function PostCard({ post }) {
  const [user, setUser] = useState({});
  const [styles, setStyles] = useState(imageStyles);
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;

  const generateRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  useEffect(async () => {
    setUser(await getModel(USER_PATH, post.user));
    setStyles({ ...styles, backgroundColor: generateRandomColor() });
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Link to={`/posts/${user.username}/${post.slug}`}>
        <Paper>
          {post.thumbnail && (
            <Box component={"img"} sx={styles} src={post.thumbnail}></Box>
          )}
          {!post.thumbnail && <Box sx={styles}></Box>}
          <Typography variant="h5">{post.title}</Typography>
        </Paper>
      </Link>
    </Grid>
  );
}
