import React, { Component } from "react";
import "./panel.scss";

const firebase = require("firebase");

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      currentSituation: "",
      category: "",
      categories: [],
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
          this.setState({ categories: info.data().category });
      });
  }

  sendCategoryToDb = (category, categories) => {
    console.log(categories)
    let newCategories = [...categories, category];
    this.setState({ categories: newCategories });
    category.length > 0 &&
      firebase.firestore().collection("products").doc("categories").set({
        category: newCategories,
      });

    category.length > 0 && this.setState({ category: "" });
  };

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
                <select>
                  <option>протеины</option>
                  <option>протеины</option>
                  <option>протеины</option>
                </select>
              </div>
              <div className="input-block">
                <p>Название товара: </p>
                <input type="text" />
              </div>
              <div className="input-block">
                <p>Описание товара: </p>
                <textarea type="text" />
              </div>
              <div className="input-block">
                <p>URL картинки товара: </p>
                <input type="text" />
              </div>
              <div className="input-block">
                <p>Цена товара (за шт.): </p>
                <input type="text" />
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
