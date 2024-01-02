import React from 'react';
import './DataTable.css';
import { Button, Space, Table, Modal, Form, Input } from 'antd';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
    width: 260,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Gender',
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
      <Space size="middle">
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
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



const App = () => <Table columns={columns} dataSource={data} />;
export default App;