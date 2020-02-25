import React, { useContext, useEffect, useState } from 'react';
import { Form, Empty } from 'antd';
import tableContext from '../util/UserContext';
import CompanyContext from '../util/CompanyContext';
import Axios from 'axios';

export default function Summary() {
    let [nilai, setNilai] = useState([]);
    let [NIB, setNIB] = useState([]);
    let [kegiatan, setKegiatan] = useState([]);
    let [modal, setModal] = useState([]);
    let [tower, setMtower] = useState([]);
    let [power, setMpower] = useState([]);
    let [topo, setMtopo] = useState([]);
    let [msumatra, setMsumatra] = useState([]);
    let [mkalimantan, setMkalimantan] = useState([]);
    let [mnusra, setMnusra] = useState([]);
    let [msulawesi, setMsulawesi] = useState([]);
    let [mmaluku, setMmaluku] = useState([]);
    let [mpapua, setMpapua] = useState([]);
    let [mpapbar, setMpapbar] = useState([]);
    let [msite, setMsite] = useState([]);
    let [garansi, setGaransi] = useState([]);
    let [audit, setAudit] = useState([]);
    let [plafond, setPlafond] = useState([]);
    let [lender, setLender] = useState([]);
    let [presentase, setPresentase] = useState([]);
    let [saham, setSaham] = useState([]);
    let [lingkup, setLingkup] = useState([]);
    let [pSumatra, setPsumatra] = useState([]);
    let [pKalimantan, setPkalimantan] = useState([]);
    let [pNusra, setPnusra] = useState([]);
    let [pSulawesi, setPsulawesi] = useState([]);
    let [pMaluku, setPmaluku] = useState([]);
    let [pPapua, setPpapua] = useState([]);
    let [pPapbar, setPpapbar] = useState([]);
    let [site, setSite] = useState([]);
    let [tim, setTim] = useState([]);
    let [personel, setPersonel] = useState([]);
    let [sertifikasi, setSertifikasi] = useState([]);
    let [klasifikasi, setKlasifikasi] = useState([]);
    let [mobilisasi, setMobilisasi] = useState([]);
    let [rampup, setRampup] = useState([]);
    let [sTower, setStower] = useState([]);
    let [sPower, setSpower] = useState([]);
    let [STKDN, setSTKDN] = useState([]);
    let [gudang, setSgudang] = useState([]);
    let [logistik, setSlogistik] = useState([]);
    let [delivery, setSdelivery] = useState([]);
    let [support, setSupport] = useState([]);   
    let [planning, setPlanning] = useState([]);
    let [peta, setPeta] = useState([]);
    let table = useContext(tableContext);
    const company = useContext(CompanyContext);
    
    useEffect(() => {
        

        async function getData() {
            try {
                let data = await Axios.post('http://182.16.240.50:8081/rfi/get_profile', { tableName: table.data });
                for (let i = 0; i < data.data.hasil.length; i++) {
                    if (data.data.hasil[i] !== Empty) {
                        if (data.data.hasil[i].id === company.perusahaan.id) {
                            setNilai(data.data.hasil[i])
                        }
                    } else {
                        continue;
                    }
                }
            }
            catch (e) {
                alert("Error, Silahkan Pilih Tabel");
            }
        }
        getData();
        
    }, []);
    useEffect(() => {

        async function setSummary(){
            try{    
                let summary = await Axios.post('http://182.16.240.50:8081/rfi/get_executive_summary', { tableName: table.data, id_company: company.perusahaan.id });
                setSummary(summary)
                //administrasi
                setNIB(summary.data.answer.administrasi[0].answer);
                setKegiatan(summary.data.answer.administrasi[1].answer);
                setModal(summary.data.answer.administrasi[2].answer);
                //minat
                setMtower(summary.data.answer.minat[0].answer);
                setMpower(summary.data.answer.minat[1].answer);
                setMtopo(summary.data.answer.minat[2].answer);
                setMsumatra(summary.data.answer.minat[3].answer);
                setMkalimantan(summary.data.answer.minat[4].answer);
                setMnusra(summary.data.answer.minat[5].answer);
                setMsulawesi(summary.data.answer.minat[6].answer);
                setMmaluku(summary.data.answer.minat[7].answer);
                setMpapua(summary.data.answer.minat[8].answer);
                setMpapbar(summary.data.answer.minat[9].answer);
                setMsite(summary.data.answer.minat[10].answer);
                //finansial
                setGaransi(summary.data.answer.financial[0].answer);
                setPlafond(summary.data.answer.financial[1].answer);
                setAudit(summary.data.answer.financial[2].answer);
                setPresentase(summary.data.answer.financial[3].answer)
                setLender(summary.data.answer.financial[4].answer);
                setSaham(summary.data.answer.financial[5].answer);
                //pengalaman
                setLingkup(summary.data.answer.pengalaman[0].answer);
                setPsumatra(summary.data.answer.pengalaman[1].answer);
                setPkalimantan(summary.data.answer.pengalaman[2].answer);
                setPnusra(summary.data.answer.pengalaman[3].answer);
                setPsulawesi(summary.data.answer.pengalaman[4].answer);
                setPmaluku(summary.data.answer.pengalaman[5].answer);
                setPpapua(summary.data.answer.pengalaman[6].answer);
                setPpapbar(summary.data.answer.pengalaman[7].answer);
                setSite(summary.data.answer.pengalaman[8].answer);
                //tim
                setTim(summary.data.answer.team[0].answer);
                setPersonel(summary.data.answer.team[1].answer);
                setSertifikasi(summary.data.answer.team[2].answer);
                setKlasifikasi(summary.data.answer.team[3].answer);
                setMobilisasi(summary.data.answer.team[4].answer);
                setRampup(summary.data.answer.team[5].answer);
                //material
                setStower(summary.data.answer.stock[0].answer);
                setSpower(summary.data.answer.stock[1].answer);
                setSTKDN(summary.data.answer.stock[2].answer);
                setSgudang(summary.data.answer.stock[3].answer);
                setSlogistik(summary.data.answer.stock[4].answer);
                setSdelivery(summary.data.answer.stock[5].answer);
                //peralatan
                setSupport(summary.data.answer.peralatan[0].answer);
                setPlanning(summary.data.answer.peralatan[1].answer);
                setPeta(summary.data.answer.peralatan[2].answer);
            }catch(e){
                console.log("Error, Silahkan Pilih Tabel dan Perusahaan")
            }

        }
        setSummary();
    }, [])

    function getSummary(){
        return(
            <>
            <Form.Item >
                    <h1 style={{ textAlign: "center" }}>Executive Summary</h1>
                    <h3 style={{ textAlign: "center" }}>{company.perusahaan.nama} </h3>
                </Form.Item>
                <Form.Item>
                    Hasil Penilaian dari data yang diterima oleh BAKTI, {company.perusahaan.nama} dinyatakan {nilai.status} dan {nilai.keterangan} untuk tahap selanjutnya. Detail dari hasil penilaian yang sudah dilakukan adalah :
                </Form.Item>
                <Form.Item>
                    <strong>1.	Administrasi</strong>
                    <br />
                        Memiliki NIB/SIUP dengan No {NIB} dan memiliki jenis kegiatan usaha {kegiatan}, serta memiliki kekayaan bersih sebesar Rp. {modal}.
                </Form.Item>
                <Form.Item>
                    <strong>2.	Peminantan</strong>
                    <br />
                    Menyatakan berminat untuk ikut dalam penyediaan dengan {tower} Tower, {power} Power dan {topo} Tower dan Power.
                    <br />
                    Menyatakan berminat melakukan penyediaan dengan {msumatra} di lokasi Sumatera,  {mkalimantan} di lokasi Kalimantan, {mnusra} di lokasi Nusa Tenggara, {msulawesi} di lokasi Sulawesi, {mmaluku} di lokasi Maluku, {mpapua} di lokasi Papua dan {mpapbar} di lokasi Papua Barat sebanyak  {msite} site.     
                </Form.Item>
                <Form.Item>
                    <strong>3.	Kemampuan Keuangan</strong>
                    <br/>
                    Data perusahaan  yang diterima untuk kelengkapan Bank Garansi/Jaminan Bank {garansi}, laporan keuangan 1 tahun terakhir (teraudit) {audit} memiliki Plafond sebesar Rp {plafond} dan siap untuk menggunakan {presentase} keuangan untuk proyek ini.
                    <br/>
                    Perusahaan juga menyatakan {lender} Surat Dukungan dari Lender, dan {saham} surat dukungan pendanaan dari pemegang saham.
                </Form.Item>
                <Form.Item>
                <strong>4.	Pengalaman</strong>
                <br/>
                Data perusahaan yang diterima, menyatakan {lingkup} Pengalaman di lingkup yang sejenis dengan kecepatan membangun {site} Titik. 
                 <br />
                Perusahaan juga menyatakan {pSumatra} pengalaman membangun di lokasi Sumatera,  {pKalimantan} pengalaman membangun di lokasi Kalimantan, {pNusra} pengalaman membangun di lokasi Nusa Tenggara, {pSulawesi} pengalaman membangun di lokasi Sulawesi, {pMaluku} pengalaman membangun di lokasi Maluku, {pPapua} pengalaman membangun di lokasi Papua dan {pPapbar} pengalaman membangun di lokasi Papua Barat.
                </Form.Item>
                <Form.Item>
                <strong>5.	Kemampuan Tim</strong>
                <br/>
                Data perusahaan yang diterima, menyatakan memiliki tim sebanyak {tim} tim dengan jumlah anggota {personel}. Perusahaan menyatakan tim {sertifikasi} Sertifikasi  dan tim {klasifikasi} klasifikasi. 
                Perusahaan juga menyatakan mampu untuk untuk memobilisasi tim dalam waktu {mobilisasi} hari setelah kontrak, dan mampu melakukan Ramp-up tim dalam waktu {rampup} hari.
                </Form.Item>
                <Form.Item>
                <strong>6.	Material dan Logistik</strong><br/>
                Data perusahaan yang diterima untuk Material dan Logistik menyatakan {sTower} stock Tower dan Aksesories, {sPower} Power Sistem, Baterai dan Aksesoris,{STKDN} Sertifikat TKDN, {gudang} Gudang, {logistik} Dukungan Logistik, dan {delivery} Special Delivery.
                </Form.Item>
                <Form.Item>
                <strong>7.	Peralatan</strong>  <br/>
                Data perusahaan menyatakan {support} RF support tools, {planning} Planning Tools, dan {peta} Peta
                </Form.Item>
                </>
        )
    }

    return (
        <div>
            <Form style={{ padding: '20px' }}>
                {getSummary()}
            </Form>
        </div>
    )
}
