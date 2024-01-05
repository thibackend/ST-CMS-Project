import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  message,
  Upload,
  Select,
  DatePicker,
  Col,
  Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../services/API_REQ";
import "./AddEmployee.css";

const employee = api.get("/employee");
console.log("employee", employee);

const { Option } = Select;
const { TextArea } = Input;

const AddEmployee = () => {
  const [checkNick, setCheckNick] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [form] = useForm();

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = async (values) => {
    values.isManager = checkNick;
    values.dateOfBirth = birthday;
    try {
      const response = await api.post("/employee", values);
        form.resetFields();
    } catch (error) {
      message.error("An error occurred while adding the employee");
    }
  };
  const onCheckboxChange = (e) => {
    console.log(" before checkNick", checkNick);
    setCheckNick(e.target.checked);
    console.log("after checkNick", checkNick);
  };

  const onBirthdayChange = (date, dateString) => {
    console.log("date, dateString", date, dateString);
    setBirthday(dateString);
  };

  const renderFormItem = (label, name, rules, component) => (
    <Col span={12} key={name}>
      <div className="custom-form-item">
        <div style={{ marginBottom: 15 }}>{label}</div>
        <Form.Item name={name} rules={rules}>
          {component}
        </Form.Item>
      </div>
    </Col>
  );

  return (
    <Form
      form={form}
      className="form"
      name="complex-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Row gutter={24} className="contentuser" style={{}}>
        <Col>
          <Row gutter={24} justify="center" align="middle">
            <Col span={24}>
              <div className="container">
                <Col gutter={16}>
                  <Col
                    span={8}
                    className="left-container"
                    justify="center"
                    align="middle"
                    style={{
                      marginLeft: 130,
                      marginTop: 60,
                    }}
                  >
                    <h4 className="title">Xuan Le</h4>
                    <img
                      className="image"
                      src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71drVy8MKoL._AC_UF1000,1000_QL80_.jpg"
                      width={100}
                      height={100}
                      alt=""
                    />
                    <div className="upload-button">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </div>
                  </Col>
                  <Row gutter={16} style={{}}>
                    <Col className="gutter-row" span={8}>
                      {renderFormItem(
                        "Address:",
                        "address",
                        [{ required: true, message: "Address is required" }],
                        <Input
                          style={{ width: "240px" }}
                          placeholder="Please input address"
                        />
                      )}
                    </Col>
                    <Col
                      className="gutter-row"
                      span={8}
                      style={{
                        marginLeft: 50,
                      }}
                    >
                      {renderFormItem(
                        "Birthday:",
                        "dateOfBirth",
                        [
                          {
                            required: true,
                            message: "Birthday is required",
                          },
                        ],
                        <DatePicker
                          style={{ width: "240px" }}
                          onChange={onBirthdayChange}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row gutter={16} style={{}}>
                    <Col className="gutter-row" span={6}>
                      {renderFormItem(
                        "Programming:",
                        "langFrame",
                        [
                          {
                            required: true,
                            message: "Programming Language is required",
                          },
                        ],
                        <Input
                          style={{ width: "240px" }}
                          placeholder="Please input Programming Language"
                        />
                      )}
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginLeft: 100,
                      }}
                    >
                      {renderFormItem(
                        "Technology:",
                        "tech",
                        [
                          {
                            required: true,
                            message: "Technology is required",
                          },
                        ],
                        <Input
                          style={{ width: "240px" }}
                          placeholder="Please input Technology"
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={24} justify="center" align="middle">
            <Col span={24}>
              <div className="container">
                <Col gutter={16}>
                  <Col span={24}>
                    {renderFormItem(
                      "Position:",
                      "position",
                      [{ required: true, message: "Position is required" }],
                      <Input
                        style={{ width: "240px" }}
                        placeholder="Please input Position"
                      />
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Email:",
                      "email",
                      [{ required: true, message: "Email is required" }],
                      <Input
                        style={{ width: "240px" }}
                        placeholder="Please input email"
                      />
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Username:",
                      "name",
                      [{ required: true, message: "Username is required" }],
                      <Input
                        style={{ width: "240px" }}
                        placeholder="Please input username"
                      />
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Gender:",
                      "gender",
                      [{ required: true, message: "Gender is required" }],
                      <Select
                        style={{ width: "240px" }}
                        placeholder="Select your Gender"
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Skills:",
                      "skills",
                      [{ required: true, message: "Skill is required" }],
                      <Input
                        style={{ width: "240px" }}
                        placeholder="Please input skill"
                      />
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Status:",
                      "status",
                      [{ required: true, message: "Active is required" }],
                      <Select
                        style={{ width: "240px" }}
                        placeholder="Select your Status"
                      >
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    )}
                  </Col>

                  <Col span={24}>
                    {renderFormItem(
                      "Code:",
                      "code",
                      [{ required: true, message: "Code is required" }],
                      <Input
                        style={{ width: "240px" }}
                        placeholder="Please input Code"
                      />
                    )}
                  </Col>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={24} justify="center" align="middle">
            <Col span={24}>
              <div className="container">
                <Col span={24}>
                  <div className="checkbox">
                    {renderFormItem(
                      "Is Manager?",
                      "isManager",
                      null,
                      <Checkbox checked={checkNick} onChange={onCheckboxChange}>
                        Yes
                      </Checkbox>
                    )}
                  </div>
                </Col>
                <Col span={24}>
                  {renderFormItem(
                    "Identity card:",
                    "identityCard",
                    [
                      {
                        required: true,
                        message: "Identity card/ Passport is required",
                      },
                    ],
                    <Input
                      style={{ width: "240px" }}
                      placeholder="Please input Identity card/ Passport"
                    />
                  )}
                </Col>
                <Col span={24}>
                  {renderFormItem(
                    "Phone:",
                    "phone",
                    [{ required: true, message: "Phone is required" }],
                    <Input
                      style={{ width: "240px" }}
                      placeholder="Please input phone"
                    />
                  )}
                </Col>
                <Col className="gutter-row" span={24}>
                  {renderFormItem(
                    "Description:",
                    "description",
                    null,
                    <TextArea
                      style={{ width: "250px", fontSize: "16px" }}
                      rows={1}
                    />
                  )}
                </Col>
                <Col className="gutter-row" span={24}>
                  {renderFormItem(
                    "Join Date:",
                    "joinDate",
                    [{ required: true, message: "Join Date is required" }],
                    <Input
                      style={{ width: "240px" }}
                      placeholder="Please input Join Date"
                    />
                  )}
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row span={24}>
        <div
          className="button-container"
          style={{ display: "flex", marginLeft: 1050 }}
        >
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Cancel
            </Button>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </div>
      </Row>
    </Form>
  );
};

export default AddEmployee;
