import React from "react";
import { Route, Switch } from "react-router-dom";
import home from "./containers/home";
import login from "./containers/login";
import Signup from "./containers/signup";
import homepage from "./containers/homepage";

export default () =>
  <Switch>
    <Route path="/" exact component={home} />
    <Route path="/login" exact component={login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/homepage" exact component={homepage} />
  </Switch>;
