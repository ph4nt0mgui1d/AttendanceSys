import { UploadOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import Button from '@mui/material/Button';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import EmpTable from './EmpTable';
import './Navigation.css'
import { Desk } from '@mui/icons-material';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Admin', 'admin', <UserOutlined />),
  getItem('Status', 'status', <PieChartOutlined />),
  getItem('Employees', 'sub1', <UserOutlined />, [
    getItem('Employees List', 'list'),
    getItem('New Employee', 'form'),
    getItem('Attendance', 'attendance'),
  ]),
]

const Navigation = () => {
  const [current, setCurrent] = useState("list")
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='whole_page'>
      {/* Main nav */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar size={104} icon={<UserOutlined />} />
          </Space>
        </Space>

        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['sub1']}
          items={items}
        />
      </Sider>
      {/* Main Nav end  */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <div style={{display: 'flex'}}> */}
          {/* <h2>Attendance System</h2> */}
          <Button variant="contained" style={{ float: 'right', margin: '12px' }}>
            Admin
          </Button>
          {/* </div> */}
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              height: '87vh',
              background: colorBgContainer,
            }}
          >
            <EmpTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navigation;