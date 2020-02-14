import React, { useContext, useState, useEffect } from 'react';
import {  Input, Form } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/CompanyContext';


export default function InputOnly (props){
    let[inputOnly,setInputOnly]=useState({});
    let [temp,setTemp]=useState('');
    let [answer,setAnswer]=useState({});
    let[company, setCompany] = useState({});
    const tes = useContext(CompanyContext);
    

    
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
    useEffect(()=>{
        setInputOnly(props.data);

    },[]);
    // console.log(inputOnly.point)
    return (
        <div>
        <p style={{fontWeight:"bold"}}>{inputOnly.question}</p>
        <Form.Item required={true}>
            <Input style={{ width: '20%' }}
            id = {inputOnly.id_variablepoint}
            value={temp}
            onChange={data => {
                 setTemp(data.target.value);
                 let varId = 0;
                 let comId = 0;
                        for (let i = 0; i < company.length; i++) {
                            if (tes.perusahaan === company[i].id_company) {

                                comId = company[i].id_company;
                            }
                        }

                        for (let i = 0; i < inputOnly.point.length; i++) {
                            if (inputOnly.point[i] === 0) {

                                varId = inputOnly.id_variablepoint[i]
                            }

                        }
                 let answer = {
                     id_company : tes.perusahaan,
                    id_variablepoint:varId,
                     answer:data.target.value
                 }
                 props.onAnswer(answer);
                // setAnswer(answer);
                console.log(tes.perusahaan)
                
                 }}
            >
              </Input> 
            <br/>
            </Form.Item>
        </div>
    )
}