import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import "./navbar.scss";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, withStyles, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavbarComponent = ({ prods }) => {
  var windowSize = window.innerWidth;
  var currentLink = window.location.href.split("/");

  const [color, setColor] = useState(
    currentLink[currentLink.length - 1].length < 1
      ? windowSize >= 1000
        ? "#bbf1c8"
        : "#bbf1c8"
      : "#bbf1c8"
  );
  const [bg, setBg] = useState(windowSize >= 1000 ? "none" : "light");
  console.log(bg);
  var margTop = windowSize >= 1000 ? "0" : "110px !important";

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
        style={{ backgroundColor: "none", zIndex: "5" }}
        collapseOnSelect
        expand="lg"
        variant="light"
      >
        <Navbar.Brand>
          <span style={{ float: "left" }} className="green-letters">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{ color: "#6af15e" }}>BIO</span>{" "}
              <span style={{ color: "yellow" }}>MART</span>
            </Link>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <span
              style={{
                color: color,
                marginLeft: "10px",
              }}
              className="nav-link-bar"
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "yellow",
                  marginTop: margTop,
                }}
                onClick={() => {
                  setBg(windowSize < 1000 ? "light" : "none");
                }}
              >
                {" "}
                Главная
              </Link>
            </span>
            <span
              style={{
                color: "yellow",
              }}
              className="nav-link-bar"
            >
              <Link
                to="/shop"
                style={{
                  textDecoration: "none",
                  color: "yellow",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  setColor("#bbf1c8");
                  setBg(windowSize < 1000 ? "light" : "none");
                }}
              >
                {" "}
                Магазин
              </Link>
            </span>
            <Link
              to="/cart"
              style={{ textDecoration: "none", marginLeft: "10px" }}
              onClick={() => {
                setColor("#bbf1c8");
              }}
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={prods.counter} color="secondary">
                  <ShoppingCartIcon
                    style={{
                      marginTop: "-10px",
                      fill: "yellow",
                      outline: "none",
                    }}
                  />
                </StyledBadge>
              </IconButton>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default connect((state) => ({
  prods: state.addItem,
}))(NavbarComponent);
