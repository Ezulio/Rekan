import React, { useContext, useState, useEffect } from 'react';
import {  Input, Form } from 'antd';


export default function InputOnly (props){
    let[inputOnly,setInputOnly]=useState({});
    let [temp,setTemp]=useState('');
    useEffect(()=>{
        setInputOnly(props.data);
    },[]);
    return (
        <div>
        <p style={{fontWeight:"bold"}}>{inputOnly.question}</p>
        <Form.Item required>
            <Input style={{ width: '20%' }}
             onChange={(data)=> props.onAnswer(data.target.value)}
              onBlur={()=>props.onAnswer(temp)}
            >
              </Input>
            <br/>
            </Form.Item>
        </div>
    )
}