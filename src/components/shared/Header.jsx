import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  logOutClick(event) {
    event.preventDefault();
    this.props.logUserOutFunction();
  }

  // TODO : Remove href
  renderGreeting(name) {
    return (
      <span>
        Welcome, {name} | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
      </span>
    );
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isLoggedIn, firstName } = this.props.authentication;

    return (
      <header className="wrapper">
        <Navbar color="light" light expand="sm">
          <NavbarBrand tag={Link} to="/">Euphony</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {isLoggedIn ? this.renderGreeting(firstName) : renderLogin()}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}