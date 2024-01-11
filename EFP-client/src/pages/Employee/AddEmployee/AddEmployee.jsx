import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, message, Upload, Select, DatePicker, Space, Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddEmployee.css';
// import i18n from "@/app/i18n";

const { Option } = Select;
const { TextArea } = Input;

const AddEmployee = () => {
    const [checkNick, setCheckNick] = useState(false);
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
        console.log('Received values of form: ', values);
        // Add your logic for handling form submission here
        message.success('Employee added successfully');
    };

    const onCheckboxChange = (e) => {
        setCheckNick(e.target.checked);
    };
    const renderFormItem = (label, name, rules, component) => (
        <Col span={12} key={name}>
            <div className="custom-form-item">
                <div style={{ marginBottom: 15 }}>{label}</div>
                <Form.Item name={name} rules={rules}>
                    {component}
                </Form.Item>
            </div>
        </Col>
    );

    return (
        <Form
            className='form'
            name="complex-form"
            onFinish={onFinish}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
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
                    <Row gutter={10} style={{ marginTop:54}}>
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
};

export default AddEmployee;