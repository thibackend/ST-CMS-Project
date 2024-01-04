import React from 'react'
import ShowTable from './ShowEmployee'
import { Row, Col,} from 'antd'
import SearchAddTab from '../../components/SearchAddTab';

function Employee() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
      <SearchAddTab onSearch={onSearch} toAddLink={'/employees/add'}/>
      <ShowTable/>
    </>
    
  )
}

export default Employee
