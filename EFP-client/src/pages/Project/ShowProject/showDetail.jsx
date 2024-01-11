// ShowDetailProject.jsx

import React, { useState, useEffect } from "react";
import { Progress, Space, Table, Tooltip } from 'antd';
import { Descriptions, Avatar, Button, Row, Col, Typography, Divider, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import api from "../../../services/API_REQ";
import './ShowProjectDetail.css';

const { Title, Paragraph } = Typography;

const ShowDetailProject = () => {
    const { projectId } = useParams();
    const { t } = useTranslation();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [complete, setComplete] = useState(0)
  
    useEffect(() => {
        const fetchDataProject = async () => {
            try {
                const response = await api.get(`project/${projectId}`);
                setProject(response.project);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchProgress = async () => {
            const currentDate = new Date();
            const totalMilliseconds = project.endDate - project.startDate;
            const elapsedMilliseconds = currentDate - project.startDate;
            setComplete( (elapsedMilliseconds / totalMilliseconds) * 100);
            console.log(complete);
        }
        fetchDataProject();
        fetchProgress();
    }, [projectId]);


    const handleEdit = () => {
        navigate(`/projects/edit/${projectId}`);
    };

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div className="project-details" style={{ padding: 10 }}>
            <br />
            <Title level={2} className="project-title">{project.name}</Title>
            <div className="header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="edit-button"
                    onClick={handleEdit}
                >
                    {t("projects.edit_project")}
                </Button>

                {/* <Tooltip  title="3 done / 3 in progress / 4 to do"> */}
                <Progress
                    type="circle"
                    size={'small'}
                    percent={complete}
                    success={{
                        percent: 20,
                    }}
                />
                {/* </Tooltip> */}
            </div>
            <br />
            <Descriptions bordered column={2} className="project-details" >
                <Descriptions.Item label={t("projects.manager_project")}>
                    <Avatar src={project.managerProject.avatar} alt={project.managerProject.name} />
                    {project.managerProject.name}
                </Descriptions.Item>
                <Descriptions.Item label={t("projects.status")}>{project.status}</Descriptions.Item>
                <Descriptions.Item label={t("projects.start_date")}>
                    {moment(project.startDate).format("LLL")}
                </Descriptions.Item>
                <Descriptions.Item label={t("projects.end_date")}>
                    {moment(project.endDate).format("LLL")}
                </Descriptions.Item>
                <Descriptions.Item label={t("projects.description")} span={2}>
                    {project.description}
                </Descriptions.Item>
                <Descriptions.Item label={t("projects.lang_frame")} span={2}>
                    {project.langFrame.join(", ")}
                </Descriptions.Item><Descriptions.Item label={t("projects.tools")} span={2}>
                    {project.technology.join(", ")}
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={3} className="team-title">{t("projects.project_team")}</Title>
            <Row gutter={[16, 16]} className="team-members-table" justify={"center"}>
                <Col span={24}>
                    <Table
                        dataSource={project.employee_project.map((assign, index) => ({
                            key: assign.id,
                            rowIndex: index + 1,
                            avatar: <Avatar src={assign.employee.avatar} alt={assign.employee.name} />,
                            name: assign.employee.name,
                            email: assign.employee.email,
                            position: assign.roles.join(", "),
                            code: assign.employee.code,
                        }))}
                        columns={[
                            {
                                title: t("projects.no"),
                                dataIndex: 'rowIndex',
                                key: 'rowIndex',
                            },
                            {
                                title: t("projects.avatar"),
                                dataIndex: 'avatar',
                                key: 'avatar',
                                render: (avatar) => avatar,
                            },
                            {
                                title: t("projects.employee_name"),
                                dataIndex: 'name',
                                key: 'name',
                            },
                            {
                                title: t("projects.employee_email"),
                                dataIndex: 'email',
                                key: 'email',
                            },
                            {
                                title: t("projects.employee_position"),
                                dataIndex: 'position',
                                key: 'position',
                            },
                            {
                                title: t("projects.employee_code"),
                                dataIndex: 'code',
                                key: 'code',
                            },
                        ]}
                        pagination={false}
                    />
                </Col>

            </Row>
        </div >
    );
};

export default ShowDetailProject;