import React, { useContext, useState, useEffect } from 'react';
import {  Radio, Input, Form } from 'antd';


export default function CustomInput (props){
    let[radioInput,setRadioInput]=useState({});
    let[state, setState] = useState();
    useEffect(()=>{
        setRadioInput(props.data);
    },[]);

    return (
        <div>
        <p style={{fontWeight:"bold"}}>{radioInput.question}</p>
        <Form.Item required>
            <Radio.Group 
             options = {radioInput.variable}
             onChange = {(data)=>props.onAnswer(data.target.value)}
             >
            </Radio.Group>
            <br/>
            <Input.TextArea style={{ width: '20%' }}
             onChange={(data)=>props.onAnswer(data.target.value)}            
             >
             </Input.TextArea>
            <br/>
            </Form.Item>
        </div>
    )
}