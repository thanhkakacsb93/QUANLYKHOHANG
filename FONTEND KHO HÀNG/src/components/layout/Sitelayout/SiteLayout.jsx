import { Col, Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const SiteLayout = () => {
    return (
        <>

            <Row>
                <Col span={4} >
                    <div>
                        <Header />
                    </div>
                </Col>

                <Col span={20}>
                    <main>
                        <Outlet />
                    </main>
                </Col>
            </Row>



        </>
    )
}

export default SiteLayout

////////////

