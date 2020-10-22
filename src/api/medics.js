const express = require('express');

var medicCtrl = require('../controllers/medics');

const { body, validationResult } = require('express-validator');
const medics = express.Router();

const validation = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.warn("Bad request",errors.array())
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

medics.route('/borratodo')
  .delete(medicCtrl.deleteAll)

medics.route('/')
  .get(medicCtrl.findAllMedics)
  .post([
    body('name').not().isEmpty(),
    body('speciality').not().isEmpty(),
    validation,
    medicCtrl.addMedic])

medics.route('/:id')
  .get(medicCtrl.findById)
  .put(medicCtrl.updateMedic)
  .delete(medicCtrl.deleteMedic);


module.exports = medics
