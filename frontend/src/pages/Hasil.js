import React, { useContext, useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import Axios from 'axios';
import TableContext from '../util/UserContext';
export default function Hasil() {
    
    let [modal, setModal] = useState(false);
    let [dataSource, setDataSource] = useState();


            useEffect( () => {
                async function getData(){
                    try{
                        let data = await Axios.post('http://localhost:5000/rfi/getTable', {tableName:table.data});
                        // console.log(data.id);
                        setDataSource(data.data.table);
                    }
                    catch(e){
                        alert("Error : " + e)
                    }
                }
                getData();
            },[])

  

     
        async function handleDelete(id) {
            try{
                let deleteData = await Axios.post('http://localhost:5000/rfi/deleteData', {tableName:table.data, id: id});
                console.log(id)
            }
            catch(e){
                alert("Error : " + e);
            }
        };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama Perusahaan',
            dataIndex: 'a_NamaPerusahaan',
            key: 'a_NamaPerusahaan',
        },
        {
            title: 'Kekayaan',
            dataIndex: 'a_Kekayaan',
            key: 'a_Kekayaan',
        },
        {
            title: 'No Telp',
            dataIndex: 'a_NoTelp',
            key: 'a_NoTelp',
        },
        {
            title: 'PIC',
            dataIndex: 'a_PIC',
            key: 'a_PIC',
        },
        {
            title: 'Email',
            dataIndex: 'a_Email',
            key: 'a_Email',
        },
        {
            title: 'Nilai',
            dataIndex: 'Nilai',
            key: 'Nilai',
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
    const table = useContext(TableContext);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Hasil {table.data}</h1>
            <Table rowKey={record => record.id} bordered dataSource={dataSource} columns={columns} />
        </div>
    )
}