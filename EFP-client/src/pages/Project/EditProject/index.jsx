import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, Col, Row, Space, Radio } from "antd";
import "./EditProject.css"; 
import { frameOptions, technologyOptions, statusOptions } from "../data";
import api from '../../../services/API_REQ';
import { useParams } from 'react-router-dom';


const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  const [managers, setManagers] = useState([]);
  const [form] = Form.useForm();
  const { projectId } = useParams();
  console.log('projectId',projectId);

  useEffect(() => {
    api.get('/employee/managers').then(data => setManagers(data));
    api.get(`/project/${projectId}`).then(res => form.setFieldsValue(res.data));
  }, [projectId]);

  console.log(form.values);
  const onFinish = async (values) => {
    try {
      await api.patch(`/project/${projectId}`, values);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <>
    <h2>Edit project</h2>
    <Form form={form} onFinish={onFinish} className="form-edit-project">
      
    <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}>
        <Radio.Group buttonStyle="solid">
          {statusOptions.map((status) => (
            <Radio key={status.value} value={status.value}>
              {status.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="" name="name" rules={[{ required: true, message: "Project name is required!" }]}>
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item label="" name="managerId" rules={[{ required: true, message: "Please select a manager!" }]}>
            <Select placeholder="Select a manager" style={{ height: '8vh' }}>
              {managers.map((manager) => (
                <Option key={manager.id} value={manager.id}>
                  {manager.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="" name="startDate">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="" name="langFrame">
            <Select mode="multiple" placeholder="Select frameworks" optionLabelProp="label" options={frameOptions} style={{ height: '8vh' }}
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

          <Form.Item label="" name="technology">
            <Select mode="multiple" placeholder="Select technologies" optionLabelProp="label" options={technologyOptions} style={{ height: '8vh' }}
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

          <Form.Item label="" name="endDate">
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

     

      <Form.Item label="" name="description">
        <TextArea placeholder="Enter project description" rows={6} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" danger>
          Add Project
        </Button>
      </Form.Item>
    </Form>
  </>
  );
};

export default EditProject;
