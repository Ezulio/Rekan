const express = require("express");
const knex = require("../db/connection");
const router = express.Router();
const hitung = require("../logic/weightedProduct");


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
    await knex.raw("CREATE TABLE " + tablename + " LIKE answer");
    await knex.raw(
      "ALTER TABLE " +
        tablename +
        " ADD FOREIGN KEY (id_company) REFERENCES company(id_company)"
    );
    await knex.raw(
      "ALTER TABLE " +
        tablename +
        " ADD FOREIGN KEY (id_variablepoint) REFERENCES variablepoint(id_variablepoint)"
    );
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

  try {
    const tambah = await knex("answer").insert(jawaban);
    res.json({
      data: tambah
    });
  } catch (e) {
    const error = new Error("ERROR: " + e);
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
      return [
        ...data
          .reduce(
            (
              ques,
              {
                parameter_question,
                id_question,
                type_question,
                question,
                id_variablepoint,
                variable,
                point
              }
            ) => {
              const currentQuestion = ques.get(id_question);
              const newVarValue = currentQuestion
                ? currentQuestion.id_variablepoint
                : [];
              newVarValue.push(id_variablepoint);
              const newQuesVar = currentQuestion
                ? currentQuestion.variable
                : [];
              newQuesVar.push(variable);
              const newVarPoint = currentQuestion ? currentQuestion.point : [];
              newVarPoint.push(point);
              ques.set(id_question, {
                parameter_question,
                id_question,
                type_question,
                question,
                id_variablepoint: newVarValue,
                variable: newQuesVar,
                point: newVarPoint
              });
              return ques;
            },
            new Map()
          )
          .values()
      ];
    };

    res.json({
      pertanyaan: parseData(pertanyaan)
    });
  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

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

