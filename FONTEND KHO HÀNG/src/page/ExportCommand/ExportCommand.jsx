import { Layout, Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import SchemaExportCommand from './SchemaExportCommand/SchemaExportCommand'

const ExportCommand = () => {
    const { dataListSuppliesCommand } = useSelector((state) => state.login)
    const datalocalstorage = JSON.parse(localStorage.getItem("dataexport"))

    const grupdataExport = datalocalstorage.reduce((acc, obj) => {
        let checkNameSupplies = acc.find((item) => item.NameSupplies === obj.NameSupplies);
        if (checkNameSupplies) {
            const updatedItem = { ...checkNameSupplies, Quantity: +(checkNameSupplies.Quantity) + +(obj.Quantity) };
            acc = acc.map((item) => (item.NameSupplies === obj.NameSupplies ? updatedItem : item));
        } else {
            acc.push(obj);
        }
        return acc;
    }, [])
    console.log("grupdataExport: ", grupdataExport);

    return (
        <>
            <SchemaExportCommand grupdataExport={grupdataExport} />

        </>

    )
}

export default ExportCommand