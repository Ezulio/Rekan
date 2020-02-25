import React, { useContext, useState, useEffect } from 'react';
import { Form } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/CompanyContext';
import UserContext from '../util/UserContext';
import InputOnly from '../components/InputOnly';
import CustomInput from '../components/Input';

export default function Hitung() {

    let [loading, setLoading] = useState(false);
    let [soal, setSoal] = useState([]);
    let [allCompany, setAllCompany] = useState([]);
    let [jawaban, setJawaban] = useState([]);

    const company = useContext(CompanyContext);
    const user = useContext(UserContext);


    useEffect(() => {
        async function getData() {
            try {
                let data = await Axios.get('http://182.16.240.50:8081/rfi/getquestion');
                setSoal(data.data.pertanyaan);
            }
            catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        async function getCompany() {
            try {
                let data = await Axios.get('http://182.16.240.50:8081/rfi/getcompany')
                setAllCompany(data.data.list_company);
            }
            catch (e) {
            }
        }
        getCompany();
    }, []);

    function RenderQuestion() {
        if (soal.length !== 0) {
            return soal.map(data => {
                switch (data.type_question) {
                    case "radio":
                        return (<CustomInput data={data} onAnswer={answer => {
                            if (jawaban.length !== 0) {
                                for (let i = 0; i < jawaban.length; i++) {
                                    if (jawaban[i].id_question === answer.id_question) {
                                        jawaban[i].answer = answer.answer;
                                        break;
                                    }
                                    else if (i < jawaban.length - 1) {
                                        continue;
                                    }
                                    else {
                                        for(let i =0;i<jawaban.length;i++){
                                    delete jawaban[i].id_question;
                                    }
                                        setJawaban([...jawaban, answer]);
                                    }
                                }
                            }
                            else {
                                for(let i =0;i<jawaban.length;i++){
                                    delete jawaban[i].id_question;
                                }
                                setJawaban([...jawaban, answer]);
                            }

                        }} />)
                    case "input_only":
                        return (<InputOnly data={data} onAnswer={answer => {
                            if (jawaban.length !== 0) {
                                for (let i = 0; i < jawaban.length; i++) {
                                    if (jawaban[i].id_variablepoint === answer.id_variablepoint) {
                                        jawaban[i].answer = answer.answer;
                                        break;
                                    }
                                    else if (i < jawaban.length - 1) {
                                        continue;
                                    }
                                    else {
                                        setJawaban([...jawaban, answer])
                                    }
                                }
                            }
                            else {
                                setJawaban([...jawaban, answer])
                            }

                        }} />)

                }
            })
        }
        else {
            return (<h2 style={{ textAlign: "center" }}>Loading....</h2>)
        }
    }
    async function submit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            for(let i =0;i<jawaban.length;i++){
                delete jawaban[i].id_question;
            }
            const token = await Axios.post('http://182.16.240.50:8081/rfi/insert_answer', { jawaban, tableName: user.data });

        }
        catch (e) {
            alert("Terjadi Error, Silahkan cek Kembali Perusahaan atau Silahkan Muat Ulang Kembali")
        }
        setLoading(false);
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{user.data}</h1>
            <h1 style={{ textAlign: 'center' }}>Input Penilaian {company.perusahaan.nama}</h1>
            <div style={{ padding: '30px' }}>
                <Form onSubmit={(e) => submit(e)}>
                    {RenderQuestion()}
                    <div style={{ textAlign: "center" }}>
                        <button type={"submit"} style={{ backgroundColor: "#2a339c", color: "white", width: "150px", height: "40px", borderRadius: "5px" }}>{loading ? "Loading.." : "Submit"}</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
