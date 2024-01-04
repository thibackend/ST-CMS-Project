import React from 'react'
import CardComponent from './Cards';
import { Row, Col } from 'antd';
import { TeamOutlined, ProjectOutlined, UserOutlined, FileDoneOutlined} from '@ant-design/icons';
import {EmChartComponent, ProChartComponent } from './Charts';

const Dashboard = () => {
    return (
        <>
        <Row gutter={[10,10]} style={{minHeight: '35vh'}}> 
            <Col span={6}>
                <CardComponent title="All employees" count={154} icon={<TeamOutlined />} className="employee-card" />
            </Col>
            <Col span={6}>
                <CardComponent title="All managers" count={9} icon={<UserOutlined />} className="manager-card" />
            </Col>
            <Col span={6}>
                <CardComponent title="All running projects" count={10} icon={<ProjectOutlined />} className="running-project-card" />
            </Col>
            <Col span={6}>
                <CardComponent title="All done projects" count={7} icon={<FileDoneOutlined />} className="done-project-card" />
            </Col>
        </Row>
        <Row gutter={[10,10]}>
            <Col span={13} style={{background: '#ecf0f4', padding:'10px'}}>
                <EmChartComponent/>
            </Col>
            <Col span={1}></Col>
            <Col span={10} style={{background: '#ecf0f4', padding:'10px'}}>
                <ProChartComponent/>
            </Col>
        </Row>
        </>
    );
  };


export default Dashboard
