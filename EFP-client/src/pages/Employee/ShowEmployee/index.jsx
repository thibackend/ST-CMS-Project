import React from "react";
import SearchAddTab from "../../../components/SearchAddTab";
import { Button, Table, Popconfirm, Tooltip, message, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ShowEmployee.css";
import { useTranslation } from 'react-i18next';
import { Translation } from "react-i18next";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import api from "../../../services/API_REQ";

const ShowTable = () => {
  const { t } = useTranslation();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearchName = debounce((text) => setSearchName(text), 500);
  const handleSearchEmail = debounce((text) => setSearchEmail(text), 500);

  const [employee, setEmployee] = useState([]);

  const fetchDataEmployee = async () => {
    setLoading(true);
    await api.get("/employee").then((res) => {
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
    });
  };

  const handleSearchData = async (searchName, searchEmail) => {
    setLoading(true);
    await api
      .get("/employee", {
        searchByName: searchName,
        searchByEmail: searchEmail,
      })
      .then((res) => {
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
      })
      .catch((error) => console.log("error when handleSearchData:", error));
  };

  const handleTableChange = async (pagination, filters, sorter) => {
    setLoading(true);
    console.log("handleTableChange", pagination);
    await api.get(`employee?page=${pagination.current}`).then((res) => {
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
    });

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(() => {
    handleSearchData(searchName, searchEmail);
  }, [searchName, searchEmail]);

  useEffect(() => {
    fetchDataEmployee();
  }, []);

  useEffect(() => {
    api.get("/employee").then((res) => setEmployee(res.data));
  }, []);

  const handleDelete = async (employeeId) => {
    setLoading(true);
    try {
      await api.delete(`/employee/${employeeId}`);
      message.success(t("employees.delete"));
      setLoading(false);
      fetchDataEmployee();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  //Position
  const getPositionLabel = (postsion) => {
    switch (postsion) {
      case "fe":
        return "Front-End Developer";
      case "be":
        return "Back-End Developer";
      case "ba":
        return "Business Analyst";
      case "qa":
        return "Quality Assurance";
      case "devops":
        return "DevOps";
      case "ux_ui":
        return "UX/UI";
      case "fullstack":
        return "Full Stack Developer";
    }

    console.log("postion not found", postsion);
  };

  const columns = [
    {
      title: <Translation>{(t) => t("employees.avatar")}</Translation>,
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
      render: (avatar) => (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },

    {
      title: <Translation>{(t) => t("employees.employees")}</Translation>,
      dataIndex: "name",
      key: "name",
    },

    {
      title: <Translation>{(t) => t("employees.skill")}</Translation>,
      dataIndex: "tech",
      key: "id",
      ellipsis: true,
      width: 200,
      render: (technology, record) => {
        console.log("technology", technology);
        return (
          <Avatar.Group maxCount={2} style={{ padding: 5, gap: 10 }}>
            {technology?.map((tech, index, array) => {
              return (
                <Tooltip key={`id_${index}`} title={tech} placement="top">
                  <Avatar
                    size="large"
                    style={{
                      backgroundColor: "#1677ff",
                      fontSize: "0.5em",
                      width: 60,
                      borderRadius: 10,
                    }}
                    key={`index_${index}`}
                  >
                    {tech}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 280,
    },

    {
      title: <Translation>{(t) => t("employees.position")}</Translation>,
      dataIndex: "position",
      key: "position",
      ellipsis: true,
      render: (text) => getPositionLabel(text),
    },

    {
      title: <Translation>{(t) => t("employees.action")}</Translation>,
      key: "action",
      render: (_, record) => (
        <span>
          <Link to={`/employees/edit/${record.id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>
              <EditOutlined />
            </Button>
          </Link>

          <Popconfirm
            title={t('employees.confirm')}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" className="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </span>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <SearchAddTab
        handleSearchName={handleSearchName}
        handleSearchEmail={handleSearchEmail}
        toAddLink={"/employees/add"}
      />
      <Table
        style={{
          marginTop: "15px",
        }}
        loading={loading}
        onChange={handleTableChange}
        className="custom-table"
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        pagination={tableParams.pagination}
      />
    </>
  );
};
export default ShowTable;