import React, { useState, useContext, useEffect } from 'react';
import { Input, Dropdown, Menu, Icon  } from 'antd';
import CompanyContext from '../util/UserContext';
import Axios from 'axios';

export default function Perusahaan(props) {

    let [loading,setLoading] = useState(false);
    let [company, setCompany] =  useState({});
    let [allCompany,setAllCompany]=useState([]);
    const lelang = useContext(CompanyContext);

    useEffect( ()=>{
        async function getData(){
            try{
                let data = await Axios.get('', lelang.data)
                setAllCompany();
            }
            catch(e){
                alert("error " + e)
            }
        }
        getData();
    },[])

    const menu = (
        <Menu>
        {allCompany.map((data,index)=>
            (
            <Menu.Item key={index} onClick={()=>props.getData(data.COMPANY_NAME)}>
                <a >{data.COMPANY_NAME}</a>
            </Menu.Item>
            )

         )}   
        </Menu>
    )
    
    function getCompany(e) {
        let data = e.target.value;
        setCompany({ companyName: data });
    }

    async function submit(e) {
        setLoading(true);
        e.preventDefault();
            try {
              const token = await Axios.post('http://localhost:5000/lelang/insert_company', lelang.data, company);
              localStorage.setItem('token',token.data.token);
              window.location.replace('/')
            }
            catch (e) {
             alert("error " + e)
            }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center", marginTop: '15%' }}>
            <h1>Perusahaan</h1>
        <div style = {{ textAlign: "center" }}>
        <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        Pilih Perusahaan <Icon type="down" />
                    </a>
        </Dropdown>,
        <br />
        <br />
        <form style={{ textAlign: "center" }} onSubmit={(e) => submit(e)}>
            <Input placeholder="Nama Perusahaan" style={{ width: '20%', textAlign: "center" }}
                type="text" id="companyName" onInput={(e) => getCompany(e)} required></Input>
            <br />
            <br />
            <button className="submit" style={{ backgroundColor: "#2a339c", color: "white", width: "80px", height: "40px", borderRadius: "5px" }}
                type={"submit"}>{loading ? "Loading.." : "Submit"}</button>
        </form>
        </div>
        </div>
    )
}