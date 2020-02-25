import React, { useContext, useState, useEffect } from 'react';
import { Radio, Input, Form } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/CompanyContext';




export default function CustomInput(props) {
    let [radioInput, setRadioInput] = useState({});
    let [temp, setTemp] = useState('');
    let[company, setCompany] = useState({});
    const tes = useContext(CompanyContext);

    useEffect( ()=>{
        async function getCompany(){
            try{
                let data = await Axios.get('http://182.16.240.50:8081/rfi/getcompany');
                setCompany(data.data.list_company);
            }
            catch(e){
                alert("error " + e);
            }
        }
        getCompany();
    },[]);
  

    useEffect(() => {
        setRadioInput(props.data);
    }, []);


    return (
        <div>
            <p style={{ fontWeight: "bold" }}>{radioInput.question}</p>
            <Form.Item required={true}>

                <Radio.Group

                    id={radioInput.id_question}
                    value={temp}
                    options={radioInput.variable}
                    onChange={data => {
                        setTemp(data.target.value)
                        let varId = 0;
                        for (let i = 0; i < radioInput.id_variablepoint.length; i++) {
                            if (data.target.value === radioInput.variable[i]) {

                                varId = radioInput.id_variablepoint[i]
                            }

                        }
                        let answer={
                            id_question : radioInput.id_question,
                            id_company : tes.perusahaan.id,
                            id_variablepoint: varId,
                            answer: data.target.value,
                        }
                        props.onAnswer(answer)
                    }}
                   
                >

                </Radio.Group>
 
            </Form.Item>
            
        </div>
    )
}