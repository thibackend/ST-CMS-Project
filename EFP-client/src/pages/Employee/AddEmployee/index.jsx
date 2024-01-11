import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  Select,
  DatePicker,
  Radio,
  Col,
  Space,
  Row,
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../../services/API_REQ";
// import moment from 'moment';
import "./AddEmployee.css";
import { technologyOptions } from "../../data";
import { useNavigate } from "react-router-dom";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";

const { Option } = Select;

const AddEmployee = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [form] = useForm();
  const navigation = useNavigate();
  const managerOptions = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  const [imageUrl, setImageUrl] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
  );
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "djveiec3v" } });
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const defaultImageUrl =
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp";
  const [formCreate] = useForm();

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

  const handleCreateOk = async () => {
    try {
      const formData = await formCreate.validateFields();
      formData.avatar = imageUrl;
      setConfirmLoading(true);
      createEmployee({
        ...formData,
      });
    } catch (error) {
    }
  };

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

  const defaultValue = {
    gender: "male",
    position: "be",
    isManager: false,
    identityCard: 0,
    status: 'active',
  };

  const onFinish = async (values) => {
    try {
      const updatedValues = { ...values, avatar: imageUrl };
      await api.post("/employee", updatedValues);
      message.success("Employee added successfully");
      form.resetFields();
      navigation("/employees");
    } catch (error) {
      message.error("An error occurred while adding the employee");
    } finally {
      // setIsUploading(false); // Reset uploading status to false regardless of success or failure
    }
  };

  return (
    <>
      <h2 className="add-employee">ADD EMPLOYEE</h2>
      <Row style={{marginLeft: '4rem'}}>
        <Col>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
              <div style={{ marginTop: "5rem" }}>
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
          </div>
          <Form.Item
            label="EMPLOYEE AVATAR"
            valuePropName="avatar"
            style={{marginTop: '18px'}}
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          ></Form.Item>
        </Col>
        <Col>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={defaultValue}
            className="form-add-employee"
          >
            <Row gutter={[20]}>
              <div
                style={{
                  display: "flex",
                  marginLeft: "1rem",
                }}
              >
                <Col>
                <Form.Item
                name="identityCard"
                label="Identity Card"
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
                  <Form.Item
                    name="name"
                    label="Name"
                    labelCol={{ span: 24 }}
                    style={{ marginLeft: "4rem", width: "20rem" }}
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    labelCol={{ span: 24 }}
                    style={{ marginLeft: "4rem", width: "20rem" }}
                    rules={[
                      { required: true, message: "Please enter your email!" },
                    ]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone number"
                    labelCol={{ span: 24 }}
                    style={{ marginLeft: "4rem", width: "20rem" }}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Gender"
                    labelCol={{ span: 24 }}
                    style={{ marginLeft: "4rem", width: "20rem" }}
                  >
                    <Select style={{ height: "3rem" }}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Is Manager?"
                    name="isManager"
                    rules={[
                      { required: true, message: "Please select a status" },
                    ]}
                    labelCol={{ span: 24 }}
                    style={{ marginLeft: "4rem", width: "20rem" }}
                  >
                    <Radio.Group buttonStyle="solid">
                      {managerOptions.map((status) => (
                        <Radio key={status.value} value={status.value}>
                          {status.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={10}>
                  <Form.Item
                    label="Birthday"
                    name="dateOfBirth"
                    labelCol={{ span: 24 }}
                    rules={[
                      { required: true, message: "Please select start date" },
                    ]}
                    style={{ width: "20rem", marginLeft: "3rem" }}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name="position"
                    label="Position"
                    labelCol={{ span: 24 }}
                    style={{ width: "20rem", marginLeft: "3rem" }}
                  >
                    <Select style={{ height: "3rem" }}>
                      <Option value="be">Backend</Option>
                      <Option value="fe">Frontend</Option>
                      <Option value="devops">DevOps</Option>
                      <Option value="ba">BA</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Technology"
                    name="tech"
                    labelCol={{ span: 24 }}
                    style={{ width: "20rem", marginLeft: "3rem" }}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select technology"
                      optionLabelProp="label"
                      options={technologyOptions}
                      style={{ height: "3rem" }}
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
                  <Form.Item
                label="Join Date"
                name="joinDate"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please select join date" },
                ]}
                style={{ width: "20rem", marginLeft: "3rem" }}
              >
                <DatePicker />
              </Form.Item>
                  <Form.Item
                    name="code"
                    label="Code"
                    labelCol={{ span: 24 }}
                    style={{ width: "20rem", marginLeft: "3rem" }}
                    rules={[
                      { required: true, message: "please enter your code!" },
                    ]}
                  >
                    <Input placeholder="Enter code" />
                  </Form.Item>

                  <div style={{ display: "flex" }}>
                    <Col style={{ margin: "20px 38px" }}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          danger
                          block
                          style={{ width: "120px", height: "40px" }}
                          onClick={handleCreateOk}
                        >
                          Add Employee
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col style={{ margin: "20px 0px", padding: "0px" }}>
                      <Form.Item>
                        <Button
                          block
                          onClick={() => form.resetFields()}
                          style={{ width: "120px", height: "40px" }}
                        >
                          Cancel
                        </Button>
                      </Form.Item>
                    </Col>
                  </div>
                </Col>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default AddEmployee;
