import React, { useContext, useEffect, useState } from 'react';
import { } from 'antd';
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
                setQuestion(data.data.jawaban[0].question)
                setAnswer(data.data.jawaban[0].answer)

            }
            catch (e) {
                alert("error " + e)
            }
        }
        getData();
    }, [])

    let soal = []

        for (let i = 0; i < question.length; i++) {
            soal.push(question[i])
            soal.push(answer[i])

        }
        console.log(soal)
    // for(let i = 0; i < question.length; i++){
    //     console.log(question[i])
    //     console.log(answer[i])
    // }
    return (
        <div>
        <div style={{ textAlign: "center" }}>
            <h1>Profil {company.data} </h1>
        </div>
        <div style={{padding:"10px"}}>
            {soal.map((data,index)=>
            <p key={index} style={{fontWeight:"bold"}}>{data}</p>
            )}
        </div>
        </div>
    )
}