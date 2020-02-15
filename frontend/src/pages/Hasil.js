import React, { useContext, useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import Axios from 'axios';
import TableContext from '../util/UserContext';
export default function Hasil() {
    
    let [modal, setModal] = useState(false);
    let [dataSource, setDataSource] = useState();
    const table = useContext(TableContext);


            useEffect( () => {
                async function getData(){
                    try{
                        let data = await Axios.post('http://localhost:5000/lelang/get_profile', {tableName:table.data});
                        setDataSource(data.data.hasil);
                    }
                    catch{
                        alert("Silahkan Pilih Lelang Terlebih Dahulu!")
                        window.location.replace('/')
                    }
                }
                getData();
            },[])

  

     
        async function handleDelete(id) {
            try{
                let deleteData = await Axios.post('http://localhost:5000/lelang/deleteData', {tableName:table.data, id:id });
                alert("Data berhasil dihapus, laman akan dimuat ulang")
                window.location.replace('/')
            }
            catch(e){
                alert("Terjadi Error pada saat akan menghapus silahkan periksa kembali lelang atau coba muat ulang laman")
            }
        };

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
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
            title: 'operation',
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