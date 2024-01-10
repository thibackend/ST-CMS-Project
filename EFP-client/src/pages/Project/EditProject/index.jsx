import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col, Upload, message, Image, Space } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import api from "../../../services/API_REQ";
import './EditProject.css'

import moment from 'moment';
import {frameOptions,technologyOptions,statusOptions}  from '../../data'
const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  const [form] = Form.useForm();
  const [projectData, setProjectData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState();

  const { projectId } = useParams();
  useEffect(() => {
  const fetchProjectData = async () => {
    try {
      const response = await api.get(`/project/${projectId}`);
      const startDate = moment(new Date(response.project.startDate));
      const endDate = moment(new Date(response.project.endDate));
      
      setProjectData({ ...response.project, startDate: startDate, endDate: endDate });
      form.setFieldsValue({ ...response.project, startDate: startDate, endDate: endDate });
    } catch (error) {
      console.error("Error fetching project data:", error);
    } 
  };
  const getEmployee = async () => {
    try {
      const response = await api.get(`/employee`);
      setEmployeeData(response.data)
      console.log(employeeData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      throw error;
    }
  };
  
    getEmployee();
  fetchProjectData();
}, [projectId]);


  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  console.log('form',form);
  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("data push: ",values);
      await api.patch(`/project/${projectId}`, values);
      message.success("Project updated successfully");
      setIsEditing(false);
      setProjectData(values); 
    } catch (error) {
      message.error("An error occurred while updating the project");
    }
  };
console.log(projectData);

  return (
    <Form
    className="form-edit-project"
      form={form}
      initialValues={projectData}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Row gutter={[16,0]}>
        <Col span={8}>
          <Form.Item label="Project name" name="name" rules={[{ required: true, message: 'Please enter the project name' }]}>
            <Input disabled={!isEditing} />
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Technology" name="tech" labelCol={{ span: 24 }}>
                <Select mode="multiple" placeholder="Select technology" optionLabelProp="label" options={technologyOptions} style={{ height: '6vh' }} disabled={!isEditing}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                      </span>
                      {option.data.desc}
                    </Space>
                  )}
                />
          </Form.Item>
        </Col>
       
        <Col span={8}>
          <Form.Item label="Manager" name="name" rules={[{ required: true, message: 'Please enter the project manager' }]}>
            <Input disabled={!isEditing} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={8}>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker disabled={!isEditing} />
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="End Date" name="endDate" labelCol={{ span: 24 }}>
          <DatePicker disabled={!isEditing} />
          </Form.Item>
        </Col>
       
        <Col span={8}>
          <Form.Item name='status' label="Status" labelCol={{ span: 24 }} >
            <Select style={{ height: '6vh' }} disabled={!isEditing} >
              <Option value="on_progress">On Progress</Option>
              <Option value="done">Done</Option>
            </Select>
        </Form.Item>
        </Col>
      </Row>
      
    
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Form.Item label="Assign Employees" name="employee_project">
            <Select mode="multiple" disabled={!isEditing}>
              {projectData?.employee_project?.map((employee) => (
                <Option key={employee.id}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} disabled={!isEditing} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={20}>
        </Col>
        <Col span={4}>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            {!isEditing ? (
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} danger>
                Edit
              </Button>
            ) : (
              <>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={handleSave} danger>
                  Save
                </Button>
                <Button onClick={handleCancel} danger style={{ color: '#ff4d4f', backgroundColor: '#fff', borderColor: '#ff4d4f', marginLeft: '10px' }}>
                  Cancel
                </Button>
              </>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProject;
