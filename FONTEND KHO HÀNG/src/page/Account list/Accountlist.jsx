
import React, { useState } from 'react';
import { Form, Input, InputNumber, message, Popconfirm, Table, Typography } from 'antd';
import apiUser from '../Service/methodAxios';
import { useEffect } from 'react';
import "./Accountlist.css"
import Sigup from '../Sigup/Sigup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Accountlist = () => {
    const dispatch = useDispatch()
    const { clickSignup } = useSelector((state) => state.login)
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [clickSubmit, setclickSubmit] = useState(false)
    const [renderDeleteUser, setrenderDeleteUser] = useState(false)
    const { idUser } = useSelector((state) => state.login)
    const navigate = useNavigate()

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const hadleViewAccount = async () => {

        const dataaccout = await apiUser.account()
        const arrAccount = dataaccout.data.data
        arrAccount.sort((a, b) => a.Username.localeCompare(b.Username))
        const lisaccount = arrAccount.map((item, index) => ({
            ...item, STT: index + 1, key: item._id
        }))
        setData([...lisaccount])
        // console.log(data);
    }
    useEffect(() => { hadleViewAccount() }, [data.length, clickSubmit, renderDeleteUser])

    const handleDelete = async (a) => {
        if (idUser === a) {
            console.log("idUser: ", idUser)
            // sessionStorage.clear()
            // navigate("/")
        }
        await apiUser.deleteUser({ id: a })
        message.success("da xoa", 2)
        setrenderDeleteUser(!renderDeleteUser)
        return false
    }

    const edit = async (record) => {
        form.setFieldsValue({
            Username: '',
            Role: '',
            Expiry: '',
            Keyresetpassword: "",
            id: "",
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const dataupdate = { ...row, id: editingKey }
            await apiUser.updateUser(dataupdate)
            console.log("row: ", row);
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            width: '10%',
            editable: false,
        },
        {
            title: 'Username',
            dataIndex: 'Username',
            width: '25%',
            editable: false,
        },
        {
            title: 'Role',
            dataIndex: 'Role',
            width: '10%',
            editable: true,
        },
        {
            title: 'Keyresetpassword',
            dataIndex: 'Keyresetpassword',
            width: '20%',
            editable: false,
        },
        {
            title: 'Expiry',
            dataIndex: 'Expiry',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <span>
                        {editingKey === record.key ? (
                            <span>
                                <Typography.Link
                                    onClick={() => save(record.key)}
                                    style={{ marginRight: 8 }}
                                >
                                    Save
                                </Typography.Link>
                                <Popconfirm
                                    title="Sure to cancel?"
                                    onConfirm={cancel}
                                >
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <Typography.Link
                                disabled={editingKey !== ''}
                                onClick={() => edit(record)}
                            >
                                Edit
                            </Typography.Link>
                        )}
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                            onCancel={() => { return false }}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
                )
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'Expiry' ? 'date' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleSubmit = () => {
        setclickSubmit(!clickSubmit)
    }
    const formSignup = (
        <div className='box-signup'><Sigup handleSubmit={handleSubmit} /></div>
    )

    const handlsignup = () => {
        dispatch(signup())

    }


    return (
        <>

            {/* <div className='box-signup'><Sigup /></div> */}
            {clickSignup ? formSignup : ""}
            <div className='box-account'>
                <div>
                    <button onClick={handlsignup} className='sticky top-1 left-[90%] mb-4 bg-[yellow] px-4 py-2 b rounded-[10px] border-solid border-[1px] border-black' >Add</button>

                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>
                </div>


            </div>

        </>

    );
};
export default Accountlist;

