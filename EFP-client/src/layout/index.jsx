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
import { Layout, Menu, Button, theme, Col, Row, Select, Radio } from 'antd';
import BreadcrumbCom from './Breadcrumb';
import AppRoutes from '../Routers/Routers';
import AvatarComponent from '../components/Avatar'
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/i18n'
import i18next from 'i18next';
import { useTranslation, withTranslation } from 'react-i18next';
import i18n from '../components/i18n';
// import { use } from 'i18next';
// import i18n  from '../components/i18n/Translation/en.json';
// import i18n  from '../components/i18n/Translation/vn.json';

const { Header, Sider, Content } = Layout;

const MainLayout = (handleCookieDataAdmin) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (lang) => {
    i18next.changeLanguage(lang);
  };

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };
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
        <Menu theme="light" mode="inline" selectedKeys={[currentPath]}>
          <Menu.Item key="/" icon={<DashboardOutlined />}>
            <Link to="/">{t('dashboard.dashboard')}</Link>
          </Menu.Item>
          <Menu.Item key="/employees" icon={<UserOutlined />}>
            <Link to="/employees">{t('employees.employees')}</Link>
          </Menu.Item>
          <Menu.Item key="/projects" icon={<ProjectOutlined />}>
            <Link to="projects">{t('projects.manager_project')}</Link>
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
            <Row span={4}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </Row>
            <Row span={16}>
            </Row>
         
            <Row span={4}>
              <Select
                defaultValue="English"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: 'English',
                    label: (
                      <p onClick={() => handleClick('en')}>
                        English
                      </p>
                    ),
                  },
                  {
                    value: 'Vietnamese',
                    label: (
                      <p onClick={() => handleClick('vn')}>
                        VietNamese
                      </p>
                    ),
                  },
                ]}
              />
              <AvatarComponent imageUrl={'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4'} />
            </Row>
          </Row>

        </Header>
        <BreadcrumbCom />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
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
export default withTranslation()(MainLayout);