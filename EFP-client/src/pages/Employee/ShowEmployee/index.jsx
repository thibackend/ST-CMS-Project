import React from 'react';
import { Button, Table, Popconfirm, message} from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';
import './ShowEmployee.css'
import { useState, useEffect } from 'react';
import api from '../../../services/API_REQ';

const ShowTable = () =>{
const columns = [
  {
    title: <Translation>{(t) => t('employees.employees')}</Translation>,
    dataIndex: 'name',
    key: 'name',
    width: 260,
  },
  {
    title: <Translation>{(t) => t('employees.age')}</Translation>,
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: <Translation>{(t) => t('employees.address')}</Translation>,
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
  {
    title: <Translation>{(t) => t('employees.gender')}</Translation>,
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
  {
    title: <Translation>{(t) => t('employees.position')}</Translation>,
    dataIndex: 'position',
    key: 'position',
    ellipsis: true,
  },
  {
    title:<Translation>{(t) => t('employees.action')}</Translation>,
    key: 'action',
    width: 180,
    render: (_, record) => (
      <span>
          <Link to={`/employees/edit/${record.id}`}> 
          <Button type="primary" style={{ marginRight: 8 }}>
           <EditOutlined/>
          </Button>
        </Link>

          <Popconfirm
            title="Are you sure delete this project?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" >
              <DeleteOutlined/>
            </Button>
          </Popconfirm>
        </span>
    ),
  },
];

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    api.get('/employee').then(res => setEmployee(res.data));
  }, [employee]);


  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      message.success("Deleted successfully");
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  const handleEdit = () => {
  
  }
  

  return (
    <Table className="custom-table" columns={columns} dataSource={employee} bordered={true} pagination={{ position: ['bottomRight'] }} />
  )
} 
export default ShowTable;