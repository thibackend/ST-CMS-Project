import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  message,
  Upload,
  Select,
  DatePicker,
  Radio,
  Col,
  Space,
  Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../services/API_REQ";
import "./AddEmployee.css";
import { technologyOptions, frameOptions } from "../../data";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const AddEmployee = () => {
  const [form] = useForm();
  const navigation = useNavigate();
  const managerOptions = [
   {label: 'True', value: true},
   {label: 'False', value: false},
  ]

  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
  };

  const onFinish = async (values) => {
    try {
      await api.post("/employee", values);
      message.success("Employee added successfully");
      form.resetFields();
      navigation('/employees')
    } catch (error) {
      message.error("An error occurred while adding the employee");
    }
  };
 

  return (
   <>
    <h2>Add employee</h2>

    <Form form={form} onFinish={onFinish} className="form-add-employee">
      <Row gutter={[16,0]}>

        <Col span={12}>
          <Form.Item name='avatar'>
            <img className='image' src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71drVy8MKoL._AC_UF1000,1000_QL80_.jpg" width={100} height={100} alt="" />
            <Upload {...props} accept="image/gif">
              <button>
                <UploadOutlined /> Click to Upload
              </button>
            </Upload>
          </Form.Item>
          
          <Form.Item name='email' label="Email" labelCol={{ span: 24 }} >
            <Input placeholder="Enter email"/>
          </Form.Item>

          <Form.Item name='name' label="Name" labelCol={{ span: 24 }} >
            <Input placeholder="Enter name"/>
          </Form.Item>

          <Form.Item name='code' label="Code" labelCol={{ span: 24 }} >
            <Input placeholder="Enter code"/>
          </Form.Item>

          <Form.Item name='phone' label="Phone number" labelCol={{ span: 24 }} >
            <Input placeholder="Enter phone number"/>
          </Form.Item>

          <Form.Item name='identityCard' label="Indentity Card" labelCol={{ span: 24 }} >
            <Input placeholder="Enter card"/>
          </Form.Item>

          <Form.Item label="Birthday" name="dateOfBirth"   labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select start date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name='gender' label="Gender" labelCol={{ span: 24 }} >
            <Select style={{ height: '8vh' }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>


        </Col>

<<<<<<< HEAD
    return (
        <Form
            className='form'
            name="complex-form"
            onFinish={onFinish}
            size='large'
        >
            <Row gutter={15} style={{
                paddingLeft:20
            }}>
                <Col span={8} style={{
                    marginTop:55
                }}>
                    <Col span={24} style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft:70 }}>
                        <h2 className='' style={{
                            justifyContent:'center', alignItems:'center', marginLeft:30, marginTop:-30,paddingBottom:30,
                        }}>Xuan Le</h2>
                        <img className='image' style={{
                            marginLeft:30,paddingBottom:15,
                        }} src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71drVy8MKoL._AC_UF1000,1000_QL80_.jpg" width={100} height={130} alt="" />
                        <div className='upload-button' style={{marginTop:40}}>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Col>
                    <Row gutter={10} style={{marginTop:54}}>
                        <Col span={12} >
                            <Form.Item
                                rules={[{ required: true, message: 'Address is required' }]}
                                label="Address"
                                labelCol={{ span: 24 }}
                            >
                                <Input placeholder="Please input Address" />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item
                                rules={[{ required: true, message: 'Birthdate is required' }]}
                                label="Birthdate"
                                labelCol={{ span: 24 }}
                            >
                                <Input placeholder="Please input Birthdate" />
                            </Form.Item>
                        </Col>



                    </Row>
                    <Row gutter={8} >
                       <Col span={12}>
                       <Form.Item
                            rules={[{ required: true, message: 'Programming is required' }]}
                            label="Programming"
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="Please input Programming" />
                        </Form.Item>
                       </Col>
                       <Col span={12}>
                       <Form.Item
                            rules={[{ required: true, message: 'Technology is required' }]}
                            label="Technology"
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="Please input Technology" />
                        </Form.Item>
                       </Col>
                    </Row>
                </Col>
                <Col span={8} style={{marginTop:20}}>
                    <Form.Item
                        rules={[{ required: true, message: 'Position is required' }]}
                        name={'position'}
                        label={"Position"}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="Please input Position" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Email is required' }]}
                        name={'Email'}
                        label={"Email"}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="Please input Email" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Username is required' }]}
                        name={'Username'}
                        label={"Username"}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="Please input Username" />
                    </Form.Item>
                    <Form.Item 
                        rules={ [{ required: true, message: 'Gender is required' }]}
                        label={'Gender'}
                        labelCol={{ span: 24 }} 
                    >
                        <Select placeholder="Select your Gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        rules={ [{ required: true, message: 'Skill is required' }]}
                        label={'Skills'}
                        labelCol={{span:24}}    
                    >
                        <Input placeholder="Please input skill" />
                    </Form.Item>
                </Col>
                <Col span={8} style={{marginTop:20}}>
                    <Form.Item 
                      label={'Is Manager'}
                      labelCol={{span:24}}    
                    >
                        <Checkbox checked={checkNick} onChange={onCheckboxChange}>No</Checkbox>
                    </Form.Item>
                    <Form.Item 
                        rules= {[{ required: true, message: 'Identity card/ Passport is required' }]}
                        label={'dentity card/ Passport is required'} 
                        labelCol={{span:24}}  
                    >
                        <Input placeholder="Please input Identity card/ Passport" />
                    </Form.Item>
                     <Form.Item 
                        rules={ [{ required: true, message: 'Phone is required' }]}
                        label={'Phone'}
                        labelCol={{span:24}}    
                    >
                        <Input placeholder="Please input Phone" />
                    </Form.Item>
                    <Form.Item 
                      rules={ [{ required: true, message: 'Descriptions is required' }]}
                      label={'Descriptions'}
                      labelCol={{span:24}} 
                    >
                        <TextArea style={{ width: '250px', fontSize: '16px' }} rows={1} />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: 'Join Date is required' }]}
                        label = {'joinDate'}
                        labelCol={{span:24}}

                    >
                        <Input style={{ width: '440px' }} placeholder="Please input Join Date" />
                    </Form.Item>
                </Col>
            </Row>
            <Row span={24} >
                <div className='button-container'
                    style={{
                        display: 'flex',
                        marginLeft: 1010
                    }}
                >
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit">Cancel</Button>
                    </Form.Item>
                    <Form.Item label=" "
                        colon={false}>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </div>
            </Row>
        </Form>
    );
