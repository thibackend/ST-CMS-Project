import React from 'react'
import ShowProject from './ShowProject'
import SearchAddTab from '../../components/SearchAddTab'
function Project() {
  return (
    <>
    <SearchAddTab onSearch={""} toAddLink={'/projects/add'}/>
    <ShowProject />
    </>
  )
}

