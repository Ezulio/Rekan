import React, { useContext } from 'react';
import {} from 'antd';
import CompanyContext from '../util/UserContext';
import Axios from 'axios';

export default function Profil(){

    const company = useContext(CompanyContext);
    
    return(
        <div style={{textAlign:"center"}}>
        <h1>Profil Perusahaan</h1>
        </div>
    )
}