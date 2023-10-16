import React from 'react'
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import apiUser from '../Service/methodAxios.js';
import moment from 'moment';

const Sigup = () => {
    const [form] = Form.useForm()
    const onFinish = async (values) => {


        try {
            const selectedDate = values.Expiry.format('YYYY-MM-DD')
            values.Expiry = selectedDate
            const sigupUser = await apiUser.signup(values)
            message.success("Đăng ký thành công", 2)
            form.resetFields()
        } catch (error) {
            message.error("LỖI! đăng ký không thành công", 2)
        }


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='page-login'>
            <Form
                form={form}
                labelCol={{
                    span: 10,
                }}
                name="basic"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    Role: 'member'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Role!',
                        },
                    ]}

                >
                    <Select>
                        <Select.Option value="admin">admin</Select.Option>
                        <Select.Option value="member">member</Select.Option>

                    </Select>
                </Form.Item>
                <Form.Item
                    label="Keyresetpassword"
                    name="Keyresetpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Keyresetpassword!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Expiry"
                    label="Expiry"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn ngày tháng!'
                        }]}>
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    className='box-buton-login'
                >
                    <Button type="primary" htmlType="submit">
                        SIGUP
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Sigup