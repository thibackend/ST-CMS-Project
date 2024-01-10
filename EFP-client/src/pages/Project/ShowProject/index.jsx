import React, { useState, useEffect } from "react";
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import './ShowProject.css';
import { Table } from 'antd';
import { Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import api from '../../../services/API_REQ';
import ShowProjectHeader from "./ShowProjectHeader";

const ShowProject = () => {
  const {t} = useTranslation();

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

  const handleSearch = debounce((text) => setSearch(text), 500);
  const handleSearchManager = (text) => setSearchManager(text);

  const TechnologyColumns =
  {
    title: 'Technologies',
    dataIndex: 'technology',
    key: 'id',
    ellipsis: true,
    width: showAllTech ? 400 : 300,
    render: (technology) => {
      return <Link>
        {
          showAllTech ?
            <>
              {
                technology?.map((tech, index) => {
                  return (<Tag
                    style={{ borderRadius: 50, transform: 'scale(1.06)', backgroundColor: 'green', color: 'white' }}
                    key={`index_${index}`}>{tech}</Tag>)
                })
              }
              <Tag onClick={() => setShowAllTech(showAllTech ? false : true)} style={{ borderRadius: 50 }}>-</Tag>
            </> :
            technology.length > 2 ?
              technology?.map((tech, index, array) => {
                var sodu = 0;
                if (index <= 1) {
                  return <Tag
                    style={{ borderRadius: 50, transform: 'scale(1.06)', backgroundColor: 'green', color: 'white' }}
                    key={`index_${index}`}
                  >{tech}</Tag>
                } else if (index > 1) {
                  sodu += 1;
                }
                if (index == array.length - 1) {
                  return <a
                    onClick={() => {
                      setShowAllTech(showAllTech ? false : true)
                    }}
                    key={`index_${index}`}
                    style={
                      { borderRadius: 50, textAlign: 'center', fontWeight: 'bold' }
                    }
                  >...</a>
                }
              })
              :
              technology.length <= 2 ?
                technology?.map((tech, index) => {
                  return (<Tag key={`index_${index}`} style={{ color: 'white', borderRadius: 50 }}>{tech}</Tag>)
                })
                : null
        }
      </Link >
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
        render: (manager) => (
          <Link to={'/employee/'}>{manager?.name}</Link>
        )
      },
      TechnologyColumns,
      {
        title: t('projects.members'),
        dataIndex: 'employee_project',
        key: 'description',
        render: (employee_project) => {
          return (
            <Link>
              {
                employee_project?.map((em, index) => <img
                  key={`id_${index}`}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    marginRight: 10
                  }}
                  // src={em.employee.avatar}
                  alt="user Avatar"
                />)
              }
            </Link>
          )
        }
      },
      {
        title:t('projects.status'),
        dataIndex: 'status',
        key: 'status',
        ellipsis: true,
        width: 100,
        render: (text, status) => {
          return (
            <Tag color={status.status === 'on_progress' ? 'green' : 'red'}>
              {status.status}
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
        title:t('projects.end_date'),
        dataIndex: 'endDate',
        key: 'endDate',
        ellipsis: true,
        width: 100,
        render: endDate => <p>{moment(endDate).format('DD-MM-YYYY')}</p>
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
    await api.get('project', { search: textSearch})
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
      <ShowProjectHeader handleSearchManager={handleSearchManager} handleSearch={handleSearch} toAddLink={'/projects/add'} />
      <Table loading={loading} onChange={handleTableChange} size="small" columns={columns} dataSource={dataSource} pagination={tableParams.pagination} />
    </>
  );
};
export default ShowProject;