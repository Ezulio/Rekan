
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
            <Form.Item required>
                <p style={{fontWeight:"bold"}}>{check.question}</p>
                <CheckboxGroup
                    options={check.variable}
                    onChange={(data)=>props.onAnswer(data.target.value)}
                />
                <br/>
            </Form.Item>
            </div>
        );
}
            