import React from "react";
import { useLocation } from "react-router-dom";
export default function Post() {
  const { pathname } = useLocation();
  console.log(pathname.split("/").filter((value) => value !== ""));
  return <div>{post.title}</div>;
}
