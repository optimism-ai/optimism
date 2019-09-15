import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import "./signup.css";

export default class Signup extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        fname: "",
        lname: "",
        username: "",
        email: "",
        pwd: "",
        cpwd: "",
        newUser: null
      };
    }
  
    validateForm() {
      return this.state.fname.length > 0 && this.state.lname.length > 0
      && this.state.username.length > 0 && this.state.email.length > 0
      && this.state.pwd.length > 0 && this.state.cpwd === this.state.pwd;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = async event => {
      event.preventDefault();

      this.setState({ isLoading: true});
      this.setState({ newUser: "test"});
      this.setState({ isLoading: false});
    }
  
    render() {
      return (
        <div className="Signup">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="fname" bsSize="small">
              <FormControl
                autoFocus
                placeholder="First Name"
                type="text"
                value={this.state.fname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="lname" bsSize="small">
              <FormControl
                placeholder="Last Name"
                value={this.state.lname}
                onChange={this.handleChange}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="small">
              <FormControl
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                type="username">
              </FormControl>
            </FormGroup>
            <FormGroup controlId="email" bsSize="small">
              <FormControl
                placeholder="johndoe@example.com"
                value={this.state.email}
                onChange={this.handleChange}
                type="email">  
              </FormControl>
            </FormGroup>
            <FormGroup controlId="pwd" bsSize="small">
              <FormControl
                placeholder="Password"
                value={this.state.pwd}
                onChange={this.handleChange}
                type="password">
              </FormControl>
            </FormGroup>
            <FormGroup controlId="cpwd" bsSize="small">
              <FormControl
                placeholder="Confirm Password"
                value={this.state.cpwd}
                onChange={this.handleChange}
                type="password">
              </FormControl>
            </FormGroup>
            <Button
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </div>
      );
    }
  }