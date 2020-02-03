import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CompanyContext from '../util/UserContext';
import { Form } from 'antd';

export default function Answer(props){
    
    let [soal, setSoal]  = useState();

    useEffect(() => {
        async function getSoal() {
            try {
                let data = await Axios.get('http://localhost:5000/lelang/getanswer');
                setSoal(data.data.jawaban[0])

            }
            catch (e) {
                alert("error " + e)
            }
        }
        getSoal();
    }, [])

    useEffect(() => {
        setSoal(props.data);
    },[])

    return(
        <Form.Item>
        <p style={{fontWeight:"bold"}}>{soal.question}</p>
        <br/>
        <p>{soal.answer}</p>
        </Form.Item>
    )
}