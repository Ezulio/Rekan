import React, { useState } from 'react';
import {    
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Landing from './pages/Landing';
import Perusahaan from './pages/Perusahaan';
import Navbar from './components/navbar';
import Hitung from './pages/Hitung';
import Hasil from './pages/Hasil';
import FAQ from './pages/FAQ';
import Lelang from './pages/Lelang';
import { UserProvider } from './util/UserContext';

export default function Router() {

    let [data,setData]=useState('');

    return (
        <UserProvider value={{data}}>
        <BrowserRouter>
            <Navbar />
            <div>
            <Switch >
                <Route path = '/' exact render = {(props) => <Landing getData = { (data => {
                    setData(data);
                })}/> } />
                <Route path = '/Hitung' component = { Hitung } />
                <Route path  = '/Perusahaan' component = { Perusahaan }/>
                <Route path = '/Hasil' component = { Hasil } /> 
                <Route path = '/FAQ' component = { FAQ }/>
                <Route path = '/Lelang' component = { Lelang }/>
            </Switch>
            </div>
        </BrowserRouter>
        </UserProvider>
    )
}