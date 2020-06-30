import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/MainPage";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
