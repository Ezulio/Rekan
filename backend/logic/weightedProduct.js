
function getTotalBobot(kriteria) {
    let sumOfBobot = 0;
    for (let i = 0; i < kriteria.length; i++) {
        sumOfBobot += kriteria[i].bobot;
    }
    return sumOfBobot;
}

function getPrioritas(kriteria, totalBobot) {
    let sumOfBobot = totalBobot;
    let priorities = [];
    for (let i = 0; i < kriteria.length; i++) {
        value = kriteria[i].bobot / sumOfBobot;
        priority = {
            key: kriteria[i].key,
            value: value
        }
        priorities.push(priority);
    }

    return priorities;
}

function hitungVectorSi(alternatif, prioritas) {
    let vektorSi = [];
    let hasil = []
    let keySi = [];
    for (let i = 0; i < alternatif.length; i++) {
        hasil[i] = [];
        for (let j = 0; j < prioritas.length; j++) {
            hasil[i][j] = alternatif[i].value[prioritas[j].key] ** prioritas[j].value;
        }
        keySi = {
            id: alternatif[i].id,
            key: alternatif[i].key,
            value: hasil[i]
        }
        vektorSi.push(keySi);
    }
    console.log(keySi)
    return vektorSi
}
function countSumSiPerAlternatif(vektorSi) {
    let sumVektorSi = []
    for (let i = 0; i < vektorSi.length; i++) {
        hasil = 1;
        for (let j = 0; j < vektorSi[i].value.length; j++) {
            hasil *= vektorSi[i].value[j]
            keySumSi = {
                id: vektorSi[i].id,
                key: vektorSi[i].key,
                value: hasil
            }
        }
        sumVektorSi.push(keySumSi);
    }
    return sumVektorSi;
}
function countTotalVectorSi(sumVektorSi) {
    let totalVectorSi = 0;
    for (let i = 0; i < sumVektorSi.length; i++) {
        totalVectorSi += sumVektorSi[i].value;
    }
    return totalVectorSi;
}
function countVectorVi(countSumVectorSi, countTotalVectorSi) {
    let hasilVi = [];
    let vectorVi = []
    for (let i = 0; i < countSumVectorSi.length; i++) {

        hasilVi[i] = countSumVectorSi[i].value / countTotalVectorSi;
        keyVi = {
            id: countSumVectorSi[i].id,
            key: countSumVectorSi[i].key,
            value: hasilVi[i]
        }
        vectorVi.push(keyVi);
    }
    return vectorVi;
}

function countVectorVi2(countSumVectorSi, countTotalVectorSi) {
    let hasilVi = [];
    let vectorVi = []
    let adjustedvi=[];
    let keterangan = "";
    let status = "";
    let maksvi;
    for (let i = 0; i < countSumVectorSi.length; i++) {
        hasilVi[i] = countSumVectorSi[i].value / countTotalVectorSi;
        maksvi = Math.max(...hasilVi);
    }
    for (let i = 0; i < countSumVectorSi.length; i++) {
        adjustedvi = hasilVi[i] / maksvi * 100;
        if(adjustedvi >= 60){
            keterangan = "Diundang";
            status = "Lulus";
        }else if(adjustedvi < 60){
            keterangan = "Tidak Diundang";
            status = "Tidak Lulus";
        }
        keyVi = {
            id: countSumVectorSi[i].id,
            key: countSumVectorSi[i].key,
            value: adjustedvi,
            status:status,
            keterangan:keterangan
        }
        vectorVi.push(keyVi);
    }
    return vectorVi;
}

function getMaxAlt(vectorVi) {
    // console.log(vectorVi);
    let max=0 ;
    let result;
    for (let i = 0; i < vectorVi.length; i++){
       if (vectorVi[i].value > max){
           max += vectorVi[i].value;
           result = vectorVi[i].key;
       }
    }
    let fin_hasil = {perusahaan:result,value:max}
    return fin_hasil; 
}


function hitung(kriteria, alternatif) {
    let sumOfBobot = getTotalBobot(kriteria);
    let prioritas = getPrioritas(kriteria, sumOfBobot);
    let vektorSi = hitungVectorSi(alternatif, prioritas);
    let sumVectorSi = countSumSiPerAlternatif(vektorSi);
    let totalVectorSi = countTotalVectorSi(sumVectorSi);
    let vectorVi = countVectorVi(sumVectorSi, totalVectorSi);
    let Max = getMaxAlt(vectorVi)
    // console.log(vectorVi)

    // let score_fin = getMaxAlt(vectorVi[1])
    // let coba = [Max,score_fin];
    return Max
}

function hasil(kriteria, alternatif) {
    let sumOfBobot = getTotalBobot(kriteria);
    let prioritas = getPrioritas(kriteria, sumOfBobot);
    let vektorSi = hitungVectorSi(alternatif, prioritas);
    let sumVectorSi = countSumSiPerAlternatif(vektorSi);
    let totalVectorSi = countTotalVectorSi(sumVectorSi);
    let vectorVi = countVectorVi2(sumVectorSi, totalVectorSi);
    // console.log(vectorVi)

    // let score_fin = getMaxAlt(vectorVi[1])
    // let coba = [Max,score_fin];
    return vectorVi
}
module.exports = {
    hitung,hasil
}

// console.log(hitung(data.kriteria, data.alternatif));
