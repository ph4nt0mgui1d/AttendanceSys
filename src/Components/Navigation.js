import {
  UploadOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar, Space } from "antd";
import Button from "@mui/material/Button";
import { Layout, Menu, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;
const Navigation = (props) => {
  const heading = {
    admin: "Dashboard",
    empList: "Employee Details",
    newform: "Add New Employee",
    status: "Status",
  };
  const location = useLocation().pathname;
  let fheading = location.slice(1);
  const [current, setCurrent] = useState("list");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navClickHandler = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout className="whole_page">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar
              size={104}
              style={{ marginBottom: "20px" }}
              icon={<UserOutlined />}
            />
          </Space>
        </Space>
        {/* Main nav start*/}
        <div className="logo" />
        <Menu
          onClick={navClickHandler}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[current]}
        >
          <Item key="admin" icon={<UserOutlined />}>
            <Link to={"/admin"}>Admin</Link>
          </Item>
          <Item key="status" icon={<PieChartOutlined />}>
            <Link to="/status">Status</Link>
          </Item>
          <Item key="list" icon={<UnorderedListOutlined />}>
            <Link to="/empList">Employees</Link>
          </Item>
          <SubMenu key="submenu" title="Employee action">
            <Item key="form" icon={<UploadOutlined />}>
              <Link to="/newform">New Employee</Link>
            </Item>
            <Item key="attendance" icon={<PieChartOutlined />}>
              <Link to="/attendance">Attendance</Link>
            </Item>
          </SubMenu>
        </Menu>
        {/* Main Nav end  */}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "22px", marginLeft: "20px" }}>
              {heading[fheading]}
            </span>
            <Button
              variant="contained"
              style={{ position: "absolute", right: "20px", top: "13px" }}
            >
              Log out
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              height: "87vh",
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navigation;
