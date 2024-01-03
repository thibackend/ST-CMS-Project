import React from "react";
import './Login.css';
import { Form, Input, Button} from "antd";
import { inputPasswordRules, inputUserNameRules } from './auth_helper';



function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-form-container flex jc-center">
            <Form
                style={{
                    backgroundColor: '#006df0',
                    borderRadius: 20,
                    padding: 20,
                    minWidth: 500,
                    margin: 'auto auto'
                }}
                size="large"
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    sm: 24,
                }}

                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 className="login-form-title">LOGIN</h1>
                <Form.Item
                    hasFeedback
                    label="User Name"
                    name="username"
                    rules={inputUserNameRules}
                >
                    <Input
                        style={{
                            color: 'red',
                            borderRadius: 15,
                            paddingInline: 30,
                            borderRadius: 10,
                            height: 50
                        }}
                        placeholder="Enter user name"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    labelAlign="right"
                    style={{ color: 'red', fontWeight: 'bold' }}
                    rules={inputPasswordRules}
                >
                    <Input.Password
                        style={{
                            borderRadius: 15,
                            paddingInline: 30,
                            borderRadius: 10,
                            height: 50
                        }}
                        hidden={true}
                        placeholder="Enter password"

                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: 'black',
                            minWidth: '100%',
                            margin: '0 auto',
                            borderRadius: 10,
                            height: 50,
                            marginTop: 40
                        }}
                        htmlType="submit"
                    >
                        LOGIN
                    </Button>
                </Form.Item>
                <Form.Item>
                    <a href="#">Reset password</a>
                </Form.Item>

            </Form>
        </div >
    );
}

export default Login