const express = require('express');
const medics = express.Router();

medics.use(express.json())

medics.get('/',(req,res) =>{
  res.status(200).json({name:"Alejandro",speciality:"Nothing"})
})
module.exports = medics
