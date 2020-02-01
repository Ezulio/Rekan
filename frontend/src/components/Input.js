import React, { useContext, useState, useEffect } from 'react';
import { Radio, Input, Form } from 'antd';


export default function CustomInput(props) {
    let [radioInput, setRadioInput] = useState({});
    let [chooseInput, setChooseInput] = useState();
    let [temp, setTemp] = useState('');
    let [keterangan, setKet] = useState('');
    let [ID,setID] = useState('');

    useEffect(() => {
        setRadioInput(props.data);
    }, []);

    function kirim(){
        let answer = {
        id_variablepoint: ID,
        answer :temp ,
        keterangan: keterangan
    }
    props.onAnswer(answer);
}
    
    return (
        <div>
            <p style={{ fontWeight: "bold" }}>{radioInput.question}</p>
            <Form.Item required>

                <Radio.Group

                    id={radioInput.id_question}
                    value={temp}
                    options={radioInput.variable}
                    onChange={data => {
                        let varId = 0;

                        for (let i = 0; i < radioInput.id_variablepoint.length; i++) {
                            if (data.target.value === radioInput.variable[i]) {

                                varId = radioInput.id_variablepoint[i]
                            }

                        }
                            setID(varId)
                            // setKet(data.target.value);


                        // const varId = getVariableId(data.target.value)   
                        setTemp(data.target.value);
                        
                        // setAnswer(answer);
                    }}
                   
                >

                </Radio.Group>
                <br />
                <Input.TextArea style={{ width: '20%' }}
                    id={radioInput.id_question}
                    value={keterangan}
                    onChange={data => {
                        setKet(data.target.value)
                        kirim() 
                    }}
                >
                </Input.TextArea>
                <br />
                
            </Form.Item>
        </div>
    )
}