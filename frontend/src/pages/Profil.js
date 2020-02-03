import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import CompanyContext from '../util/UserContext';
import Axios from 'axios';


export default function Profil() {
    let [question, setQuestion] = useState([]);
    let [answer, setAnswer] = useState([]);
    let [coba, setCoba] = useState();
    let [coba1, setCoba1] = useState();
    const company = useContext(CompanyContext);

    useEffect(() => {
        async function getData() {
            try {
                let data = await Axios.get('http://localhost:5000/lelang/getanswer');
                setCoba(data.data.jawaban[0])
                setQuestion(data.data.jawaban[0].question)
                setAnswer(data.data.jawaban[0].answer)

            }
            catch (e) {
                alert("error " + e)
            }
        }
        getData();
    }, [])
    function renderSoal(){
        let soal = []
        let jawaban = []
        // let total  = []
        for (let i = 0; i < question.length; i++) {
            if(question[i] !== undefined && answer[i] !== undefined )   {

                // total.push(question[i])
                // total.push(answer[i])
                
                soal.push(question[i])
                jawaban.push(answer[i])
                
                
            }
        }
        for(let j = 0; j < soal.length; j++){
            
            console.log(soal[j])
            console.log(jawaban[j])
            return(
                <div>
                    {soal[j]}
                    <br/>
                    {jawaban[j]}
                </div>
            )
        }
            }

    return (
        <div>
        <div style={{ textAlign: "center" }}>
            <h1>Profil {company.data} </h1>
        </div>
        <Form style={{padding:"10px"}}>
        {renderSoal()}  
        </Form>
        </div>
    )
}
