import React, { useContext, useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import Axios from 'axios';
import TableContext from '../util/UserContext';
export default function Hasil() {

    let [dataSource, setDataSource] = useState();
    const table = useContext(TableContext);


    useEffect(() => {
        async function getData() {
            try {
                let data = await Axios.post('http://182.16.240.50:8081/rfi/get_profile', { tableName: table.data });
                console.log()
                setDataSource(data.data.hasil);
            }
            catch(e){
                alert("Silahkan Pilih Lelang Terlebih Dahulu!");
            }
        }
        getData();
    }, []);




    async function handleDelete(id) {
        try {
            let deleteData = await Axios.post('http://182.16.240.50:8081/rfi/deleteData', { tableName: table.data, id: id });
            alert("Data berhasil dihapus, Silahkan muat ulang halaman (Ctrl + R)");
        }
        catch (e) {
            alert("Terjadi Error pada saat akan menghapus silahkan periksa kembali lelang atau coba muat ulang laman");
        }
    }

    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Nilai RFI',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'Status',
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
        },
        {
            title: 'Aksi',
            dataIndex: 'operation',
            render: (text, dataIndex) => {
                return (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(dataIndex.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                )

            }
        },
    ];


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Hasil {table.data}</h1>
            <Table rowKey={record => record.value} pagination={false} bordered dataSource={dataSource} columns={columns} />
        </div>
    )
}