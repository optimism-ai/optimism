import React, {Component} from 'react';
import './App.css';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import WebLogo from "./containers/images/banner_dark.png";
import Routes from "./Routes";

class App extends Component {
  constructor() {
      super();
      let initial = null;
      this.state = {
        userID: initial
      };
    }

    logUserIn = e => {
      let testID = 1;
      console.log("ID = 1");
      this.setState({
        userID: testID
      });
    }

  logUserOut = (e) => {
      e.preventDefault()
      console.log("ID = null");
      this.setState({userID: null});
    };

    render() {
        return (
          <div className="App">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">
                    <img id="navLogo" src={WebLogo} alt="Optimism Logo"></img>
                  </Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem href="/homepage">Test Home</NavItem>
                  <NavItem href="/signup">Signup</NavItem>
                  <NavItem href="/login">Login</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes />
          </div>
          
        )
    }
  }
export default App;
