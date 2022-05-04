import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ListPosts from "../pages/ListPosts";
import CreatePost from "../pages/CreatePost";
import Post from "../pages/Post";
import CreatedAccount from "../pages/CreatedAccount";
import Layout from "../components/layout";
import Profile from "../pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/signup/success/:username"
            component={CreatedAccount}
          />
          <Route exact path="/user/profile" component={Profile} />
          <Route exact path="/posts" component={ListPosts} />
          <Route exact path="/posts/create" component={CreatePost} />
          <Route exact path="/posts/:username/:postslug" component={Post} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
