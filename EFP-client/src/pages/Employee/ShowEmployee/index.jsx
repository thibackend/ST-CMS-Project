import React from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ShowEmployee.css';
import { useState, useEffect } from 'react';
import api from '../../../services/API_REQ';

const ShowTable = () => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <img src={avatar} alt="avatar" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />,
      width: 185,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 260,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <span>
          <Link to={`/employees/edit/${record.id}`}>
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

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    api.get('/employee').then((res) => setEmployee(res.data));
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      message.success('Deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={employee}
      bordered={true}
      pagination={{ position: ['bottomRight'] }}
    />
  );
};

export default ShowTable;
