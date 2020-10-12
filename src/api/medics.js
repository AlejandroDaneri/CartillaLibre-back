const express = require('express');
const medics = express.Router();

medics.get('/',(req,res) =>{
  res.status(200).json({name:"Alejandro", speciality:"Nothing"})
})

medics.post('/',(req,res) =>{
  const name = req.body.name
  console.log(req.body)
  console.log(name)
  res.status(200).send("Ok")
})
module.exports = medics
