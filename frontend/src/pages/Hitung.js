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
    let [soal, setSoal] = useState([]);
    let [answer, setAnswer] = useState("");
    let [allCompany,setAllCompany]=useState([]);

    let [coba, setCoba] = useState([]);

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

    useEffect( ()=>{
        async function getCompany(){
            try{
                let data = await Axios.get('http://localhost:5000/lelang/getcompany')
                setAllCompany(data.data.list_company);
            }
            catch(e){
                alert("error " + e)
            }
        }
        getCompany();
    },[])
    // console.log(allCompany);

    // function getCompanyId(namaPerusahaan, arrayLength){
    //     let comId = 0;
    //     for(let i = 0; i < arrayLength; i++ ){
    //         if( namaPerusahaan === allCompany[i].nama_perusahaan){
    //             comId = allCompany[i].id_company;
                
    //         }
    //     } return comId;

    // }
    function getPerusahaan(com){
        let perusahaan = allCompany;

    }
    

    function onAnswer(data) {
        answertemp.push(data);
        console.log(answertemp);
    }
    
    function RenderQuestion() {
        if (soal.length != 0) {
            return soal.map(data => {
                switch (data.type_question) {
                    
                    case "radio":
                        return (<CustomInput data={data} onAnswer={answer => {
                            
                            
                            
                            if(coba.length!=0){
                                for(let i =0;i<coba.length;i++){
                                    if (coba[i].id_variablepoint===answer.id_variablepoint){
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
                    case "input_only":
                        return (<InputOnly data={data} onAnswer={answer => {
                            if(coba.length!=0){
                                for(let i =0;i<coba.length;i++){
                                    if (coba[i].id_variablepoint===answer.id_variablepoint){
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

                }
            })
        }
        else {
            return (<h2 style={{ textAlign: "center" }}>Loading....</h2>)
        }
    }


    //insert_answer
    
    async function submit(e) {
        // setCoba({[{...coba,answer}]})
        setLoading(true);
        e.preventDefault();
        try {
            
            var jawaban = JSON.stringify({jawaban : coba});
            var parsing = JSON.parse(jawaban)
            const token = await Axios.post('http://localhost:5000/lelang/insert_answer', parsing);
            await console.log(typeof(jawaban));
            await console.log("tipe parsing: " + typeof(parsing));
              window.location.replace('/Perusahaan')
            
            
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
                <Form onSubmit={(e) => submit(e)}>
                    {RenderQuestion()}
                    <button type={"submit"} style={{ backgroundColor: "#2a339c", color: "white", width: "80px", height: "40px", borderRadius: "5px" }}>{loading ? "Loading.." : "Submit"}</button>
                </Form>
            </div>
        </div>
    );
}
