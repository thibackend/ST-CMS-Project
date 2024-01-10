import React, { useState, useEffect } from "react";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Table,
  message,
} from "antd";
import moment from "moment";
import api from "../../../services/API_REQ";
import { useTranslation } from "react-i18next";
import './AddProject.css'
const { Option } = Select;

const AddProject = () => {
  const [formCreate] = Form.useForm();
  const [newName, setNewName] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newSpecification, setNewSpecification] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLangFrame, setNewLangFrame] = useState("");
  const [newAssign, setNewAssign] = useState("");
  const [newRoles, setNewRoles] = useState([]);
  const [newAssigns, setNewAssigns] = useState([]);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [managers, setManagers] = useState([]);
  const [employee, setEmployee] = useState([]);
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      console.log(values);
      await api.post("/project", { ...values, employee_project: newAssigns });
      formCreate.resetFields();
      message.success("Project added successfully");
      navigation("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  useEffect(() => {
    api.get("/employee/managers").then((data) => setManagers(data));
    api.get("/employee").then((res) => setEmployee(res.data));
  }, []);

  const roles = [
    {
      title: t("projects.members"),
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: t("projects.roles"),
      dataIndex: "roles",
      key: "roles",
    },
  ];

  const addToAssign = () => {
    const a = employee.find((member) => {
      if (member.id === newAssign) return member;
    });

    const newEntry = {
      employeeId: newAssign,
      roles: newRoles,
    };

    setNewAssigns([
      ...newAssigns,
      { ...newEntry, employeeName: a.name, key: newAssign.employeeId },
    ]);
    setNewAssign("");
    setNewRoles([]);
  };

  const removeAssign = (employeeName) => {
    const updatedAssigns = newAssigns.filter(
      (assign) => assign.employeeName !== employeeName
    );
    setNewAssigns(updatedAssigns);
  };

  return (
    <Form
      form={formCreate}
      name="createProject"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="name"
            label={t("projects.name")}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t("projects.name")}
            />
          </Form.Item>

          <Form.Item
            name="managerId"
            label={t("projects.manager_project")}
            rules={[
              { required: true, message: "Required" },
            ]}
          >
            <Select
              value={newManager.id}
              onChange={(value, option) =>
                setNewManager({ id: value, name: option.children })
              }
              placeholder={t("projects.manager_project")}
            >
              {(managers || []).map((manager) => (
                <Select.Option key={manager.id} value={manager.id}>
                  {manager.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="technology"
            label={t("projects.technology")}
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              mode="multiple"
              placeholder={t("projects.technology")}
              value={newTechnology}
              onChange={(selectedValues) => setNewTechnology(selectedValues)}
              style={{
                width: "100%",
              }}
            >
              {[
                "IntelliJ IDEA",
                "Sublime Text",
                "Xcode",
                "Microsoft Visual Studio",
                "Visual Studio Code",
                "IDE",
                "Github",
                "Docker",
                "Postman",
              ].map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="langFrame"
            label={t("projects.lang_frame")}
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              mode="multiple"
              placeholder={t("projects.lang_frame")}
              value={newLangFrame}
              onChange={(selectedValues) => setNewTechnology(selectedValues)}
              style={{
                width: "100%",
              }}
            >
              {[
                "Java",
                "JavaScript",
                "Python",
                "PHP",
                "C#",
                "C++",
                "Ruby",
                "Pascal",
                "Swift",
                "SQL",
              ].map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="description"
            label={t("projects.description")}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder={t("projects.description")}
            />
          </Form.Item>


          <Form.Item
            name="startDate"
            label={t("projects.start_date")}
            rules={[
              { required: true, message: "Required" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              value={newStartDate ? moment(newStartDate) : null}
              onChange={(e) =>
                setNewStartDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
              }
              showTime={{ format: "HH:mm:ss" }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder={t("projects.start_date")}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label={t("projects.end_date")}
            rules={[{ required: true, message: "Required" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              value={newEndDate ? moment(newEndDate) : null}
              onChange={(e) =>
                setNewEndDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
              }
              showTime={{ format: "HH:mm:ss" }}
              format="DD/MM/YYYY HH:mm:ss"
              disabledDate={(current) => {
                return current && current < moment(newStartDate);
              }}
              placeholder={t("projects.end_date")}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={t("projects.members")}
                style={{ marginBottom: "8px" }}
                rules={[
                  { required: true, message: "Required" },
                ]}
              >
                <Select
                  value={newAssign}
                  onChange={(value) => setNewAssign(value)}
                  placeholder={t("projects.members")}
                  style={{
                    width: "100%",
                  }}
                >
                  {employee
                    .filter((member) => member.id !== newManager.id)
                    .filter(
                      (member) =>
                        !newAssigns.some((assign) => assign.employeeId === member.id)
                    )
                    .map((member) => (
                      <Select.Option key={member.id} value={member.id}>
                        {member.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={t("projects.roles")}
                style={{ marginBottom: "8px" }}
                rules={[
                  { required: true, message: "Required" },
                ]}
              >
                <Select
                  mode="multiple"
                  value={newRoles}
                  onChange={(values) => setNewRoles(values)}
                  placeholder={t("projects.roles")}
                  style={{ width: "100%" }}
                >
                  {[
                    "fe",
                    "be",
                    "ba",
                    "qa",
                    "ux_ui",
                    "devops",
                    "fullstack",
                  ].map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <PlusCircleOutlined
                style={{
                  fontSize: "24px",
                  paddingTop: "24px",
                  marginLeft: "7px",
                  display: "block",
                  textAlign: "center",
                }}
                onClick={() => {
                  addToAssign();
                }}
              />
            </Col>

            <Col span={24}>
              <Form.Item
                name="employee_project"
                label={t("projects.assign")}
                style={{ width: "100%" }}
              >
                <Table
                  rowKey="employeeId"
                  dataSource={newAssigns.map((assign) => ({
                    ...assign,
                    employeeId: assign.employeeName,
                    roles: assign.roles.join(", "),
                  }))}
                  columns={[
                    ...roles,
                    {
                      title: t("projects.action"),
                      render: (record) => (
                        <CloseCircleOutlined
                          style={{ color: "black" }}
                          onClick={() => removeAssign(record.employeeName)}
                        />
                      ),
                    },
                  ]}
                  pagination={false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" danger>
          Add Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProject;