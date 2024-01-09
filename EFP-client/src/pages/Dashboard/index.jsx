import React from 'react'
import CardComponent from './Cards';
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { TeamOutlined, ProjectOutlined, UserOutlined, FileDoneOutlined  } from '@ant-design/icons';
import {  EmChartComponent, ProChartComponent } from './Charts';
import { useTranslation } from 'react-i18next';
import api from '../../services/API_REQ';

const Dashboard = () => {
    const {t} = useTranslation();
    const [employee, setEmployee] = useState(null);
    const [activeEmployees, setActiveEmployees] = useState(null);
    const [inActiveEmployees, setInActiveEmployees] = useState(null);
    const [project, setProject] = useState(null);
    const [projectRuning, setProjectRunning] = useState(null);
    const [projectDone, setProjectDone] = useState(null);
    const [managers, setManagers] = useState(0);

    const handleSetProjectRunning = (num) => setProjectRunning(num);
    const handleSetProjectDone = (num) => setProjectDone(num);

    const fetchEmployee = async () => {
        await api.get('employee').then(res => {
            if (res.data.length > 0) {
                setEmployee(res.data);
            }
        })
    }

    const fetchProject = async () => {
        await api.get('project').then(res => {
            if (res.data.length) {
                setProject(res.data.length);
            }
        })
    }
    const fetchManagers = async () => {
        await api.get('employee/managers').then(res => {
            if (res) {
                setManagers(res);

            }
        })
    }
    useEffect(() => {
        if (employee && employee.length > 0) {
            const activeEmployeesData = employee.filter(employee => employee.status === 'active');
            const inActiveEmployeesData = employee.filter(employee => employee.status === 'inactive');
            if (activeEmployeesData) {
                console.log("ActiveEmployeesData: ", activeEmployeesData);
                setActiveEmployees(activeEmployeesData);
            }

            if (inActiveEmployeesData) {
                console.log("inActiveEmployeesData: ", inActiveEmployeesData);
                setInActiveEmployees(inActiveEmployeesData);
            }
        }
    }, [employee])

    console.log('manager', managers)
    useEffect(() => {
        fetchEmployee();
        fetchProject();
        fetchManagers();
    }, []);
    return (
        <>
            <Row gutter={[10, 10]} style={{ minHeight: '35vh' }}>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title={t('dashboard.all_employees')} count={employee ? employee.length : 0} icon={<TeamOutlined />} className="employee-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title={t('dashboard.all_managers')} count={managers ? managers.length : 0} icon={<UserOutlined />} className="manager-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title={t('dashboard.all_running_projects')} count={projectRuning ? projectRuning : 0} icon={<ProjectOutlined />} className="running-project-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title={t('dashboard.all_done_projects')} count={projectDone ? projectDone : 0} icon={<FileDoneOutlined />} className="done-project-card" />
                </Col>
            </Row>
            {console.log("render: ", activeEmployees && activeEmployees.length)}
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={13} style={{ background: '#ecf0f4', padding: '10px' }}>
                    <EmChartComponent activeEmployees={activeEmployees && activeEmployees.length} inActiveEmployees={inActiveEmployees && inActiveEmployees.length} />
                </Col>
                <Col xs={0} sm={0} md={1}></Col>
                <Col xs={24} sm={24} md={10} style={{ background: '#ecf0f4', padding: '10px' }}>
                    <ProChartComponent handleSetProjectRunning={handleSetProjectRunning} handleSetProjectDone={handleSetProjectDone} />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
