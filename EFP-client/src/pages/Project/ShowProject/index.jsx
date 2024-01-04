import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm } from 'antd';
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
      alert("Delete success")
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'Manager',
      dataIndex: 'managerProject.name',
      key: 'managerProject.name',
      ellipsis: true,
    },
    {
      title: 'Description',
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
      title: 'Technology',
      dataIndex: 'technology',
      key: 'technology',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true},
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (text, record) => (
        <span>
             <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => setSelectedProjectId(record.id)}
            >
              Edit
            </Button>

          <Popconfirm
            title="Are you sure delete this project?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
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