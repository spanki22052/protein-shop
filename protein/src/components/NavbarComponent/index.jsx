import React from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import "./navbar.scss";

const NavbarComponent = () => {
  const currentHref = window.location.href.split("/");
  var color = "#6af15e";
  currentHref[currentHref.length - 1].length === 0
    ? (color = "white")
    : (color = "#6af15e");
  return (
    <div className="navbar-component">
      <Navbar
        style={{ backgroundColor: "none" }}
        collapseOnSelect
        expand="lg"
        variant="light"
      >
        <Navbar.Brand href="/">
          <span className="green-letters">Dagestan</span>
        </Navbar.Brand>
        <Badge className="green-badge" pill variant="success">
          качество
        </Badge>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/">
              <span
                style={{
                  color: color,
                }}
                className="nav-link-bar"
              >
                Главная
              </span>
            </Nav.Link>
            <Nav.Link eventKey={2} href="/shop">
              <span
                style={{
                  color: color,
                }}
                className="nav-link-bar"
              >
                Магазин
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
