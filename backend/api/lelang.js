const express = require('express');
const knex = require('../db/connection');
const bcrypt = require('bcryptjs'); 

const router = express.Router();

router.get('/getdb', async (req, res, next) => {
    try{
        let getdb = await knex.select('TABLE_NAME').from('INFORMATION_SCHEMA.TABLES').where('TABLE_SCHEMA','=','lelang');
        res.json({
            "db" : getdb
        })
    }
    catch(e){
        const err_getdb = new Error("Kesalahan Database " + e);
        next(err_getdb);
    }
})

router.post('/gettable', async (req, res, next) => {
    try{
        let gettable = await knex.select('*').from(req.body.tableName).orderBy('Nilai','desc')
        res.json({
            "table" : gettable
        })
    }
    catch(e){
        const err_gettable = new Error("Kesalahan Database " + e);
        next(err_gettable);
    }
})

router.post('/newtable', async (req, res, next) => {
    const tablename = req.body.tableName;
    try{
        await knex.raw('CREATE TABLE '+ tablename +' LIKE lelang_example');  
      
        res.json({
            "message" : "Table Berhasil Dibuat"
        })
    }
    catch(e){
        const err_newtable = new Error("Kesalahan Database " + e);
        next(err_newtable);
    }
})

router.post('/deleteData', async (req, res, next) => {
    const tablename = req.body.tableName;
    const id = req.body.id;
    try{
        await knex(tablename).where('id',id).del();
        res.json({
            "message" : "Data Berhasil Dihapus"
        })
    }
    catch(e){
        const err_delete = new Error("Kesalahan Database  " + e);
        next(err_delete);
    }
})

function hitungKekayaan(kaya, f_Plafon){

}

router.post('/inputData', async (req, res, next) => {
    const kaya = req.body.a_Kekayaan;
    const plafon = req.body.f_Plafon;
    const kekayaan = hitungKekayaan(kaya, plafon);

    try{
        await knex(tableName).insert({
            a_NamaPerusahaan : req.body.a_NamaPerusahaan,
            a_SIUP	: req.body.a_SIUP,
            a_Usaha : req.body.a_Usaha,
            a_Kekayaan : kekayaan,
            a_SIUJK : req.body.a_SIUJK,
            a_SIUJPTL : req.body.a_SIUJPTL,
            a_SIUBPPL : req.body.a_SIUBPPL,
            a_PIC : req.body.PIC,
            a_NoTelp : req.body.a_NoTelp,
            a_Email : req.body.a_Email,
            m_Tower : req.body.m_Tower,
            m_Power : req.body.m_Power,
            m_Topo : req.body.m_Topo,
            m_Sumatera : req.body.m_Sumatera,
            m_Nusra : req.body.m_Nusra,
            m_Kalimantan : req.body.m_Kalimantan,
            m_Sulawesi : req.body.m_Sulawesi,
            m_Maluku : req.body.m_Maluku,
            m_Papbar : req.body.m_Papbar,
            m_Papua : req.body.m_Papua,
            m_site : req.body.m_site,
            f_support_Bank : req.body.f_support_Bank,
            f_Plafon : req.body.f_Plafon,
            f_Audit2018 : req.body.f_Audit2018,
            f_Financialpersen : req.body.f_Financialpersen,
            f_LOILender : req.body.f_LOILender,
            f_LOIstakeholder : req.body.f_LOIstakeholder,
            f_Projectlain : req.body.f_Projectlain,
            p_Scope : req.body.p_Scope,
            p_Sumatera : req.body.p_Sumatera,
            p_Nusra : req.body.p_Nusra,
            p_Kalimantan : req.body.p_Kalimantan,
            p_Sulawesi : req.body.p_Sulawesi,
            p_Maluku : req.body.p_Maluku,
            p_Papbar : req.body.p_Papbar,
            p_Papua : req.body.p_Papua,
            p_Site : req.body.p_Site,
            p_Bukti : req.body.p_Bukti,
            p_kendala : req.body.p_kendala,
            t_jumlah : req.body.t_jumlah,
            t_personel : req.body.t_personel,
            t_sertifikasi : req.body.t_sertifikasi,
            t_Klasifikasi : req.body.t_Klasifikasi,
            t_kecmobilisasi : req.body.t_kecmobilisasi,
            t_kecrampup : req.body.t_kecrampup,
            l_Tower : req.body.l_Tower,
            l_Power : req.body.l_Power,
            l_TKDN : req.body.l_TKDN,
            l_Warehouse : req.body.l_Warehouse,
            l_Logistik : req.body.l_Logistik,
            l_Delivery : req.body.l_Delivery,
            s_surveytools : req.body.s_surveytools,
            s_planningtools : req.body.s_planningtools,
            s_map : req.body.s_map,
            Nilai : req.body.Nilai
        })
        res.json({
            "message" : "Data Berhasil Dihapus"
        })
    }
    catch(e){
        const err_input = new Error("kesalahan Database " +  e);
        next(err_input);
    }
})
module.exports = router;