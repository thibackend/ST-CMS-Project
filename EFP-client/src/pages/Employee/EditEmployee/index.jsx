import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { Form, Input, DatePicker, Select, Upload, Spin, Radio, Button, Row, Col, message, Space, Tooltip } from "antd";
import { EditOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../../services/API_REQ";
import moment from 'moment';
import dayjs from "dayjs";
import { technologyOptions, softSkillOption } from '../../data';
import './EditEmployee.css';
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
const { TextArea } = Input;
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { join } from "lodash";

const EditEmployee = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [employeeData, setEmployeeData] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "djveiec3v" } });
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const defaultImageUrl =
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp";
  const { employeeId } = useParams();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response.secure_url);
      setNewAvatar(info.file.response.secure_url);
      message.success(`uploaded successfully`);
      setLoading(false);
    } else {
      setImageUrl(defaultImageUrl);
      setNewAvatar(null);
      setLoading(false);
    }
  };
  const managerOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false },
  ];
  const props = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/djveiec3v/image/upload",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer 974191498252429",
    },
    data(file) {
      return {
        file,
        upload_preset: "oojgpflj",
      };
    },
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      return isJpgOrPng && file.size <= 60;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("info", info.file.response);
        message.success(`${info.file.name} file uploaded successfully`);
        setImageUrl(info.file.response.secure_url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get(`/employee/${employeeId}`);
        const birthDay = dayjs(response.employee.dateOfBirth);
        const joinDate = dayjs(response.employee.joinDate);
        setImageUrl(response.employee.avatar || defaultImageUrl);
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
      const updatedValues = { ...values, avatar: imageUrl };
      await api.patch(`/employee/${employeeId}`, updatedValues);
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
      <Row gutter={16}>
        <Col xs={24} md={5} style={{ background: 'white', borderRadius: '20px' }}>
          <Form.Item label="" name="avatar" valuePropName="fileList" labelCol={{ span: 24 }}>
            <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
              <div style={{ marginTop: "3rem", marginBottom: "1rem", marginLeft: '3rem' }}>
                <Upload
                  listType="picture-circle"
                  maxCount={1}
                  action={`https://api.cloudinary.com/v1_1/djveiec3v/image/upload`}
                  data={{ upload_preset: "oojgpflj" }}
                  showUploadList={false}
                  onChange={handleChange}
                >
                  <Spin spinning={loading} tip="Uploading...">
                    {imageUrl ? (
                      <div className="rounded-image-container">
                        <CloudImage className="cloudary"
                          publicId={imageUrl}
                          style={{

                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <PlusOutlined />
                      </div>
                    )}
                  </Spin>
                </Upload>
              </div>
            </CloudinaryContext>
            <Form.Item
              label=""
              valuePropName="avatar"
              style={{ marginTop: '18px' }}
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}></Form.Item>
          </Form.Item>
          <div style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {form.getFieldValue('name') && (
              <Row>
                <Col span={24}>
                  {employeeData.name}
                </Col>
              </Row>
            )}
            {form.getFieldValue('isManager') ? (
              <Row>
                <Col span={24}>
                  <strong>Role: </strong> manager
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <strong>Role: </strong> employee
                </Col>
              </Row>
            )}
            {form.getFieldValue('description') && (
              <Row>
                <Col span={24}>
                  {employeeData.name}
                </Col>
              </Row>
            )}

          </div>

          <Col span={24}>
            <Form.Item label="Projects" name="employee_project" labelCol={{ span: 24 }}>
              {Object.entries(
                form.getFieldValue('employee_project')?.reduce((groupedProjects, project) => {
                  const year = moment(project.createdAt).format('YYYY');
                  if (!groupedProjects[year]) {
                    groupedProjects[year] = [];
                  }
                  groupedProjects[year].push(project);
                  return groupedProjects;
                }, {}) || {}
              )
                .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                .map(([year, projectsOfYear]) => (
                  <div key={year}>
                    <h3>{year}</h3>
                    {projectsOfYear.map((project) => (
                      <Tooltip
                        disabled={!isEditing}
                        key={project.id}
                        title={
                          <>
                            <p>Name: {project?.project?.name}</p>
                            <p>Tools: {project?.project?.technology.join(', ')}</p>
                            <p>Technology: {project?.project?.langFrame.join(', ')}</p>
                          </>
                        }
                      >
                        <div style={{ border: '1px solid #e8e8e8', padding: '10px', marginBottom: '8px' }}>
                          {project?.project?.name}
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                )) || <p>No project assigned</p>}
            </Form.Item>
          </Col>


        </Col>
        <Col xs={24} md={18} style={{ background: 'white', borderRadius: '20px', margin: '0 0 0 4%' }}>
          <Row>
            <Col span={8}>
              <Form.Item label="Name" name="name" labelCol={{ span: 24 }} rules={[{ required: true, message: 'Please enter the name' }]}>
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={8}><Form.Item label="Email" name="email" labelCol={{ span: 24 }} rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input disabled={!isEditing} />
            </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth" labelCol={{ span: 24 }}>
                <DatePicker
                  format="DD/MM/YYYY"
                  disabled={!isEditing}
                  picker="date"
                  disabledDate={(current) =>
                    current && current > moment().endOf('day') || current < moment('1900-01-01')
                  }
                />
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
                <Input disabled />
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
                        {option.data.emoji}</span>
                      {option.data.desc}
                    </Space>
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Soft skills" name="skills" labelCol={{ span: 24 }}>
                <Select mode="multiple" placeholder="Select skills" optionLabelProp="label" options={softSkillOption} style={{ minHeight: '6vh' }} disabled={!isEditing}
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

          </Row>

          <Row >
            <Col span={24}>
              <Form.Item name='description' label='Description' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >
                <TextArea disabled={!isEditing} rows={6} />
              </Form.Item>
            </Col>

          </Row>
          <Row>
            <Form.Item label="Is Manager?" name="isManager" rules={[{ required: true, message: "Please select a status" }]} labelCol={{ span: 24 }}>
              <Radio.Group buttonStyle="solid" disabled={!isEditing}>
                {managerOptions.map((status) => (
                  <Radio key={status.value} value={status.value}>
                    {status.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
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