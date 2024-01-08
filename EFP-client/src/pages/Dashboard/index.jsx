<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> c043d248a36602c5e0aca95ce853810a37e19e3d
import CardComponent from './Cards';
import { Row, Col } from 'antd';
import { TeamOutlined, ProjectOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { EmChartComponent, ProChartComponent } from './Charts';
<<<<<<< HEAD
import { useTranslation } from 'react-i18next'; // Import useTranslation
const Dashboard = () => {
  const { t } = useTranslation(); // Use useTranslation hook here

  return (
    <>
      <Row gutter={[10, 10]} style={{ minHeight: '35vh' }}>
        <Col span={6}>
          <CardComponent title={t('dashboard.dashboard')} count={154} icon={<TeamOutlined />} className="employee-card" />
        </Col>
        <Col span={6}>
          <CardComponent title={t('dashboard.all_managers')} count={9} icon={<UserOutlined />} className="manager-card" />
        </Col>
        <Col span={6}>
          <CardComponent title={t('dashboard.all_running_projects')} count={10} icon={<ProjectOutlined />} className="running-project-card" />
        </Col>
        <Col span={6}>
          <CardComponent title={t('dashboard.all_done_projects')} count={7} icon={<FileDoneOutlined />} className="done-project-card" />
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={13} style={{ background: '#ecf0f4', padding: '10px' }}>
          <EmChartComponent />
        </Col>
        <Col span={1}></Col>
        <Col span={10} style={{ background: '#ecf0f4', padding: '10px' }}>
          <ProChartComponent />
        </Col>
      </Row>
    </>
  );
};

=======
import api from '../../services/API_REQ';

const Dashboard = () => {
    const [employee, setEmployee] = useState(null);
    const [activeEmployees, setActiveEmployees] = useState(null);
    const [inActiveEmployees, setInActiveEmployees] = useState(null);
    const [project, setProject] = useState(null);
    const [managers, setManagers] = useState(null);

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
        await api.get('managers').then(res => {
            if (res.data.length) {
                setManagers(res.data.length);
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


    useEffect(() => {
        fetchEmployee();
        // fetchProject();
        // fetchManagers();
    }, []);
    return (
        <>
            <Row gutter={[10, 10]} style={{ minHeight: '35vh' }}>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title="All employees" count={employee ? employee.length : 0} icon={<TeamOutlined />} className="employee-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title="All managers" count={managers ? managers : 0} icon={<UserOutlined />} className="manager-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title="All running projects" count={project ? project : 0} icon={<ProjectOutlined />} className="running-project-card" />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <CardComponent title="All done projects" count={project ? project : 0} icon={<FileDoneOutlined />} className="done-project-card" />
                </Col>
            </Row>
            {console.log("render: ", activeEmployees && activeEmployees.length)}
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={13} style={{ background: '#ecf0f4', padding: '10px' }}>
                    <EmChartComponent activeEmployees={activeEmployees && activeEmployees.length} inActiveEmployees={inActiveEmployees && inActiveEmployees.length} />
                </Col>
                <Col xs={0} sm={0} md={1}></Col>
                <Col xs={24} sm={24} md={10} style={{ background: '#ecf0f4', padding: '10px' }}>
                    <ProChartComponent />
                </Col>
            </Row>
        </>
    );
};

>>>>>>> c043d248a36602c5e0aca95ce853810a37e19e3d
export default Dashboard;
