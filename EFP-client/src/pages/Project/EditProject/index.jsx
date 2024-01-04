import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, Col, Row, Space, Radio } from "antd";
import "./EditProject.css"; 
import { frameOptions, technologyOptions, statusOptions } from "../data";
import api from '../../../services/API_REQ';

const { TextArea } = Input;
const { Option } = Select;

const EditProject = ({projectId}) => {
  const [managers, setManagers] = useState([]);
  const [form] = Form.useForm();


  useEffect(() => {
    api.get('/employee/managers').then(data => setManagers(data));
    api.get(`/project/${projectId}`).then(res => form.setFieldsValue(res.data));
  }, [projectId]);

  console.log(form);
  const onFinish = async (values) => {
    try {
      await api.patch(`/project/${projectId}`, values);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
   <>
   </>
  );
};

export default EditProject;
