const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var medicSchema = new Schema({
  name: { 
    type: String ,
    required: true
  },
  speciality: {
    type: String,
    required: true 
  },
  rating: {
    type: Number,
    default: 1,
    required: true,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Medic', medicSchema);
