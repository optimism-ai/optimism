// src/App.js

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";

function App() {
  return (
      <BrowserRouter>
        <div>
            <div>
                <NavBar />
            </div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" component={Profile} />
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;

