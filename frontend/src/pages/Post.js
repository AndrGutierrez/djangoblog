import React from "react";

export default function Post({ post }) {
  console.log(post);
  return <div>{post.title}</div>;
}
