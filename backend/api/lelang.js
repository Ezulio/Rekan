const express = require('express');
const knex = require('../db/connection');
const bcrypt = require('bcryptjs'); 

const router = express.Router();

router.get('/getdb', async (req,res,next) => {
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

router.post('/gettable', async (req,res,next) => {
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

router.post('/newtable', async (req,res,next) => {
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

router.post('/deleteData', async (req,res,next) => {
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

module.exports = router;

// knex.schema.createTable(tablename, 'like', 'lelang_example');