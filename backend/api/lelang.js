const express = require("express");
const knex = require("../db/connection");
const router = express.Router();
const weigthed = require("../logic/weightedProduct");
const hitung = weigthed.hitung;
const hasil = weigthed.hasil;

//Mendapatkan List Table
router.get("/getdb", async (req, res, next) => {
  try {
    let getdb = await knex.raw("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='rfi'AND NOT TABLE_NAME='company' AND NOT TABLE_NAME='question' AND NOT TABLE_NAME='variablepoint' AND NOT TABLE_NAME='answer' AND NOT TABLE_NAME='parameter_question'")
    res.json({
      db: getdb
    });
  } catch (e) {
    const err_getdb = new Error("Kesalahan Database " + e);
    next(err_getdb);
  }
});

//Membuat table baru 
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

//Delete hasil input perusahaan
router.post("/deleteData", async (req, res, next) => {
  const tablename = req.body.tableName;
  const id = req.body.id;
  try {
    await knex(tablename)
      .where("id_company", id)
      .del();
    res.json({
      message: "Data Berhasil Dihapus"
    });
  } catch (e) {
    const err_delete = new Error("Kesalahan Database  " + e);
    next(err_delete);
  }
});

//Membuat perusahaan baru
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

//Memasukkan hasil input perusahaan 
router.post("/insert_answer", async (req, res, next) => {
  const jawaban = req.body.jawaban;
  const tablename = req.body.tableName;
  try {
    const tambah = await knex(tablename).insert(jawaban);
    res.json({
      data: tambah
    });
  } catch (e) {
    const error = new Error("ERROR: " + e);
    next(error);
  }
});

//Mengambil pertanyaan
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

//Mengambil perusahaan untuk dibandingkan dengan perusahaan yang dipilih
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

