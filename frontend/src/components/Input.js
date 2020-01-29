import React, { useContext, useState, useEffect } from 'react';
import {  Radio, Input, Form } from 'antd';


export default function CustomInput (props){
    let[radioInput,setRadioInput]=useState({});
    let[chooseInput, setChooseInput] = useState();
    let [temp,setTemp]=useState('');
    useEffect(()=>{
        setRadioInput(props.data);
    },[]);
    
    const options = [
        { 
        label:radioInput.variable,
        value:radioInput.variable
        }
        ];

        onChange = e => {
            this.setState({
              value: e.target.value,
            });
          };

    return (
        <div>
        <p style={{fontWeight:"bold"}}>{radioInput.question}</p>
        <Form.Item required>
            <Radio.Group 
             options = {options}
             value = {this.state.value}
             onClick = {(data) => props.onAnswer(data.target.value)}
             >
             
            </Radio.Group>
            <br/>
            <Input.TextArea style={{ width: '20%' }}
            onBlur={data => props.onAnswer(data.target.value)}
             >
             </Input.TextArea>
            <br/>
            </Form.Item>
        </div>
    )
}