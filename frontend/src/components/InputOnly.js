import React, { useContext, useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/CompanyContext';


export default function InputOnly(props) {
    let [inputOnly, setInputOnly] = useState({});
    let [temp, setTemp] = useState('');
    let [company, setCompany] = useState({});
    const tes = useContext(CompanyContext);



    useEffect(() => {
        async function getCompany() {
            try {
                let data = await Axios.get('http://182.16.240.50:8081/rfi/getcompany');
                setCompany(data.data.list_company);
            }
            catch (e) {
                alert("error " + e);
            }
        }
        getCompany();
    }, [])
    useEffect(() => {
        setInputOnly(props.data);

    }, []);

    return (
        <div>
            <p style={{ fontWeight: "bold" }}>{inputOnly.question}</p>
            <Form.Item required={true}>
                <Input.TextArea style={{ width: '40%' }}
                    id={inputOnly.id_variablepoint}
                    value={temp}
                    onChange={data => {
                        setTemp(data.target.value);
                        let varId = 0;
                        for (let i = 0; i < inputOnly.point.length; i++) {
                            if (inputOnly.point[i] === 0) {

                                varId = inputOnly.id_variablepoint[i]
                            }

                        }
                        let answer = {
                            id_company: tes.perusahaan.id,
                            id_variablepoint: varId,
                            answer: data.target.value
                        }
                        props.onAnswer(answer);

                    }}
                >
                </Input.TextArea>
                <br />
            </Form.Item>
        </div>
    )
}