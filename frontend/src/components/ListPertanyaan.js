import React, { useState, useEffect } from 'react';
import { Radio, Checkbox, Form, Input, Icon } from 'antd';

function RenderPertanyaan(jenis, pilihan, onAnswer, answerData) {

    let [input, setInput] = useState(valueinput);
    let [inputOnly, setInputOnly] = useState(valueInputOnly);
    let [lampiran, setLampiran] = useState(valuelampiran);
    let [checkbox, setCheckbox] = useState(checkedList);
    let [test, setTest] = useState(false);

    const json = {
        parameter_question: "Peminatan Tower Power",
        point: [0, 3],
        question: "Sumatera",
        type_question: "checkbox",
        variable: ["tidak_memilih", "memilih"]
    }

    useEffect(() => {
        if (answerData != null) {
            switch (answerData.type) {
                case "input":
                    setInput(answerData.answer);
                    setTest(!test)
                    break;
                case "inputOnly":
                    setInputOnly(answerData.answer);
                    setTest(!test)
                    break;
                case "lampiran":
                    setLampiran(answerData.answer);
                    setTest(!test)
                    break;
                case "checkbox":
                    setCheckbox(answerData.answer);
                    setTest(!test)
                    break;
            }
        }
    }, [answerData]);

    switch (jenis) {
        case 'input':
            const optionInput = [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ];

            onChangeinput = e => {
                console.log('radio checked', e.target.valueinput);
                this.setState({
                    value: e.target.valueinput,
                });
            };

            return (
                <div>
                    <Radio.Group
                        options={optionInput}
                        onChange={this.onChangeinput}
                        value={this.state.valueinput}
                    />
                    <br />
                    <Input.TextArea></Input.TextArea>
                </div>
            )
        case 'inputOnly':

            onChangeInputOnly = e => {
                console.log('radio checked', e.target.valueInputOnly);
                this.setState({
                    value: e.target.valueInputOnly,
                });
            };

            return (
                <div>
                    <Input.TextArea value={this.state.valueInputOnly}></Input.TextArea>
                </div>
            )
        case 'lampiran':
            const optionlampiran = [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ];

            onChangelampiran = e => {
                console.log('radio checked', e.target.valuelampiran);
                this.setState({
                    value: e.target.valuelampiran,
                });
            };

            return (
                <div>
                    <Radio.Group
                        options={optionlampiran}
                        onChange={this.onChangelampiran}
                        value={this.state.valuelampiran}
                    />
                </div>
            )
        case 'checkbox':

            const CheckboxGroup = Checkbox.Group;
            const optionChekbox = ['Apple', 'Pear', 'Orange'];
            onChangeCheckbox = checkedList => {
                this.setState({
                    checkedList,
                    indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
                    checkAll: checkedList.length === plainOptions.length,
                });
            };

            return (
                <div>
                    <br />
                    <CheckboxGroup
                        options={optionChekbox}
                        value={this.state.checkedList}
                        onChange={this.onChangeCheckbox}
                    />
                </div>
            );
    }
}

function RenderSoal(props) {
    let [answer, setAnswer] = useState([]);

    function onAnswer(data) {
        console.log(data);
        let item = {
            tipe: props.data.jenis_pertanyaan,
            answer: data
        }
        answer.push(item);
        return (
            <RenderPertanyaan />
        )
    }
}


export default function ListPertanyaan() {

    let [pertanyaan, setPertanyaan] = useState();

    async function getData() {
        let data;
        let parse = JSON.parse(data);
        setPertanyaan(parse);
    } W
    useEffect(() => {
        getData();
    }, [])
    return (
        <Form>
            <Content style={{ padding: 16 }}>
                <RenderSoal data={pertanyaan} />
            </Content>
        </Form>
    )
}