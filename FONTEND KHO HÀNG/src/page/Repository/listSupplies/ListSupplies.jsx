import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import apiRepo from '../../Service/methodAxios.Repo';
import { useSelector } from 'react-redux';

// const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         key: i.toString(),
//         NameSupplies: `Edward ${i}`,
//         Quantity: 32,
//         Unit: `London Park no. ${i}`,
//         Image: "",
//         Export: ""
//     });
// }



const ListSupplies = () => {
    const { namerepo, idUser } = useSelector((state) => state.login)
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    const handelgetdataSupplies = async () => {
        const originData = await apiRepo.listSupplies({
            CreatorId: idUser,
            NameShelves: namerepo
        })
        const datalistSupplies = originData.data.data
        console.log("datalistSupplies: ", datalistSupplies);
        const dataSupplies = datalistSupplies.map((item, index) => ({ ...item, STT: index + 1, key: item._id }))
        setData([...dataSupplies])
    }

    useEffect(() => { handelgetdataSupplies() }, [data.length])

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


    const isEditing = (record) => record.key === editingKey;



    const edit = (record) => {
        form.setFieldsValue({
            NameSupplies: '',
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

    const onFinish = (values, record) => {
        console.log(values);
        console.log(record);
    };
    const onReset = () => {
        form.resetFields();
    };

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
            render: (_, record) => {
                return (
                    <Form
                        form={form}
                        name="control-hooks"
                        onFinish={(values) => onFinish(values, record)}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="note"
                            rules={[
                                {
                                    required: true,
                                    message: 'chua có giá trị xuất',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
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
                inputType: col.dataIndex === 'Quantity' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <>
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