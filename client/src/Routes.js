import React from "react";
import { Route, Switch } from "react-router-dom";
import home from "./components/home";
import login from "./components/login";
import Signup from "./components/signup";
import homepage from "./components/homepage";

export default () =>
  <Switch>
    <Route path="/" exact component={home} />
    <Route path="/login" exact component={login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/homepage" exact component={homepage} />
  </Switch>;