//Mendapatkan jawaban dari perusahaan dan tabel tertentu
router.post("/getanswer", async (req, res, next) => {
  const tableName = req.body.tableName;
  const id_company = req.body.id_company;

  try {
    let jawaban = await knex(tableName)
      .join("company", tableName + ".id_company", "=", "company.id_company")
      .join(
        "variablepoint",
        tableName + ".id_variablepoint",
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
        tableName + ".id_company",
        "company.nama_perusahaan",
        "parameter_question.parameter_question",
        "question.question",
        "variablepoint.variable",
        tableName + ".answer",
        "variablepoint.point"
      )
      .where(tableName + ".id_company", id_company);
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

//Mendapatkan hasil perhitungan SPK weighted product yang telah dimodifikasi sesuai kebutuhan BAKTI
router.post("/hasil_hitung", async (req, res, next) => {
  let tableName = req.body.tableName;

  try {
    let jawaban = await knex(tableName)
      .join("company", tableName + ".id_company", "=", "company.id_company")
      .join(
        "variablepoint",
        tableName + ".id_variablepoint",
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
        tableName + ".id_company",
        "company.nama_perusahaan",
        "parameter_question.parameter_question",
        "question.question",
        "variablepoint.variable",
        tableName + ".answer",
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
        if (j <= 12) {
          administrasi += allAnswer[i].point[j];
        } else if (j == 23) {
          let jumlah_site = parseFloat(allAnswer[i].answer[47]) / parseFloat(allAnswer[i].answer[23]);
          if (jumlah_site == 1 && jumlah_site > 1) {
            minat += 5;
          } else if (0.5 < jumlah_site && 0.9 < jumlah_site) {
            minat += 2.5;
          } else if (0.5 > jumlah_site) {
            minat += 0;
          }
        } else if (j > 11 && j <= 23) {
          minat += allAnswer[i].point[j];
        } else if (j == 29) {
          let persen = parseFloat(allAnswer[i].answer[29]);
          if (persen > 75) {
            financial += 5;
          } else if (persen > 50 && persen < 75) {
            financial += 3;
          } else if (persen.answer[29] > 25 && persen < 50) {
            financial += 2;
          } else if (persen < 25) {
            financial += 1;
          }
        } else if (j > 23 && j <= 36) {
          financial += allAnswer[i].point[j];
        } else if (j == 47) {
          let jumlah = parseFloat(allAnswer[i].answer[47]);
          let site = parseFloat(allAnswer[i].answer[23])
          if (jumlah == site && jumlah > site) {
            pengalaman += 4;
          } else if (jumlah < site) {
            pengalaman += 2;
          }
        } else if (j > 37 && j <= 51) {
          pengalaman += allAnswer[i].point[j];
        } else if (j == 52) {
          let grup = parseFloat(allAnswer[i].answer[23]) / parseFloat(allAnswer[i].answer[52])
          if (grup == 1) {
            team += 3;
          } else if (grup > 0.5 && grup < 0.9) {
            team += 2;
          } else if (grup < 0.5) {
            team += 1;
          }
        } else if (j == 52) {
          let personil = parseFloat(allAnswer[i].answer[52]);
          if (personil == 5 && personil > 5) {
            team += 3;
          } else if (personil == 3 && personil == 4) {
            team += 2;
          } else if (personil < 3) {
            team += 1;
          }
        } else if (j == 58) {
          let mobilisasi = parseFloat(allAnswer[i].answer[58]);
          if (mobilisasi == 1 && mobilisasi < 8) {
            team += 3;
          } else if (mobilisasi == 8 && mobilisasi < 14) {
            team += 2;
          } else if (mobilisasi > 14) {
            team += 1;
          }
        } else if (j == 59) {
          let ramp_up = parseFloat(allAnswer[i].answer[59]);
          if (ramp_up == 1 && ramp_up < 8) {
            team += 3;
          } else if (ramp_up == 8 && ramp_up < 14) {
            team += 2;
          } else if (ramp_up > 14) {
            team += 1;
          }
        }
        else if (j > 51 && j <= 59) {
          team += allAnswer[i].point[j];
        } else if (j > 59 && j <= 71) {
          stock += allAnswer[i].point[j];
        } else if (j > 71 && j <= 77) {
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
    let hasil_akhir = hitung(counter_fin.kriteria, counter_fin.alternatif);

    res.json({
      pemenang: hasil_akhir
    });
  } catch (e) {
    const error = new Error("Kesahalan Perhitungan: " + e);
    next(error);
  }
});

//Mengambil semua hasil input perusahaan sesuai dengan tablenya
router.post("/get_profile", async (req, res, next) => {
  let tableName = req.body.tableName;
  let insert_database = req.body.insert_database;

  try {
    let jawaban = await knex(tableName)
      .join("company", tableName + ".id_company", "=", "company.id_company")
      .join(
        "variablepoint",
        tableName + ".id_variablepoint",
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
        tableName + ".id_company",
        "company.nama_perusahaan",
        "parameter_question.parameter_question",
        "question.question",
        "variablepoint.variable",
        tableName + ".answer",
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

    let id = [];
    for (let i = 0; i < allAnswer.length; i++) {
      id.push(allAnswer[i].id_company)
    }

    /*=======> SUM ANSWER POINT PER PARAMETER <=======*/
    let alternatif = [];
    let administrasi = 0;
    let minat = 0;
    let financial = 0;
    let pengalaman = 0;
    let team = 0;
    let stock = 0;
    let peralatan = 0;
    for (let i = 0; i < allAnswer.length; i++) {
      for (let j = 0; j < allAnswer[i].point.length; j++) {
        if (j == 0 && j < 12) {
          administrasi += allAnswer[i].point[j];
        } else if (j == 23) {
          let jumlah_site = parseFloat(allAnswer[i].answer[47]) / parseFloat(allAnswer[i].answer[23]);
          if (jumlah_site == 1 && jumlah_site > 1) {
            minat += 5;
          } else if (0.5 < jumlah_site && 0.9 < jumlah_site) {
            minat += 2.5;
          } else if (0.5 > jumlah_site) {
            minat += 0;
          }
        } else if (j > 12 && j <= 29) {
          minat += allAnswer[i].point[j];
        } else if (j == 29) {
          let persen = parseFloat(allAnswer[i].answer[29]);
          if (persen > 75) {
            financial += 5;
          } else if (persen > 50 && persen < 75) {
            financial += 3;
          } else if (persen.answer[29] > 25 && persen < 50) {
            financial += 2;
          } else if (persen < 25) {
            financial += 1;
          }
        } else if (j > 23 && j <= 36) {
          financial += allAnswer[i].point[j];
        } else if (j == 47) {
          let jumlah = parseFloat(allAnswer[i].answer[47]);
          let site = parseFloat(allAnswer[i].answer[23])
          if (jumlah == site && jumlah > site) {
            pengalaman += 4;
          } else if (jumlah < site) {
            pengalaman += 2;
          }
        } else if (j > 37 && j <= 51) {
          pengalaman += allAnswer[i].point[j];
        } else if (j == 52) {
          let grup = parseFloat(allAnswer[i].answer[23]) / parseFloat(allAnswer[i].answer[52])
          if (grup == 1) {
            team += 3;
          } else if (grup > 0.5 && grup < 0.9) {
            team += 2;
          } else if (grup < 0.5) {
            team += 1;
          }
        } else if (j == 52) {
          let personil = parseFloat(allAnswer[i].answer[52]);
          if (personil == 5 && personil > 5) {
            team += 3;
          } else if (personil == 3 && personil == 4) {
            team += 2;
          } else if (personil < 3) {
            team += 1;
          }
        } else if (j == 58) {
          let mobilisasi = parseFloat(allAnswer[i].answer[58]);
          if (mobilisasi == 1 && mobilisasi < 8) {
            team += 3;
          } else if (mobilisasi == 8 && mobilisasi < 14) {
            team += 2;
          } else if (mobilisasi > 14) {
            team += 1;
          }
        } else if (j == 59) {
          let ramp_up = parseFloat(allAnswer[i].answer[59]);
          if (ramp_up == 1 && ramp_up < 8) {
            team += 3;
          } else if (ramp_up == 8 && ramp_up < 14) {
            team += 2;
          } else if (ramp_up > 14) {
            team += 1;
          }
        }
        else if (j > 51 && j <= 59) {
          team += allAnswer[i].point[j];
        } else if (j > 59 && j <= 71) {
          stock += allAnswer[i].point[j];
        } else if (j > 71 && j <= 77) {
          peralatan += allAnswer[i].point[j];
        }
      }

      let data = {
        id: id[i],
        key: perusahaan[i],
        value: {
          "Administrasi": administrasi,
          "Peminatan Tower Power": minat,
          "Financial Capability": financial,
          "Pengalaman": pengalaman,
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
    // console.log(counter_fin.alternatif)
    let hasil_akhir = hasil(counter_fin.kriteria, counter_fin.alternatif);

    var byValue = hasil_akhir.slice(0);
    byValue.sort(function (a, b) {
      return b.value - a.value;
    });

    // console.log("ByValue: "+byValue)

    res.json({
      "hasil": byValue
    });
  } catch (e) {
    const error = new Error("Kesahalan Profile: " + e);
    next(error);
  }
});


module.exports = router;