import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.entities.auth.token);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }

  const handleLogout = () => {
    if (window.confirm(`Log out now?`)) {
      dispatch(logout());
    }
  };

  return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Dotnet React Billing</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                { auth ? <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/invoices">Invoices</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/contacts">Contacts</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login" onClick={handleLogout}>Logout</NavLink>
                  </NavItem>
                </> : <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                  </NavItem>
                </>}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
  );
}

// export default NavMenu;