import React from 'react';
import { Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useSelector } from 'react-redux';

function NavMenu() {
    const isLoginDone = useSelector(state => state.user.isLogin);

    return (
    <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
            <Container>
                <NavbarBrand tag={Link} to="/">User Management</NavbarBrand>
                    <ul className="navbar-nav flex-grow">
                        {isLoginDone ? <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                        </NavItem> : null}
                    </ul>
            </Container>
        </Navbar>
    </header>)
}

export default NavMenu;