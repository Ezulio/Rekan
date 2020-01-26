import React, { useContext, useState, useEffect } from 'react';
import {  Radio, Input } from 'antd';


export default function CustomInput (props){
    let[radioInput,setRadioInput]=useState({});
    useEffect(()=>{
        setRadioInput(props.data);
    },[]);

    return (
        <div>
        <p>{radioInput.question}</p>
            <Radio.Group 
            //  options={(data)=>props.}
             onChange={(data)=>props.onAnswer(data.target.value)}>
            </Radio.Group>
            <br/>
            <Input.TextArea onChange={(data)=>props.onAnswer(data.target.value)}></Input.TextArea>
        </div>
    )
}