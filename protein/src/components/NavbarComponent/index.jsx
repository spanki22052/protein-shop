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
        ? "white"
        : "#6af15e"
      : "#6af15e"
  );
  const [bg, setBg] = useState(windowSize >= 1000 ? "none" : "light");

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
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#6af15e" }}
              onClick={() => {
                setColor(windowSize <= 1000 ? "#6af15e" : "white");
                setBg("none");
              }}
            >
              Dagestan
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
                  color: color,
                  marginTop: margTop,
                }}
                onClick={() => {
                  setColor(windowSize <= 1000 ? "#6af15e" : "white");
                  setBg(windowSize < 1000 ? "light" : 'none');
                }}
              >
                {" "}
                Главная
              </Link>
            </span>
            <span
              style={{
                color: color,
              }}
              className="nav-link-bar"
            >
              <Link
                to="/shop"
                style={{
                  textDecoration: "none",
                  color: color,
                  marginLeft: "10px",
                }}
                onClick={() => {
                  setColor("#6af15e");
                  setBg(windowSize < 1000 ? "light" : 'none');
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
                setColor("#6af15e");
                  setBg(windowSize < 1000 ? "light" : 'none');
              }}
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={prods.counter} color="secondary">
                  <ShoppingCartIcon
                    style={{
                      marginTop: "-10px",
                      fill: color,
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
