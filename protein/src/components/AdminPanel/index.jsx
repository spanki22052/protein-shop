import React, { Component } from "react";
import "./panel.scss";

const firebase = require("firebase");

class AdminPanel extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="admin-panel">
        <div className="admin-panel__padding">
          <h1>Админ панель</h1>
          <div className="buttons-holder">
            <button>Добавить категорию</button>
            <button>Добавить товар</button>
            <button>Заказы</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
