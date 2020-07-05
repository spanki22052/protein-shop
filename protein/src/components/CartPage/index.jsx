import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart.scss";
import { Link } from "react-router-dom";

class CartPage extends Component {
  render() {
    return (
      <div className="cart-page">
        <div className="cart-page__padding">
          <div className="main-text">
            <h1>Ваша корзина</h1>
            <div className="line"></div>
          </div>
          <div className="products-block">
            {this.props.prods.counter === 0 ? (
              <div className="empty">
                <h1 className="empty-text">
                  Ваша карзина пуста, добавьте в нее что-нибудь!
                </h1>
                <button>
                  <Link
                    to="/shop"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    В магазин
                  </Link>
                </button>
              </div>
            ) : (
              <div className="products-blocks">
                <h1>Ваша корзина не пуста</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  prods: state.addItem,
}))(CartPage);
