import React from 'react'
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
// import apiUser from '../Service/methodAxios.js';
import "../../page/Sigup/Sigup.css"
import { useDispatch, useSelector } from 'react-redux';
import { outSignup } from '../../redux/auth/authSlice.js';
import { Navigate, useNavigate } from 'react-router-dom';
import apiRepo from '../../page/Service/methodAxios.Repo';
import { useForm } from 'rc-field-form';

const Addsupplies = (props) => {
    const { handleClickbuttonCancel } = props
    const { idUser } = useSelector((state) => state.login)
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        try {
            values = { ...values, CreatorId: idUser }

            const supplies = await apiRepo.addSupplies(values)

            message.success(`${supplies.data.message}`, 2)
            form.resetFields()
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
        <div className='page-signup'>
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
                    label="NameSupplies"
                    name="NameSupplies"
                    rules={[
                        {
                            required: true,
                            message: 'Please input NameSupplies!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Unit"
                    name="Unit"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Unit!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="Quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Quantity!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="NameShelves"
                    name="NameShelves"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Repo!'
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="repo1">repo1</Select.Option>
                        <Select.Option value="repo2">repo2</Select.Option>
                        <Select.Option value="repo3">repo3</Select.Option>
                        <Select.Option value="repo4">repo4</Select.Option>
                        <Select.Option value="repo5">repo5</Select.Option>
                    </Select>
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

export default Addsupplies