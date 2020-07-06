import React, { Component } from "react";
import "./panel.scss";

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
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
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

  sendProductsToDb = (product, products, currentProduct) => {
    let newProducts = { ...products };
    let newProductsList =
      products[currentProduct] !== undefined
        ? [...products[currentProduct], product]
        : [product];
    newProducts[currentProduct] = newProductsList;
    this.setState({ products: newProducts });
    product.title.length > 0 &&
      product.image.length > 0 &&
      product.price.length > 0 &&
      firebase.firestore().collection("products").doc("productsObject").set({
        products: newProducts,
      });

      this.setState({ productPrice: "", productTitle: "", productUrl: "" });
  };

  changeFunc() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    this.setState({ currentProduct: selectedValue });
  }

  render() {
    return (
      <div className="admin-panel">
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
                <select id="selectBox" onChange={() => this.changeFunc()}>
                  {this.state.categories.map((element, index) => {
                    return (
                      <option onClick={() => console.log(element)} key={index}>
                        {element}
                      </option>
                    );
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
              <h1>feedback page</h1>
            </div>
          )}

          <button className="submit-button">Подтвердить</button>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
