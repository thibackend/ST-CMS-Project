import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Form, Input, DatePicker, Select, Radio, Button, Row, Col, message } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import api from "../../../services/API_REQ";
import moment from 'moment';
import { technologyOptions } from '../../data';
import './EditEmployee.css';

const { TextArea } = Input;
const { Option } = Select;

const EditEmployee = () => {
  const [form] = Form.useForm();
  const [employeeData, setEmployeeData] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const { employeeId } = useParams();

  const managerOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false },
  ];

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get(`/employee/${employeeId}`);
        const birthDay = moment(new Date(response.employee.dateOfBirth));
        const joinDate = moment(new Date(response.employee.joinDate));

        setEmployeeData({ ...response.employee, dateOfBirth: birthDay, joinDate: joinDate });
        form.setFieldsValue({ ...response.employee, dateOfBirth: birthDay, joinDate: joinDate });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    
  
    fetchEmployeeData();
  }, [employeeId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await api.patch(`/employee/${employeeId}`, values);
      message.success("Employee updated successfully");
      setIsEditing(false);
      setEmployeeData(values);
    } catch (error) {
      message.error("An error occurred while updating the employee");
    }
  };

  return (
    <Form
      className="form-edit-employee"
      form={form}
      initialValues={employeeData}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={5}>
          <Form.Item label="Avatar" name="avatar" valuePropName="fileList" labelCol={{ span: 24 }}>
            {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}  
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {employeeData && employeeData.avatar ? (
              <Image src={employeeData.avatar} alt="Avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload> */}
          </Form.Item>

          <Form.Item label="Is Manager?" name="isManager" rules={[{ required: true, message: "Please select a status" }]} labelCol={{ span: 24 }}>
            <Radio.Group buttonStyle="solid">
              {managerOptions.map((status) => (
                <Radio key={status.value} value={status.value}>
                  {status.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} md={19}>
          <Row>
            <Col span={8}>
              <Form.Item label="Name" name="name" labelCol={{ span: 24 }} rules={[{ required: true, message: 'Please enter the name' }]}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email" labelCol={{ span: 24 }} rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth" labelCol={{ span: 24 }}>
                <DatePicker disabled={!isEditing} />
              </Form.Item>
            </Col>

          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Phone" name="phone" labelCol={{ span: 24 }} rules={[{ required: true, message: 'Please enter phone number' }]}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Employee code" name="code" labelCol={{ span: 24 }} rules={[{ required: true, message: 'Please enter employee code' }]}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Identity Card" name="identityCard" labelCol={{ span: 24 }}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item name='gender' label="Gender" labelCol={{ span: 24 }} >
                <Select style={{ height: '6vh' }} disabled={!isEditing} >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='status' label="Status" labelCol={{ span: 24 }} >
                <Select style={{ height: '6vh' }} disabled={!isEditing} >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Join Date" name="joinDate" labelCol={{ span: 24 }}>
                <DatePicker disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item label="Project">
              </Form.Item>
            </Col>
          </Row>

          <Row >
            <Col span={24}>
              <Form.Item name='description' label='Description' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >
                <TextArea disabled={!isEditing} rows={6} />
              </Form.Item>
            </Col>

          </Row>
        </Col>

      </Row>
      <Row >
        <Col span={19}></Col>
        <Col span={5}>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {!isEditing ? (
              <>           
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} danger>
                Edit
              </Button>
               <Button onClick={handleCancel} danger style={{ color: '#ff4d4f', backgroundColor: '#fff', borderColor: '#ff4d4f', marginLeft: '10px' }}>
               Cancel
             </Button>
             </>
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

export default EditEmployee;
