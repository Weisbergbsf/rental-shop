import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutDefault from "./LayoutDefault";
import MenuRentalShop from "./MenuRentalShop";
import Page404 from "../views/PagesInfo/Page404";
import Dashboard from "../views/Dashboard";

import TypeItem from "../views/TypeItem/TypeItem";
import Item from "../views/Item/Item";
import Customers from "../views/Customer/Customers";
import FormCustomer from "../views/Customer/FormCustomer";
import FormTypeItem from "../views/TypeItem/FormTypeItem";
import FormItem from "../views/Item/FormItem";
import Contracts from "../views/Contracts/Contracts";
import FormContract from "../views/Contracts/FormContract";

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

        <Route path="/contracts" exact>
          <Contracts />
        </Route>

        <Route path="/contract" exact>
          <FormContract />
        </Route>

        <Route path="/edit-contract/:id" exact>
          <FormContract />
        </Route>

        <Route path="/type-items" exact>
          <TypeItem />
        </Route>

        <Route path="/type-item" exact>
          <FormTypeItem />
        </Route>

        <Route path="/edit-type-item/:id" exact>
          <FormTypeItem />
        </Route>

        <Route path="/items" exact>
          <Item />
        </Route>

        <Route path="/item" exact>
          <FormItem />
        </Route>

        <Route path="/edit-item/:id" exact>
          <FormItem />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>
    </LayoutDefault>
  );
};

export default LayoutRentalShop;
