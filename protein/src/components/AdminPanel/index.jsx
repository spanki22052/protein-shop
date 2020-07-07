import React, { Component } from "react";
import "./panel.scss";
import ProductsPopUp from "./ProductsPopUp";

const firebase = require("firebase");

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      currentSituation: "",
      category: "",
      currentProduct: "",
      categories: [],
      products: {},
      productTitle: "",
      productUrl: "",
      productPrice: "",
      feedbacks: {},
      numbersList: [],
      popUpHolder: "none",
      currentPopupProduct: {},
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/admin");
    });

    firebase
      .firestore()
      .collection("products")
      .doc("categories")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({
            categories: info.data().category,
            currentProduct: info.data().category[0],
          });
      });

    firebase
      .firestore()
      .collection("products")
      .doc("productsObject")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({ products: info.data() });
      });

    firebase
      .firestore()
      .collection("feedback")
      .doc("numbers")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({ feedbacks: info.data().numbers });
        for (var key in info.data().numbers) {
          this.setState({ numbersList: [...this.state.numbersList, key] });
        }
      });
  }

  sendCategoryToDb = (category, categories) => {
    let newCategories = [...categories, category];
    this.setState({ categories: newCategories });
    category.length > 0 &&
      firebase.firestore().collection("products").doc("categories").set({
        category: newCategories,
      });

    category.length > 0 && this.setState({ category: "" });
  };

  removeElementFromObject = (object, whatToRemove) => {
    let newObject = { ...object };

    this.setState({ feedbacks: newObject })

    delete newObject[whatToRemove];
      firebase.firestore().collection("feedback").doc("numbers").set({
        numbers: newObject,
      });

  };

  sendProductsToDb = (product, products, currentProduct) => {
    let newProducts = { ...products.products };
    let newProductsList =
      newProducts[currentProduct] !== undefined
        ? [...newProducts[currentProduct], product]
        : [product];
    newProducts[currentProduct] = newProductsList;

    this.setState({ products: newProducts });
    firebase.firestore().collection("products").doc("productsObject").set({
      products: newProducts,
    });

    this.setState({ productPrice: "", productTitle: "", productUrl: "" });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="admin-panel">
        <ProductsPopUp
          displayPopup={this.state.popUpHolder}
          modifyPopup={(mod) => this.setState({ popUpHolder: mod })}
          currentPopupProduct={this.state.currentPopupProduct}
        />
        <div className="admin-panel__padding">
          <h1>Админ панель</h1>
          <div className="buttons-holder">
            <button
              onClick={() => this.setState({ currentSituation: "category" })}
            >
              Добавить категорию
            </button>
            <button
              onClick={() => this.setState({ currentSituation: "product" })}
            >
              Добавить товар
            </button>
            <button
              onClick={() => this.setState({ currentSituation: "feedback" })}
            >
              Заказы
            </button>
          </div>
          {this.state.currentSituation === "category" && (
            <div className="panel-block">
              <div className="input-block">
                <p>Категория: </p>
                <input
                  value={this.state.category}
                  onChange={(e) => this.setState({ category: e.target.value })}
                  type="text"
                />
                <button
                  onClick={() =>
                    this.sendCategoryToDb(
                      this.state.category,
                      this.state.categories
                    )
                  }
                >
                  Добавить
                </button>
              </div>
            </div>
          )}
          {this.state.currentSituation === "product" && (
            <div className="panel-block">
              <div className="input-block">
                <p>Выберите категорию:</p>
                <select
                  id="selectBox"
                  onChange={(e) => {
                    this.setState({ currentProduct: e.target.value });
                  }}
                  value={this.state.currentProduct}
                >
                  {this.state.categories.map((element, index) => {
                    return <option key={index}>{element}</option>;
                  })}
                </select>
              </div>
              <div className="input-block">
                <p>Название товара: </p>
                <input
                  value={this.state.productTitle}
                  onChange={(e) =>
                    this.setState({ productTitle: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="input-block">
                <p>URL картинки товара: </p>
                <input
                  value={this.state.productUrl}
                  onChange={(e) =>
                    this.setState({ productUrl: e.target.value })
                  }
                  type="text"
                />
              </div>
              <div className="input-block">
                <p>Цена товара (за шт.): </p>
                <input
                  value={this.state.productPrice}
                  onChange={(e) =>
                    this.setState({ productPrice: e.target.value })
                  }
                  type="text"
                />
                <button
                  onClick={() =>
                    this.sendProductsToDb(
                      {
                        title: this.state.productTitle,
                        image: this.state.productUrl,
                        price: this.state.productPrice,
                      },
                      this.state.products,
                      this.state.currentProduct
                    )
                  }
                >
                  Добавить
                </button>
              </div>
            </div>
          )}
          {this.state.currentSituation === "feedback" && (
            <div className="panel-block">
              {this.state.numbersList.map((element, index) => {
                return (
                  <div key={index} className="number-blank">
                    <div className="left-side">
                      <p>Номер: {element}</p>
                      <p>Почта: {this.state.feedbacks[element].email}</p>
                    </div>
                    <div className="right-side">
                      <p>
                        Заказал:
                        {this.state.feedbacks[element].chooseProducts.counter}
                      </p>
                      <button
                        onClick={() =>
                          this.setState({
                            popUpHolder: "block",
                            currentPopupProduct: this.state.feedbacks[element]
                              .chooseProducts,
                          })
                        }
                      >
                        Просмотреть
                      </button>
                      <button
                        className="delbutton"
                        onClick={() =>
                          this.removeElementFromObject(
                            this.state.feedbacks,
                            element
                          )
                        }
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <a href="/">
            <span onClick={() => firebase.auth().signOut()}>
              Выход из админ панели
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
