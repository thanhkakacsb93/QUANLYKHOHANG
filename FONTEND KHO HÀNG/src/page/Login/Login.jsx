import React from 'react'
import { Navigate} from 'react-router-dom'
import { Button, Form, Input, message } from 'antd';
import "./Login.css"
import  apiUser  from '../Service/methodAxios.js';
import { TOKENS } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authSlice';


const Login = () => {
    const dispathch =useDispatch()
    const {Roleadmin, loginStatus}= useSelector((state)=>state.login)
    // const navigate = useNavigate();
    
    if (loginStatus){
       return <Navigate to={"/repository"}/>
    }
    const onFinish =async (values) => {
        try {
            const sigupUser = await apiUser.login(values)
            const token = sigupUser.data.token
            if(token){
                  sessionStorage.setItem(TOKENS.login, token)
                  const user = await apiUser.fechtcurrent()
             
                  if (user.data.data.Role==="admin"){
                      dispathch(login())
                  }
                  
                 return <Navigate to={"/repository"}/>

            }
          
            
        } catch (error) {
            message.error("ERROR! User or password wrong", 2)
        }

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