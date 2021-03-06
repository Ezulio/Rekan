import React, { useState, useContext, useEffect } from 'react';
import { Input, Dropdown, Menu, Icon } from 'antd';
import CompanyContext from '../util/CompanyContext';
import Axios from 'axios';

export default function Perusahaan(props) {

    let [loading, setLoading] = useState(false);
    let [company, setCompany] = useState({});
    let [allCompany, setAllCompany] = useState([]);
    const perusahaan = useContext(CompanyContext);

    useEffect(() => {
        async function getData() {
            try {

                let data = await Axios.get('http://182.16.240.50:8081/rfi/getcompany');
                setAllCompany(data.data.list_company);
            }
            catch (e) {
                alert("Terjadi Error, silahkan periksa kembali koneksi internet anda atau muat ulang laman");
            }
        }
        getData();
    }, []);

    const menu = (
        <Menu>
            {allCompany.map((data, index) =>
                (
                    <Menu.Item key={index} onClick={() => props.getPerusahaan({ id: data.id_company, nama: data.nama_perusahaan })}>
                        <a >{data.nama_perusahaan}</a>
                    </Menu.Item>
                )

            )}
        </Menu>
    )

    let id = allCompany.map((data) => (
        data.id_company
    ))

    function getCompany(e) {
        let data = e.target.value
        setCompany({
            nama_perusahaan: data,
        });
    }

    async function submit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const token = await Axios.post('http://182.16.240.50:8081/rfi/insert_company', company);
            localStorage.setItem('token', token.data.token);
            window.location.replace('/')
        }
        catch (e) {
            alert("Terjadi Error saat akan mensubmit, silahkan muat ulang laman")
        }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center", marginTop: '15%' }}>
            <h1>Kandidat Rekanan</h1>
            <div style={{ textAlign: "center" }}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        Pilih Rekanan <Icon type="down" />
                    </a>
                </Dropdown>
                <br />
                <br />
                <form style={{ textAlign: "center" }} onSubmit={(e) => submit(e)}>
                    <Input placeholder="Input Rekanan Baru" style={{ width: '20%', textAlign: "center" }}
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