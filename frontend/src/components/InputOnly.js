import React, { useContext, useState, useEffect } from 'react';
import {  Input, Form } from 'antd';


export default function InputOnly (props){
    let[inputOnly,setInputOnly]=useState({});
    let [temp,setTemp]=useState('');
    let [answer,setAnswer]=useState({});
    useEffect(()=>{
        setInputOnly(props.data);
    },[]);
    
    
    return (
        <div>
        <p style={{fontWeight:"bold"}}>{inputOnly.question}</p>
        <Form.Item required>
            <Input style={{ width: '20%' }}
            id = {inputOnly.id_question}
            value={temp}
            onChange={data => {
                 setTemp(data.target.value);
                 let answer = {
                     id_question:data.target.id,
                     answer:data.target.value
                 }
                 props.onAnswer(answer);
                // setAnswer(answer);
                 }}
            >
              </Input> 
            <br/>
            </Form.Item>
        </div>
    )
}