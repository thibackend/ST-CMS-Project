import React from 'react';
import { Row, Col, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SearchAddTab = ({ onSearch, toAddLink }) => {
  return (
    <Row align="middle" gutter={[16, 0]} style={{background:'#dae1f3',padding: 12, borderRadius: '7px', margin: '0 0 15px'}}>
      <Col span={7}>
        <Input.Search
        size='large'
          placeholder="Search"
          onSearch={onSearch}
          enterButton
        />
      </Col>
      <Col span={16}></Col>
      <Col span={1}>
        <Link to={toAddLink}>
          <PlusCircleOutlined style={{ fontSize: '35px' }} />
        </Link>
      </Col>
    </Row>
  );
};

export default SearchAddTab;
