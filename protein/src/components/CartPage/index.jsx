import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart.scss";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class CartPage extends Component {
  removeProduct = (title) => {
    let amountCounter =
      this.props.prods.counter - this.props.prods[title].amount;
    this.props.resetCounter(amountCounter);
    this.props.removeItemFromList(title);
    this.props.removeItemFromObject(title);
  };
  render() {
    return (
      <div className="cart-page">
        <div className="cart-page__padding">
          <div className="main-text">
            <h1>Корзина</h1>
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
                {this.props.items.map((element) => {
                  return (
                    <div className="product-block">
                      <div className="image-side">
                        <img
                          src={this.props.prods[element].image}
                          alt="productImage"
                        />
                        <IconButton
                          onClick={() => this.removeProduct(element)}
                          style={{ display: "block", margin: "auto" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <div className="text-side">
                        <p>{this.props.prods[element].title}</p>
                        <p>Цена за шт. {this.props.prods[element].price} руб</p>
                        <p>Количество: {this.props.prods[element].amount}</p>
                        <p>
                          Всего:{" "}
                          {this.props.prods[element].amount *
                            this.props.prods[element].price}{" "}
                          р
                        </p>
                      </div>
                      <div className="line"></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div><br />
          {this.props.prods.counter > 0 ? (
            <button className="buy-product">Совершить заказ</button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    prods: state.addItem,
    items: state.returnItems,
  }),
  (dispatch) => ({
    removeItemFromObject: (title) => {
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: title,
      });
    },
    removeItemFromList: (title) => {
      dispatch({
        type: "REMOVE_ITEM",
        payload: title,
      });
    },
    resetCounter: (numberToMinus) => {
      dispatch({
        type: "MODIFY_COUNTER",
        payload: numberToMinus,
      });
    },
  })
)(CartPage);
