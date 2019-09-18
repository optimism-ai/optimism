import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import "./signup.css";

export default class Signup extends Component {
    render() {
      return (
        <div className="Signup">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="fname" bsSize="small">
              <FormControl
                autoFocus
                placeholder="First Name"
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="lname" bsSize="small">
              <FormControl
                placeholder="Last Name"
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="small">
              <FormControl
                placeholder="Username"
                type="username">
              </FormControl>
            </FormGroup>
            <FormGroup controlId="email" bsSize="small">
              <FormControl
                placeholder="johndoe@example.com"
                type="email">  
              </FormControl>
            </FormGroup>
            <FormGroup controlId="pwd" bsSize="small">
              <FormControl
                placeholder="Password"
                type="password">
              </FormControl>
            </FormGroup>
            <FormGroup controlId="cpwd" bsSize="small">
              <FormControl
                placeholder="Confirm Password"
                type="password">
              </FormControl>
            </FormGroup>
            <Button
              bsSize="small"
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </div>
      );
    }
  }