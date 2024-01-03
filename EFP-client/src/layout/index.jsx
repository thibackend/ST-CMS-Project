import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import CMSLogo from '../assets/images/CMSLogo.png'
import CMSLogoSmall from '../assets/images/CMSLogoSmall.png'
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, theme, Col, Row, Select } from 'antd';
import BreadcrumbCom from './Breadcrumb';
import AppRoutes from '../Routers/Routers';
import AvatarComponent from '../components/Avatar'
const { Header, Sider, Content } = Layout;

const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ background: '#ecf0f4' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <div style={{ textAlign: 'center' }} className="demo-logo-vertical">
          {!collapsed ? (
            <img src={CMSLogo} alt="" width={170} />
          ) : (
            <img src={CMSLogoSmall} alt="" width={70} />
          )}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/employees">Employees</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProjectOutlined />}>
            <Link to="/projects">Projects</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col span={2}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={18}></Col>
            <Col span={4} >
              <Select
                defaultValue="English"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: 'Vietnamese',
                    label: 'Vietnamese',
                  }
                ]}
              />
              <AvatarComponent imageUrl={'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4'} />
            </Col>
          </Row>

        </Header>
        <BreadcrumbCom />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;