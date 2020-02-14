import React from 'react';
import { Collapse } from 'antd';
import step_1 from "../image/Step_1.PNG";
import step_2 from '../image/Step_2.PNG';
import step_3 from '../image/Step_3.PNG';
import step_4 from '../image/Step_4.PNG';
import step_5 from '../image/Step_5.PNG';
import Angka from '../image/Angka_Only.PNG';
import Nominal from '../image/Nominal.PNG';
import Error from '../image/Error.PNG';
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
                            <p>Aplikasi ini sudah berada di versi stabil, namun karena keterbatasan kemampuan dan waktu
                            masih banyak terdapat fitur - fitur yang kurang dan banyak fitur - fitur yang harus
                             ditambahkan kedepannya. Mohon pengertian terhadap kekurangannya</p>
                        </li>
                        <li>
                            <p>Dalam aplikasi ini perlu banyak untuk memilih lelang dan aplikasi, dan setiap terjadi refresh / muat Ulang
                            page dimohon untuk memilih ulang lelang dan aplikasi</p>
                        </li>
                    </ul>
                </Panel>
                <Panel header="Notification: Pemberitahuan Seputar Input" key="2">
                    <ul>
                        <li>
                            <p>Dalam Page Input, ketika menginput data isian disarankan untuk memperhatikan pertanyaan yang akan dijawab dalam bentuk
                    angka dan menjawab hanya dalam bentuk angka saja.</p>
                            <img src={Angka}></img>
                        </li>
                        <li>
                            <p>Dalam Page Input, ketika menginput data isian disarankan untuk memperhatikan pertanyaan yang akan dijawab dalam bentuk
                    nominal dan menjawab hanya dalam bentuk angka saja</p>
                            <img src={Nominal}></img>
                        </li>
                    </ul>
                </Panel>
                <Panel header="Tutorial: Cara Penggunaan Dasar" key="3">
                    <p>Step 1 : Pilih Tab Rekan lalu Pilih lelang atau buat lelang baru</p>
                    <img src={step_1} style={{ width: "550px", height: "400px" }}></img>
                    <p>Step 2 : Pilih Tab Perusahaan lalu pilih perusahaan atau buat perusahaan baru</p>
                    <img src={step_2} style={{ width: "550px", height: "400px" }}></img>
                    <p>Step 3 : Pilih Tab Input lalu inputkan data, dan tekan submit untuk mengirim data</p>
                    <img src={step_3} style={{ width: "550px", height: "400px" }}></img>
                    <p>Step 4 : Ulangi Step 1 dan 2 kemudian pilih Tab Profil Untuk Melihat jawaban perusahaan</p>
                    <img src={step_4} style={{ width: "550px", height: "400px" }}></img>
                    <p>Step 5 : Pilih Tab Hasil untuk melihat hasil nilai, status dan keterangan</p>
                    <img src={step_5} style={{ width: "550px", height: "400px" }}></img>
                </Panel>
                <Panel header="Troubleshoot: Terjadi Error dan Bagaimana cara mengatasinya" key="6">
                    <ul>
                        <li>
                            <p>Ketika terjadi Error ataupun data tidak muncul, mohon untuk mengecek kembali apakah sudah memilih lelang atau perusahaan
                    dengan melihat judul di atas page <strong>(Kotak Merah)</strong>. Apabila setelah memilih lelang atau perusahaan masih
                    terdapat error, mohon cek jaringan internat anda.</p>
                            <img src={Error} style={{ width: "550px", height: "300px" }}></img>
                        </li>
                        <li>
                            <p>Apabila Setelah cara di atas masih terdapat Error, silahkan kirim Email ke yankahandra18@gmail.com</p>
                        </li>
                    </ul>
                </Panel>
            </Collapse>
        </div>
    )
}