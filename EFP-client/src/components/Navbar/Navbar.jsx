    import React, { useState } from 'react'
    import {
    ProjectOutlined,
    PieChartOutlined,
    SettingOutlined,
    UserOutlined,
    } from '@ant-design/icons'
    import CMSLogo from '../../assets/images/CMSLogo.png'
    import { Layout, Menu } from 'antd'
    import { Link } from 'react-router-dom'
    const {Sider } = Layout

    const Navbar = () => {
        return (
            <Sider width={'15%'} theme="light" collapsedWidth="0">
                <div style={{ textAlign: 'center'}}>
                    <img src={CMSLogo} alt="" width={170} />
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <Link to="/employees">Employees</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ProjectOutlined />}>
                        <Link to="/projects">Projects</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                        <Link to="/setting">Setting</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    };

    export default Navbar;
