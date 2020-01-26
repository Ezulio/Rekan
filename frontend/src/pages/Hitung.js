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
    let [soal,setSoal] = useState([]);
    let [pilihan, setPilihan] = useState([]);
    let [test,setTest] = useState([1,2,3,4,5]);
    let [answer, setAnswer] = useState('');

    const company = useContext(CompanyContext);

    useEffect( () => {
        async function getData(){
            try{
                let data = await Axios.get('http://localhost:5000/lelang/getquestion');
                console.log(data.data.pertanyaan)
                setSoal(data.data.pertanyaan);
            }
            catch(e){
                console.log(e);
            }
        }
        getData();
    },[]);

    function onAnswer(data){
        console.log(data)
       setAnswer(data);
    }

  

 const RenderQuestion = ()=>{
     if (soal.length!=0){
       return soal.map(data=>{
           switch(data.type_question){
            case "input":
                return(<CustomInput data={data} onAnswer={onAnswer}/>)
                case "input_only":
                   return(<InputOnly data={data} onAnswer={onAnswer}/>)
                case "lampiran":
                   return(<Lampiran data={data} onAnswer={onAnswer}/>)
                // case "checkbox":
                //    return(<CustomCheckBox data={data} onAnswer={onAnswer}/>)
           }
        })
     }
     else{
         return(<h1>Loading....</h1>)
     }
}

 

    async function submit(e) {
        setLoading(true);
        e.preventDefault();

        setLoading(false);
    }

    return (
        <div style={{padding:'10px'}}>
        <Form>
        <h1 style={{ textAlign: 'center' }}>Input Penilaian {company.data}</h1>
        <RenderQuestion/>

    
            {/* <Form style={{ textAlign: "left", marginLeft: 40 }} onSubmit={(e) => submit(e)}>
                
                <div>
                    <h3 style={{ textAlign: 'center' }}>1. Administrasi </h3>
                    { cek kategori (if kategori == 1)
                    cek jenis jawaban (if jawaban == disertakan)
                    { else jawaban }
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>2. Peminatan Tower Power </h3>
                </div>

                <div>
                    <h3 style={{ textAlign: 'center' }}>3. Financial Capability</h3>
                </div>

                <div>
                    <h3 style={{ textAlign: 'center' }}>4. Pengalaman</h3>
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>5. Team Availability</h3>
                    
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>6. Stock Material dan Logistik</h3>

                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>7. Peralatan yang Digunakan</h3>

                </div>
                <br />
                <div style={{ textAlign: "center" }}>
                    <button className="submit" style={{ backgroundColor: "#2a339c", color: "white", width: "80px", height: "40px", borderRadius: "5px" }}
                        type={"submit"}>{loading ? "Loading.." : "Input"}</button>
                    <br />
                    <br />
                </div>
            </Form> */}
            <button style={{textAlign:"center"}} onClick={()=>console.log(answer)}>Submit</button>
        </Form>
        </div>
    );
}
