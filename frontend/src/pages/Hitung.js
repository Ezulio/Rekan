import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Popconfirm, Icon, Input, Radio, Collapse, Checkbox } from 'antd';
import Axios from 'axios';
import CompanyContext from '../util/UserContext';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import InputOnly from '../components/InputOnly';
import CustomInput from '../components/Input';
import Lampiran from '../components/Lampiran';
import CustomCheckBox from '../components/CheckBox';

export default function Hitung() {

    let [loading, setLoading] = useState(false);
    let [form, setForm] = useState([]);
    let [soal, setSoal] = useState([]);
    let [pilihan, setPilihan] = useState([]);
    let [test, setTest] = useState([1, 2, 3, 4, 5]);
    let [answer, setAnswer] = useState("");

    let [coba, setCoba] = useState([]);
    let [coba2, setCoba2] = useState([]);

    const company = useContext(CompanyContext);
    let answertemp = []

    useEffect(() => {
        async function getData() {
            try {
                let data = await Axios.get('http://localhost:5000/lelang/getquestion');
                setSoal(data.data.pertanyaan);
            }
            catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    function onAnswer(data) {
        answertemp.push(data);
        console.log(answertemp);
    }




    function RenderQuestion() {
        if (soal.length != 0) {
            return soal.map(data => {
                switch (data.type_question) {
                    case "input":
                        return (<CustomInput data={data} onAnswer={onAnswer} />)
                    case "input_only":
                        return (<InputOnly data={data} onAnswer={answer => {
                            if(coba.length!=0){
                                for(let i =0;i<coba.length;i++){
                                    if (coba[i].id_question===answer.id_question){
                                        coba[i].answer=answer.answer;
                                        break;
                                    }
                                    else if (i<coba.length-1){
                                        continue;
                                    }
                                    else{
                                        setCoba([...coba,answer])
                                    }                       
                                }
                            }
                            else{
                                console.log('add');
                                setCoba([...coba,answer])
                            }
                           
                        }} />)
                    case "lampiran":
                        return (<Lampiran data={data} onAnswer={onAnswer} />)
                    case "checkbox":
                        return (<CustomCheckBox data={data} onAnswer={onAnswer} />)
                }
            })
        }
        else {
            return (<h2 style={{ textAlign: "center" }}>Loading....</h2>)
        }
    }


    //insert_answer

    async function submit(e) {
        setAnswer(answertemp)
        setLoading(true);
        e.preventDefault();
        try {
            const token = await Axios.post('http://localhost:5000/lelang/insert_answer', company.data);

        }
        catch (e) {
            alert("error " + e)
        }
        setLoading(false);
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Input Penilaian {company.data}</h1>
            <div style={{ padding: '30px' }}>
                <Form>
                    {RenderQuestion()}
                    <button onClick={() => console.log(coba)}>Simpan</button>
                </Form>
            </div>
        </div>
    );
}
