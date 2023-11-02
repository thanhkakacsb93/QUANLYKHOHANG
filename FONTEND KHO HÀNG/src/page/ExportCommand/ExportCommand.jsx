import { Layout, Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const ExportCommand = () => {
    // const { dataListSuppliesCommand } = useSelector((state) => state.login)
    const { dataListSuppliesCommand } = useSelector((state) => state.login)

    console.log("dataListSuppliesCommand: ", dataListSuppliesCommand);
    // const listSuppliesCommand = [
    //     {
    //         STT: "1",
    //         NameSupplies: "giẻ lau",
    //         Unit: "kg",
    //         Quantity: "100"
    //     }
    // ]
    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            width: '5%',
            editable: true,
        },
        {
            title: 'Tên vật tư, hàng hoá',
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
            title: 'Số lượng',
            dataIndex: 'Quantity',
            width: '10%',
            editable: true,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'Price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'Money',
            width: '20%',
            editable: true,
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={[]} />
        </>

    )
}

export default ExportCommand