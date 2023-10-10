import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd';
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        // console.log('Success:', values);
        console.log('Success:');
        navigate("/repository")
        // <NavLink to=""></NavLink>
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='page-login'>
            <Form
                labelCol={{
                    span: 8,
                }}
                name="basic"
                style={{
                    maxWidth: 400,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
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
                    name="password"
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
                    className='box-buton-login'
                // wrapperCol={{
                //     offset: 8,
                //     span: 16,
                // }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login




// const Login = () => (


//     return (
    
//     )
    

// );
// export default Login