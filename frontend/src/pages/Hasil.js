import React, { useContext, useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import Axios from 'axios';
import UserContext from '../util/UserContext';
export default function Hasil() {
    
    let [modal, setModal] = useState(false);
    let [dataSource, setDataSource] = useState();


            useEffect( () => {
                async function getData(){
                    try{
                        let data = await Axios.post('http://localhost:5000/lelang/getTable', {tableName:lelang.data});
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
                let deleteData = await Axios.post('http://localhost:5000/lelang/deleteData', {id: id});
                console.log(id.data)
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
            title: 'Nilai',
            dataIndex: 'Nilai',
            key: 'Nilai',
        },
        {
            title: 'No Telp',
            dataIndex: 'a_NoTelp',
            key: 'a_NoTelp',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                )

            }
        },
    ];
    const lelang = useContext(UserContext);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Hasil {lelang.data}</h1>
            <Table rowKey={record => record.id} bordered dataSource={dataSource} columns={columns} />
        </div>
    )
}