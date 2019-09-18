import React, {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";
import Signup from "./signup";

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <FormGroup controlId="username" bsSize="small">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="small">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
            />
          </FormGroup>
          <Button
            bsSize="small"
            type="submit"
          >
            Login
          </Button>
          <Button
            bsSize="small"
            type="submit"
            href="/signup"
            >
              Sign Up
            </Button>
        </form>
      </div>
    );
  };
}