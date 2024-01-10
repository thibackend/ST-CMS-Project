import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import CMSLogo from '../assets/images/CMSLogo.png';
import CMSLogoSmall from '../assets/images/CMSLogoSmall.png';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, theme, Col, Row, Select, Drawer } from 'antd';
import BreadcrumbCom from './Breadcrumb';
import AppRoutes from '../Routers/Routers';
import AvatarComponent from '../components/Avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/i18n';
import i18next from 'i18next';
import { useTranslation, withTranslation } from 'react-i18next';


const { Header, Sider, Content } = Layout;



const MainLayout = ({ handleCookieDataAdmin }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isLaptopScreen, setIsLaptopScreen] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (lang) => {
    i18next.changeLanguage(lang);
  };

  const toggleDrawer = () => {
    console.log("Toggle Drawer");
    setDrawerVisible(!drawerVisible);
  };

  const handleResize = () => {
    setIsLaptopScreen(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isLaptopScreen && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          visible={drawerVisible}
          width={200}
          bodyStyle={{ padding: 0 }}
        >
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
        </Drawer>
        )}

      {isLaptopScreen && (
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light" width={'18%'}>
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
      )}

      <Layout>
        <Header style={{ background: '#ecf0f4', padding: '0 15px 0 0  ' }}>
          <Row justify="space-between" align={'middle'}>
            <Col>
              {!isLaptopScreen && (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => toggleDrawer()}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
              )}
              {isLaptopScreen && (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
              )}
            </Col>
            <Col>
              <Select
                defaultValue="English"
                style={{ width: 140, marginRight: 16}}
                options={[
                  {
                    value: 'English', label: <Row onClick={() => handleClick('en')} >
                      <Col span={6}>
                        <img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" alt="" style={{ width: 25, textAlign: 'center' }} />
                      </Col>
                      <Col span={18}>
                        English
                      </Col>
                    </Row>
                  },
                  {
                    value: 'Vietnamese', label: <Row onClick={() => handleClick('vn')}>
                      <Col span={6}>
                        <img src="https://flagdownload.com/wp-content/uploads/Flag_of_Vietnam_Flat_Round-2048x2048.png" alt="" style={{ width: 25, textAlign: 'center' }} />
                      </Col>
                      <Col span={18}>
                        Vietnamese
                      </Col>
                    </Row>
                  },
                ]}
              />
              <Button >
                <LogoutOutlined />
              </Button>
            </Col>
          </Row>
        </Header>
        <BreadcrumbCom />
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: '100vh', background: '#ecf0f4' }}>
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};
export default withTranslation()(MainLayout);