import React from "react";
import { Button, Table, Popconfirm, message, Space, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./ShowEmployee.css";
import AvatarComponent from "../../../components/Avatar";
import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import api from "../../../services/API_REQ";

const ShowTable = () => {
  const {t} = useTranslation();
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

   const items = employee.map((record) => ({
     key: record.id,
     label: (
       <p style={{ cursor: "auto" }}>
         {Array.isArray(record.tech) ? record.tech.join(", ") : record.tech}
       </p>
     ),
   }));

  const columns = [
    {
      title: t('employees.avatar'),
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <AvatarComponent imageUrl={avatar}  />,
      width: 150,
    },

    {
      title: t('employees.name'),
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: t('employees.skills'),
      ellipsis: true,
      render: (text, record) => (
        <Dropdown
          menu={{
            items: items.filter((item) => item.key === record.id),
          }}
          placement="bottomLeft"
          arrow
        >
          <div>{record.tech[0]}</div>
        </Dropdown>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },

    {
      title: t('employees.position'),
      dataIndex: "position",
      key: "position",
      ellipsis: true,
      ...getColumnSearchProps("position"),
    },

    {
      title: t('employees.action'),
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
