const express = require('express');

var medicCtrl = require('../controllers/medics');
const medics = express.Router();

medics.route('/')
  .get(medicCtrl.findAllMedics)
  .post(medicCtrl.addMedic)

medics.route('/borratodo')
  .delete(medicCtrl.deleteAll)

medics.route('/:id')
  .get(medicCtrl.findById)
  .put(medicCtrl.updateMedic)
  .delete(medicCtrl.deleteMedic);


module.exports = medics
