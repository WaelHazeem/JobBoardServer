const express = require('express');

const companies = require('express').Router();
const companiesList = require('../db').companiesList;

const mongoDB=require('../db/companies')
// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
companies.use(timeLog);
companies.use(express.json()) ;

companies.get('/',(req,res)=>{
    res.send(companiesList)
})

companies.post('/',(req,res)=>{
    console.log(req.body);

    mongoDB.insertOne(req.body.company)
    // companiesList.push({name: `${req.body.company.name.toString()}`});

    res.send('new company was added');
})
module.exports=companies;
