const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var medicSchema = new Schema({
  name:           { type: String },
  speciality:     { type: String },
});

module.exports = mongoose.model('Medic', medicSchema);
