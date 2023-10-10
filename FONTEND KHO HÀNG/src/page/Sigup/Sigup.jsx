import React from 'react'
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const Sigup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        // console.log('Success:', values);

        try {

            console.log('Success:', values);
            const sigupUser = await axios.post("http://localhost:4000/api/v1/signup", values);
            // alert("đăng ký thành công")
            form.resetFields();
        } catch (error) {
            alert("LỖI! đăng ký không thành công")
        }

        // const sigupUser = await axios.post("http://localhost:4000/api/v1/signup", values)

        // console.log("new ueser:", sigupUser.status);
        // console.log("new ueser:", sigupUser.data.data);
        // console.log("sigupUser:", sigupUser);
        // console.log("status:"status)
        // // if(sigupUser){
        //     alert("đăng ký thành công")
        // }
        // else{

        // }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='page-login'>
            <Form

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