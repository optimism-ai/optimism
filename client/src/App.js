import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import MoodSelection from "./components/moodSelection";
import FactorSelection from "./components/factorSelection";

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
                <PrivateRoute path="/moodselection" component={MoodSelection} />
                <PrivateRoute path="/factorselection" component={FactorSelection} />
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;

