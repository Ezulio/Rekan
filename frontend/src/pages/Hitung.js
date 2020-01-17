import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Popconfirm, Icon, Input, Radio } from 'antd';
import Axios from 'axios';
import UserContext from '../util/UserContext';

export default function Hitung(){
    const lelang = useContext(UserContext);

    return(
        <div style={{textAlign: "center"}}>
       <Form>
           <h1>Input Penilaian {lelang.data}</h1>
           <div>
               <h3>1. Nama perusahaan </h3>
               
           </div>
       </Form>
       </div>
    )
}