import React from "react";
import SearchAddTab from "../../../components/SearchAddTab";
import { Button, Table, Popconfirm, message, Dropdown, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ShowEmployee.css";
import { Translation } from "react-i18next";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import api from "../../../services/API_REQ";

const ShowTable = () => {
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

  useEffect(() => {
    fetchDataEmployee();
  }, []);

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
    api.get("/employee").then((res) => setEmployee(res.data));
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const items = employee.map((record) => {
    return {
      key: record.id,
      label: (
        <>
          {record.tech &&
            Object.values(record.tech)
              .slice(1)
              .map((tech, index) => (
                <Tag
                  key={`${record.id}_${index}`}
                  color={tech.length > 5 ? "#1677ff" : "#1677ff"}
                  style={{
                    cursor: "auto",
                    backgroundColor: "#1677ff",
                    color: "white",
                    marginRight: "5px",
                    fontSize: "16px",
                    padding: "8px",
                  }}
                >
                  {tech}
                </Tag>
              ))}
        </>
      ),
    };
  });

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

    console.log("postion not found",postsion);
  };

  const columns = [
    {
      title: <Translation>{(t) => t("employees.avatar")}</Translation>,
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
    },

    {
      title: <Translation>{(t) => t("employees.employees")}</Translation>,
      dataIndex: "name",
      key: "name",
    },

    {
      title: <Translation>{(t) => t("employees.skill")}</Translation>,
      ellipsis: true,
      render: (text, record) => (
        <div
          className="skill"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1677ff",
              borderRadius: "10px",
              cursor: "auto",
              color: "white",
              fontSize: "16px",
              padding: "8px",
            }}
          >
            {record.tech && record.tech[Object.keys(record.tech)[0]]}
          </div>

          <Tag>
            <Dropdown
              menu={{
                items: items.filter((item) => item.key === record.id),
              }}
              placement="topLeft"
              arrow
            >
              <div
                style={{
                  padding: "8px 9px",
                  backgroundColor: "aliceblue",
                  borderRadius: "50%",
                  border: "1px solid #1677ff",
                }}
              >
                +
                {record.tech && Object.keys(record.tech).length - 1 > 0
                  ? Object.keys(record.tech).length - 1
                  : ""}
              </div>
            </Dropdown>
          </Tag>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
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
