import React, { Component } from "react";
import "./popup.scss";
import {connect } from 'react-redux'

class PhoneEmailPopup extends Component {
  constructor() {
    super();
    this.state = {
      numberInput: "",
      emailInput: "",
    };
  }

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
          <button>Отправить</button>

          <img onClick={() => this.props.modifyPopup('none')} src="/svg/close.svg" alt="close" />
        </div>
      </div>
    );
  }
}

export default connect()(PhoneEmailPopup);
