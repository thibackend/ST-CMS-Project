import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col, Table, message, Spin } from "antd";
import { EditOutlined, SaveOutlined, PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import api from "../../../services/API_REQ";
import { useParams } from "react-router-dom";
import { technologyOptions, dynamicRoles } from "../../data";
import "./EditProject.css";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState();
  const [newAssign, setNewAssign] = useState("");
  const [newRoles, setNewRoles] = useState([]);
  const [newAssigns, setNewAssigns] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [isRemove, setIsRemove] = useState(false);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        await api.get("/employee/managers").then((data) => setManagers(data));
        await api.get("/employee").then((res) => setEmployee(res.data));
        const response = await api.get(`/project/${projectId}`);
        const startDate = dayjs(response.project.startDate);
        const endDate = dayjs(response.project.endDate);
        setProjectData({ ...response.project, startDate, endDate });
        setNewAssigns(response.project.employee_project || []);
        form.setFieldsValue({ ...response.project, startDate, endDate })
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();

  }, [newAssign, isRemove]);


  useEffect(() => {
    const filteredMembers = employee.filter((member) => (
      !newAssigns.some((assign) => assign.employeeId === member.id)
    ));
    setAvailableMembers(filteredMembers);
  }, [newAssigns]);



  const roles = [
    {
      title: t("projects.members"),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span>{`${record?.employee?.name || record?.name || ''}`}</span>
      ),
    },
    {
      title: t("projects.roles"),
      dataIndex: "roles",
      key: "roles",
      render: (text, record) => (
        <span>{`${record?.employee?.roles || record?.roles || ''}`}</span>
      ),
    },
    {
      title: t("projects.action"),
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <CloseCircleOutlined
          style={{ color: "black", cursor: "pointer" }}
          onClick={() => {
            const data = { projectId, employeeIds: [record.employeeId] }
            removeAssign(data)
          }}
        />
      ),
    },
  ];

  const addToAssign = async () => {
    const newEntry = {
      employeeId: newAssign,
      roles: newRoles,
      joinDate: moment(new Date())
    };
    await api.post("assign", [{ projectId, ...newEntry }])
    setNewAssign("");
    setNewRoles([]);
  };


  const removeAssign = async (data) => {
    await api.delete("assign", data)
    setIsRemove(!isRemove)
  };


  const handleCancel = () => {
    form.setFieldValue(projectData);
    navigate("/projects")
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await api.patch(`/project/${projectId}`, values);
      message.success("Project updated successfully");
    } catch (error) {
      message.error("An error occurred while updating the project");
    }
  };





  return (
    <>
      {
        isLoading ?
          <Spin size="large">

            <Form
              className="form-edit-project"
              form={form}
              initialValues={projectData}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ padding: 20 }}
            >
              <h2 className="add-employee">EDIT PROJECT</h2>
              <Row gutter={[16, 0]}>
                <Col span={16}>
                  <Row gutter={[16, 0]} >
                    <Col span={12}>
                      <Form.Item label={t('projects.name')} name="name" rules={[{ required: true, message: 'Please enter the project name' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={t('projects.manager_project')} name={['managerProject', 'name']} rules={[{ required: true, message: 'Please enter the project manager' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]} >
                    <Col span={12}>
                      <Form.Item name='status' label={t('projects.status')} labelCol={{ span: 24 }} >
                        <Select style={{ height: '6vh' }}  >
                          <Option value="on_progress">{t('projects.status_on_progress')}</Option>
                          <Option value="done">{t('projects.status_done')}</Option>
                          <Option value="pendding">{t('projects.status_pendding')}</Option>
                          <Option value="new">{t('projects.status_new')}</Option>
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

                          style={{ minHeight: '3rem' }}

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
                  <Row gutter={[8, 16]}>
                    <Col span={12}>
                      <Form.Item label={t("projects.start_date")} name="startDate">
                        <DatePicker format="YYYY-MM-DD" />
                      </Form.Item>
                    </Col>
                    <Col span={12}><Form.Item label={t('projects.end_date')} name="endDate" labelCol={{ span: 24 }}>
                      <DatePicker />
                    </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="technology"
                        label={t("projects.tools")}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <Select
                          mode="multiple"
                          style={{ minHeight: '3rem' }}
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
                  </Row>
                  <Row gutter={[8, 16]}>
                    <Col span={24}>
                      <Form.Item label={t("projects.description")} name="description">
                        <TextArea rows={4} />
                      </Form.Item>
                    </Col>
                  </Row>

                </Col>

                <Col xs={24} sm={24} md={7}>
                  <Row gutter={16}>
                    <Col span={11}>
                      <Form.Item
                        label={t("projects.members")}
                      >
                        <Select
                          value={newAssign}
                          style={{ minHeight: '3rem' }}
                          onChange={(value) => setNewAssign(value)}
                          placeholder={t("projects.members")}
                        >
                          {availableMembers.map((member) => (
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
                        style={{ minHeight: '3rem' }}
                        rules={[
                          { required: true, message: "Required" },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          value={newRoles}
                          onChange={(values) => setNewRoles(values)}
                          placeholder={t("projects.roles")}
                          style={{ width: "100%", minHeight: '3rem' }}
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
                          paddingTop: "55px",
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
                  <Row >
                    <Form.Item label={t("projects.assign_member")} labelCol={{ span: 24 }}>
                      <Table
                        style={{ maxWidth: '100%' }}
                        rowKey="key"
                        dataSource={newAssigns.map((assign) => ({ ...assign }))}
                        columns={[
                          ...roles
                        ]}
                        pagination={false}
                      />
                    </Form.Item>

                  </Row>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                </Col>
                <Col span={4}>
                  <Form.Item wrapperCol={{ span: 20 }}>
                    <Button size="large" color="#1677ff" type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={handleSave}>
                      Save
                    </Button>
                    <Button onClick={handleCancel} danger size="large" style={{ color: '#ff4d4f', backgroundColor: '#fff', borderColor: '#ff4d4f', marginLeft: '10px' }}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
          :

          <Form
            className="form-edit-project"
            form={form}
            initialValues={projectData}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ padding: 20 }}
          >
            <h2 className="add-employee">EDIT PROJECT</h2>
            <Row gutter={[16, 0]}>
              <Col span={16}>
                <Row gutter={[16, 0]} >
                  <Col span={12}>
                    <Form.Item label={t('projects.name')} name="name" rules={[{ required: true, message: 'Please enter the project name' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t('projects.manager_project')} name={['managerProject', 'name']} rules={[{ required: true, message: 'Please enter the project manager' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 0]} >
                  <Col span={12}>
                    <Form.Item name='status' label={t('projects.status')} labelCol={{ span: 24 }} >
                      <Select style={{ height: '6vh' }}  >
                        <Option value="on_progress">{t('projects.status_on_progress')}</Option>
                        <Option value="done">{t('projects.status_done')}</Option>
                        <Option value="pendding">{t('projects.status_pendding')}</Option>
                        <Option value="new">{t('projects.status_new')}</Option>
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

                        style={{ minHeight: '3rem' }}

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
                <Row gutter={[8, 16]}>
                  <Col span={12}>
                    <Form.Item label={t("projects.start_date")} name="startDate">
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                  <Col span={12}><Form.Item label={t('projects.end_date')} name="endDate" labelCol={{ span: 24 }}>
                    <DatePicker />
                  </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="technology"
                      label={t("projects.tools")}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Select
                        mode="multiple"
                        style={{ minHeight: '3rem' }}
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
                </Row>
                <Row gutter={[8, 16]}>
                  <Col span={24}>
                    <Form.Item label={t("projects.description")} name="description">
                      <TextArea rows={4} />
                    </Form.Item>
                  </Col>
                </Row>

              </Col>

              <Col xs={24} sm={24} md={7}>
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item
                      label={t("projects.members")}
                    >
                      <Select
                        value={newAssign}
                        style={{ minHeight: '3rem' }}
                        onChange={(value) => setNewAssign(value)}
                        placeholder={t("projects.members")}
                      >
                        {availableMembers.map((member) => (
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
                      style={{ minHeight: '3rem' }}
                      rules={[
                        { required: true, message: "Required" },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        value={newRoles}
                        onChange={(values) => setNewRoles(values)}
                        placeholder={t("projects.roles")}
                        style={{ width: "100%", minHeight: '3rem' }}
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
                        paddingTop: "55px",
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
                <Row >
                  <Form.Item label={t("projects.assign_member")} labelCol={{ span: 24 }}>
                    <Table
                      style={{ maxWidth: '100%' }}
                      rowKey="key"
                      dataSource={newAssigns.map((assign) => ({ ...assign }))}
                      columns={[
                        ...roles
                      ]}
                      pagination={false}
                    />
                  </Form.Item>

                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={20}>
              </Col>
              <Col span={4}>
                <Form.Item wrapperCol={{ span: 20 }}>
                  <Button size="large" color="#1677ff" type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={handleSave}>
                    Save
                  </Button>
                  <Button onClick={handleCancel} danger size="large" style={{ color: '#ff4d4f', backgroundColor: '#fff', borderColor: '#ff4d4f', marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
      }

    </>
  );
};

export default EditProject;