import React, { Component } from "react";
import "./home.css";
import WebLogo from "./hireslogo.png";
import HowArt from "./how.png";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <img src={WebLogo} alt="Optimism Logo"></img>
        <h3>Be Happy, Stay Happy</h3>
        <div className="lander">
          <div className="aboutUs">
            <p>
              Optimism will help you log your daily mood and activities. We intend to improve and maintain
              your happiness. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
          <div className="howItWorks">
            <h2>
              How It Works!
            </h2>
            <div className="howBody">
              <img className="howClipArt" src={HowArt} alt="How it Works"></img>
            </div>
          </div>
        </div>

        <footer>
          Copyright 2019
        </footer>
      </div>
    );
  }
}
