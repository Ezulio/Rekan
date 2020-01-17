import React, { useContext, useState,useEffect } from 'react';
import Axios from 'axios';
import { Menu, Dropdown, Icon, Button, Input } from 'antd';
import TableContext from '../util/UserContext';
export default function Landing(props) {

    let [loading,setLoading] = useState(false);
    let [tableName, setTableName] =  useState({});
    let [allTable,setAllTable]=useState([]);
    const table = useContext(TableContext);



    useEffect( ()=>{
        async function getData(){
            try{
                let data = await Axios.get('http://localhost:5000/lelang/getDb');
                setAllTable(data.data.db);

            }
            catch(e){
                console.log(e);
            }
    
        }
        getData();
    },[])

     

    const menu = (
        <Menu>
        {allTable.map((data,index)=>
            (
            <Menu.Item key={index} onClick={()=>props.getData(data.TABLE_NAME)}>
                <a >{data.TABLE_NAME}</a>
            </Menu.Item>
            )

         )}   
        </Menu>
    )

    function getTable(e) {
        let data = e.target.value;
        setTableName({ tableName: data });
    }

    async function submit(e) {
        setLoading(true);
        e.preventDefault();
            try {
              const token = await Axios.post('http://localhost:5000/lelang/newtable', tableName);
              localStorage.setItem('token',token.data.token);
              window.location.replace('/')
            }
            catch (e) {
             alert("error")
            }
        setLoading(false);
    }
  
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: '15%' }}>Welcome to Manhattan Project</h1>
            <div style={{ textAlign: "center" }}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        Pilih Database <Icon type="down" />
                    </a>
                </Dropdown>,
                <br />
                <br />
                <form style={{ textAlign: "center"}} onSubmit = { (e) => submit(e) }>
                <Input placeholder="Nama Database" style={{ width: '20%', textAlign: "center"}}
                 type="text" id = "tableName" onChange = {(e) => getTable(e)} required></Input>
                <br />  
                <br />
                <button className="submit" style={{backgroundColor:"#2a339c", color:"white", width:"80px",height:"40px",borderRadius:"5px"}}
                 type={"submit"}>{loading?"Loading..":"Submit"}</button>
                </form>
            </div>
        </div>
    )
}