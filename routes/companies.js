const companies = require('express').Router();

const companiesList=[{name:"c1"},{name:"c2"},{name:"c3"},{name:"c4"}]

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
companies.use(timeLog);

companies.get('/',(req,res)=>{
    res.send(companiesList)
})

module.exports=companies;