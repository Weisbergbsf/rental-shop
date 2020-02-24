import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "antd/dist/antd.css";
import LayoutRentalShop from "./layouts/LayoutRentalShop";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={LayoutRentalShop} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
