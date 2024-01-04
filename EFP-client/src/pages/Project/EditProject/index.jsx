import React from "react";
import { Button, Form, Input, Select, DatePicker, Col, Row ,Space } from "antd";
import './EditProject.css'
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const options = [
  {
    label: "ReactJS",
    value: "ReactJS",
    desc: "ReactJS",
  },

  {
    label: "NextJS",
    value: "NextJS",
    desc: "NextJS",
  },

  {
    label: "Laravel",
    value: "Laravel",
    desc: "Laravel",
  },
  {
    label: "Python",
    value: "Python",
    desc: "Python",
  },

  {
    label: "Angular",
    value: "Angular",
    desc: "Angular",
  },
];

const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  return (
    <div className="container">
      <h2 className="tile"> Edit Project</h2>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={24} md={12}>
            <div className="form">
              <Form.Item>
                <Input
                  placeholder="Project Name"
                  style={{ marginBottom: "20px" }}
                />
                <div className="date">
                  <DatePicker placeholder="Project Start Date" />
                  <DatePicker placeholder="Project End Date" />
                </div>
                <Input
                  placeholder="Technology"
                  style={{ marginBottom: "20px" }}
                />
                <Select placeholder="Manager">
                  <Option value="Hồ Văn Đi">Hồ Văn Đi</Option>
                  <Option value="Thu Hương">Thu Hương</Option>
                  <Option value="A Thi">A Thi</Option>
                  <Option value="Lê Xuân">Lê Xuân</Option>
                  <Option value="Hữu Thắng">Hữu Thắng</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} md={12}>
            <div className="form">
              <Form.Item>
                <Select
                  style={{ marginBottom: "20px" }}
                  mode="multiple"
                  placeholder="Frame"
                  defaultValue={["ReactJS"]}
                  onChange={handleChange}
                  optionLabelProp="label"
                  options={options}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                      </span>
                      {option.data.desc}
                    </Space>
                  )}
                />
                <Select placeholder="Status" style={{ marginBottom: "20px" }}>
                  <Option value="ToDo">ToDo</Option>
                  <Option value="InProgress">InProgress</Option>
                  <Option value="Blocked">Blocked</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
                <TextArea rows={5} placeholder="Description" maxLength={100} />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditProject;