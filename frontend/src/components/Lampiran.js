import React, { useContext, useState, useEffect } from 'react';
import { Radio, Form } from 'antd';


export default function Lampiran(props) {
    let [lampiran, setLampiran] = useState({});
    useEffect(() => {
        setLampiran(props.data);
    }, [lampiran]);

return (
    <div>
    <p style={{fontWeight:"bold"}}>{lampiran.question}</p>
    <Form.Item required>
        <Radio.Group
            options = {lampiran.variable}
            onChange={(data)=> props.onAnswer(data.target.value)}
            onClick = {(data) => props.onAnswer(data.lampiran.variable)}
        />
        <br/>
            </Form.Item>
    </div>
)
}
