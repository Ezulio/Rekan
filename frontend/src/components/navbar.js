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
                <li className="button"><h4><Link to='/'>Rekan</Link></h4></li>
                <li className="button"><Link to='/Perusahaan'>Perusahaan</Link></li>
                <li className="button"><Link to='/Profil'>Profile</Link></li>
                <li className="button"><Link to='/Hitung'>Input</Link></li>
                <li className="button"><Link to='/Hasil'>Hasil</Link></li>
                <li className="button"><Link to='/FAQ'>FAQ</Link></li>
            </ul>

            <ul style={{ justifyContent: 'flex-end' }} className="navbar">
                <div>
                    <li className="button"><Link onClick={() => close()}>Exit</Link></li>
                </div>

            </ul>
        </div>
    )
}