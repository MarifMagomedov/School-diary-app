import React from 'react';
import {LockOutlined, MailOutlined, NumberOutlined, SkypeOutlined, WhatsAppOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Typography} from 'antd';
import axios from 'axios'


function AuthComponent() {
    const userTypes = [
        {
            label: "Чорт немытый",
            value: "student"
        },
        {
            label: "Учитель",
            value: "teacher"
        },
        {
            label: "Менеджер",
            value: "manager"
        }
    ]

    const onFinish = (values) => {
        axios.post('http://127.0.0.1:5000/auth/register', values).then((response) => {
            if (response.status === 201) {
                console.log(response.data)
            } else {
                console.log(response.data)
            }
        })
    }

    return (
        <>
            <Typography.Title level={1}>Регистрация</Typography.Title>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                style={{width:'100%'}}
            >
                <Form.Item
                    name="user_type"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, выберите кто вы!',
                        },
                    ]}
                >
                    <Select placeholder="Выберите тип пользователя" options={userTypes}/>
                </Form.Item>
                <Form.Item
                    name="user_id"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите код доступа!',
                        },
                    ]}
                >
                    <Input prefix={<NumberOutlined className="site-form-item-icon"/>} placeholder="Код доступа"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свою почту!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Почта"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item
                    name="password_replay"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        placeholder="Пароль еще раз"
                    />
                </Form.Item>
                <Form.Item
                    name="vk"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input
                        prefix={<SkypeOutlined className="site-form-item-icon"/>}
                        placeholder="Вконтакте"
                    />
                </Form.Item>
                <Form.Item
                    name="telegram"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input
                        prefix={<WhatsAppOutlined className="site-form-item-icon"/>}
                        placeholder="Телеграмм"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: 10}}>
                        Зарегистрироваться
                    </Button>
                    <a href="">Войти</a>
                </Form.Item>
            </Form>
        </>
    )
}


export default AuthComponent;