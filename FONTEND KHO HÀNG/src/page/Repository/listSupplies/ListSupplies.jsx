import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Popconfirm, Table, Typography } from 'antd';
import apiRepo from '../../Service/methodAxios.Repo';
import { useDispatch, useSelector } from 'react-redux';
import { resetsearchSupplies, searchSupplies } from '../../../redux/auth/authSlice';

const ListSupplies = () => {
    const { namerepo, idUser, StatusSearchSupplies } = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [deleteSupplies, setdeleteSupplies] = useState(false)
    const [updateSupplies, setupdateSupplies] = useState(false)
    const [updateExport, setupdateExport] = useState(false)
    const [valueSearchSupplies, setvalueSearchSupplies] = useState(false)
    const { Search } = Input;

    const onChange = async (e) => {
        const updatevalue = e.target.value

        if (updatevalue) {
            const originData = await apiRepo.listSupplies({
                CreatorId: idUser,
                NameShelves: namerepo
            })
            const datalistSupplies = originData.data.data
            const dataSupplies = datalistSupplies.filter((item) => item.NameSupplies.toUpperCase().includes(updatevalue.toUpperCase()))
            dataSupplies.sort((a, b) => a.NameSupplies.localeCompare(b.NameSupplies))
            const Suppliessearch = dataSupplies.map((item, index) => ({ ...item, STT: index + 1, key: item._id }))

            dispatch(searchSupplies())
            setData([...Suppliessearch])
        }
        else {
            dispatch(resetsearchSupplies())
            setvalueSearchSupplies(!valueSearchSupplies)
        }

    }

    const handelgetdataSupplies = async () => {
        const originData = await apiRepo.listSupplies({
            CreatorId: idUser,
            NameShelves: namerepo
        })
        const datalistSupplies = originData.data.data
        datalistSupplies.sort((a, b) => a.NameSupplies.localeCompare(b.NameSupplies))
        const dataSupplies = datalistSupplies.map((item, index) => ({ ...item, STT: index + 1, key: item._id }))
        setData([...dataSupplies])
    }

    useEffect(() => {
        if (!StatusSearchSupplies) {
            handelgetdataSupplies()
        }
    }, [data.length, deleteSupplies, updateSupplies, updateExport, valueSearchSupplies])

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
                                required: false,
                                // message: `Please Input ${title}!`,
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


    const isEditing = (record) => record.key === editingKey;



    const edit = (record) => {
        form.setFieldsValue({
            NameSupplies: '',
            NameShelves: '',
            Quantity: '',
            Unit: '',
            Image: "",
            Export: "",
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
            const dataupdateSupplies = { ...row, id: editingKey }
            await apiRepo.updateSupplies(dataupdateSupplies)
            setupdateSupplies(!updateSupplies)
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

    const handleExport = async (record, exportValue) => {
        const bodyExport = {
            exportValue,
            id: record._id
        }
        if (+exportValue === 0) {
            return false
        }
        else {
            try {
                await apiRepo.updateexport(bodyExport)
                setupdateExport(!updateExport)
            } catch (error) {
                message.error("The export quantity cannot be greater than the inventory", 2)
            }

        }

    };

    const onReset = () => {
        form.resetFields();
    };

    const handleDelete = async (id) => {
        await apiRepo.deleteSupplies({ id })
        message.success("da xoa", 2)
        setdeleteSupplies(!deleteSupplies)
        return false
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            width: '5%',
            editable: true,
        },
        {
            title: 'NameSupplies',
            dataIndex: 'NameSupplies',
            width: '25%',
            editable: true,
        },
        {
            title: 'NameShelves',
            dataIndex: 'NameShelves',
            width: '10%',
            editable: true,
        },
        {
            title: 'Unit',
            dataIndex: 'Unit',
            width: '5%',
            editable: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            width: '10%',
            editable: true,
        },

        {
            title: 'Image',
            dataIndex: 'Image',
            width: '20%',
            editable: true,
        },
        {
            title: 'export',
            dataIndex: 'export',
            width: '40%',
            render: (_, record) => (
                <Form
                    // form={form} 
                    onFinish={(values) => handleExport(record, values.exportValue)}>
                    <Form.Item name="exportValue">
                        <Input placeholder="Enter export value" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Export
                        </Button>
                    </Form.Item>
                </Form>),
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
            }
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
                inputType: col.dataIndex === 'Quantity' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <>
            <Search
                placeholder="search Supplies"
                onChange={onChange}
                enterButton
                style={{
                    width: 200,
                }}
            />

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
        </>
    )
}

export default ListSupplies