import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col, Upload, message, Image, Space, Table } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined, SaveOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import api from "../../../services/API_REQ";
import './EditProject.css'
import { Translation, useTranslation } from "react-i18next";
import { dynamicRoles } from "../../data";
import moment from 'moment';
import {frameOptions,technologyOptions,statusOptions}  from '../../data'
const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  const [form] = Form.useForm();
  const [projectData, setProjectData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const { t } = useTranslation();
  const [newAssign, setNewAssign] = useState("");
  const [newRoles, setNewRoles] = useState([]);
  const [newAssigns, setNewAssigns] = useState([]);
const [managers,setManagers] = useState()
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
  const getManager = async () => {
    try {
      const response = await api.get(`/employee/managers`);
      setManagers(response.data)
      console.log(managers);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      throw error;
    }
  };
  getManager();
  
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
  const a = employee.find((member) => member.id === newAssign);

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
    <>
<h2> EDIT PROJECT</h2>
  <Form
    className="form-edit-project"
      form={form}
      onFinish={handleSave}
      initialValues={projectData}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
     <Row gutter={16}>
          <Col xs={24} sm={24} md={14}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label={t("projects.name")}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={t("projects.name")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="managerId"
                  label={t("projects.manager_project")}
                  rules={[
                    { required: true, message: "Required" },
                  ]}
                >
                  <Select
                    style={{ height: '3rem' }}
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

              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="technology"
                  label={t("projects.tools")}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Select
                    mode="multiple"
                    placeholder={t("projects.tools")}
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
              </Col>
              <Col span={12}>
              <Form.Item
          name="langFrame"
          label={t("projects.lang_frame")}
          rules={[{ required: true, message: "Required" }]}
        >
          <Select
            mode="multiple"
            placeholder={t("projects.lang_frame")}
            onChange={(selectedValues) => setNewLangFrame(selectedValues)}
            style={{
              width: "100%",
            }}
          >
            {technologyOptions.map((option) => (
              <Select.Option key={option.key} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>


              </Col>
            </Row>

            <Row gutter={16} >
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label={t("projects.start_date")}
                  rules={[
                    { required: true, message: "Required" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    // value={newStartDate ? moment(newStartDate) : null}
                    onChange={(e) =>
                      setNewStartDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
                    }
                    showTime={{ format: "HH:mm:ss" }}
                    format="DD/MM/YYYY HH:mm:ss"
                    placeholder={t("projects.start_date")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="endDate"
                  label={t("projects.end_date")}
                  rules={[{ required: true, message: "Required" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    // value={newEndDate ? moment(newEndDate) : null}
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
            </Row>

            <Form.Item
              name="description"
              label={t("projects.description")}
            >
              <Input.TextArea
                rows={8}
                // value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder={t("projects.description")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  label={t("projects.members")}
                >
                  <Select
                    value={newAssign}
                    style={{ height: '3rem' }}
                    onChange={(value) => setNewAssign(value)}
                    placeholder={t("projects.members")}
                  >
                    {employeeData?.filter((member) => member.id !== newManager.id)
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

              <Col span={11}>
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
            {dynamicRoles.map((role) => (
              <Select.Option key={role.value} value={role.value}>
                {role.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
              </Col>

              <Col span={2}>
                <PlusCircleOutlined
                  style={{
                    fontSize: "24px",
                    paddingTop: "40px",
                    marginLeft: "7px",
                    display: "block",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    addToAssign();
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="employee_project"
                  label={t("projects.assign")}
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
                    style={{width:"100%"}}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

        </Row>
        <Row>
        <Col span={20}></Col>
        <Col span={4}>
        <Form.Item>
          <Button type="primary" htmlType="submit" danger>
            Add Project
          </Button>
          <Button danger style={{margin:'0 10px'}} onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
        </Col>
        </Row>
    </Form>
    </>
   
  );
};

export default EditProject;
