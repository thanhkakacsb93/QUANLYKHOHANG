import React, { createContext,useEffect } from 'react'
// import { Navigate, useNavigate} from 'react-router-dom
import { Button, Form, Input, message, Modal } from 'antd';
import "./Login.css"
import  apiUser  from '../Service/methodAxios.js';
import { TOKENS } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { roleadmin, rolemember, saveUser } from '../../redux/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const dispathch =useDispatch()
    const navigate =useNavigate();
    const {Roleadmin, loginStatus, idUser }= useSelector((state)=>state.login)
    const [modal, contextHolder] = Modal.useModal();
    const ReachableContext = createContext(null);
    const UnreachableContext = createContext(null);

    const config = {
  title: 'Use Hook!',
  content: (
    <>
      <p>thanh</p>
    </>
  ),
};

  useEffect(() => {
    modal.warning(config);
  });

    if (loginStatus){
    //    return <Navigate to={"/repository"}/>
    return navigate("/repository")
    }

    const onFinish =async (values) => {
        try {
            const sigupUser = await apiUser.login(values)
            const token = sigupUser.data.token
            if(token){
                sessionStorage.setItem(TOKENS.login, token)
                const user = await apiUser.fechtcurrent()
                const checkdate = user.data.data
                if(!checkdate){
                    sessionStorage.clear()
                  return alert("! TÀI KHOẢN HẾT HẠN SỬ DỤNG. LIÊN HỆ VỚI NHÀ CUNG CẤP ĐỂ ĐƯỢC GIA HẠN")
                }
                
                  const payload={
                      id: user.data.data._id
                  }
                
                  await dispathch(saveUser(payload))
                  console.log("idUser: ", idUser);

                  if (user.data.data.Role==="admin"){
                      dispathch(roleadmin())
                  }
                  if(user.data.data.Role==="member"){
                      dispathch(rolemember())
                  }
                    return navigate("/repository")
            //    return <Navigate to={"/repository"}/>//sao k hoạt động
            }
          
        } catch (error) {
            message.error("ERROR! User or password wrong", 2)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
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
        </>
        
    )
}

export default Login




// const Login = () => (


//     return (
    
//     )
    

// );
// export default Login