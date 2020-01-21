import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import Axios from 'axios';

export default function Perusahaan() {

    let [loading,setLoading] = useState(false);
    let [tableName, setTableName] =  useState({});
    let [allTable,setAllTable]=useState([]);


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
             alert("error " + e)
            }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Perusahaan</h1>
            <h3>Untuk membuat profil perusahaan baru</h3>
        <form style={{ textAlign: "center" }} onSubmit={(e) => submit(e)}>
            <Input placeholder="Nama Database" style={{ width: '20%', textAlign: "center" }}
                type="text" id="tableName" onInput={(e) => getTable(e)} required></Input>
            <br />
            <br />
            <button className="submit" style={{ backgroundColor: "#2a339c", color: "white", width: "80px", height: "40px", borderRadius: "5px" }}
                type={"submit"}>{loading ? "Loading.." : "Submit"}</button>
        </form>
        </div>
    )
}