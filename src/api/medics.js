const express = require('express');

var medicCtrl = require('../controllers/medics');
const medics = express.Router();

medics.route('/')
  .get(medicCtrl.findAllMedics)
  .post(medicCtrl.addMedic)

medics.route('/:id')
  .get(medicCtrl.findById)
  .put(medicCtrl.updateTVShow)
  .delete(medicCtrl.deleteTVShow);

module.exports = medics
