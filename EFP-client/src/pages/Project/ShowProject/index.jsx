import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'; 
import { Translation } from 'react-i18next';
import './ShowProject.css';
import api from '../../../services/API_REQ';

const ShowProject = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('/project').then(res => setProjects(res.data));
  }, []);


  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/project/${projectId}`);
      message.success("Deleted successfully");
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const columns = [
    {
      title: <Translation>{(t) => t('employees.name')}</Translation>,
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: <Translation>{(t) => t('projects.manager_project')}</Translation>,
      dataIndex: 'managerProject',
      key: 'managerProject',
      ellipsis: true,
    },
    {
      title: <Translation>{(t) => t('projects.description')}</Translation>,
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'Framework',
      dataIndex: 'langFrame',
      key: 'langFrame',
      ellipsis: true
    },
    {
      title: <Translation>{(t) => t('projects.technology')}</Translation>,
      dataIndex: 'technology',
      key: 'technology',
      ellipsis: true,
    },
    {
      title: <Translation>{(t) => t('projects.status')}</Translation>,
      dataIndex: 'status',
      key: 'status',
      ellipsis: true},
    {
      title: <Translation>{(t) => t('projects.start_date')}</Translation>,
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
    },
    {
      title: <Translation>{(t) => t('projects.end_date')}</Translation>,
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
    },
    {
      title: <Translation>{(t) => t('projects.action')}</Translation>,
      key: 'action',
      width: 180,
      render: (text, record) => (
        <span>
          <Link to={`/projects/edit/${record.id}`}> 
          <Button type="primary" style={{ marginRight: 8 }}>
            <EditOutlined />
          </Button>
        </Link>

          <Popconfirm
            title="Are you sure delete this project?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];


  return (
        
    <Table columns={columns} dataSource={projects} />
    
  );
};

export default ShowProject;