import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CalendarFilled} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import './ProjectCard.css'

const ProjectCard = ({ title, description, startDate, deadline, manager }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    navigation('/projects/edit')
  };

  const handleDelete = () => {
    console.log('Delete project');
  };

  const handleViewDetail = () => {
    console.log('View project detail');
  };

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={showModal}>
          <MoreOutlined />
        </Button>
      }
    >
      <p>{description}</p>
      <p><strong>Start Date:</strong> <CalendarFilled />  {startDate}</p>
      <p><strong>Manager:</strong> {manager}</p>
      <p><strong>Deadline:</strong>  <CalendarFilled /> {deadline}</p>
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <Button type="text" icon={<EditOutlined />} onClick={handleEdit}>
          Edit Project
        </Button>
        <Button type="text" icon={<DeleteOutlined />} onClick={handleDelete}>
          Delete Project
        </Button>
        <Button type="text" icon={<EyeOutlined />} onClick={handleViewDetail}>
          View Detail
        </Button>
      </Modal>
    </Card>
  );
};

export default ProjectCard;
