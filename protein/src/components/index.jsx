import React from "react";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ComponentsHolder = () => {
  return (
    <div className="components-holder">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default ComponentsHolder;
