import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import CreatedAccount from "../pages/CreatedAccount";
import Layout from "../components/Layout";

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
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:username/:title" component={Post} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
