import React from "react";
import './Login.css';
import { Form, Input, Button } from "antd";
import { inputPasswordRules, inputUserNameRules, styles } from './login-utils';
import api from "../../services/API_REQ";
import CookieService from '../../services/cookieStore';
import { useNavigate } from "react-router-dom";
function Login({ handleLogin }) {
    const navigate = useNavigate();
    const onFinish = (values) => {
        api.post('signin', values).then(
            res => {
                console.log("output: ", res);
                CookieService.setAuthCookie(res.data);
            });
        handleLogin(true);
        navigate('/');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-form-container flex jc-center">
            <Form
                style={styles.loginForm}
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
                <div
                    className="login-title"
                    style={styles.loginTitle}>
                    <h1 className="login-form-title color-006df0">LOG ~ IN </h1>
                </div>

                <Form.Item
                    hasFeedback
                    label="USER NAME"
                    name="username"
                    rules={inputUserNameRules}
                >
                    <Input
                        style={{
                            ...styles.formInput
                        }}
                        placeholder="Enter user name"
                    />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    name="password"
                    label="PASSWORD"
                    rules={inputPasswordRules}
                >
                    <Input.Password
                        style={styles.formInput}
                        hidden={true}
                        placeholder="Enter password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={styles.btnSubmit}
                        bordered={false}
                        htmlType="submit"
                    >
                        LOGIN
                    </Button>
                </Form.Item>
                <Form.Item>
                    <a href="#" className="resetPassText">Reset password <span className="red">?</span></a>
                </Form.Item>

            </Form>
        </div >
    );

}

export default Login