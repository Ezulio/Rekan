
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
                    onClick={data => props.onAnswer(data.target.value)}
                >
                </Checkbox.Group>
                <br/>
            </Form.Item>
            </div>
        );
}
            