import React, { Component } from "react";
import "./shop.scss";
import { connect } from "react-redux";

const firebase = require("firebase");

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
        let elementsCounter = 0;
        this.state.categories.map((element) => {
          elementsCounter += this.state.products[element].length;
          return element;
        });
        this.setState({
          productsCounter: elementsCounter,
        });
      });
  };

  changeFilter = (item) => {
    let elementsCounter = 0;
    this.setState({ productsFilter: item });
    item !== "all"
      ? (elementsCounter = this.state.products[item].length)
      : this.state.categories.map((element) => {
          elementsCounter += this.state.products[element].length;
          return element;
        });
    this.setState({
      productsCounter: elementsCounter,
    });
  };

  addNewProduct = (title, price, image) => {
    var payload = {};
    this.props.prods.hasOwnProperty(title) === false
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
          amount: this.props.prods[title].amount + 1,
        });
    this.props.sendProduct(payload);
    this.props.items.includes(title) === false &&
      this.props.sendProductToList(title);
  };

  render() {
    return (
      <div className="shop-page">
        <div className="shop-page__padding">
          <div className="shop-main">
            <div className="categories">
              <h1>Категории</h1>
              <div className="line"></div>
              {this.state.categories.map((element, index) => {
                return (
                  <h2 key={index} onClick={() => this.changeFilter(element)}>
                    {element.replace(element[0], element[0].toUpperCase())}
                  </h2>
                );
              })}
              <h2 onClick={() => this.changeFilter("all")}>
                {" "}
                Показать все...{" "}
              </h2>
            </div>
            <div className="all-products">
              <h1>Все результаты</h1>
              <p>{this.state.productsCounter} результатов</p>
              <div className="product-blocks">
                {this.state.productsFilter !== "all" &&
                  this.state.products[this.state.productsFilter].map(
                    (el, index) => {
                      return (
                        <div key={index} className="product-block">
                          <img src={el.image} alt="productimage" />
                          <button
                            onClick={() =>
                              this.addNewProduct(el.title, el.price)
                            }
                          >
                            Добавить в корзину
                          </button>
                          <h1>{el.title}</h1>
                          <h2>Цена: {el.price}</h2>
                        </div>
                      );
                    }
                  )}
                {this.state.productsFilter === "all" &&
                  this.state.products !== undefined &&
                  this.state.categories.map((element) => {
                    return this.state.products[element].map((el, index) => {
                      return (
                        <div key={index} className="product-block">
                          <img src={el.image} alt="productimage" />
                          <button
                            onClick={() =>
                              this.addNewProduct(el.title, el.price, el.image)
                            }
                          >
                            Добавить в корзину
                          </button>
                          <h1>{el.title}</h1>
                          <h2>Цена: {el.price}</h2>
                        </div>
                      );
                    });
                  })}
              </div>
            </div>
          </div>
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
)(ShopPage);
