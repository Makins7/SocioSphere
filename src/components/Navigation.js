import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Navigation(args) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatcher = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  const user = useSelector(state => state.currentUser);

  const logoutUser = () => {
    dispatcher({
      type: 'LOGOUT_USER'
    })
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SocioSphere</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/gallery">Gallery Feed</NavLink>
            </NavItem> 
            <NavItem className="ms-auto" tag="nav">
            <UncontrolledDropdown nav>
              <DropdownToggle caret>
                <i className="fa fa-solid fa-user" />&nbsp;{user.username}
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logoutUser}>Sign Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;