import React from "react";
import MainPage from "./MainPage";
import ShopPage from "./ShopPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartPage from "./CartPage";
import NavbarComponent from "./NavbarComponent";
import AdminPage from "./AdminPage";
const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyAB95MRp5RIEaGZSHBolpUnCy-E8o7wJPQ",
  authDomain: "protein-shop.firebaseapp.com",
  databaseURL: "https://protein-shop.firebaseio.com",
  projectId: "protein-shop",
  storageBucket: "protein-shop.appspot.com",
  messagingSenderId: "490628384072",
  appId: "1:490628384072:web:ca0c5df1b08378e42edf7d",
  measurementId: "G-LH88BBP23M",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ComponentsHolder = () => {
  return (
    <Router>
      <div className="components-holder">
          <NavbarComponent />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default ComponentsHolder;
