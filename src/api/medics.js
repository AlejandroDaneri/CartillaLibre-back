const express = require('express');

var medicCtrl = require('../controllers/medics');
const medics = express.Router();

medics.route('/')
  .get(medicCtrl.findAllMedics)
  .post(medicCtrl.addMedic)

module.exports = medics
