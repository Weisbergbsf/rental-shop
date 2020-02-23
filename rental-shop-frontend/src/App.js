import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import LayoutRentalShop from "./layouts/LayoutRentalShop";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LayoutRentalShop} />
      </Switch>
    </Router>
  );
}

export default App;
