import React, { useContext, useState, useEffect } from 'react';
import { Radio, Form } from 'antd';


export default function Lampiran(props) {
    let [lampiran, setLampiran] = useState({});
    let [temp,setTemp]=useState('');
    useEffect(() => {
        setLampiran(props.data);
    }, [lampiran]);

return (
    <div>
    <p style={{fontWeight:"bold"}}>{lampiran.question}</p>
    <Form.Item required>
    <Radio.Group 
             id= {lampiran.id_question}
             value={temp}
             options = {lampiran.variable}
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
        <br/>
            </Form.Item>
    </div>
)
}
