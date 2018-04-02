import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Glyphicon, Label } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';

const profilePic = {
    width: '40px', height: '40px'
}

const NavBar = ({ logoutHandler }) => {
    let user = {};
    user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><FontAwesomeIcon icon={faHome}/></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/about">
                        <NavItem eventKey={1}>About</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title={<Image src={user.photoURL} circle style={profilePic} />} id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Signed in as <Label bsStyle="primary">{user.displayName}</Label></MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3} onClick={() => logoutHandler()}><Glyphicon glyph="log-out" /> Sign out</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;