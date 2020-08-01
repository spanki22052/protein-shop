import React, { useState } from "react";
import "./popup.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProductPopup = ({
  productsList,
  displaySet,
  displaySetFunction,
  prods,
  sendProduct,
}) => {
  console.log(prods);

  const addNewProduct = (title, price, image) => {
    let payload = {};

    prods.hasOwnProperty(title) === false
      ? (payload = {
          title: title,
          price: price,
          image: image,
          amount: 1,
        })
      : (payload = {
          title: title,
          price: price,
          image: image,
          amount: prods[title].amount + 1,
        });
    sendProduct(payload);
  };

  return (
    <div className="product-popup" style={{ display: displaySet }}>
      {productsList.length > 0 &&
        productsList.map((element, index) => {
          return (
            <div key={index} className="product-block">
              <Link to="/shop">
                <img
                  src={element.image}
                  onClick={() => displaySetFunction("none")}
                  alt=""
                />
              </Link>
              <h1>{element.title}</h1>
              <h2>{element.productDescription}</h2>
              <button
                onClick={() =>
                  addNewProduct(element.title, element.price, element.image)
                }
              >
                Добавить в корзину
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default connect(
  (state) => ({
    prods: state.addItem,
    items: state.returnItems,
    allItems: state.shopStore,
  }),
  (dispatch) => ({
    sendProduct: (payload) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload,
      });
    },
    sendProductToList: (payload) => {
      dispatch({
        type: "ADD_ITEM",
        payload,
      });
    },
  })
)(ProductPopup);
