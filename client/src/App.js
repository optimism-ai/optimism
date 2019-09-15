import React, {Component} from 'react';
import './App.css';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import WebLogo from "./containers/hireslogo.png";


class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <img id="navLogo" src={WebLogo} alt="Optimism Logo"></img>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/signup">
                <NavItem>Create Account</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}
export default App;
