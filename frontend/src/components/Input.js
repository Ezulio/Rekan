import React, { useContext, useState, useEffect } from 'react';
import {  Radio, Input } from 'antd';


export default function CustomInput (props){
    let[radioInput,setRadioInput]=useState({});
    useEffect(()=>{
        setRadioInput(props.data);
    },[]);

    return (
        <div>
        <p style={{fontWeight:"bold"}}>{radioInput.question}</p>
            <Radio.Group 
             options = {radioInput.variable}
             onChange = {(data)=>props.onAnswer(data.target.value)}
             value={radioInput.point}>
            </Radio.Group>
            <br/>
            <br/>
            <Input.TextArea style={{ width: '20%' }} onChange={(data)=>props.onAnswer(data.target.value)}></Input.TextArea>
            <br/>
            <br/>
        </div>
    )
}