const express = require("express");
const knex = require("../db/connection");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const lodash = require("lodash");
const router = express.Router();


const nama_table= "";

router.get("/getdb", async (req, res, next) => {
  try {
    let getdb = await knex
      .select("TABLE_NAME")
      .from("INFORMATION_SCHEMA.TABLES")
      .where("TABLE_SCHEMA", "=", "rfi");
    res.json({
      db: getdb
    });
  } catch (e) {
    const err_getdb = new Error("Kesalahan Database " + e);
    next(err_getdb);
  }
});

router.post("/gettable", async (req, res, next) => {
  try {
    let gettable = await knex
      .select("*")
      .from(req.body.tableName)
      .orderBy("Nilai", "desc");
    res.json({
      table: gettable
    });
  } catch (e) {
    const err_gettable = new Error("Kesalahan Database " + e);
    next(err_gettable);
  }
});

router.post("/newtable", async (req, res, next) => {
  const tablename = req.body.tableName;
  try {
      await knex.raw("CREATE TABLE " + tablename + " LIKE answer" )
      await knex.raw("ALTER TABLE " + tablename + " ADD FOREIGN KEY (id_company) REFERENCES company(id_company)")
      await knex.raw("ALTER TABLE " + tablename + " ADD FOREIGN KEY (id_variablepoint) REFERENCES variablepoint(id_variablepoint)")
      res.json({
      message: "Table Berhasil Dibuat"
    });
  } catch (e) {
    const err_newtable = new Error("Kesalahan Database " + e);
    next(err_newtable);
  }
});



router.post("/deleteData", async (req, res, next) => {
  const tablename = req.body.tableName;
  const id = req.body.id;
  try {
    await knex(tablename)
      .where("id", id)
      .del();
    res.json({
      message: "Data Berhasil Dihapus"
    });
  } catch (e) {
    const err_delete = new Error("Kesalahan Database  " + e);
    next(err_delete);
  }
});

router.post("/insert_company", async (req, res, next) => {
  const perusahaan = req.body.nama_perusahaan;

  try {
    const coba = await knex("company").insert({
      nama_perusahaan: perusahaan
    });
    res.json({
      message: "Insert Company Berhasil",
      data: coba
    });
  } catch (e) {
    const error = new Error("Terjadi Kesalahan " + e);
    next(error);
  }
});

router.post("/insert_answer", async (req, res, next) => {
  const jawaban = req.body.jawaban;

  try{
    const tambah = await knex("answer").insert(jawaban)
    res.json({
      "data":tambah
    })
  }catch(e){
    const error = new Error ("ERROR: "+e);
    next(error);
  }
});

