import React, { useState, useEffect } from "react";
import "./product.scss";
import { connect } from "react-redux";
import Footer from "../Footer";

const ProductPage = ({
  shopStore,
  sendProduct,
  prods,
  items,
  sendProductToList,
}) => {
  const [currentProduct, setProd] = useState([]);
  const [amountInput, setAmount] = useState("1");
  const currentUrl = window.location.href.split("/")[
    window.location.href.split("/").length - 1
  ];

  useEffect(() => {
    shopStore.products.map(
      (el) => el.productEngl === currentUrl && setProd(el)
    );
  });

  const hexObject = {
    "В НАЛИЧИИ": "none",
    "СКИДКА 10%": "#EC2929",
    ПРЕДЗАКАЗ: "#265ECB",
    "НЕТ В НАЛИЧИИ": "#BCBCBC",
  };

  const addNewProduct = (title, price, image) => {
    var payload = {};
    prods.hasOwnProperty(title) === false
      ? (payload = {
          title: title,
          price: price,
          image: image,
          amountInput: parseInt(amountInput),
          amount: parseInt(amountInput),
        })
      : (payload = {
          title: title,
          price: price,
          image: image,
          amountInput: parseInt(amountInput),
          amount: prods[title].amount + parseInt(amountInput),
        });
    sendProduct(payload);
    setAmount("1");
    items.includes(title) === false && sendProductToList(title);
  };

  return (
    <>
      {/* <div className="product-page">
				<h1>{currentProduct.title}</h1>
				<h2>{currentProduct.productDescription}</h2>
			</div> */}
      <div className="product-page">
        <div className="image-holder">
          <div
            className="badge"
            style={{
              backgroundColor: hexObject[currentProduct.productBadge],
              display: hexObject[currentProduct.productBadge],
            }}
          >
            {currentProduct.productBadge}
          </div>
          <img
            src={currentProduct.image}
            className="product-photo"
            alt="productImage"
          ></img>
        </div>

        <div className="product-info">
          <div className="product-title">{currentProduct.title}</div>
          <div className="product-suptitle">
            {currentProduct.productDescription}
          </div>
          <div className="product-price">
            {currentProduct.productBadge === "СКИДКА 10%" && (
              <span>
                {parseInt(currentProduct.price) +
                  parseInt(currentProduct.price) * 0.1}
              </span>
            )}
            {currentProduct.price}
            руб
          </div>
          <div className="product-quantity">
            <button
              className="remove-product"
              onClick={() => {
                parseInt(amountInput) > 1 &&
                  setAmount(parseInt(amountInput) - 1);
              }}
            >
              -
            </button>
            <input
              className="product-number"
              value={amountInput}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="add-product"
              onClick={() => {
                setAmount(parseInt(amountInput) + 1);
              }}
            >
              +
            </button>
          </div>
          <div
            className="product-add"
            onClick={() =>
              addNewProduct(
                currentProduct.title,
                currentProduct.price,
                currentProduct.image
              )
            }
          >
            Добавить в корзину
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default connect(
  (state) => ({
    shopStore: state.shopStore,
    prods: state.addItem,
    items: state.returnItems,
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
)(ProductPage);
