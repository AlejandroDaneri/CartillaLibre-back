var mongoose = require('mongoose');
require('../models/medics');
var medics  = mongoose.model('Medic');

//GET - Return all medics in the DB
exports.findAllMedics = function(req, res) {
  medics.find(function(err, medics) {
      if(err) res.send(500, err.message);
      res.status(200).jsonp(medics);
  });
};

//GET - Return a medic with specified ID
exports.findById = function(req, res) {
  medics.findById(req.params.id, function(err, medic) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(medic);
  });
};

//POST - Insert a new medic in the DB
const alreadyExistsMessage = "existed";
exports.addMedic = function(req, res, next) {
  medics.findOne({ name: req.body.name }, function (err, existing) {
    if (existing != null) res.status(400).send(alreadyExistsMessage)
    else {
      var newMedic = new medics({
        name:           req.body.name,
        speciality:     req.body.speciality
      });

      newMedic.save(function(err, medic) {
        if(err) return res.status(500).send( err.message)
        res.status(200).jsonp(medic)
      });
    }
  });

};

//PUT - Update a register already exists
exports.updateMedic = function(req, res) {
  medics.findById(req.params.id, function(err, medic) {
    medic.name   = req.body.name;
    medic.speciality    = req.body.speciality;

    medic.save(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(medic);
    });
  });
};

//DELETE - Delete a medic with specified ID
exports.deleteMedic = function(req, res) {
  medics.findById(req.params.id, function(err, medic) {
    medic.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(medic);
    })
  });
};


//DELETE - Delete all
exports.deleteAll = function(req, res) {
  mongoose.connection.collections['medics'].drop(function (err) {
    console.log('collection dropped');
  })
  res.status(200).jsonp("ready")
};
