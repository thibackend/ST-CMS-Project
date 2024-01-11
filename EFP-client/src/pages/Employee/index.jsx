import React from 'react'
import ShowTable from './ShowEmployee'
import { Row, Col,} from 'antd'


function Employee() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <>
     
      <ShowTable/>
    </>
    
  )
}

export default Employee
