import React, { Component } from "react";
import "./homepage.css";

export default class homepage extends Component {
    render() {
      return (
        <div className="container">
          <div className="lhs"> 
            <div className="sidebar">
              <h3>Username Picture</h3>
              <h4>Username</h4>
              <p>Do Daily Survey</p>
            </div>
            <div className="aspectScoreTb">
              <ul>
                <li>Aspect 1</li>
                <li>Aspect 2</li>
                <li>Aspect 3</li>
                <li>Aspect 4</li>
              </ul>
            </div>
          </div>
          <div className="rhs">
            <h2>Recent Moods</h2>
            <ul>
              <li>Mood1</li>
              <li>Mood2</li>
              <li>Mood3</li>
              <li>Mood4</li>
            </ul>
          </div>
        </div>

      );
    }
}