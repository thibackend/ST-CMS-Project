import React from 'react';
import { Button, Space, Table, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';
import './ShowEmployee.css'
const handleEdit = () => {
}

const columns = [
  {
    title: <Translation>{(t) => t('employees.employees')}</Translation>,
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
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
    key: 'address 1',
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
      <Space size="middle">
        <Button type="primary" onClick={() => handleEdit()}>
          <Link to={'/employees/edit'}>
            <EditOutlined />
          </Link>
        </Button>
        <Button type="danger" onClick={() => handleDelete()}>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Ho Van Di',
    age: 20,
    address: 'Quang Tri City',
    gender: 'Male',
    email: 'dipro68@.com',
    position: 'Dev',
  },
  {
    key: '2',
    name: 'Phan Thi Thu Huong',
    age: 20,
    address: 'Quang Binh City',
    gender: 'Female',
    email: 'huong222@.com',
    position: 'Tester',
  },
  {
    key: '3',
    name: 'Nguyen Huu Thang',
    age: 20,
    address: 'Quang Binh City',
    gender: 'Male',
    email: 'thangdeptrai68@.com',
    position: 'Dev',
  },
  {
    key: '4',
    name: 'Le Xuan',
    age: 20,
    address: 'Da Nang City',
    gender: 'Male',
    email: 'xuanhaybuon@.com',
    position: 'Dev',
  },
  {
    key: '5',
    name: 'Ho Xuan Ty',
    age: 21,
    address: 'Kon Tum City',
    gender: 'Male',
    email: 'tivippro@.com',
    position: 'Dev',
  },
  {
    key: '6',
    name: 'Cao Tuyen',
    age: 22,
    address: 'Khanh Hoa City',
    gender: 'Male',
    email: 'tuyenerror@.com',
    position: 'Photograper',
  },
];



const ShowTable = () => <Table className="custom-table" columns={columns} dataSource={data} bordered={true} pagination={{ position: ['bottomRight'] }} />;
export default ShowTable;