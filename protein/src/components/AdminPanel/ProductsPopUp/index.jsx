import React, { Component } from "react";
import "./pop.scss";

class ProductsPopUp extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  getKeys = (someObject) => {
    let newList = [];
    for (var key in someObject) {
      newList = [...newList, key];
    }

    return newList;
  };

  render() {
    return (
      <div
        style={{ display: this.props.displayPopup }}
        className="products-popup"
      >
        <div className="products-popup__padding">
          {this.getKeys(this.props.currentPopupProduct).map(
            (element, index) => {
              return (
                element !== "counter" && (
                  <div key={index} className="product-block">
                    <div className="image-side">
                      <img
                        src={this.props.currentPopupProduct[element].image}
                        alt="productImage"
                      />
                    </div>
                    <div className="text-side">
                      <p>{this.props.currentPopupProduct[element].title}</p>
                      <p>
                        Цена за шт.{" "}
                        {this.props.currentPopupProduct[element].price} руб
                      </p>
                      <p>
                        Количество:{" "}
                        {this.props.currentPopupProduct[element].amount}
                      </p>
                      <p>
                        Всего:
                        {this.props.currentPopupProduct[element].amount *
                          this.props.currentPopupProduct[element].price}
                        р
                      </p>
                    </div>
                    <div className="line"></div>
                  </div>
                )
              );
            }
          )}

          <img
            className="closeIcon"
            style={{ cursor: "pointer" }}
            onClick={() => this.props.modifyPopup("none")}
            src="/svg/close.svg"
            alt="close"
          />
        </div>
      </div>
    );
  }
}

export default ProductsPopUp;
