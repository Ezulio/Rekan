import React, { useContext, useState, useEffect } from 'react';
import {  Radio, Input, Form } from 'antd';


export default function CustomInput (props){
    let[radioInput,setRadioInput]=useState({});
    let[chooseInput, setChooseInput] = useState();
    let [temp,setTemp]=useState('');
    useEffect(()=>{
        setRadioInput(props.data);
    },[]);
    // console.log(radioInput.id_question)
    // console.log(typeof(radioInput.id_question))
    
    console.log(radioInput)
    return (
        <div>
        <p style={{fontWeight:"bold"}}>{radioInput.question}</p>
        <Form.Item required>
    
            <Radio.Group 
             id= {radioInput.id_question}
             value={temp}
             options = {radioInput.variable}
             onChange={data => {
                 setTemp(data.target.value);
                 let answer = {
                     id_question:data.target.id,
                     answer:data.target.value
                 }
                 props.onAnswer(answer);
                // setAnswer(answer);
                 }}
             onClick={data => props.onAnswer(data.radioInput.value)}
             >
             
            </Radio.Group>
            {/* <br/>
            <Input.TextArea style={{ width: '20%' }}
             onBlur = {data => props.onAnswer(data.target.value)}
             >
             </Input.TextArea>
            <br/> */}
            </Form.Item>
        </div>
    )
}