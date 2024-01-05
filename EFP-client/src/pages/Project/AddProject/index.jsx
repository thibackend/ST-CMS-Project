import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, Col, Row, Space, Radio, message } from "antd";
import "./AddProject.css";
import { frameOptions, technologyOptions, statusOptions } from "../../data";
import api from '../../../services/API_REQ'

const { TextArea } = Input;
const { Option } = Select;

const AddProject = () => {
  const [managers, setManagers] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    api.get('/employee/managers').then(data => setManagers(data));
  }, []);

  const onFinish = async (values) => {
    try {
      console.log(values);
      await api.post('/project', values); 
      form.resetFields();
      message.success("Project added successfully");
      navigation('/projects')
      
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <h2>Add project</h2>
      <Form form={form} onFinish={onFinish} className="form-add-project">
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item label="Project name" name="name" rules={[{ required: true, message: "Project name is required!" }]}  labelCol={{ span: 24 }}>
              <Input placeholder="Enter project name" />
            </Form.Item>
            
            <Form.Item label="Manager" name="managerId" rules={[{ required: true, message: "Please select a manager!" }]}   labelCol={{ span: 24 }}>
              <Select placeholder="Select a manager" style={{ height: '8vh' }}>
                {managers.map((manager) => (
                  <Option key={manager.id} value={manager.id}>
                    {manager.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Start Date" name="startDate"   labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select start date" }]}>
              <DatePicker />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item label="Frameworks" name="langFrame"   labelCol={{ span: 24 }}>
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

            <Form.Item label="Technology" name="technology" labelCol={{ span: 24 }}>
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

            <Form.Item label="End Date" name="endDate"   labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select ennDate" }]}>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="description"   labelCol={{ span: 24 }}>
          <TextArea placeholder="Enter project description" rows={6} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}  labelCol={{ span: 24 }}>
          <Radio.Group buttonStyle="solid">
            {statusOptions.map((status) => (
              <Radio key={status.value} value={status.value}>
                {status.label}
              </Radio>
            ))}
          </Radio.Group>
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

export default AddProject;
