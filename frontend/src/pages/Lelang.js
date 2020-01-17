import React, { useState } from 'react';
import { Table, Popconfirm } from 'antd';
export default function Lelang() {
    const data = [
        {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
        },
        {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
        },
    ]

    let [dataSource, setDataSource] = useState(data);
    function handleDelete(key) {
        setDataSource(dataSource.filter(data => (data.key)!== key))
    };
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: 200,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: 100,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 100,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 100,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                )

            }
        },
    ];
    return (
        <Table bordered columns={columns} dataSource={dataSource} />
    )
}

