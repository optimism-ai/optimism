import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Survey from "./components/survey";
import SurveySummary from "./components/surveySummary"
import AspectHistory from './components/aspectHistory';

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
                <PrivateRoute path="/survey" component={Survey} />
                <PrivateRoute path="/surveysummary" component={SurveySummary} />
                <PrivateRoute path="/aspecthistory" component={AspectHistory} />
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;