router.get("/getquestion", async (req, res, next) => {
  try {
    let pertanyaan = await knex("variablepoint")
      .join(
        "question",
        "variablepoint.id_question",
        "=",
        "question.id_question"
      )
      .join(
        "parameter_question",
        "question.id_parameter_question",
        "=",
        "parameter_question.id_parameter_question"
      )
      .select(
        "parameter_question.parameter_question",
        "question.id_question",
        "question.type_question",
        "question.question",
        "variablepoint.id_variablepoint",
        "variablepoint.variable",
        "variablepoint.point"
      );
    const parseData = data => {
        return [...data.reduce((ques, {parameter_question, id_question,type_question,question,id_variablepoint,variable,point }) => {
          const currentQuestion = ques.get(id_question)
          const newVarValue = currentQuestion ? currentQuestion.id_variablepoint : []
          newVarValue.push(id_variablepoint)
          const newQuesVar = currentQuestion ? currentQuestion.variable : []
          newQuesVar.push(variable)
          const newVarPoint = currentQuestion ? currentQuestion.point : []
          newVarPoint.push(point)
          ques.set(id_question, {parameter_question, id_question, type_question, question,id_variablepoint:newVarValue,variable: newQuesVar, point:newVarPoint})
          return ques
        }, new Map()).values()]
      }
      
      res.json({
        "pertanyaan": parseData(pertanyaan)
      })
      

  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

// router.post("/getquestion_parameter", async (req, res, next) => {
//   const id_parameter_question = req.body.id_parameter_question;
//   try {
//     let pertanyaan = await knex("variablepoint")
//       .join(
//         "question",
//         "variablepoint.id_question",
//         "=",
//         "question.id_question"
//       )
//       .join(
//         "parameter_question",
//         "question.id_parameter_question",
//         "=",
//         "parameter_question.id_parameter_question"
//       )
//       .select(
//         "parameter_question.parameter_question",
//         "question.type_question",
//         "question.question",
//         "variablepoint.variable",
//         "variablepoint.point"
//       )
//       .where("parameter_question.id_parameter_question", id_parameter_question);
//     res.json({
//       question_and_variable: pertanyaan
//     });
//   } catch (e) {
//     const error = new Error("Terjadi Error: " + e);
//     next(error);
//   }
// });

router.get("/getcompany", async (req, res, next) => {
  try {
    let profil = await knex.select().table("company");
    res.json({
      list_company: profil
    });
  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

// router.post("/getanswer", async (req, res, next) => {
//   const id_company = req.body.id_company;

//   try {
//     let query =
//       "SELECT company.nama_perusahaan, parameter_question.parameter_question, question.question, answer.answer, variablepoint.point " +
//       "FROM answer JOIN company ON answer.id_company = company.id_company" +
//       " JOIN variablepoint ON answer.id_variablepoint = variablepoint.id_variablepoint" +
//       " JOIN question ON variablepoint.id_question = question.id_question" +
//       " JOIN parameter_question ON question.id_parameter_question = parameter_question.id_parameter_question" +
//       " WHERE answer.id_company = " +
//       id_company +
//       "";
//     let jawaban = await knex.raw(query);

//     console.log(jawaban[0]);
//     res.json({
//       data: jawaban[0]
//     });
//   } catch (e) {
//     const error = new Error("Terjadi ERROR: " + e);
//     next(error);
//   }
// });

router.post("/deleteanswer", async (req, res, next) => {
  const id_answer = req.body.id_answer;
  try {
    await knex("answer")
      .where("id_answer", id_answer)
      .del();
    res.json({
      message: "Data Berhasil Dihapus"
    });
  } catch (e) {
    const err_delete = new Error("Kesalahan Database  " + e);
    next(err_delete);
  }
});

router.get("/getanswer", async (req, res, next) => {
  try {

    // const id_company = req.body.id_company;
    let jawaban = await knex("answer")
      .join(
        "company",
        "answer.id_company",
        "=",
        "company.id_company"
      )
      .join(
        "variablepoint",
        "answer.id_variablepoint",
        "=",
        "variablepoint.id_variablepoint"
      )
      .join(
        "question",
        "variablepoint.id_question",
        "=",
        "question.id_question"
      )
      .join(
        "parameter_question",
        "question.id_parameter_question",
        "=",
        "parameter_question.id_parameter_question"
      )
      .select(
        "answer.id_company",
        "company.nama_perusahaan",
        "parameter_question.parameter_question",
        "question.question",
        "variablepoint.variable",
        "answer.answer",
        "variablepoint.point"
      );
    const parseData = data => {
        return [...data.reduce((comp, {id_company, nama_perusahaan, parameter_question, question,variable,answer,point}) => {
          const currentCompany = comp.get(id_company)
          const newParamValue = currentCompany ? currentCompany.parameter_question : []
          newParamValue.push(parameter_question)
          const newQuesValue = currentCompany ? currentCompany.question : []
          newQuesValue.push(question)
          const newQuesVar = currentCompany ? currentCompany.variable : []
          newQuesVar.push(variable)
          const newAnsVal = currentCompany ? currentCompany.answer : []
          newAnsVal.push(answer)
          const newVarPoint = currentCompany ? currentCompany.point : []
          newVarPoint.push(point)
          comp.set(id_company, {id_company,nama_perusahaan, parameter_question: newParamValue,  question:newQuesValue, variable:newQuesVar, answer: newAnsVal, point:newVarPoint})
          return comp
        }, new Map()).values()]
      }
      
      res.json({
        "jawaban": parseData(jawaban)
      })
      

  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

module.exports = router;


// SELECT parameter_question.parameter_question, company.nama_perusahaan,question.question, variablepoint.variable, answer.answer, variablepoint.point FROM answer JOIN company ON answer.id_company = company.id_company JOIN variablepoint ON answer.id_variablepoint = variablepoint.id_variablepoint JOIN question ON variablepoint.id_question = question.id_question JOIN parameter_question ON question.id_parameter_question = parameter_question.id_parameter_question

// function hitungKekayaan(kaya, f_Plafon){

// }

// router.post('/inputData', async (req, res, next) => {
//     const nib = req.body.NIB;
//     const id_question = req.body.id_question;
//     const answer = req.body.answer;

//     const kaya = req.body.a_Kekayaan;
//     const plafon = req.body.f_Plafon;
//     const kekayaan = hitungKekayaan(kaya, plafon);

//     try{
//         await knex(tableName).insert({
//             a_NamaPerusahaan : req.body.a_NamaPerusahaan,
//             a_SIUP	: req.body.a_SIUP,
//             a_Usaha : req.body.a_Usaha,
//             a_Kekayaan : kekayaan,
//             a_SIUJK : req.body.a_SIUJK,
//             a_SIUJPTL : req.body.a_SIUJPTL,
//             a_SIUBPPL : req.body.a_SIUBPPL,
//             a_PIC : req.body.PIC,
//             a_NoTelp : req.body.a_NoTelp,
//             a_Email : req.body.a_Email,
//             m_Tower : req.body.m_Tower,
//             m_Power : req.body.m_Power,
//             m_Topo : req.body.m_Topo,
//             m_Sumatera : req.body.m_Sumatera,
//             m_Nusra : req.body.m_Nusra,
//             m_Kalimantan : req.body.m_Kalimantan,
//             m_Sulawesi : req.body.m_Sulawesi,
//             m_Maluku : req.body.m_Maluku,
//             m_Papbar : req.body.m_Papbar,
//             m_Papua : req.body.m_Papua,
//             m_site : req.body.m_site,
//             f_support_Bank : req.body.f_support_Bank,
//             f_Plafon : req.body.f_Plafon,
//             f_Audit2018 : req.body.f_Audit2018,
//             f_Financialpersen : req.body.f_Financialpersen,
//             f_LOILender : req.body.f_LOILender,
//             f_LOIstakeholder : req.body.f_LOIstakeholder,
//             f_Projectlain : req.body.f_Projectlain,
//             p_Scope : req.body.p_Scope,
//             p_Sumatera : req.body.p_Sumatera,
//             p_Nusra : req.body.p_Nusra,
//             p_Kalimantan : req.body.p_Kalimantan,
//             p_Sulawesi : req.body.p_Sulawesi,
//             p_Maluku : req.body.p_Maluku,
//             p_Papbar : req.body.p_Papbar,
//             p_Papua : req.body.p_Papua,
//             p_Site : req.body.p_Site,
//             p_Bukti : req.body.p_Bukti,
//             p_kendala : req.body.p_kendala,
//             t_jumlah : req.body.t_jumlah,
//             t_personel : req.body.t_personel,
//             t_sertifikasi : req.body.t_sertifikasi,
//             t_Klasifikasi : req.body.t_Klasifikasi,
//             t_kecmobilisasi : req.body.t_kecmobilisasi,
//             t_kecrampup : req.body.t_kecrampup,
//             l_Tower : req.body.l_Tower,
//             l_Power : req.body.l_Power,
//             l_TKDN : req.body.l_TKDN,
//             l_Warehouse : req.body.l_Warehouse,
//             l_Logistik : req.body.l_Logistik,
//             l_Delivery : req.body.l_Delivery,
//             s_surveytools : req.body.s_surveytools,
//             s_planningtools : req.body.s_planningtools,
//             s_map : req.body.s_map,
//             Nilai : req.body.Nilai
//         })
//         res.json({
//             "message" : "Data Berhasil Dihapus"
//         })
//     }
//     catch(e){
//         const err_input = new Error("kesalahan Database " +  e);
//         next(err_input);
//     }
// })
