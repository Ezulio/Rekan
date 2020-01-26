
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox } from 'antd';

export default function CustomCheckBox(props){
  
    const CheckboxGroup = Checkbox.Group;
    let [check, setCheck] = [{}];
    useEffect(()=>{
        setCheck(props.data);
    },[check]);
    
    const optionChekbox = [
        {

        }
      ];

    // onChangeCheckbox = checkedList => {
    //     this.setState({
    //       checkedList,
    //       indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
    //       checkAll: checkedList.length === plainOptions.length,
    //     });
    //   };

        return (
            <div>
                <br />
                <p>{check.question}</p>
                <CheckboxGroup
                    options={optionChekbox}
                    onChange={(data)=>props.onAnswer(data.target.value)}
                    value={optionChekbox.question}
                   
                />
            </div>
        );
}
            