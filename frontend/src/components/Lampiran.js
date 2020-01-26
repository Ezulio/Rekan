import React, { useContext, useState, useEffect } from 'react';
import { Radio } from 'antd';


export default function Lampiran(props) {
    let [lampiran, setLampiran] = useState({});
    useEffect(() => {
        setLampiran(props.data);
    }, [lampiran]);
 const optionlampiran = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];


return (
    <div>
    <p>{lampiran.question}</p>
        <Radio.Group
            onChange={(data)=>props.onAnswer(data.target.value)}
        />
    </div>
)
}
