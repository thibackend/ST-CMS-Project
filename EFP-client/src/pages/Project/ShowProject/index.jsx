import React from 'react';
import { Row, Col } from 'antd';
import ProjectCard from '../../../components/ProjectCard';

const ShowProject = () => {
  const projectData = [
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      startDate: '2022-01-01',
      deadline: '2022-02-01',
      manager: 'John Doe',
    },
    {
        title: 'Project 1',
        description: 'Description for Project 1',
        startDate: '2022-01-01',
        deadline: '2022-02-01',
        manager: 'John Doe',
      },
    {
    title: 'Project 1',
    description: 'Description for Project 1',
    startDate: '2022-01-01',
    deadline: '2022-02-01',
    manager: 'John Doe',
    },
    {
        title: 'Project 1',
        description: 'Description for Project 1',
        startDate: '2022-01-01',
        deadline: '2022-02-01',
        manager: 'John Doe',
      },
    {
    title: 'Project 1',
    description: 'Description for Project 1',
    startDate: '2022-01-01',
    deadline: '2022-02-01',
    manager: 'John Doe',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {projectData.map((project, index) => (
        <Col key={index} span={6}>
          <ProjectCard
            title={project.title}
            description={project.description}
            startDate={project.startDate}
            deadline={project.deadline}
            manager={project.manager}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ShowProject;
