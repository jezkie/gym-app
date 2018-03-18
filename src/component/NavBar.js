import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = ({ logoutHandler }) => {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Home</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/about">
                        <NavItem eventKey={1}>About</NavItem>
                    </LinkContainer>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Another</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3} onClick={() => logoutHandler()}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;