
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox } from 'antd';

export default function CustomCheckBox(props){
  
    const CheckboxGroup = Checkbox.Group;
    let [check, setCheck] = useState({});
    useEffect(()=>{
        setCheck(props.data);
    },[check]);

        return (
            <div>
                <p style={{fontWeight:"bold"}}>{check.question}</p>
                <CheckboxGroup
                    options={check.variable}
                    onChange={(data)=>props.onAnswer(data.target.value)}
                    value={check.point}
                />
                <br/>
                <br/>
            </div>
        );
}
            