var mongoose = require('mongoose');
require('../models/medics');
var medic  = mongoose.model('Medic');
var http = require('http-status-codes')


const returnQuery = (res, err,result) => {
  if(err) return res.send(http.INTERNAL_SERVER_ERROR, err.message);
  res.status(http.OK).jsonp(result);
}

//GET - Return all medics in the DB
exports.findAllMedics = function(req, res) {
  medic.find(returnQuery.bind(undefined,res));
};

//GET - Return a medic with specified ID
exports.findById = function(req, res) {
  medic.findById(req.params.id, returnQuery.bind(undefined,res));
};

//POST - Insert a new medic in the DB
const alreadyExistsMessage = (medic) => {`Medic ${medic} already exists`};
exports.addMedic = function(req, res, next) {
  const name = req.body.name
  medic.findOne({ name: name }, function (err, existing) {
    if (existing != null) {
      console.warn(alreadyExistsMessage(name))
      res.status(http.BAD_REQUEST).send(alreadyExistsMessage(name))
    }
    else {
      req.body.rating = [req.body.rating]
      const newMedic = new medic(req.body);

      newMedic.save(returnQuery.bind(undefined,res));
    }
  });

};

//PATCH - Update a register already exists
exports.updateMedic = function(req, res) {
  medic.updateOne(
    { _id: req.params.id },
    { $push: { rating: [req.body.rating] } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

//DELETE - Delete a medic with specified ID
exports.deleteMedic = function(req, res) {
  medic.findById(req.params.id, function(err, medic) {
    if (!medic) return res.status(http.NOT_FOUND).jsonp("Error: not founded")
    medic.remove(returnQuery.bind(undefined,res))
  });
};


//DELETE - Delete all
exports.deleteAll = function(req, res) {
  mongoose.connection.collections['medics'].drop(function (err) {
    console.log('collection dropped');
  })
  res.status(http.OK).jsonp("ready")
};
