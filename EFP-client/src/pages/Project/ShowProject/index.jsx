import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; 
import './ShowProject.css';
import api from '../../../services/API_REQ';

const ShowProject = () => {
  const {t} = useTranslation();
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
      title: t('projects.name'),
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: t('projects.manager_project'),
      dataIndex: 'managerProject',
      key: 'managerProject',
      ellipsis: true,
    },
    {
      title:t('projects.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('projects.technology'),
      dataIndex: 'technology',
      key: 'technology',
      ellipsis: true,
    },
    {
      title: t('projects.status'),
      dataIndex: 'status',
      key: 'status',
      ellipsis: true},
    {
      title: t('projects.start_date'),
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
    },
    {
      title: t('projects.end_date'),
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
    },
    {
      title: t('projects.action'),
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