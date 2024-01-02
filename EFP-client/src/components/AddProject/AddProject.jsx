import React from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import "../AddProject/AddProject.css";

const { TextArea } = Input;
const { Option } = Select;

const App = () => {
  return (
    <div className="container">
      <div className="container-form">
        <h2 className="tile"> Add Project</h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="groupform">
            <div className="form">
              <Form.Item>
                <Input placeholder="Name" />
                <div className="date">
                  <DatePicker placeholder="Project Start Date" />
                  <DatePicker placeholder="Project End Date" />
                </div>

                <Select placeholder="Technology">
                  <Option value="react">React</Option>
                  <Option value="angular">Angular</Option>
                  <Option value="vue">Vue</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="form">
              <Form.Item>
                <Input placeholder="Project Name" />
                <TextArea rows={5} placeholder="Description" maxLength={100} />
              </Form.Item>
            </div>
          </div>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default App;
