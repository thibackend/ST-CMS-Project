// ShowDetailProject.jsx

import React, { useState, useEffect } from "react";
import { Table } from 'antd';
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
        fetchDataProject();
    }, [projectId]);

    const handleEdit = () => {
        navigate(`/projects/edit/${project.id}`);
    };

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div className="project-details">
            <div className="header">
                <Title level={2} className="project-title">{project.name}</Title>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="edit-button"
                    onClick={handleEdit}
                >
                    {t("projects.edit_project")}
                </Button>
            </div>

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
                </Descriptions.Item>
                <Descriptions.Item label={t("projects.tools")} span={2}>
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
                                title: 'No',
                                dataIndex: 'rowIndex',
                                key: 'rowIndex',
                            },
                            {
                                title: 'Avatar',
                                dataIndex: 'avatar',
                                key: 'avatar',
                                render: (avatar) => avatar,
                            },
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                            },
                            {
                                title: 'Email',
                                dataIndex: 'email',
                                key: 'email',
                            },
                            {
                                title: 'Position',
                                dataIndex: 'position',
                                key: 'position',
                            },
                            {
                                title: 'Employee code',
                                dataIndex: 'code',
                                key: 'code',
                            },
                        ]}
                        pagination={false}
                    />
                </Col>

            </Row>
        </div>
    );
};

export default ShowDetailProject;
