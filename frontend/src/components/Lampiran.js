import React, { useContext, useState, useEffect } from 'react';
import { Radio, Form } from 'antd';


export default function Lampiran(props) {
    let [lampiran, setLampiran] = useState({});
    useEffect(() => {
        setLampiran(props.data);
    }, [lampiran]);

return (
    <div>
    <Form.Item required>
    <p style={{fontWeight:"bold"}}>{lampiran.question}</p>
        <Radio.Group
            options = {lampiran.variable}
            onChange={(data)=> props.onAnswer(data.target.value)}
        />
        <br/>
            </Form.Item>
    </div>
)
}