router.get("/get_kriteria", async (req, res, next) => {
  try {
    const parameter = await knex.select().table("parameter_question");
    res.json({
      syarat: parameter
    });
  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

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

router.post("/getanswer", async (req, res, next) => {
  const tableName = req.body.tableName;
  const id_company = req.body.id_company;

  try {
    let jawaban = await knex(tableName)
      .join("company", "answer.id_company", "=", "company.id_company")
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
      )
      .where("answer.id_company", id_company);
    const parseData = data => {
      return [
        ...data
          .reduce(
            (
              comp,
              {
                id_company,
                nama_perusahaan,
                parameter_question,
                question,
                variable,
                answer,
                point
              }
            ) => {
              const currentCompany = comp.get(id_company);
              const newParamValue = currentCompany
                ? currentCompany.parameter_question
                : [];
              newParamValue.push(parameter_question);
              const newQuesValue = currentCompany
                ? currentCompany.question
                : [];
              newQuesValue.push(question);
              const newQuesVar = currentCompany ? currentCompany.variable : [];
              newQuesVar.push(variable);
              const newAnsVal = currentCompany ? currentCompany.answer : [];
              newAnsVal.push(answer);
              const newVarPoint = currentCompany ? currentCompany.point : [];
              newVarPoint.push(point);
              comp.set(id_company, {
                id_company,
                nama_perusahaan,
                parameter_question: newParamValue,
                question: newQuesValue,
                variable: newQuesVar,
                answer: newAnsVal,
                point: newVarPoint
              });
              return comp;
            },
            new Map()
          )
          .values()
      ];
    };

    res.json({
      jawaban: parseData(jawaban)
    });
  } catch (e) {
    const error = new Error("Terjadi Error: " + e);
    next(error);
  }
});

router.post("/hasil_hitung", async (req, res, next) => {
  let tableName = req.body.tableName;

  try {
    let jawaban = await knex(tableName)
      .join("company", "answer.id_company", "=", "company.id_company")
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
      return [
        ...data
          .reduce(
            (
              comp,
              {
                id_company,
                nama_perusahaan,
                parameter_question,
                question,
                variable,
                answer,
                point
              }
            ) => {
              const currentCompany = comp.get(id_company);
              const newParamValue = currentCompany
                ? currentCompany.parameter_question
                : [];
              newParamValue.push(parameter_question);
              const newQuesValue = currentCompany
                ? currentCompany.question
                : [];
              newQuesValue.push(question);
              const newQuesVar = currentCompany ? currentCompany.variable : [];
              newQuesVar.push(variable);
              const newAnsVal = currentCompany ? currentCompany.answer : [];
              newAnsVal.push(answer);
              const newVarPoint = currentCompany ? currentCompany.point : [];
              newVarPoint.push(point);
              comp.set(id_company, {
                id_company,
                nama_perusahaan,
                parameter_question: newParamValue,
                question: newQuesValue,
                variable: newQuesVar,
                answer: newAnsVal,
                point: newVarPoint
              });
              return comp;
            },
            new Map()
          )
          .values()
      ];
    };

    let allAnswer = parseData(jawaban);
    let param = await knex.select().from("parameter_question");
    let kunci = [];
    let weight = [];
    param.forEach(data => kunci.push(data.parameter_question));
    param.forEach(data => weight.push(data.bobot));

    let perusahaan = [];
    for (let i = 0; i < allAnswer.length; i++) {
      perusahaan.push(allAnswer[i].nama_perusahaan);
    }

    /*=======> SUM ANSWER POINT PER PARAMETER <=======*/
    let arrayAdministrasi = [];
    let arrayMinat = [];
    let arrayFinancial = [];
    let arrayPengalaman = [];
    let arrayTeam = [];
    let arrayStock = [];
    let arrayPeralatan = [];
    let alternatif = [];
    for (let i = 0; i < allAnswer.length; i++) {
      let administrasi = 0;
      let minat = 0;
      let financial = 0;
      let pengalaman = 0;
      let team = 0;
      let stock = 0;
      let peralatan = 0;
      for (let j = 0; j < allAnswer[i].point.length; j++) {
        if (j <= 11) {
          administrasi += allAnswer[i].point[j];
        } else if (j == 22) {
          let jumlah_site = parseFloat(allAnswer[i].answer[44]) / parseFloat(allAnswer[i].answer[22]);
          if (jumlah_site == 1 && jumlah_site > 1) {
            minat += 5;
          } else if (0.5 < jumlah_site && 0.9 < jumlah_site) {
            minat += 2.5;
          } else if (0.5 > jumlah_site) {
            minat += 0;
          }
        } else if (j > 11 && j <= 22) {
          minat += allAnswer[i].point[j];
        } else if (j == 28) {
          let persen = parseFloat(allAnswer[i].answer[28]); 
          if (persen > 75) {
            financial += 5;
          } else if (persen > 50 && persen < 75) {
            financial += 3;
          } else if (persen.answer[28] > 25 && persen < 50) {
            financial += 2;
          } else if(persen < 25){
          financial += 1;
        }
        } else if (j > 22 && j <= 34) {
          financial += allAnswer[i].point[j];
        } else if(j == 45){ 
          let jumlah = parseFloat(allAnswer[i].answer[45]);
          let site = parseFloat(allAnswer[i].answer[22])
          if(jumlah == site && jumlah > site){
            pengalaman+= 4;
          } else if(jumlah < site){
            pengalaman+= 2;
          }
        } else if (j > 34 && j <= 49) {
          pengalaman += allAnswer[i].point[j];
        } else if(j == 50){
            let grup = parseFloat(allAnswer[i].answer[22]) / parseFloat(allAnswer[i].answer[50])   
            if(grup == 1){
              team += 3;
            } else if(grup > 0.5 && grup < 0.9){
              team +=2;
            } else if(grup < 0.5){
              team +=1;
            }
        }else if(j == 51){
          let personil = parseFloat(allAnswer[i].answer[51]);
          if(personil == 5 && personil > 5){
            team += 3;
          }else if(personil == 3 && personil == 4){
            team += 2;
          }else if(personil < 3){
            team += 1;
          }
        } else if(j == 56){
          let mobilisasi = parseFloat(allAnswer[i].answer[56]);
          if(mobilisasi == 1 && mobilisasi < 8){
            team += 3;
          }else if(mobilisasi == 8 && mobilisasi < 14){
            team += 2;
          }else if(mobilisasi > 14){
            team += 1;
          }
        } else if(j == 57){
          let ramp_up = parseFloat(allAnswer[i].answer[57]);
          if(ramp_up == 1 && ramp_up < 8){
            team += 3;
          }else if(ramp_up == 8 && ramp_up < 14){
            team += 2;
          }else if(ramp_up > 14){
            team += 1;
          }
        }
         else if (j > 49 && j <= 57) {
          team += allAnswer[i].point[j];
        } else if (j > 57 && j <= 69) {
          stock += allAnswer[i].point[j];
        } else if (j > 69 && j <= 75) {
          peralatan += allAnswer[i].point[j];
        }
      }

      let data = {
        key: perusahaan[i],
        value: {
          Administrasi: administrasi,
          "Peminatan Tower Power": minat,
          "Financial Capability": financial,
          Pengalaman: pengalaman,
          "Team Availability": team,
          "Stock Material dan Logistik": stock,
          "Peralatan yang Digunakan": peralatan
        }
      };
      alternatif.push(data);
    }
    // console.log(alternatif)
    let accounting = JSON.stringify({
      kriteria: [
        {
          key: kunci[0],
          bobot: weight[0]
        },
        {
          key: kunci[1],
          bobot: weight[1]
        },
        {
          key: kunci[2],
          bobot: weight[2]
        },
        {
          key: kunci[3],
          bobot: weight[3]
        },
        {
          key: kunci[4],
          bobot: weight[4]
        },
        {
          key: kunci[5],
          bobot: weight[5]
        },
        {
          key: kunci[6],
          bobot: weight[6]
        }
      ],

      alternatif: alternatif
    });

    let counter_fin = JSON.parse(accounting);
    let hasil_akhir = hitung(counter_fin.kriteria, counter_fin.alternatif);

    res.json({
      pemenang: hasil_akhir
    });
  } catch (e) {
    const error = new Error("Kesahalan Perhitungan: " + e);
    next(error);
  }
});

router.post("/get_profile", async (req, res, next) => {
  let tableName = req.body.tableName;

  try {
    let jawaban = await knex(tableName)
      .join("company", "answer.id_company", "=", "company.id_company")
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
      return [
        ...data
          .reduce(
            (
              comp,
              {
                id_company,
                nama_perusahaan,
                parameter_question,
                question,
                variable,
                answer,
                point
              }
            ) => {
              const currentCompany = comp.get(id_company);
              const newParamValue = currentCompany
                ? currentCompany.parameter_question
                : [];
              newParamValue.push(parameter_question);
              const newQuesValue = currentCompany
                ? currentCompany.question
                : [];
              newQuesValue.push(question);
              const newQuesVar = currentCompany ? currentCompany.variable : [];
              newQuesVar.push(variable);
              const newAnsVal = currentCompany ? currentCompany.answer : [];
              newAnsVal.push(answer);
              const newVarPoint = currentCompany ? currentCompany.point : [];
              newVarPoint.push(point);
              comp.set(id_company, {
                id_company,
                nama_perusahaan,
                parameter_question: newParamValue,
                question: newQuesValue,
                variable: newQuesVar,
                answer: newAnsVal,
                point: newVarPoint
              });
              return comp;
            },
            new Map()
          )
          .values()
      ];
    };

    let allAnswer = parseData(jawaban);
    let param = await knex.select().from("parameter_question");
    let kunci = [];
    let weight = [];
    param.forEach(data => kunci.push(data.parameter_question));
    param.forEach(data => weight.push(data.bobot));

    let perusahaan = [];
    for (let i = 0; i < allAnswer.length; i++) {
      perusahaan.push(allAnswer[i].nama_perusahaan);
    }

    /*=======> SUM ANSWER POINT PER PARAMETER <=======*/
    let alternatif = [];
    for (let i = 0; i < allAnswer.length; i++) {
      let administrasi = 0;
      let minat = 0;
      let financial = 0;
      let pengalaman = 0;
      let team = 0;
      let stock = 0;
      let peralatan = 0;
      for (let j = 0; j < allAnswer[i].point.length; j++) {
        if (j <= 11) {
          administrasi += allAnswer[i].point[j];
        } else if (j == 22) {
          let jumlah_site = parseFloat(allAnswer[i].answer[44]) / parseFloat(allAnswer[i].answer[22]);
          if (jumlah_site == 1 && jumlah_site > 1) {
            minat += 5;
          } else if (0.5 < jumlah_site && 0.9 < jumlah_site) {
            minat += 2.5;
          } else if (0.5 > jumlah_site) {
            minat += 0;
          }
        } else if (j > 11 && j <= 22) {
          minat += allAnswer[i].point[j];
        } else if (j == 28) {
          let persen = parseFloat(allAnswer[i].answer[28]); 
          if (persen > 75) {
            financial += 5;
          } else if (persen > 50 && persen < 75) {
            financial += 3;
          } else if (persen.answer[28] > 25 && persen < 50) {
            financial += 2;
          } else if(persen < 25){
          financial += 1;
        }
        } else if (j > 22 && j <= 34) {
          financial += allAnswer[i].point[j];
        } else if(j == 45){ 
          let jumlah = parseFloat(allAnswer[i].answer[45]);
          let site = parseFloat(allAnswer[i].answer[22])
          if(jumlah == site && jumlah > site){
            pengalaman+= 4;
          } else if(jumlah < site){
            pengalaman+= 2;
          }
        } else if (j > 34 && j <= 49) {
          pengalaman += allAnswer[i].point[j];
        } else if(j == 50){
            let grup = parseFloat(allAnswer[i].answer[22]) / parseFloat(allAnswer[i].answer[50])   
            if(grup == 1){
              team += 3;
            } else if(grup > 0.5 && grup < 0.9){
              team +=2;
            } else if(grup < 0.5){
              team +=1;
            }
        }else if(j == 51){
          let personil = parseFloat(allAnswer[i].answer[51]);
          if(personil == 5 && personil > 5){
            team += 3;
          }else if(personil == 3 && personil == 4){
            team += 2;
          }else if(personil < 3){
            team += 1;
          }
        } else if(j == 56){
          let mobilisasi = parseFloat(allAnswer[i].answer[56]);
          if(mobilisasi == 1 && mobilisasi < 8){
            team += 3;
          }else if(mobilisasi == 8 && mobilisasi < 14){
            team += 2;
          }else if(mobilisasi > 14){
            team += 1;
          }
        } else if(j == 57){
          let ramp_up = parseFloat(allAnswer[i].answer[57]);
          if(ramp_up == 1 && ramp_up < 8){
            team += 3;
          }else if(ramp_up == 8 && ramp_up < 14){
            team += 2;
          }else if(ramp_up > 14){
            team += 1;
          }
        }
         else if (j > 49 && j <= 57) {
          team += allAnswer[i].point[j];
        } else if (j > 57 && j <= 69) {
          stock += allAnswer[i].point[j];
        } else if (j > 69 && j <= 75) {
          peralatan += allAnswer[i].point[j];
        }
      }

      let data = {
        key: perusahaan[i],
        value: {
          Administrasi: administrasi,
          "Peminatan Tower Power": minat,
          "Financial Capability": financial,
          Pengalaman: pengalaman,
          "Team Availability": team,
          "Stock Material dan Logistik": stock,
          "Peralatan yang Digunakan": peralatan
        }
      };
      alternatif.push(data);
    }
    let accounting = JSON.stringify({
      kriteria: [
        {
          key: kunci[0],
          bobot: weight[0]
        },
        {
          key: kunci[1],
          bobot: weight[1]
        },
        {
          key: kunci[2],
          bobot: weight[2]
        },
        {
          key: kunci[3],
          bobot: weight[3]
        },
        {
          key: kunci[4],
          bobot: weight[4]
        },
        {
          key: kunci[5],
          bobot: weight[5]
        },
        {
          key: kunci[6],
          bobot: weight[6]
        }
      ],

      alternatif: alternatif
    });

    let counter_fin = JSON.parse(accounting);

    res.json({
      pemenang: counter_fin
    });
  } catch (e) {
    const error = new Error("Kesahalan Perhitungan: " + e);
    next(error);
  }
});

module.exports = router;
