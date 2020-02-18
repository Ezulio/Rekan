import React, { useContext, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import tableContext from '../util/UserContext';
import CompanyContext from '../util/CompanyContext';
import Axios from 'axios';

export default function Profil() {
    let [question, setQuestion] = useState([]);
    let [answer, setAnswer] = useState([]);

    let table = useContext(tableContext);
    const company = useContext(CompanyContext);

    useEffect(() => {
        async function getData() {
            try {
                let data = await Axios.post('http://localhost:5000/lelang/getanswer', { tableName: table.data, id_company: company.perusahaan.id });
                for (var i = 0; i < data.data.jawaban[0].question.length; i++) {
                    setQuestion(data.data.jawaban[0].question);
                    setAnswer(data.data.jawaban[0].answer);
                }
            }
            catch (e) {
                alert("Silahkan Pilih Lelang dan Perusahaan atau Inputkan data perusahaan!");
            }
        }
        getData();
    }, []);

    function renderSoal() {
        let questionArray = [];
        let answerArray = [];
        let questionAnswerArray = [];

        for (let i = 0; i < question.length; i++) {
            questionArray.push({ question: question[i] });
            answerArray.push({ answer: answer[i] });
        }

        const zip = (arr, ...arrs) => {
            return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
        };
        questionAnswerArray = zip(questionArray, answerArray);

        return questionAnswerArray.map(item => renderHtml(item));
    }

    function renderHtml(item) {
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < i; j++) {
                return (
                    <div>
                        <Form.Item>
                            <h3 style={{ textDecoration: "bold" }}>{item[j].question}</h3>
                            <Input.TextArea style={{ width: '40%', textDecoration: "bold", color: "Black" }}
                                value={item[i].answer} disabled></Input.TextArea>
                        </Form.Item>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{table.data} </h1>
            <h1 style={{ textAlign: "center" }}>Rekanan {company.perusahaan.nama} </h1>
            <Form style={{ padding: '20px' }}>
                {renderSoal()}
            </Form>
        </div>
    )
}
