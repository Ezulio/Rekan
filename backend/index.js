const express = require('express');
const volleyball = require('volleyball');
const lelang = require('./api/lelang');
const cors  = require('cors');
const app = express();
const spk = require('./logic/weightedProduct');
const knex = require('./db/connection');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(volleyball);
app.use('/lelang',lelang);

app.get('/',(req,res)=>{
    res.json({
        "Message":"Hello Shit"
    });
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Listening to your shit '+ port + ' times');
});

function notFound (req,res,next){
    res.status(404);
    const error = new Error("Not Found Shit"+req.originalUrl);
    next(error);
}


function errorHandler(err,req,res,next){
    res.status(res.statusCode||500);
    res.json({
        message: err.message
    })
}

knex.raw('select 1+1 as result').then(() => {
  // there is a valid connection in the pool
  console.log('Connected to your shit')
  }).catch(err=>console.log(err))

app.use(notFound);
app.use(errorHandler);