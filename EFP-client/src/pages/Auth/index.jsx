import React, { useState } from 'react';
import './Login.css';
import { Form, Input, Button, Modal, notification } from "antd";
import { inputPasswordRules, inputEmailRules, styles } from './login-utils';
import API from "../../services/API_REQ";
import CookieService from '../../services/cookieStore';
import { useNavigate } from "react-router-dom";

function Login({ handleCookieDataAdmin }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    //notification success


    const navigate = useNavigate();
    const onFinish = async (values) => {
        await API.post('signin', values).then(
            res => {
                console.log(res);
                if (res && res.data && res.isPass) {
                    handleCookieDataAdmin([res.data]);
                    console.log(res.data)
                    return navigate('/');
                } else {
                    alert("Wrong Admin's credentials")
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        try {
            notification.open({
                message: 'Thông báo',
                description: 'Password của bạn đã gửi qua email thành công.',
                duration: 0,
              });        
              setOpen(false);
        } catch (error) {
            console.error('Error handling OK:', error);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
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
                    label="EMAIL"
                    name="email"
                    rules={inputEmailRules}
                >
                    <Input
                        style={{
                            ...styles.formInput
                        }}
                        placeholder="Enter user your email!"
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
                        className='btn-login'
                        style={styles.btnSubmit}
                        htmlType="submit"
                    >
                        LOGIN
                    </Button>
                </Form.Item>

                <Form.Item>
                    <div
                        type="primary" onClick={showModal}>
                        <a href="#" className="resetPassText">Forgot password? <span className="red">?</span></a>
                    </div>
                    <Modal
                        title="Title"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>{modalText}</p>
                    </Modal>

                </Form.Item>
            </Form>
        </div >
    );
}
export default Login