import React from 'react';
import { Row, Col, Input, Button } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SearchAddTab = ({ onSearch, toAddLink }) => {
  return (
    <Row gutter={[8, 8]} className="mt-6 ml-2 !important">
      <Col xs={24} sm={24} md={6}>
        <Input
          style={{
            padding: "8px",
          }}
          placeholder="Nhập Name"
          allowClear
          onChange={(e) => {
            if (e.type === "click") {
              handleClear();
            }
            setFilters((prevFilters) => ({
              ...prevFilters,
              searchByName: e.target.value,
            }));
          }}
        />
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Input
          style={{
            padding: "8px",
          }}
          placeholder="Email"
          allowClear
          onChange={(e) => {
            if (e.type === "click") {
              handleClear();
            }
            setFilters((prevFilters) => ({
              ...prevFilters,
              searchByEmail: e.target.value,
            }));
          }}
        />
      </Col>

      <Col xs={24} sm={24} md={12} lg={6}>
        <Row justify="space-between">
          <Button
            style={{
              height: "40px",
            }}
            type="primary"
            onClick={() => handleSearch()}
          >
            <span> Search</span>
          </Button>
        </Row>
      </Col>

      <Col span={5}></Col>

      <Col span={1}>
        <Link to={toAddLink}>
          <PlusCircleOutlined style={{ fontSize: "35px" }} />
        </Link>
      </Col>
    </Row>
  );
};

export default SearchAddTab;
