import React from "react";
import ReactDOM from "react-dom";
import ComponentsHolder from "./components";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./modules/store";

ReactDOM.render(
  <Provider store={store}>
    <ComponentsHolder />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
