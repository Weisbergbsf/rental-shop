import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutDefault from "./LayoutDefault";
import MenuRentalShop from "./MenuRentalShop";
import Page404 from "../views/PagesInfo/Page404";
import Dashboard from "../views/Dashboard";

import TypeItem from "../views/TypeItem";
import Item from "../views/Item";
import Customers from "../views/Customer/Customers";
import FormCustomer from "../views/Customer/FormCustomer";

const LayoutRentalShop = props => {
  return (
    <LayoutDefault menu={<MenuRentalShop />}>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>

        <Route path="/customers" exact>
          <Customers />
        </Route>

        <Route path="/customer" exact>
          <FormCustomer />
        </Route>

        <Route path="/edit-customer/:id" exact>
          <FormCustomer />
        </Route>

        <Route path="/type-items" exact>
          <TypeItem />
        </Route>

        <Route path="/items" exact>
          <Item />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>
    </LayoutDefault>
  );
};

export default LayoutRentalShop;
