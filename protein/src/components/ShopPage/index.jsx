import React, { Component } from "react";
import "./shop.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const firebase = require("firebase");

class ShopPage extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: {},
      productsFilter: "all",
      productsCounter: 0,
      isAdmin: false,
      active: "",
      choosedCategory: "Все результаты",
    };
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (_usr) this.setState({ isAdmin: true });
      else this.setState({ isAdmin: false });
    });

    firebase
      .firestore()
      .collection("products")
      .doc("categories")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({ categories: info.data().category });
      });

    firebase
      .firestore()
      .collection("products")
      .doc("productsObject")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({ products: info.data().products });
        let elementsCounter = 0;
        this.state.categories.map((element) => {
          elementsCounter +=
            this.state.products[element] !== undefined
              ? this.state.products[element].length
              : 0;
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
          elementsCounter +=
            this.state.products[element] !== undefined
              ? this.state.products[element].length
              : 0;
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
          amountInput: 1,
        })
      : (payload = {
          title: title,
          price: price,
          image: image,
          amount: this.props.prods[title].amount + 1,
          amountInput: 1,
        });
    this.props.sendProduct(payload);
    this.props.items.includes(title) === false &&
      this.props.sendProductToList(title);
  };

  removeProductFromDb = (products, currentCategory, currentCategoryIndex) => {
    let newProducts = { ...products };
    newProducts[currentCategory].splice(currentCategoryIndex, 1);

    this.setState({ products: newProducts });
    firebase.firestore().collection("products").doc("productsObject").set({
      products: newProducts,
    });
  };

  activeCorrectFilter = (event) => {};

  render() {
    const hexObject = {
      "В НАЛИЧИИ": "none",
      "СКИДКА 10%": "#EC2929",
      "ПРЕДЗАКАЗ": "#265ECB",
      "НЕТ В НАЛИЧИИ": "#BCBCBC",
    };

    return (
      <div className="shop-page">
        <div className="shop-page__padding">
          <div className="shop-main">
            <div className="categories">
              <h1>Категории</h1>
              <div className="line"></div>
              {this.state.categories.length > 0 &&
                Object.keys(this.state.products).length > 0 &&
                this.state.categories.map((element, index) => {
                  return (
                    this.state.products[element] !== undefined &&
                    this.state.products[element].length > 0 && (
                      <h2
                        key={index}
                        id={index}
                        onClick={() => {
                          this.changeFilter(element);
                          this.setState({
                            active: index,
                            choosedCategory:
                              element[0].toUpperCase() + element.substring(1),
                          });
                        }}
                        className={
                          "" + (this.state.active === index ? "active" : "")
                        }
                      >
                        {element.replace(element[0], element[0].toUpperCase())}
                      </h2>
                    )
                  );
                })}
              <h2
                id="all"
                className={"" + (this.state.active === "all" ? "active" : "")}
                onClick={() => {
                  this.setState({
                    active: "all",
                    choosedCategory: "Все результаты",
                  });
                  this.changeFilter("all");
                }}
              >
                Показать все...
              </h2>
            </div>
            <div className="all-products">
              <h1>{this.state.choosedCategory}</h1>
              <p>{this.state.productsCounter} результата (ов)</p>
              <div className="product-blocks">
                {this.state.productsFilter !== "all" &&
                  this.state.products[this.state.productsFilter].map(
                    (el, index) => {
                      return (
                        <div key={index} className="product-block">
                          {this.state.isAdmin === true && (
                            <button
                              onClick={() =>
                                this.removeProductFromDb(
                                  this.state.products,
                                  this.state.productsFilter,
                                  index
                                )
                              }
                            >
                              Удалить
                            </button>
                          )}
                          <img src={el.image} alt="productimage" />
                          <button
                            onClick={() =>
                              this.addNewProduct(el.title, el.price, el.image)
                            }
                          >
                            Добавить в корзину
                          </button>
                          <div
                            className="badge"
                            style={{
                              color: "white",
                              padding: "5px",
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              borderRadius: "20px",
                              width: "110px",
                              height: "25px",
                              backgroundColor: hexObject[el.productBadge],
                            }}
                          >
                            {el.productBadge}
                          </div>

                          <Link to={`/product/${el.productEngl}`}>
                            <h1>{el.title}</h1>
                          </Link>
                          <h2>Цена: {el.price}р</h2>
                        </div>
                      );
                    }
                  )}
                {this.state.productsFilter === "all" &&
                  this.state.categories.length > 0 &&
                  Object.keys(this.state.products).length > 0 &&
                  this.state.categories.map((element) => {
                    return (
                      this.state.products[element] !== undefined &&
                      this.state.products[element].map((el, index) => {
                        return (
                          <div key={index} className="product-block">
                            <div
                              className="badge"
                              style={{
                                color: "white",
                                padding: "5px",
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                borderRadius: "20px",
                                width: "110px",
                                height: "25px",
                                backgroundColor: hexObject[el.productBadge],
                                display: hexObject[el.productBadge],
                              }}
                            >
                              {el.productBadge}
                            </div>
                            {this.state.isAdmin === true && (
                              <button
                                onClick={() =>
                                  this.removeProductFromDb(
                                    this.state.products,
                                    element,
                                    index
                                  )
                                }
                              >
                                Удалить
                              </button>
                            )}
                            <img src={el.image} alt="productimage" />
                            <button
                              onClick={() =>
                                this.addNewProduct(el.title, el.price, el.image)
                              }
                            >
                              Добавить в корзину
                            </button>
                            <Link to={`/product/${el.productEngl}`}>
                              <h1>{el.title}</h1>
                            </Link>
                            <h2>Цена: {el.price}р</h2>
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
