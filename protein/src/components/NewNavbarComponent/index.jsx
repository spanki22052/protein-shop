import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, withStyles, Badge } from "@material-ui/core";
import { connect } from "react-redux";

const NavbarComponent = ({ prods }) => {
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: "-5px",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <div className="navbar-component">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand link" to="/">
          BIOMART
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Магазин
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/shop">
                  Протеины
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Бренды
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/shop">
                  On
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Здоровье
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/shop">
                  Кофеины
                </Link>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Поиск товаров"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
            >
              Найти
            </button>
          </form>

          <IconButton
            className="icon-button"
            aria-label="cart"
            style={{ marginTop: "10px" }}
          >
            <Link to="/cart">
              <StyledBadge badgeContent={prods.counter} color="secondary">
                <ShoppingCartIcon
                  style={{
                    marginTop: "-20px",
                    fill: "#eee",
                    outline: "none",
                  }}
                />
              </StyledBadge>
            </Link>
          </IconButton>
        </div>
      </nav>
    </div>
  );
};

export default connect((state) => ({
  prods: state.addItem,
}))(NavbarComponent);
