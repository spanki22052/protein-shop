import React, { useState, useEffect } from "react";
import "./product.scss";
import { connect } from "react-redux";

const ProductPage = ({ shopStore }) => {
  const [currentProduct, setProd] = useState([]);
  const currentUrl = window.location.href.split("/")[
    window.location.href.split("/").length - 1
  ];

  useEffect(() => {
    shopStore.products.map(
      (el) => el.productEngl === currentUrl && setProd(el)
    );
  });
  console.log(currentProduct);

  return (
    <>
      <div className="product-page">
        <h1>{currentProduct.title}</h1>
        <h2>{currentProduct.productDescription}</h2>
      </div>
    </>
  );
};

export default connect((state) => ({
  shopStore: state.shopStore,
}))(ProductPage);
