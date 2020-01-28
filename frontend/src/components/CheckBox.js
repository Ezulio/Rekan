
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'antd';

export default function CustomCheckBox(props){
  
    let [check, setCheck] = useState({});
    useEffect(()=>{
        setCheck(props.data);
    },[check]);

        return (
            <div>
            <p style={{fontWeight:"bold"}}>{check.question}</p>
            <Form.Item required>
                <Checkbox.Group
                    options={check.variable}
                    onChange={(data)=>props.onAnswer(data.target.value)}
                    onClick = {(data) => props.onAnswer(data.check.variable)}
                >
                </Checkbox.Group>
                <br/>
            </Form.Item>
            </div>
        );
}
            