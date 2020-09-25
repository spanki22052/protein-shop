import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton, withStyles, Badge } from "@material-ui/core";
import { connect } from "react-redux";
import ProductPopup from "./ProductPopup";

const firebase = require("firebase");

const NavbarComponent = ({
  prods,
  sendCategoriesObject,
  sendProductsObject,
  allItems,
}) => {
  const [searchInput, setSearch] = useState("");
  const [searchList, setSearcList] = useState(
    allItems.products.filter((element) =>
      element.title.toLowerCase().includes(searchInput)
    )
  );

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: "-5px",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .doc("categories")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          sendCategoriesObject(info.data().category);
      });

    firebase
      .firestore()
      .collection("products")
      .doc("productsObject")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          sendProductsObject(info.data().products);
      });
  }, [sendProductsObject, sendCategoriesObject]);

  const [displaySet, setDisplay] = useState("none");

  return (
    <div className="navbar-component">
      <ProductPopup
        displaySet={displaySet}
        displaySetFunction={(e) => setDisplay(e)}
        productsList={searchList}
      />
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand link" to="/">
          <span style={{ color: "#12DF00" }}>BIO</span>
          <span style={{ color: "#FBFF31", marginRight: "1px" }}>MART</span>
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
					о нас
						
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

          {/* <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              style={{ width: "220px" }}
              placeholder="Поиск товаров"
              type="text"
              value={searchInput}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-outline-light my-2 my-sm-0"
              onClick={updateSearchList}
              type="submit"
            >
              Найти
            </button>
          </form> */}

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

export default connect(
  (state) => ({
    prods: state.addItem,
    allItems: state.shopStore,
  }),
  (dispatch) => ({
    sendCategoriesObject: (payload) => {
      dispatch({
        type: "ADD_CATEGORIES",
        payload: payload,
      });
    },

    sendProductsObject: (payload) => {
      dispatch({
        type: "ADD_PRODUCTS",
        payload: payload,
      });
    },
  })
)(NavbarComponent);