import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './ShowProject.css';
import { Avatar, Button, Dropdown, Popconfirm, Space, Table, Tooltip, message } from 'antd';
import { Tag } from "antd";
import moment from "moment";
import debounce from 'lodash/debounce';
import api from '../../../services/API_REQ';
import ShowProjectHeader from "./ShowProjectHeader";

import { AntDesignOutlined, DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ShowProject = () => {
  const { t } = useTranslation();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [showAllTech, setShowAllTech] = useState(false);
  const [search, setSearch] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [hoverRowId, setHoverRowId] = useState('');

  const handleSearch = debounce((text) => setSearch(text), 500);
  const handleSearchManager = (text) => setSearchManager(text);
  const handleDelete = async (id) => {
    setLoading(true);
    await api.delete(`project/${id}`)
      .then(() => {
        setLoading(false),
          message.success(t('projects.delete_success'))
      });
    fetchDataProject();
  }
  const handlesetShowAllTech = debounce((value) => setShowAllTech(value), 500);
  const TechnologyColumns =
  {
    title: t('projects.technology'),
    dataIndex: 'langFrame',
    key: 'id',
    ellipsis: true,
    width: 200,
    render: (technology, record) => {
      console.log("technology", technology);
      return <Avatar.Group
        maxCount={2}
        style={{ padding: 5, gap: 10 }}
      >
        {
          technology?.map((tech, index, array) => {
            return (
              <Tooltip key={`id_${index}`} title={tech} placement="top">
                <Avatar size="large" style={{ backgroundColor: '#1677ff', fontSize: "0.5em", width: 60, borderRadius: 10 }} key={`index_${index}`}>{tech}</Avatar>
              </Tooltip>
            )
          })
        }
      </Avatar.Group>
    }
  };
  const columns =
    [
      {
        title: t('projects.name'),
        dataIndex: 'name',
        key: 'name',
        // ellipsis: true,
      },
      {
        title: t('projects.manager_project'),
        dataIndex: 'managerProject',
        key: 'manager',
        ellipsis: true,
        render: (manager, record) => (
          <Link>{manager?.name}</Link>
        )
      },
      TechnologyColumns,
      {
        title: t('projects.members'),
        dataIndex: 'employee_project',
        key: 'description',
        render: (employee_project, record) => {
          return (
            <Avatar.Group
              maxCount={3}
              maxStyle={{
                color: 'black',
                backgroundColor: '#fde3cf',
              }}
            >
              {
                employee_project?.map((em, index) =>
                  <Link to={`/employees/edit/${em.employeeId}`}>
                    <Tooltip key={`id_${index}`} title={em.employee.name} placement="top">
                      <Avatar
                        src={em.employee.avatar}
                        alt="User avatar"
                      />
                    </Tooltip>
                  </Link>
                )
              }
            </Avatar.Group>
          )
        }
      },
      {
        title: t('projects.status'),
        dataIndex: 'status',
        key: 'status',
        ellipsis: true,
        width: 100,
        render: (text, status) => {
          return (
            <Tag color={status.status === 'closed' ? 'green' : 'yellow'}>
            {status.status === 'closed' ? 'done' : status.status}
          </Tag>
          );
        }
      },
      {
        title: t('projects.start_date'),
        dataIndex: 'startDate',
        key: 'startDate',
        ellipsis: true,
        width: 100,
        render: startDate => <p>{moment(startDate).format('DD-MM-YYYY')}</p>
      },
      {
        title: t('projects.end_date'),
        dataIndex: 'endDate',
        key: 'endDate',
        ellipsis: true,
        width: 100,
        render: endDate => <p>{moment(endDate).format('DD-MM-YYYY')}</p>
      }
      , {
        title: t('projects.action'),
        dataIndex: 'action',
        key: 'action',
        ellipsis: true,
        width: 130,
        render: (text, record) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row', rowGap: 10 }}>
              <Link to={`/projects/${record.id}`}>
                <Button type="primary" shape="round" icon={<EyeOutlined />} size={'small'}>
                </Button>
              </Link>

              <Popconfirm
                title={t('employees.confirm')}
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >


                <Button type="danger" shape="round" icon={<DeleteOutlined />} size={'small'}>
                </Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ];


  const fetchDataProject = async () => {
    setLoading(true);
    await api.get('project').then(
      res => {
        setDataSource(res?.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            pageSize: res.meta.take,
            total: res.meta.itemCount,
          },
        });
      }
    )
  }
  const handleSearchData = async (textSearch) => {
    setLoading(true);
    await api.get('project', { search: textSearch })
      .then(res => {
        setDataSource(res?.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            pageSize: res.meta.take,
            total: res.meta.itemCount,
          },
        });
        console.log("res search", res)
      })
      .catch((error) => console.log("error when handleSearchData:", error))
  }

  const handleTableChange = async (pagination, filters, sorter) => {
    setLoading(true);
    console.log("handleTableChange", pagination);
    await api.get(`project?page=${pagination.current}`).then(
      res => {
        setDataSource(res?.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            pageSize: res.meta.take,
            total: res.meta.itemCount,
          },
          filters,
          ...sorter,
        });
        console.log("pagination:", pagination, "\nfilters:", filters, "\nsorter:", sorter, "\nData for pagination:", res);
      }
    )

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  }

  useEffect(() => {
    handleSearchData(search);
  }, [search, searchManager]);

  useEffect(() => {
    fetchDataProject();
  }, [])
  return (
    <>
      <ShowProjectHeader handleSearch={handleSearch} toAddLink={'/projects/add'} />
      <Table loading={loading} onChange={handleTableChange} size="small" columns={columns} dataSource={dataSource} pagination={tableParams.pagination} />
    </>
  );
};
export default ShowProject;