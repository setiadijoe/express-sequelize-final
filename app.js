const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const pg = require('pg');
const Sequelize = require('sequelize')

const index = require('./router/index')
const supplier = require('./router/supplier')

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())

app.use('/',index)
app.use('/supplier', supplier)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Hello I'm on 3000`);
  })