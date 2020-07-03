import React from "react";
import MainPage from "./MainPage";
import ShopPage from "./ShopPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ComponentsHolder = () => {
  return (
    <div className="components-holder">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/shop" component={ShopPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default ComponentsHolder;
