import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { blue, red, purple, pink, green } from "@mui/material/colors";
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
};
export default function PostCard({ post }) {
  const [user, setUser] = useState({});
  const [styles, setStyles] = useState(imageStyles);
  const [postThumbnail, setPostThumbnail] = useState("");
  const USER_PATH = `${process.env.API_ROUTE}/api/users`;
  const created = new Date(post.created).toLocaleDateString();
  const generateRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  useEffect(async () => {
    setUser(await getModel(USER_PATH, post.user));
    setStyles({ ...styles, backgroundColor: generateRandomColor() });
  }, []);
  useEffect(() => {
    setPostThumbnail(`${process.env.CDN_URL}/${post.thumbnail}`);
  }, [user]);

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <Link to={`/posts/${user.username}/${post.slug}`}>
        <Card>
          {post.thumbnail && (
            <CardMedia
              component={"img"}
              sx={styles}
              src={postThumbnail}
            ></CardMedia>
          )}
          {!post.thumbnail && <Box sx={styles}></Box>}

          <CardContent>
            <Typography variant="h6">{post.title}</Typography>

            <Typography variant="body2" color="text.secondary">
              {post.content ? post.content.substring(0, 150) : ""}
            </Typography>
            <Grid sx={{ display: "flex" }}>
              <Avatar
                src={`${user.profile ? user.profile.profile_picture : ""}`}
                sx={{ width: 24, height: 24 }}
              />
              <Grid container sx={{ px: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ width: "100%", fontWeight: 500 }}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ width: "100%" }}
                >
                  {created}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
