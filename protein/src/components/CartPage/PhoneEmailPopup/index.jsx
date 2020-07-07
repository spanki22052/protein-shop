import React, { Component } from "react";
import "./popup.scss";
import { connect } from "react-redux";

const firebase = require("firebase");

class PhoneEmailPopup extends Component {
  constructor() {
    super();
    this.state = {
      numberInput: "",
      emailInput: "",
      numbers: {},
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("feedback")
      .doc("numbers")
      .get()
      .then(async (info) => {
        (await info.data()) !== undefined &&
          this.setState({
            numbers: info.data().numbers,
          });
      });
  }
  sendDataToDB = (emailInput, numberInput) => {
    console.log(this.state.numbers);
    let number = {
      email: emailInput,
      phoneNumber: numberInput,
      chooseProducts: this.props.prods,
    };

    let allNumbers = {
      ...this.state.numbers,
    };

    allNumbers[numberInput] = number;

    emailInput.length > 9 &&
      numberInput.length > 9 &&
      firebase.firestore().collection("feedback").doc("numbers").set({
        numbers: allNumbers,
      });

    emailInput.length > 9 &&
      numberInput.length > 9 &&
      this.setState({ numberInput: "", emailInput: "" });

    emailInput.length > 9 &&
      numberInput.length > 9 &&
      this.props.removeAllObject();

    emailInput.length > 9 &&
      numberInput.length > 9 &&
      this.props.removeAllItems();
  };

  render() {
    return (
      <div style={{ display: this.props.displayPopup }} className="phone-popup">
        <div className="phone-popup__padding">
          <h1>Обратная связь</h1>
          <div className="input-block">
            <p>Номер:</p>
            <input
              value={this.state.numberInput}
              onChange={(e) => this.setState({ numberInput: e.target.value })}
              type="text"
            />
          </div>
          <div className="input-block">
            <p>Почта:</p>
            <input
              value={this.state.emailInput}
              onChange={(e) => this.setState({ emailInput: e.target.value })}
              type="text"
            />
          </div>
          <button
            onClick={() =>
              this.sendDataToDB(this.state.emailInput, this.state.numberInput)
            }
          >
            Отправить
          </button>

          <img
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

export default connect(
  (state) => ({
    prods: state.addItem,
  }),

  (dispatch) => ({
    removeAllItems: () => {
      dispatch({
        type: "EMPTY_ITEMS",
        payload: [],
      });
    },
    removeAllObject: () => {
      dispatch({
        type: "EMPTY_PRODUCTS",
        payload: { counter: 0 },
      });
    },
  })
)(PhoneEmailPopup);
