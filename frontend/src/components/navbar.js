import React, { } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
export default function Navbar() {

    function close() {
        const { app } = window.require('electron').remote;
        app.quit();
    }

    return (
        <div style={{ display: 'flex' }}>
            <ul style={{ flex: 1 }} className="navbar">
                <li className="button"><Link to='/' style={{color:"white"}}>Rekan</Link></li>
                <li className="button"><Link to='/Perusahaan' style={{color:"white"}}>Perusahaan</Link></li>
                <li className="button"><Link to='/Profil' style={{color:"white"}}>Profile</Link></li>
                <li className="button"><Link to='/Hitung' style={{color:"white"}}>Input</Link></li>
                <li className="button"><Link to='/Hasil' style={{color:"white"}}>Hasil</Link></li>
                <li className="button"><Link to='/FAQ' style={{color:"white"}}>FAQ</Link></li>
            </ul>

            <ul style={{ justifyContent: 'flex-end' }} className="navbar">
                <div>
                    <li className="button"><Link onClick={() => close()} style={{color:"white"}}>Exit</Link></li>
                </div>

            </ul>
        </div>
    )
}