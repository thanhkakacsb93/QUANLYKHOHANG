import { Table } from 'antd'
import React from 'react'
import "./SchemaExportCommand.css"

const SchemaExportCommand = (props) => {
    const { grupdataExport } = props


    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            width: '5%',
            editable: true,
            align: 'center'
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
            align: 'center'
        },
        {
            title: 'Số lượng',
            dataIndex: 'Quantity',
            width: '10%',
            editable: true,
            align: 'center'
        },
        {
            title: 'Đơn giá',
            dataIndex: 'Price',
            width: '20%',
            editable: true,
            align: 'center'
        },
        {
            title: 'Thành tiền',
            dataIndex: 'Money',
            width: '20%',
            editable: true,
            align: 'center'
        },
    ]
    return (
        <>
            <div className='SchemaExportCommand'>
                <div className='SchemaExportCommand-header'>
                    <div className='SchemaExportCommand-header-1'>
                        <span>BỘ TƯ LỆNH CẢNH SÁT BIỂN</span>
                        <span> <strong>BỘ TƯ LỆNH</strong> </span>
                        <span> <strong>VÙNG CẢNH SÁT BIỂN 2</strong> </span>
                        <hr />
                    </div>
                    <div className='SchemaExportCommand-header-2'>

                    </div>
                    <div className='SchemaExportCommand-header-3'>
                        <span className='SchemaExportCommand-header-3-text1' > <strong>Mẫu số: 02 VTQĐ</strong></span>
                        <div className='SchemaExportCommand-header-3-text2'>
                            <span>số: </span> <span>04 </span> <span>KTĐT</span>
                        </div>

                    </div>
                </div>
                <div className='SchemaExportCommand-command'>
                    <span><strong>LỆNH XUẤT KHO</strong> </span>
                    <span className='SchemaExportCommand-command-text2'>(có giá trị đến ngày: <span className='SchemaExportCommand-command-text2'>20/11/2023</span>)</span>

                </div>
                <div className='SchemaExportCommand-informationImport'>
                    <div>
                        <span>tên người nhận: </span>    <span>Lê Xuân Thành</span>
                    </div>
                    <div>
                        <span>Địa chỉ: </span>  <span>Tàu 4037</span>
                    </div>
                    <div>
                        <span>Lý do xuất: </span>  <span>Xuất sử dụng</span>
                    </div>
                    <div>
                        <span>Xuất tại kho: </span>  <span>Kỹ thuật</span>
                    </div>
                </div>


                <Table columns={columns} dataSource={grupdataExport} pagination={false} bordered />


                <div className='SchemaExportCommand-informationImport'>
                    <div>
                        <span>Tổng cộng: </span>  <span> 4 </span> <span>khoản</span>
                    </div>
                    <div>
                        <span>Thành tiền (Bằng chữ): </span> <span> 45000000</span>
                        <span>(</span> <span> bốn mươi lăm triệu đồng</span> <span>)</span>
                    </div>
                    <div>
                        <span>Giao nhận: </span> <span> 24/10/2023</span>
                    </div>
                </div>

                <div className='SchemaExportCommand-sign'>
                    <div className='SchemaExportCommand-sign-1'>
                        <span><strong>THỦ KHO</strong></span>
                        <span><strong>2//CN Đậu Minh Hà</strong> </span>
                    </div>

                    <div className='SchemaExportCommand-sign-1'>
                        <span><strong>NGƯỜI NHẬN</strong></span>

                    </div>
                    <div className='SchemaExportCommand-sign-1'>
                        <span><strong>NGƯỜI VIẾT LỆNH</strong></span>
                        <span><strong>3/ Bùi Văn Đức </strong> </span>
                    </div>
                    <div className='SchemaExportCommand-sign-4'>
                        <div className=' flex flex-col items-center'>
                            <span><strong>TL.TƯ LỆNH</strong></span>
                            <span><strong>CHỦ NHIỆM KỸ THUẬT</strong></span>
                        </div>


                        <span><strong>4// Phan Huy Tứ</strong> </span>
                    </div>

                </div>


            </div >
        </>

    )
}

export default SchemaExportCommand