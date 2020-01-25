import React, { useState, useEffect } from 'react';
import { Radio, Checkbox, Form, Input, Icon } from 'antd';

function renderPertanyaan(jenis, pilihan, onAnswer, onNext, checkQuestionNumber, answerData) {

    const DEFAULT_INPUT = [false,false];
    const DEFAULT_INPUTONLY = [''];

    let [input, setInput] = useState(DEFAULT_INPUT);
    let [inputOnly, setInputOnly] = useState(DEFAULT_INPUTONLY);
    let [lampiran, setLampiran] = useState(valuelampiran);
    let [checkbox, setCheckbox] = useState(checkedList);

    useEffect(() => {
        if (answerData != null) {
            switch (answerData.type) {
                case "input":
                    break;
                case "inputOnly":
                    break;
                case "lampiran":
                    break;
                case "checkbox":
                    break;
            }
        }
    }, [answerData]);

    const renderButton = () => {
        return(

        )
    }

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

            render() {
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
            };
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

            render() {
                return (
                    <div>
                        <Radio.Group
                            options={optionlampiran}
                            onChange={this.onChangelampiran}
                            value={this.state.valuelampiran}
                        />
                    </div>
                )
            };
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

            render() {
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
}

function renderSoal(props){
    let [answer, setAnswer] = useState([]);

    function onAnswer(data) {
        console.log(data);
        let item = {
            tipe: props.data[counter].jenis_pertanyaan,
            answer: data
        }
        answer.push(item);
        return(

        )
    }   
}


export default function ListPertanyaan() {

    let [ pertanyaan, setPertanyaan ] = useState();

    async function getData(){
        let data = await ;
        let parse = JSON.parse(data);
        setPertanyaan(parse);
    }
    useEffect(() => {
        getData();
    },[])
    if (pertanyaan != undefined) {
        return (
            <Content style={{ padding: 16 }}>

                <RenderSoal data={pertanyaan} />

            </Content>
        )
    }
    else {
        return (
            <Text>Loading..</Text>
        )
    }
}