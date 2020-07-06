import React, { Component } from "react";
import "./admin.scss";
const firebase = require("firebase");

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      emailInput: "",
      passwordInput: "",
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (_usr) this.props.history.push("/adminpanel");
    });
  }

  authAsAdmin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.props.history.push("/adminpanel");
          console.log("you are in");
        },
        (err) => {
          this.setState({ loginError: "Server error" });
          console.log(err);
        }
      );
  };

  render() {
    return (
      <div className="admin-page">
        <div className="admin-page__padding">
          <h1>Обратная связь</h1>
          <div className="input-block">
            <p>Почта:</p>
            <input
              value={this.state.emailInput}
              onChange={(e) => this.setState({ emailInput: e.target.value })}
              type="text"
            />
          </div>
          <div className="input-block">
            <p>Пароль:</p>
            <input
              value={this.state.passwordInput}
              onChange={(e) => this.setState({ passwordInput: e.target.value })}
              type="password"
            />
          </div>
          <button
            onClick={() =>
              this.authAsAdmin(this.state.emailInput, this.state.passwordInput)
            }
          >
            Отправить
          </button>
        </div>
      </div>
    );
  }
}

export default AdminPage;
