// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import WebLogo from "./hireslogo.png";
import "./navbar.css";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App">
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    {!isAuthenticated && <Link to="/"><img id="navLogo" src={WebLogo} alt="Optimism Logo"></img></Link>}
                    {isAuthenticated && <Link to="/dashboard"><img id="navLogo" src={WebLogo} alt="Optimism Logo"></img></Link>}
                  <Link to="/">
                  </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {!isAuthenticated && (
                        <NavItem
                            onClick={() =>
                                loginWithRedirect({})
                            }
                        >
                        Log in
                        </NavItem>
                    )}

                    {isAuthenticated && <NavItem><Link to="/dashboard">Home</Link></NavItem>}
                    {isAuthenticated && <NavItem><Link to="/profile">Profile</Link></NavItem>}
                    {isAuthenticated && <NavItem onClick={() => logout()}>Log out</NavItem>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
};

export default NavBar;
