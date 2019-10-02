import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
      <BrowserRouter>
        <div>
            <div>
                <NavBar />
            </div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;

