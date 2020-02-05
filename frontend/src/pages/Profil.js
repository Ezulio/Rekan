import React, { useContext, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
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
                for (var i = 0; i < data.data.jawaban[0].question.length; i++) {
                    setCoba(data.data.jawaban[0])
                    setQuestion(data.data.jawaban[0].question)
                    setAnswer(data.data.jawaban[0].answer)
                }

            }
            catch (e) {
                alert("error " + e)
            }
        }
        getData();
    }, [])


    // function renderSoal() {
    //     let questionArray = []
    //     let answerArray = []

    //     for (let i = 0; i < question.length; i++) {
    //         if (question[i] !== undefined && answer[i] !== undefined) {
    //             if (questionArray.length == 0) {
    //                 questionArray.push(coba);
    //             }
    //             console.log(questionArray)
                
    //         }
    //     }
    //     for (let i = 0; i < question.length; i++) {
    //                     return questionArray.map(data => {
                            // return (
                            //     <div>
                            //     <h1 style={{textAlign:"center"}}>Profile {data.nama_perusahaan}</h1>
                            //     <Form style={{padding:'20px'}}>
                            //         <Form.Item>
                            //             <h3 style={{textDecoration:"bold"}}>{data.question[i]}</h3>
                            //             <Input style={{ width: '20%', textDecoration:"bold" }} value={data.answer[i]} disabled></Input>
                            //         </Form.Item>
                            //     </Form>
                            //     </div>
                            // )
    //                     })
    //                 }
    // }
    function renderSoal(){
        let questionAnswerArray= []
      
        for (let i = 0; i < question.length; i++) {
          if(question[i] !== undefined && answer[i] !== undefined) {
            questionAnswerArray.push({ question: question[i], answer: answer[i] });
          }
        }
        return questionAnswerArray.map(item => renderHtml(item));
        // const zip = (arr, ...arrs) => {
        //     return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
        //   }
        //   const resultarray = zip(question,answer)
        //   console.log(resultarray)
        //   return resultarray.map(item => renderHtml(item));
      }
      
      function renderHtml(item) {
        return (
            <div>
            <Form style={{padding:'20px'}}>
                <Form.Item>
                    <h3 style={{textDecoration:"bold"}}>{item.question}</h3>
                    <Input style={{ width: '20%', textDecoration:"bold" }} value={item.answer} disabled></Input>
                </Form.Item>
            </Form>
            </div>
        )
      }
    

    return (
        <div>
        <h1 style={{textAlign:"center"}}>Profile {company.data} </h1>
        {renderSoal()}
        </div>
    )
}
