const express = require('express');
const router = express.Router();
const medics = require('./medics');
require('../utils/mongo')

router.use('/medics', medics)
router.use(express.json())

router.get('/ping',(req,res) =>{
  res.status(200).json("Ping")
})

router.get('/',(req,res) =>{
  res.status(200).json("Bienvenido a Cartilla Libre")
})


module.exports = router
