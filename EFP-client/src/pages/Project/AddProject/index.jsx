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
  Spin,
} from "antd";
import moment from "moment";
import api from "../../../services/API_REQ";
import { useTranslation } from "react-i18next";
import './AddProject.css'
import { dynamicRoles, technologyOptions } from "../../data";
import { useNavigate } from "react-router";
const { Option } = Select;


const AddProject = () => {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await api.post("/project", { ...values, employee_project: newAssigns })
        .then(res => {
          formCreate.resetFields();
          message.success("Project added successfully");
          navigate("/projects");
        })
    } catch (error) {
      message.success(error.data.message);
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

  const handleCancel = () => {
    navigate('../../projects')
  }

  return (
    <>
      {
        isLoading ?
          <Spin size="large">
            <div style={{ padding: 20 }}>
              <h2 className="add-employee">{t('projects.add_project_title')}</h2>
              <Form
                form={formCreate}
                name="createProject"
                layout="vertical"
                className="form-add-project"
                autoComplete="off"
                onFinish={onFinish}>
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
                            value={newName}
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
                            value={newManager.id}
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
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="langFrame"
                          label={t("projects.lang_frame")}
                          rules={[{ required: true, message: "Required" }]}
                        >
                          <Select
                            mode="multiple" placeholder={t("projects.lang_frame")}
                            value={newLangFrame}
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
                            value={newStartDate ? moment(newStartDate) : null}
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
                    </Row>

                    <Form.Item
                      name="description"
                      label={t("projects.description")}
                    >
                      <Input.TextArea
                        rows={8}
                        value={newDescription}
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
                            onChange={(value) => setNewAssign(value)} placeholder={t("projects.members")}
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
                          label={t("projects.assign_member")}
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
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}></Col><Col span={4}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        {t('projects.add_project')}
                      </Button>
                      <Button danger style={{ margin: '0 10px' }} onClick={handleCancel}>
                        {t('projects.cancel_add_project')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

              </Form>
            </div>
          </Spin> :
          <div style={{ padding: 20 }}>
            <h2 className="add-employee">{t('projects.add_project_title')}</h2>
            <Form
              form={formCreate}
              name="createProject"
              layout="vertical"
              className="form-add-project"
              autoComplete="off"
              onFinish={onFinish}>
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
                          value={newName}
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
                          value={newManager.id}
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
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="langFrame"
                        label={t("projects.lang_frame")}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <Select
                          mode="multiple" placeholder={t("projects.lang_frame")}
                          value={newLangFrame}
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
                          value={newStartDate ? moment(newStartDate) : null}
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
                  </Row>

                  <Form.Item
                    name="description"
                    label={t("projects.description")}
                  >
                    <Input.TextArea
                      rows={8}
                      value={newDescription}
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
                          onChange={(value) => setNewAssign(value)} placeholder={t("projects.members")}
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
                        label={t("projects.assign_member")}
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
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={20}></Col><Col span={4}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {t('projects.add_project')}
                    </Button>
                    <Button danger style={{ margin: '0 10px' }} onClick={handleCancel}>
                      {t('projects.cancel_add_project')}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

            </Form>
          </div>
      }
    </>
  );
};

export default AddProject;