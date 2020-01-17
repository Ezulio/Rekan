const data = {
    kriteria: [
        {
            key: 'pasar',
            bobot: 40
        },
        {
            key: 'pendapatan',
            bobot: 70
        },
        {
            key: 'infrastruktur',
            bobot: 20
        },
        {
            key: 'transportasi',
            bobot: 25
        }
    ],
    alternatif: [
        {
            key: 'alt1',
            value: { pasar: 2100000, pendapatan: 7200, infrastruktur: 800, transportasi: 100 },
        },
        {
            key: 'alt2',
            value: { pasar: 2000000, pendapatan: 7200, infrastruktur: 600, transportasi: 150 },
        }, {
            key: 'alt3',
            value: { pasar: 2450000, pendapatan: 7200, infrastruktur: 1000, transportasi: 200 },
        }
    ]
}
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
        value = kriteria[i].bobot / sumOfBobot
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
            key: alternatif[i].key,
            value: hasil[i]
        }
        vektorSi.push(keySi);
    }

    return vektorSi
}
function countSumSiPerAlternatif(vektorSi) {
    let sumVektorSi = []
    for (let i = 0; i < vektorSi.length; i++) {
        hasil = 1;
        for (let j = 0; j < vektorSi[i].value.length; j++) {
            hasil *= vektorSi[i].value[j]
            keySumSi = {
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
            key: countSumVectorSi[i].key,
            value: hasilVi[i]
        }
        vectorVi.push(keyVi);
    }
    return vectorVi;
}
function getMaxAlt(vectorVi) {
    console.log(vectorVi);
    let max=0 ;
    let result;
    for (let i = 0; i < vectorVi.length; i++){
       if (vectorVi[i].value > max){
           max = vectorVi[i].value;
           result = vectorVi[i].key;
       }
    }
    return result; 


}

function hitung(kriteria, alternatif) {
    let sumOfBobot = getTotalBobot(kriteria);
    let prioritas = getPrioritas(kriteria, sumOfBobot);
    let vektorSi = hitungVectorSi(alternatif, prioritas);
    let sumVectorSi = countSumSiPerAlternatif(vektorSi);
    let totalVectorSi = countTotalVectorSi(sumVectorSi);
    let vectorVi = countVectorVi(sumVectorSi, totalVectorSi);
    let Max = getMaxAlt(vectorVi)
    return Max
}

// console.log(hitung(data.kriteria, data.alternatif));
