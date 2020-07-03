import React, { Component } from "react";
import "./shop.scss";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { IconButton, withStyles, Badge } from "@material-ui/core";

const firebase = require("firebase");

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
class ShopPage extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: undefined,
      productsFilter: "all",
      productsCounter: 0,
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("products")
      .doc("categories")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({ categories: info.data().categories });
      });

    firebase
      .firestore()
      .collection("products")
      .doc("productsObject")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          info.data() !== undefined &&
          this.setState({ products: info.data() });
      });
  };

  render() {
    return (
      <div className="shop-page">
        <div className="shop-page__padding">
          <div className="main-page">
            <div className="header">
              <div className="navbar-block">
                <h1>Dagestan</h1>
                <div className="pbadge">
                  <p>качество</p>
                </div>
                <IconButton
                  style={{ position: "absolute", right: "25px", top: "27px" }}
                  aria-label="cart"
                >
                  <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingBasketIcon />
                  </StyledBadge>
                </IconButton>
              </div>
            </div>
          </div>
          <div className="shop-main">
            <div className="categories">
              <h1>Категории</h1>
              <div className="line"></div>
              {this.state.categories.map((element, index) => {
                return (
                  <h2 key={index}>
                    {element.replace(element[0], element[0].toUpperCase())}
                  </h2>
                );
              })}
              <h2> Показать все... </h2>
            </div>
            <div className="all-products">
              <h1>Все результаты</h1>
              <p>{this.state.productsCounter} результатов</p>
              <div className="product-blocks">
                {this.state.productsFilter === "all" &&
                  this.state.categories.map((element) => {
                    return (
                      this.state.products !== undefined &&
                      this.state.products[element].map((el, index) => {
                        return (
                          <div key={index} className="product-block">
                            <img src={el.image} alt="productimage" />
                            <button>Добавить в корзину</button>
                            <h1>{el.title}</h1>
                            <h2>Цена: {el.price}</h2>
                          </div>
                        );
                      })
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopPage;
