import React from "react";
import "./product.scss";

const ProductPage = () => {
  const currentUrl = window.location.href.split("/")[window.location.href.split('/').length-1   ];
  console.log(currentUrl);

  return (
    <div className="product-page">
      <h1>{currentUrl} page</h1>
    </div>
  );
};

export default ProductPage;
