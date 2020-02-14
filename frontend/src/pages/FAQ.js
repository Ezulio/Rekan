import React from 'react';
import { Collapse } from 'antd';
import step_1 from "../image/Step_1.PNG";
import step_2 from '../image/Step_2.PNG';
import step_3 from '../image/Step_3.PNG';
import step_4 from '../image/Step_4.PNG';
import step_5 from '../image/Step_5.PNG';
const { Panel } = Collapse;

export default function FAQ() {

    return (
        <div style={{ textAlign: "center" }}>
            <h1>FAQ</h1>
            <Collapse accordion>
                <Panel header="Notification: Informasi Dasar Aplikasi" key="1">
                <ul>
                <li>
                    <p>Aplikasi ini adalah aplikasi berbasis desktop menggunakan layanan internet, sehingga jaringan internet diperlukan agar
                    aplikasi ini dapat bekerja</p>
                </li>
                <li>
                    <p>Aplikasi ini sudah berada di versi stabil, namun masih banyak terdapat kekurangan dan
                     banyak penambahan - penambahan fitur. Mohon pengertian terhadap kekurangannya</p>
                </li>
                </ul>
                </Panel>
                <Panel header="This is panel header 3" key="2">
                    <p>testint</p>
                </Panel>
                <Panel header="Tutorial: Cara Penggunaan Dasar" key="3">
                    <p>Step 1 : Pilih Tab Rekan lalu Pilih lelang atau buat lelang baru</p>
                    <p>Step 2 : Pilih Tab Perusahaan lalu pilih perusahaan atau buat perusahaan baru</p>
                    <p>Step 3 : Pilih Tab Input lalu inputkan data, dan tekan submit untuk mengirim data</p>
                    <p>Step 4 : Ulangi Step 1 dan 2 kemudian pilih Tab Profil Untuk Melihat jawaban perusahaan</p>
                    <p>Step 5 : Pilih Tab Hasil untuk melihat hasil nilai, status dan keterangan</p>
                </Panel>
                <Panel header="This is panel header 3" key="4">
                    <p>testint</p>
                </Panel>
                <Panel header="This is panel header 3" key="5">
                    <p>testint</p>
                </Panel>
                <Panel header="Troubleshoot: Terjadi Error dan Bagaimana cara mengatasinya" key="6">
                    <p>testint</p>
                </Panel>
            </Collapse>
        </div>
    )
}