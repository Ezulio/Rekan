import React, { useContext, useState, useEffect } from 'react';
import { Radio } from 'antd';


export default function Lampiran(props) {
    let [lampiran, setLampiran] = useState({});
    useEffect(() => {
        setLampiran(props.data);
    }, [lampiran]);

return (
    <div>
    <p style={{fontWeight:"bold"}}>{lampiran.question}</p>
        <Radio.Group
            options = {lampiran.variable}
            onChange={(data)=>props.onAnswer(data.target.value)}
            value={lampiran.point}
        />
        <br/>
        <br/>
    </div>
)
}
