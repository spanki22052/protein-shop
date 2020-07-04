import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import "./navbar.scss";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, withStyles, Badge } from "@material-ui/core";

const NavbarComponent = ({ prods }) => {
  const currentHref = window.location.href.split("/");
  var color = "#6af15e";
  currentHref[currentHref.length - 1].length === 0
    ? (color = "white")
    : (color = "#6af15e");

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);
  return (
    <div className="navbar-component">
      <Navbar
        style={{ backgroundColor: "none" }}
        collapseOnSelect
        expand="lg"
        variant="light"
      >
        <Navbar.Brand href="/">
          <span style={{ float: 'left'}} className="green-letters">Dagestan</span>
          <div className="green-badge">качество</div>
        </Navbar.Brand>
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
            <Nav.Link href="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={prods.counter} color="secondary">
                  <ShoppingCartIcon
                    style={{
                      marginTop: "-10px",
                    }}
                  />
                </StyledBadge>
              </IconButton>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default connect((state) => ({
  prods: state.addItem,
}))(NavbarComponent);
