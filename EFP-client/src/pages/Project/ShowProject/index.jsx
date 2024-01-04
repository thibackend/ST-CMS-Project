import React, { useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, DatePicker, Select, Spin } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import './ShowProject.css';
import { Link } from 'react-router-dom';

const ShowProject = () => {
  const [searchValue, setSearchValue] = useState('');
  const [spinning, setSpinning] = useState(false);

  const handleSearch = () => {
    showLoader();

    console.log('Searching for:', searchValue);

    setTimeout(() => {
      hideLoader();
    }, 1000); // Simulating a 2-second search operation
  };
  const showLoader = () => {
    setSpinning(true);
  };

  const hideLoader = () => {
    setSpinning(false);
  };

  const handleChange = (value) => {
    console.log(value);
  };

  const handleEdit = () => {
    //
  };

  const handleDelete = () => {
    //
  };

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
    width: 180,
  },
  {
    title: 'ManagerProject',
    dataIndex: 'ManagerProject',
    key: 'managerProject',
    ellipsis: true,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'description',
  },
  {
    title: 'Specification',
    dataIndex: 'Specification',
    key: 'specification',
    ellipsis: true,
  },
  {
    title: 'Technology',
    dataIndex: 'Technology',
    key: 'technology',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'status',
    ellipsis: true,
    render: (_, record) => (
      <Select 
      placeholder = 'Choose status'
        style={{
          width: 120,
        }}
        options={[
          {
            value: 'In Progress',
          },
          {
            value: 'Completed',
          }
        ]}
      />
    )
  },
  {
    title: 'StartDate',
    dataIndex: 'StartDate',
    key: 'startDate',
    ellipsis: true,
  },
  {
    title: 'EndDate',
    dataIndex: 'EndDate',
    key: 'endDate',
    ellipsis: true,
  },
  {
    title: 'Action',
    key: 'action',
    width: 180,
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleEdit()}>
          <Link to={'/projects/edit'}>
            Edit
          </Link>
        </Button>
        <Button type="danger" onClick={() => handleDelete()}>
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
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '02/01/2003', 
      EndDate: '06/01/2003', 
    },
    {
      key: '2',
      name: 'A Thi',
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '02/01/2003', 
      EndDate: '08/01/2003', 
    },
    {
      key: '3',
      name: 'Nguyen Huu Thang',
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '04/01/2003', 
      EndDate: '09/01/2003', 
    },
    {
      key: '4',
      name: 'Le Xuan',
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '05/01/2003', 
      EndDate: '09/01/2003', 
    },
    {
      key: '5',
      name: 'Phan Thi Thu Huong',
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '04/01/2003', 
      EndDate: '08/01/2003', 
    },
    {
      key: '6',
      name: 'Cao Tuyen',
      ManagerProject: 'Ho Van Di',
      Description: 'Project OutSource',
      Specification: 'this project must complete in 2 months',
      Technology: ['React JS', 'Ant Design', 'JavaScript'],
      Status: 'In progress',
      StartDate: '05/01/2003', 
      EndDate: '10/01/2003', 
    },
  ];

  return (
      <div className='row'>
        <div className='col-12'>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
  );
};

export default ShowProject;