=======
        <Col span={12}>
          <Form.Item name='position' label="Position" labelCol={{ span: 24 }} >
              <Select style={{ height: '8vh' }}>
                <Option value="be">Backend</Option>
                <Option value="fe">Frontend</Option>
                <Option value="devops">DevOps</Option>
                <Option value="ba">BA</Option>
              </Select>
            </Form.Item>

          <Form.Item label="Frameworks" name="langFrame"   labelCol={{ span: 24 }}>
            <Select mode="multiple" placeholder="Select frameworks" optionLabelProp="label" options={frameOptions} style={{ height: '8vh' }}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                  </span>
                  {option.data.desc}
                </Space>
              )}
            />
          </Form.Item>

          <Form.Item label="Technology" name="tech"   labelCol={{ span: 24 }}>
            <Select mode="multiple" placeholder="Select technology" optionLabelProp="label" options={technologyOptions} style={{ height: '8vh' }}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                  </span>
                  {option.data.desc}
                </Space>
              )}
            />
          </Form.Item>

          <Form.Item name='description' label='Description' labelCol={{ span: 24 }} >
            <TextArea placeholder="Enter desciption"/>
          </Form.Item>

          <Form.Item name='address' label='Address' labelCol={{ span: 24 }} >
            <Input placeholder="Enter address"/>
          </Form.Item>

          <Form.Item label="Is Manager?" name="isManager" rules={[{ required: true, message: "Please select a status" }]}  labelCol={{ span: 24 }}>
          <Radio.Group buttonStyle="solid">
              {managerOptions.map((status) => (
                <Radio key={status.value} value={status.value}>
                  {status.label}
                </Radio>
              ))}
            </Radio.Group>
        </Form.Item>

        <Form.Item label="Join Date" name="joinDate"   labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select start date" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name='status' label="Status" labelCol={{ span: 24 }} >
            <Select style={{ height: '8vh' }}>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        
        </Col>
      </Row>
      
      <Row gutter={[10,0]}>
        <Col span={19}></Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit" danger > 
              Add Employee
            </Button>
          </Form.Item>
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Form.Item>
            <Button  htmlType="cancel" >
              Cancel
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
   </>
  );
>>>>>>> c043d248a36602c5e0aca95ce853810a37e19e3d
};

export default AddEmployee;
