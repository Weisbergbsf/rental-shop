import React, { useState, useEffect } from "react";

import { Layout, Icon, Row, Col, Divider } from "antd";

const { Header, Content, Sider } = Layout;

const LayoutDefault = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
        theme="light"
        trigger={width <= 768 ? null : ""}
        collapsible
        collapsed={collapsed}
        collapsedWidth={width <= 768 ? "0" : "80"}
        breakpoint={"lg"}
        onBreakpoint={broken => {
          setCollapsed(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
          toggle();
        }}
      >
        <div className="logo">
          <a href="/">
            <h1>Loja de Aluguel</h1>
          </a>
        </div>
        <Divider style={{ margin: "0px 0px 10px" }} />
        {props.menu}
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            background: "#fff",
            padding: 0,
            zIndex: 1
          }}
        >
          <Row>
            <Col xl={8} lg={9} md={8} sm={8} xs={8}>
              <div className="trigger">
                <Icon
                  type={collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={toggle}
                />
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: 10,
            marginTop: 60
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDefault;
