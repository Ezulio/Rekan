import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import CompanyContext from '../util/UserContext';
import { Form } from 'antd';

export default function Answer(props){
    
    let [question, setQuestion] = useState([]);
    let [answer, setAnswer] = useState([]);
    let [coba, setCoba] = useState();
    let [coba1, setCoba1] = useState();
    let [soal, setSoal] = useState({});
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

    useEffect(() => {
        setSoal(props.data);
    },[])

        let q = []
        let jawaban = []
        // let total  = []
        for (let i = 0; i < question.length; i++) {
            if(question[i] !== undefined && answer[i] !== undefined )   {

                // total.push(question[i])
                // total.push(answer[i])
                
                q.push(question[i]);
                jawaban.push(answer[i]);
            }
        }
        function tes(){

            for(let j = 0; j <question.length; j++){
                return(
                    <Form.Item>
    <p style={{fontWeight:"bold"}}>{q[j]}</p>
    <br/>
    <p>{jawaban[j]}</p>
    </Form.Item>
            )
            }
        }
        return(
            {tes}
        )
    }