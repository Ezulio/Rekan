import React, { useContext, useState, useEffect } from 'react';
import {  Input, } from 'antd';


export default function InputOnly (props){
    let[inputOnly,setInputOnly]=useState({});
    let [temp,setTemp]=useState('');
    useEffect(()=>{
        setInputOnly(props.data);
    },[]);
    return (
        <div>
        <p>{inputOnly.question}</p>
            <Input onChange={(data)=>setTemp(data.target.value)} onBlur={()=>props.onAnswer(temp)}></Input>
            <br/>
            <br/>
        </div>
    )
}