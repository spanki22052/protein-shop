import React from "react";
import ReactDOM from "react-dom";
import ComponentsHolder from "./components";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ComponentsHolder />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
