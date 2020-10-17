var mongoose = require('mongoose');
require('../models/medics');
var medic  = mongoose.model('Medic');

//GET - Return all medics in the DB
exports.findAllMedics = function(req, res) {
  medic.find(function(err, medics) {
      if(err) res.send(500, err.message);
      console.log('GET /medic')
      res.status(200).jsonp(medics);
  });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
  medic.findById(req.params.id, function(err, medic) {
    if(err) return res.send(500, err.message);

    console.log('GET /tvshow/' + req.params.id);
    res.status(200).jsonp(medic);
  });
};

//POST - Insert a new medics in the DB
exports.addMedic = function(req, res) {
  console.table(req.body)

  var newMedic = new medic({
      name:           req.body.name,
      speciality:     req.body.speciality
  });

  newMedic.save(function(err, medic) {
    if(err) return res.status(500).send( err.message)
    res.status(200).jsonp(medic)
  });
};

//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {
  medic.findById(req.params.id, function(err, medic) {
    medic.name   = req.body.name;
    medic.speciality    = req.body.speciality;

    medic.save(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(medic);
    });
  });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function(req, res) {
  medic.findById(req.params.id, function(err, medic) {
    medic.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200);
    })
  });
};
