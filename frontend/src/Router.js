import React, { useState } from 'react';
import {    
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Landing from './pages/Landing';
import Perusahaan from './pages/Perusahaan';
import Profil from './pages/Profil';
import Navbar from './components/Navbar';
import Hitung from './pages/Hitung';
import Hasil from './pages/Hasil';
import FAQ from './pages/FAQ';
import Lelang from './pages/Lelang';
import { UserProvider } from './util/UserContext';
import { CompanyProvider } from './util/CompanyContext';

export default function Router() {

    let [data,setData]=useState('');
    let [perusahaan, setPerusahaan] = useState('');

    return (
        <UserProvider value = {{data}} >
        <CompanyProvider value = {{perusahaan}} >
        <BrowserRouter>
            <Navbar />
            <div>
            <Switch >
                <Route path = '/' exact render = {(props) => <Landing 
                getData = { (data => {setData(data);
                })}/> } />
                <Route path = '/Hitung' component = { Hitung } />
                <Route path  = '/Perusahaan' exact render = {(props) => <Perusahaan 
                getPerusahaan = {(perusahaan => {setPerusahaan(perusahaan)
                })}/> } />
                <Route path  = '/Profil' component = { Profil }/>
                <Route path = '/Hasil' component = { Hasil } /> 
                <Route path = '/FAQ' component = { FAQ }/>
                <Route path = '/Lelang' component = { Lelang }/>
            </Switch>
            </div>
        </BrowserRouter>
        </CompanyProvider>
        </UserProvider>
    )
}