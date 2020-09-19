import React from "react";
import ReactDOM from "react-dom";
import ComponentsHolder from "./components";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./modules/store";

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ComponentsHolder />
		</Provider>
	</Router>,
	document.getElementById("root")
);

serviceWorker.unregister();
