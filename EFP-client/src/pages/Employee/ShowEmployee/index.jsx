import React from "react";
import {
  Button,
  Table,
  Popconfirm,
  message,
  Space,
  Dropdown,
  Tag,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import "./ShowEmployee.css";
import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import api from "../../../services/API_REQ";

const ShowTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    api.get("/employee").then((res) => setEmployee(res.data));
  }, [employee]);

  const handleDelete = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`);
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  //search
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const items = employee.map((record) => {
    const techCount = Array.isArray(record.tech) ? record.tech.length : 0;

    return {
      key: record.id,
      label: (
        <>
          {Array.isArray(record.tech) &&
            record.tech.slice(1).map((tech, index) => (
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

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Skill",
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
            {record.tech[0]}
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
                +{record.tech.length - 1 > 0 ? record.tech.length - 1 : ""}
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
      title: "Position",
      dataIndex: "position",
      key: "position",
      ellipsis: true,
      ...getColumnSearchProps("position"),
    },

    {
      title: "Action",
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
     

      <Table
        style={{
          marginTop: "15px",
        }}
        className="custom-table"
        columns={columns}
        dataSource={employee}
        bordered={true}
        pagination={{ position: ["bottomRight"] }}
      />
    </>
  );
};
export default ShowTable;
