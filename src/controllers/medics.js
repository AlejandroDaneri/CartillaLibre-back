var mongoose = require('mongoose');
require('../models/medics');
var medics  = mongoose.model('Medic');
var http = require('http-status-codes')

//GET - Return all medics in the DB
exports.findAllMedics = function(req, res) {
  medics.find(function(err, medics) {
      if(err) res.send(http.INTERNAL_SERVER_ERROR, err.message);
      res.status(http.OK).jsonp(medics);
  });
};

//GET - Return a medic with specified ID
exports.findById = function(req, res) {
  medics.findById(req.params.id, function(err, medic) {
    if(err) return res.send(http.INTERNAL_SERVER_ERROR, err.message);
    res.status(http.OK).jsonp(medic);
  });
};

//POST - Insert a new medic in the DB
const alreadyExistsMessage = (medic) => {`Medic ${medic} already exists`};
exports.addMedic = function(req, res, next) {
  const name = req.body.name
  medics.findOne({ name: name }, function (err, existing) {
    if (existing != null) {
      console.warn(alreadyExistsMessage(name))
      res.status(http.BAD_REQUEST).send(alreadyExistsMessage(name))
    }
    else {
      const newMedic = new medics({
        name:           req.body.name,
        speciality:     req.body.speciality
      });

      newMedic.save(function(err, medic) {
        if(err) return res.status(http.INTERNAL_SERVER_ERROR).send( err.message)
        res.status(http.OK).jsonp(medic)
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
      if(err) return res.send(http.INTERNAL_SERVER_ERROR, err.message);
      res.status(http.OK).jsonp(medic);
    });
  });
};

//DELETE - Delete a medic with specified ID
exports.deleteMedic = function(req, res) {
  medics.findById(req.params.id, function(err, medic) {
    if (!medic) return res.send(http.NOT_FOUND)
    medic.remove(function(err) {
      if(err) return res.send(http.INTERNAL_SERVER_ERROR, err.message);
      res.status(http.OK).jsonp(medic);
    })
  });
};


//DELETE - Delete all
exports.deleteAll = function(req, res) {
  mongoose.connection.collections['medics'].drop(function (err) {
    console.log('collection dropped');
  })
  res.status(http.OK).jsonp("ready")
};
