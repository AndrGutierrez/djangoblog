import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getModel } from "../utils/ApiUtils";
export default function Post() {
  const { pathname } = useLocation();
  const PATH_VALUES = pathname.split("/").filter((value) => value !== "");
  const POST_PATH = `${process.env.API_ROUTE}/api/posts`;
  const POST_SLUG = PATH_VALUES[PATH_VALUES.length - 1];
  const [post, setPost] = useState({});

  useEffect(async () => {
    pathname[pathname.length - 1];
    setPost(await getModel(POST_PATH, POST_SLUG));
  }, []);
  return <div>{post.title}</div>;
}
