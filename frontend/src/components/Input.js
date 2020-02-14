import React, { useContext, useState, useEffect } from 'react';
import { Radio, Input, Form } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/CompanyContext';




export default function CustomInput(props) {
    let [radioInput, setRadioInput] = useState({});
    let [chooseInput, setChooseInput] = useState();
    let [temp, setTemp] = useState('');
    let [keterangan, setKet] = useState('');
    let [ID,setID] = useState('');
    let[company, setCompany] = useState({});
    const tes = useContext(CompanyContext);

    // const company = useContext(CompanyContext);
    useEffect( ()=>{
        async function getCompany(){
            try{
                let data = await Axios.get('http://localhost:5000/lelang/getcompany')
                setCompany(data.data.list_company);
            }
            catch(e){
                alert("error " + e)
            }
        }
        getCompany();
    },[])
  

    useEffect(() => {
        setRadioInput(props.data);
    }, []);

   
        // console.log(keterangan);
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
                            id_company : tes.perusahaan,
                            id_variablepoint: varId,
                            answer: data.target.value,
                        }
                            // setID(varId)
                            // setKet(data.target.value);
                        

                        // const varId = getVariableId(data.target.value)   
                        // setTemp(data.target.value);
                        props.onAnswer(answer)
                        console.log(answer)
                        
                        
                        // setAnswer(answer);
                    }}
                   
                >

                </Radio.Group>
 
            </Form.Item>
            
        </div>
    )
}