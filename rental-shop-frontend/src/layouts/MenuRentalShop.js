import React from "react";
import { Link } from "react-router-dom";

import { Menu, Icon } from "antd";

const MenuRentalShop = () => {
  return (
    <div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Icon type="dashboard" style={{ fontSize: 20 }} />
          <span>Dashboard</span>
          <Link to="/" />
        </Menu.Item>

        <Menu.Item key="2">
          <Icon type="user" style={{ fontSize: 20 }} />
          <span>Clientes</span>
          <Link to="/customers" />
        </Menu.Item>

        <Menu.Item key="3">
          <Icon type="snippets" style={{ fontSize: 20 }} />
          <span>Contrato de Itens</span>
          <Link to="/contracts" />
        </Menu.Item>

        <Menu.Item key="4">
          <Icon type="tag" style={{ fontSize: 20 }} />
          <span>Tipo de item</span>
          <Link to="/type-items" />
        </Menu.Item>

        <Menu.Item key="5">
          <Icon type="inbox" style={{ fontSize: 20 }} />
          <span>Itens</span>
          <Link to="/items" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuRentalShop;
