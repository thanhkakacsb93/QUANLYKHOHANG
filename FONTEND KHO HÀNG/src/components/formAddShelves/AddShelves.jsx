import { Button, Form, Input } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import apiRepo from '../../page/Service/methodAxios.Repo'

const AddShelves = (props) => {
    const { handleClickbuttonCancel } = props
    const [form] = Form.useForm()
    const { idUser } = useSelector((state) => state.login)

    const onFinish = async (values) => {
        try {
            values = { ...values, CreatorId: idUser }

            await apiRepo.addShelves(values)
            handleClickbuttonCancel()
        } catch (error) {
            message.error("LỖI! đăng ký không thành công", 2)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        handleClickbuttonCancel()
    }

    return (
        <div className='page-signup' >
            <Form
                form={form}
                labelCol={{
                    span: 10,
                }}
                name="basic"
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="NameShelves"
                    name="NameShelves"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your NameShelves!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    className='box-buton-login'
                >
                    <Button type="primary" htmlType="submit">
                        OK
                    </Button>
                    <Button type="primary" onClick={handleCancel}>
                        CANCEL
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}


export default AddShelves