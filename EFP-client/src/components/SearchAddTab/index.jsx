import React from 'react';
import { Row, Col, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SearchAddTab = ({ onSearch, toAddLink }) => {
  return (
    <Row align="middle" gutter={[30, 0]} style={{ boxSizing: 'border-box', background: '#3333', borderRadius: '7px', margin: '0 0 15px' }}>
      <Col span={8}>
        <Input.Search
          size='middle'
          placeholder="Search by name"
          onSearch={onSearch}
          enterButton
          bordered={false}
        />
      </Col>
      <Col span={12}></Col>
      <Col span={4} style={{ alignSelf: 'left' }}>
        <Link to={toAddLink}>
          Add project
        </Link>
      </Col>
    </Row>
  );
};

export default SearchAddTab;
