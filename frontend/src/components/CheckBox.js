
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'antd';

export default function CustomCheckBox(props){
  
    const CheckboxGroup = Checkbox.Group;
    let [check, setCheck] = useState({});
    useEffect(()=>{
        setCheck(props.data);
    },[check]);

        return (
            <div>
            <p style={{fontWeight:"bold"}}>{check.question}</p>
            <Form.Item required>
                <CheckboxGroup
                    options={check.variable}
                    onChange={(data)=>props.onAnswer(data.target.value)}
                    // onClick = {(data) => props.onAnswer(data.check.variable)}
                >
                </CheckboxGroup>
                <br/>
            </Form.Item>
            </div>
        );
}
            